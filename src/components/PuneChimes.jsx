import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { usePrefersReducedMotion } from '@chakra-ui/react';
import { createParticle, createLink, moveParticle, releaseParticle, pushParticles, stepParticles } from './curtainPhysics';

const WIDTH = 300;
const HEIGHT = 260;
const TAG_WIDTH = 60;
const TAG_HEIGHT = 62;
const STRAND_COUNT = 33;
const strandX = index => 18 + index * 264 / (STRAND_COUNT - 1);

export const SARGAM = [
  { name: 'Sa', label: 'सा', semitones: 0 },
  { name: 'Re', label: 'रे', semitones: 2 },
  { name: 'Ga', label: 'ग', semitones: 4 },
  { name: 'Ma', label: 'म', semitones: 5 },
  { name: 'Pa', label: 'प', semitones: 7 },
  { name: 'Dha', label: 'ध', semitones: 9 },
  { name: 'Ni', label: 'नी', semitones: 11 },
  { name: 'Sa', label: 'सा', semitones: 12 },
];

export function getCurtainNote(x, y) {
  const index = Math.max(0, Math.min(SARGAM.length - 1, Math.floor(x / WIDTH * SARGAM.length)));
  const band = Math.max(0, Math.min(2, Math.floor(y / HEIGHT * 3)));
  const octave = 1 - band;
  const note = SARGAM[index];
  return {
    key: `${index}:${octave}`,
    index,
    name: note.name,
    label: note.label,
    octave,
    octaveLabel: ['Taar', 'Madhya', 'Mandra'][band],
    frequency: 196 * 2 ** (note.semitones / 12 + octave),
  };
}

export const PUNE_CHIMES = [
  { text: 'पु', x: strandX(10), length: 142 },
  { text: 'णे', x: strandX(22), length: 162 },
];

const STRANDS = Array.from({ length: STRAND_COUNT }, (_, index) => {
  const x = strandX(index);
  const chimeIndex = PUNE_CHIMES.findIndex(chime => chime.x === x);
  return {
    x,
    chimeIndex,
    length: PUNE_CHIMES[chimeIndex]?.length ?? Math.round(196 + 34 * Math.sin(Math.PI * index / (STRAND_COUNT - 1))),
  };
});

const PuneChimes = forwardRef(function PuneChimes({ open, onInteract, onPluck, onMotion }, ref) {
  const sceneRef = useRef(null);
  const tagRefs = useRef([]);
  const ropeRefs = useRef([]);
  const pendantRefs = useRef([]);
  const simulationRef = useRef(null);
  const gestureRef = useRef(null);
  const hoverRef = useRef(null);
  const curtainPointerRef = useRef(null);
  const curtainDragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const lastNoteRef = useRef(null);
  const keyboardNotesRef = useRef([null, null]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const particles = [];
    const links = [];
    const ropes = STRANDS.map(({ x, length, chimeIndex }) => {
      const anchorParticle = createParticle(x, 8, true);
      const anchor = anchorParticle.position;
      const nodes = [];
      for (let i = 0; i < 12; i++) {
        const node = createParticle(x, anchor.y + (i + 1) * length / 12);
        links.push(createLink(i === 0 ? anchorParticle : nodes[i - 1], node));
        nodes.push(node);
      }
      const tag = createParticle(x, anchor.y + length + 4 + (chimeIndex < 0 ? 0 : TAG_HEIGHT / 2));
      links.push(createLink(nodes.at(-1), tag, chimeIndex < 0 ? 0.02 : 1));
      particles.push(anchorParticle, ...nodes, tag);
      return { anchor, nodes, tag, chimeIndex };
    });
    ropes.slice(1).forEach((rope, index) => rope.nodes.forEach((particle, row) => {
      links.push(createLink(ropes[index].nodes[row], particle, 0.6, 4));
    }));

    let frame;
    let previousTime;
    let accumulator = 0;
    let quietFrames = 0;
    let recoveryFrames = 0;
    let settling = false;
    let restOffset = Infinity;
    let speed = 0;
    const paint = () => {
      ropes.forEach(({ anchor, nodes, tag, chimeIndex }, index) => {
        const path = ropeRefs.current[index];
        const element = chimeIndex >= 0 ? tagRefs.current[chimeIndex] : pendantRefs.current[index];
        if (!path || !element) return;
        const last = nodes.at(-1).position;
        tag.angle = -Math.atan2(tag.position.x - last.x, tag.position.y - last.y);
        if (chimeIndex >= 0) {
          element.style.left = `${(tag.position.x - TAG_WIDTH / 2) / WIDTH * 100}%`;
          element.style.top = `${(tag.position.y - TAG_HEIGHT / 2) / HEIGHT * 100}%`;
          element.style.transform = `rotate(${tag.angle}rad)`;
        } else {
          element.setAttribute('cx', tag.position.x);
          element.setAttribute('cy', tag.position.y);
        }
        const attachment = chimeIndex < 0 ? tag.position : {
          x: tag.position.x + Math.sin(tag.angle) * TAG_HEIGHT / 2,
          y: tag.position.y - Math.cos(tag.angle) * TAG_HEIGHT / 2,
        };
        const points = [anchor, ...nodes.map(node => node.position), attachment];
        const curve = points.slice(1, -1).map((point, i) => {
          const next = points[i + 2];
          return `Q${point.x},${point.y} ${(point.x + next.x) / 2},${(point.y + next.y) / 2}`;
        }).join(' ');
        path.setAttribute('d', `M${anchor.x},${anchor.y} ${curve} L${attachment.x},${attachment.y}`);
      });
    };
    const tick = time => {
      accumulator += previousTime === undefined ? 1000 / 60 : Math.min(time - previousTime, 64);
      previousTime = time;
      while (accumulator >= 1000 / 60) {
        speed = stepParticles(particles, links, reducedMotion);
        const released = !gestureRef.current && !curtainDragRef.current;
        recoveryFrames = released && speed < 0.08 ? recoveryFrames + 1 : 0;
        if (recoveryFrames >= 20) settling = true;
        if (settling && released) {
          let energy = 0;
          restOffset = 0;
          ropes.forEach(({ anchor, nodes, tag }) => {
            [...nodes, tag].forEach(particle => {
              const correction = (anchor.x - particle.position.x) * (reducedMotion ? 0.18 : 0.08);
              particle.position.x += correction;
              particle.velocity.x += correction;
              particle.previous.x = particle.position.x;
              energy += particle.velocity.x ** 2 + particle.velocity.y ** 2;
              restOffset = Math.max(restOffset, Math.abs(anchor.x - particle.position.x));
            });
          });
          speed = Math.sqrt(energy / (particles.length - ropes.length));
        }
        quietFrames = speed < 0.02 ? quietFrames + 1 : 0;
        accumulator -= 1000 / 60;
      }
      const resting = quietFrames >= 20 && restOffset < 0.02 && !gestureRef.current && !curtainDragRef.current;
      if (resting) {
        ropes.forEach(({ anchor, nodes, tag }) => {
          [...nodes, tag].forEach(particle => {
            particle.position.x = particle.previous.x = anchor.x;
            particle.velocity.x = 0;
          });
        });
      }
      paint();
      onMotion?.(resting ? 0 : speed);
      if (resting) {
        frame = undefined;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    const start = () => {
      if (frame !== undefined) return;
      previousTime = undefined;
      frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      quietFrames = 0;
      recoveryFrames = 0;
      settling = false;
      restOffset = Infinity;
      start();
    };
    simulationRef.current = {
      ropes,
      chimes: ropes.filter(rope => rope.chimeIndex >= 0),
      wake,
      push: position => {
        pushParticles(particles, position, reducedMotion ? 0.3 : 1);
        wake();
      },
    };
    const cancelGestures = () => {
      if (gestureRef.current) releaseParticle(gestureRef.current.particle);
      if (curtainDragRef.current) releaseParticle(curtainDragRef.current);
      gestureRef.current = null;
      curtainDragRef.current = null;
      curtainPointerRef.current = null;
      hoverRef.current = null;
      lastNoteRef.current = null;
      wake();
    };
    const onVisibilityChange = () => {
      if (document.hidden) cancelGestures();
    };
    window.addEventListener('blur', cancelGestures);
    window.addEventListener('pagehide', cancelGestures);
    document.addEventListener('visibilitychange', onVisibilityChange);
    paint();
    if (!reducedMotion) start();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('blur', cancelGestures);
      window.removeEventListener('pagehide', cancelGestures);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      gestureRef.current = null;
      hoverRef.current = null;
      curtainPointerRef.current = null;
      curtainDragRef.current = null;
      lastNoteRef.current = null;
      keyboardNotesRef.current = [null, null];
      simulationRef.current = null;
      onMotion?.(0);
    };
  }, [open, reducedMotion, onMotion]);

  const nudge = (index, direction = index === 0 ? -1 : 1) => {
    const simulation = simulationRef.current;
    if (!simulation) return;
    simulation.wake();
    const tag = simulation.chimes[index].tag;
    tag.previous.x = tag.position.x - direction * (reducedMotion ? 0.8 : 4);
  };

  const ring = index => {
    if (!open) return;
    nudge(index);
    onInteract?.();
    const tag = simulationRef.current?.chimes[index].tag;
    const chime = PUNE_CHIMES[index];
    onPluck?.(keyboardNotesRef.current[index] ?? getCurtainNote(tag?.position.x ?? chime.x, tag?.position.y ?? chime.length + 43), 0.9, 0);
  };

  useImperativeHandle(ref, () => ({ ring }));

  const pointerPosition = event => {
    const bounds = sceneRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(WIDTH, (event.clientX - bounds.left) / bounds.width * WIDTH)),
      y: Math.max(0, Math.min(HEIGHT, (event.clientY - bounds.top) / bounds.height * HEIGHT)),
    };
  };

  const release = () => {
    const gesture = gestureRef.current;
    if (!gesture) return;
    releaseParticle(gesture.particle);
    simulationRef.current?.wake();
    gestureRef.current = null;
    suppressClickRef.current = true;
  };

  const releaseCurtain = (clearHover = true) => {
    if (curtainDragRef.current) releaseParticle(curtainDragRef.current);
    simulationRef.current?.wake();
    curtainDragRef.current = null;
    curtainPointerRef.current = null;
    if (clearHover) {
      hoverRef.current = null;
      lastNoteRef.current = null;
    }
  };

  const playStroke = (previous, position) => {
    const dx = previous ? position.x - previous.x : 0;
    const dy = previous ? position.y - previous.y : 0;
    const distance = Math.hypot(dx, dy);
    if (previous && distance < 0.5) return;
    const steps = Math.max(1, Math.ceil(Math.abs(dx) / (WIDTH / SARGAM.length / 2)), Math.ceil(Math.abs(dy) / (HEIGHT / 6)));
    const now = performance.now();
    let emitted = 0;
    for (let step = 1; step <= steps; step++) {
      const note = getCurtainNote(position.x - dx + dx * step / steps, position.y - dy + dy * step / steps);
      if (lastNoteRef.current?.key === note.key && (now - lastNoteRef.current.time < 160 || distance < 3)) continue;
      onPluck?.(note, Math.max(0.55, Math.min(1, distance / 24)), Math.min(0.42, emitted * 0.06));
      lastNoteRef.current = { key: note.key, time: now };
      emitted++;
    }
  };

  const brush = event => {
    if (gestureRef.current || (event.pointerType === 'touch' && curtainPointerRef.current !== event.pointerId)) {
      hoverRef.current = null;
      return;
    }
    const position = pointerPosition(event);
    if (curtainDragRef.current && curtainPointerRef.current === event.pointerId) {
      moveParticle(curtainDragRef.current, position);
    }
    if (!hoverRef.current || Math.hypot(position.x - hoverRef.current.x, position.y - hoverRef.current.y) > 0.1) {
      simulationRef.current?.push(position);
    }
    playStroke(hoverRef.current, position);
    hoverRef.current = position;
    simulationRef.current?.wake();
  };

  return (
    <div
      ref={sceneRef}
      className="pune-chimes"
      hidden={!open}
      role="group"
      aria-label="Marathi Pune chimes"
      onPointerEnter={event => {
        if (event.pointerType === 'touch') return;
        hoverRef.current = pointerPosition(event);
        simulationRef.current?.wake();
      }}
      onPointerLeave={() => {
        if (curtainPointerRef.current !== null) return;
        hoverRef.current = null;
        lastNoteRef.current = null;
      }}
      onPointerMove={brush}
      onPointerDown={event => {
        if (event.button !== 0 || event.isPrimary === false || event.target.closest('button') || gestureRef.current || curtainPointerRef.current !== null) return;
        onInteract?.();
        hoverRef.current = null;
        lastNoteRef.current = null;
        curtainPointerRef.current = event.pointerId;
        const simulation = simulationRef.current;
        if (simulation) {
          const position = pointerPosition(event);
          let nearest;
          let distance = 22;
          simulation.ropes.forEach(({ nodes }) => nodes.slice(1).forEach(body => {
            const separation = Math.hypot(body.position.x - position.x, body.position.y - position.y);
            if (separation < distance) {
              nearest = body;
              distance = separation;
            }
          }));
          if (nearest) {
            nearest.pinned = true;
            moveParticle(nearest, position);
            curtainDragRef.current = nearest;
          }
        }
        event.currentTarget.setPointerCapture(event.pointerId);
        brush(event);
      }}
      onPointerUp={event => {
        if (curtainPointerRef.current !== event.pointerId) return;
        releaseCurtain(event.pointerType === 'touch');
      }}
      onLostPointerCapture={event => {
        if (curtainPointerRef.current !== event.pointerId) return;
        releaseCurtain();
      }}
      onPointerCancel={event => {
        if (curtainPointerRef.current !== event.pointerId) return;
        releaseCurtain();
      }}
    >
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className="pune-chimes__strings" aria-hidden="true">
        <path d="M12 5h276" className="pune-chimes__rail" />
        {STRANDS.map(({ x, chimeIndex }, index) => (
          <g key={x}>
            <path className="pune-chimes__strand" data-anchor={x} data-note={getCurtainNote(x, HEIGHT / 2).name} ref={element => { ropeRefs.current[index] = element; }} />
            {chimeIndex < 0 && <circle r="3" className="pune-chimes__bead" ref={element => { pendantRefs.current[index] = element; }} />}
          </g>
        ))}
      </svg>
      {PUNE_CHIMES.map(({ text, x, length }, index) => (
        <button
          type="button"
          key={text}
          ref={element => { tagRefs.current[index] = element; }}
          className="pune-chimes__tag"
          aria-label={`Ring ${text} chime`}
          aria-describedby="pune-chime-instructions"
          style={{ left: `${(x - TAG_WIDTH / 2) / WIDTH * 100}%`, top: `${(length + 12) / HEIGHT * 100}%` }}
          onPointerDown={event => {
            if (event.button !== 0 || event.isPrimary === false || gestureRef.current || curtainPointerRef.current !== null) return;
            const simulation = simulationRef.current;
            if (!simulation) return;
            keyboardNotesRef.current[index] = null;
            suppressClickRef.current = false;
            hoverRef.current = null;
            simulation.wake();
            const particle = simulation.chimes[index].tag;
            particle.pinned = true;
            gestureRef.current = { index, particle, position: pointerPosition(event), pointerId: event.pointerId };
            event.currentTarget.setPointerCapture(event.pointerId);
            onInteract?.();
            onPluck?.(getCurtainNote(simulation.chimes[index].tag.position.x, simulation.chimes[index].tag.position.y), 0.9, 0);
          }}
          onPointerMove={event => {
            const gesture = gestureRef.current;
            if (!gesture || gesture.index !== index || gesture.pointerId !== event.pointerId) return;
            const position = pointerPosition(event);
            playStroke(gesture.position, position);
            moveParticle(gesture.particle, position);
            simulationRef.current?.push(position);
            gesture.position = position;
          }}
          onPointerUp={event => {
            if (gestureRef.current?.pointerId === event.pointerId) release();
          }}
          onPointerCancel={event => {
            if (gestureRef.current?.pointerId === event.pointerId) release();
          }}
          onLostPointerCapture={event => {
            if (gestureRef.current?.pointerId === event.pointerId) release();
          }}
          onClick={event => {
            if (event.detail > 0 && suppressClickRef.current) {
              suppressClickRef.current = false;
              return;
            }
            ring(index);
          }}
          onKeyDown={event => {
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
              event.preventDefault();
              const tag = simulationRef.current?.chimes[index].tag;
              if (!tag) return;
              const current = keyboardNotesRef.current[index] ?? getCurtainNote(tag.position.x, tag.position.y);
              const nextIndex = Math.max(0, Math.min(SARGAM.length - 1, current.index + (event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0)));
              const octave = Math.max(-1, Math.min(1, current.octave + (event.key === 'ArrowUp' ? 1 : event.key === 'ArrowDown' ? -1 : 0)));
              keyboardNotesRef.current[index] = getCurtainNote((nextIndex + 0.5) / SARGAM.length * WIDTH, (1.5 - octave) / 3 * HEIGHT);
              ring(index);
            }
          }}
        >
          <span lang="mr">{text}</span>
          <svg viewBox="0 0 24 24" className="pune-chimes__little-bell" aria-hidden="true">
            <path d="M3 16c4-3 2-7 5-10a6 6 0 0 1 8 0c3 3 1 7 5 10Z" fill="#c69d56" />
            <ellipse cx="12" cy="17" rx="9" ry="3" fill="#98713c" />
            <path d="M12 16v5" stroke="#7d592f" strokeWidth="2" />
            <circle cx="12" cy="21" r="2" fill="#b68e4c" />
          </svg>
        </button>
      ))}
    </div>
  );
});

export default PuneChimes;
