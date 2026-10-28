import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { usePrefersReducedMotion } from '@chakra-ui/react';
import Matter from 'matter-js';

const { Bodies, Body, Composite, Constraint, Engine, Sleeping } = Matter;
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

const PuneChimes = forwardRef(function PuneChimes({ open, onInteract, onPluck }, ref) {
  const sceneRef = useRef(null);
  const tagRefs = useRef([]);
  const ropeRefs = useRef([]);
  const pendantRefs = useRef([]);
  const simulationRef = useRef(null);
  const gestureRef = useRef(null);
  const hoverRef = useRef(null);
  const curtainPointerRef = useRef(null);
  const suppressClickRef = useRef(false);
  const lastNoteRef = useRef(null);
  const keyboardNotesRef = useRef([null, null]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const engine = Engine.create({ enableSleeping: true, constraintIterations: 8 });
    engine.gravity.y = 0.45;
    const ropes = STRANDS.map(({ x, length, chimeIndex }) => {
      const anchor = { x, y: 8 };
      const nodes = [];
      const constraints = [];
      for (let i = 0; i < 12; i++) {
        const node = Bodies.circle(x, anchor.y + (i + 1) * length / 12, 1.5, {
          frictionAir: reducedMotion ? 0.18 : 0.04,
          collisionFilter: { mask: 0 },
        });
        Body.setMass(node, 0.06);
        constraints.push(Constraint.create({
          pointA: i === 0 ? anchor : { x: 0, y: 0 },
          bodyA: i === 0 ? undefined : nodes[i - 1],
          bodyB: node,
          length: length / 12,
          stiffness: 0.75,
          damping: 0.05,
        }));
        nodes.push(node);
      }
      const tag = chimeIndex < 0
        ? Bodies.circle(x, anchor.y + length + 4, 3, { frictionAir: reducedMotion ? 0.18 : 0.04, collisionFilter: { mask: 0 } })
        : Bodies.rectangle(x, anchor.y + length + 4 + TAG_HEIGHT / 2, TAG_WIDTH, TAG_HEIGHT, {
          chamfer: { radius: 3 },
          frictionAir: reducedMotion ? 0.18 : 0.04,
          restitution: 0.1,
        });
      Body.setMass(tag, chimeIndex < 0 ? 0.06 : 0.3);
      constraints.push(Constraint.create({
        bodyA: nodes.at(-1),
        bodyB: tag,
        pointB: { x: 0, y: chimeIndex < 0 ? 0 : -TAG_HEIGHT / 2 },
        length: 4,
        stiffness: 0.75,
        damping: 0.05,
      }));
      Composite.add(engine.world, [...nodes, tag, ...constraints]);
      return { anchor, nodes, tag, chimeIndex };
    });
    Composite.add(engine.world, [
      Bodies.rectangle(-12, HEIGHT / 2, 24, HEIGHT * 3, { isStatic: true }),
      Bodies.rectangle(WIDTH + 12, HEIGHT / 2, 24, HEIGHT * 3, { isStatic: true }),
      Bodies.rectangle(WIDTH / 2, HEIGHT - 3, WIDTH * 3, 24, { isStatic: true }),
    ]);

    let frame;
    let previousTime;
    let accumulator = 0;
    const paint = () => {
      ropes.forEach(({ anchor, nodes, tag, chimeIndex }, index) => {
        if (chimeIndex >= 0) {
          const element = tagRefs.current[chimeIndex];
          element.style.left = `${(tag.position.x - TAG_WIDTH / 2) / WIDTH * 100}%`;
          element.style.top = `${(tag.position.y - TAG_HEIGHT / 2) / HEIGHT * 100}%`;
          element.style.transform = `rotate(${tag.angle}rad)`;
        } else {
          pendantRefs.current[index].setAttribute('cx', tag.position.x);
          pendantRefs.current[index].setAttribute('cy', tag.position.y);
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
        ropeRefs.current[index].setAttribute('d', `M${anchor.x},${anchor.y} ${curve} L${attachment.x},${attachment.y}`);
      });
    };
    const partCurtain = () => {
      const pointer = hoverRef.current;
      if (!pointer || gestureRef.current) return;
      ropes.forEach(({ nodes, tag, anchor }) => {
        [...nodes.slice(1), tag].forEach(body => {
          const dx = body.position.x - pointer.x;
          const distance = Math.hypot(dx, body.position.y - pointer.y);
          if (distance >= 34) return;
          const direction = Math.sign(dx) || Math.sign(anchor.x - WIDTH / 2) || 1;
          const displacement = direction * (34 - distance) * 0.45;
          Body.setPosition(body, {
            x: Math.max(4, Math.min(WIDTH - 4, body.position.x + displacement)),
            y: body.position.y,
          });
          Body.setVelocity(body, { x: Math.max(-7, Math.min(7, body.velocity.x + displacement * 0.12)), y: body.velocity.y });
        });
      });
    };
    const tick = time => {
      accumulator += previousTime === undefined ? 1000 / 60 : Math.min(time - previousTime, 64);
      previousTime = time;
      while (accumulator >= 1000 / 60) {
        partCurtain();
        Engine.update(engine, 1000 / 60);
        accumulator -= 1000 / 60;
      }
      paint();
      const sleeping = Composite.allBodies(engine.world).every(body => body.isStatic || body.isSleeping);
      frame = sleeping && !gestureRef.current && !hoverRef.current ? undefined : requestAnimationFrame(tick);
    };
    const start = () => {
      if (frame !== undefined) return;
      previousTime = undefined;
      frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      Composite.allBodies(engine.world).forEach(body => {
        if (!body.isStatic) Sleeping.set(body, false);
      });
      start();
    };
    simulationRef.current = { engine, ropes, chimes: ropes.filter(rope => rope.chimeIndex >= 0), wake };
    paint();
    if (!reducedMotion) start();
    return () => {
      cancelAnimationFrame(frame);
      gestureRef.current = null;
      hoverRef.current = null;
      curtainPointerRef.current = null;
      lastNoteRef.current = null;
      keyboardNotesRef.current = [null, null];
      simulationRef.current = null;
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [open, reducedMotion]);

  const nudge = (index, direction = index === 0 ? -1 : 1) => {
    const simulation = simulationRef.current;
    if (!simulation) return;
    simulation.wake();
    Body.setVelocity(simulation.chimes[index].tag, { x: direction * (reducedMotion ? 0.8 : 4), y: 0 });
    Body.setAngularVelocity(simulation.chimes[index].tag, direction * (reducedMotion ? 0.005 : 0.025));
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
    const simulation = simulationRef.current;
    if (simulation) Composite.remove(simulation.engine.world, gesture.constraint);
    gestureRef.current = null;
    suppressClickRef.current = true;
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
      if (lastNoteRef.current?.key === note.key && (now - lastNoteRef.current.time < 100 || distance < 3)) continue;
      onPluck?.(note, Math.max(0.55, Math.min(1, distance / 24)), Math.min(0.12, emitted * 0.012));
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
        if (event.button !== 0 || event.target.closest('button')) return;
        onInteract?.();
        hoverRef.current = null;
        lastNoteRef.current = null;
        curtainPointerRef.current = event.pointerId;
        event.currentTarget.setPointerCapture(event.pointerId);
        brush(event);
      }}
      onPointerUp={event => {
        if (curtainPointerRef.current !== event.pointerId) return;
        curtainPointerRef.current = null;
        if (event.pointerType === 'touch') {
          hoverRef.current = null;
          lastNoteRef.current = null;
        }
      }}
      onLostPointerCapture={event => {
        if (curtainPointerRef.current !== event.pointerId) return;
        curtainPointerRef.current = null;
        hoverRef.current = null;
        lastNoteRef.current = null;
      }}
      onPointerCancel={event => {
        if (curtainPointerRef.current !== event.pointerId) return;
        curtainPointerRef.current = null;
        hoverRef.current = null;
        lastNoteRef.current = null;
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
            if (event.button !== 0 || gestureRef.current) return;
            const simulation = simulationRef.current;
            if (!simulation) return;
            keyboardNotesRef.current[index] = null;
            suppressClickRef.current = false;
            hoverRef.current = null;
            simulation.wake();
            const constraint = Constraint.create({
              pointA: pointerPosition(event),
              bodyB: simulation.chimes[index].tag,
              length: 0,
              stiffness: 0.15,
              damping: 0.1,
            });
            Composite.add(simulation.engine.world, constraint);
            gestureRef.current = { index, constraint, pointerId: event.pointerId };
            event.currentTarget.setPointerCapture(event.pointerId);
            onInteract?.();
            onPluck?.(getCurtainNote(simulation.chimes[index].tag.position.x, simulation.chimes[index].tag.position.y), 0.9, 0);
          }}
          onPointerMove={event => {
            const gesture = gestureRef.current;
            if (!gesture || gesture.index !== index || gesture.pointerId !== event.pointerId) return;
            const position = pointerPosition(event);
            playStroke(gesture.constraint.pointA, position);
            gesture.constraint.pointA = position;
            simulationRef.current?.wake();
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
