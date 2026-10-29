import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import PuneChimes from '../components/PuneChimes';
import './Pune.css';

const STRING_VOICES = {
  harmonium: {
    label: 'Harmonium',
    partials: [0.30, 0.13, 0.055, 0.025],
    attack: 0.06,
    hold: 0.22,
    sustain: 0.88,
    decay: 2.26,
    partialDecay: 0.15,
    partialEnd: 0.25,
    detune: [0, -1.2, 1.4, -0.8],
    stop: 2.35,
  },
  tanpura: {
    label: 'Tanpura',
    partials: [0.32, 0.07, 0.09, 0.045],
    attack: 0.025,
    hold: 0.45,
    sustain: 0.9,
    decay: 4.2,
    partialDecay: 0.2,
    partialEnd: 0.3,
    detune: [0, 0, 0, 0],
    stop: 4.3,
  },
};
const MAX_PLUCKS = 12;

function ShaniwarWada({ open, onToggle, children }) {
  return (
    <div className="pune-wada" data-open={open}>
      <svg viewBox="0 0 900 470" role="img" aria-labelledby="wada-title wada-description">
        <title id="wada-title">An original illustration of Shaniwar Wada</title>
        <desc id="wada-description">Stone bastions flank the Delhi Darwaja, with a timber gallery, tiled roofs, and a courtyard behind the wooden gates. Click to open them.</desc>
        <defs>
          <linearGradient id="wada-stone" x2="0" y2="1">
            <stop stopColor="#b8a383" />
            <stop offset="1" stopColor="#81715b" />
          </linearGradient>
          <linearGradient id="wada-wood" x2="1" y2="0">
            <stop stopColor="#513b2c" />
            <stop offset=".5" stopColor="#79583b" />
            <stop offset="1" stopColor="#493727" />
          </linearGradient>
          <clipPath id="wada-arch">
            <path d="M294 405V282a156 108 0 0 1 312 0v123Z" />
          </clipPath>
        </defs>
        <circle cx="686" cy="113" r="56" fill="#ebcf9b" />
        <g fill="none" stroke="#847f65" strokeWidth="2" opacity=".6">
          <path d="m133 119 11-5 11 5m442-47 10-5 10 5m103 70 11-5 11 5" />
        </g>
        <g fill="#7e8b6c">
          <ellipse cx="153" cy="288" rx="70" ry="89" />
          <ellipse cx="746" cy="278" rx="65" ry="92" />
          <ellipse cx="795" cy="312" rx="37" ry="58" fill="#a2a283" />
        </g>
        <path d="M91 399h718l65 42H30Z" fill="#e1cfb5" />
        <ellipse cx="450" cy="411" rx="347" ry="17" fill="#6c5133" opacity=".12" />
        <path d="M136 259h628v141H136Z" fill="url(#wada-stone)" />
        <g fill="#c6b293">
          {Array.from({ length: 19 }, (_, i) => <path key={i} d={`M${142 + i * 33} 260v-16h18v16Z`} />)}
        </g>
        <g stroke="#685f50" strokeWidth="1" opacity=".4">
          {[287, 315, 343, 371].map(y => <path key={y} d={`M139 ${y}h625`} />)}
          {[165, 208, 251, 294, 337, 562, 605, 648, 691, 734].map(x => <path key={x} d={`M${x} 263v137`} />)}
        </g>
        <g fill="url(#wada-stone)" stroke="#756650" strokeWidth="2">
          <path d="M196 247c-46 0-75 15-75 32v121h150V279c0-17-29-32-75-32Z" />
          <path d="M704 247c-46 0-75 15-75 32v121h150V279c0-17-29-32-75-32Z" />
        </g>
        <g fill="#c6b293">
          {[128, 158, 188, 218, 248, 636, 666, 696, 726, 756].map(x => <path key={x} d={`M${x} 269v-22h17v22Z`} />)}
        </g>
        <g fill="none" stroke="#766752" opacity=".55">
          {[300, 328, 356, 383].map(y => <path key={y} d={`M123 ${y}q73 12 146 0m362 0q73 12 146 0`} />)}
        </g>
        <path d="M265 170h370v240H265Z" fill="#bda68a" />
        <path d="M273 405V282a177 126 0 0 1 354 0v123Z" fill="#a88e6c" />
        <path d="M285 405V282a165 116 0 0 1 330 0v123Z" fill="#4a4937" />
        <g clipPath="url(#wada-arch)">
          <path d="M294 174h312v231H294Z" fill="#c6c8a9" />
          <path d="M294 325h312v80H294Z" fill="#a4ab7f" />
          <path d="m406 405 30-88h28l30 88Z" fill="#e6d9ba" />
          <path d="M310 235h280v90H310Z" fill="#d2bd97" opacity=".65" />
          {[335, 395, 455, 515].map(x => <path key={x} d={`M${x} 317v-38a15 15 0 0 1 30 0v38Z`} fill="#969174" opacity=".6" />)}
          <ellipse cx="450" cy="373" rx="32" ry="10" fill="#7d9992" />
          <path d="M450 374v-24m-9 5q9-18 18 0" fill="none" stroke="#d4e5da" strokeWidth="2" />
          <g className="pune-wada__door pune-wada__door--left">
            <path d="M294 174h156v231H294Z" fill="url(#wada-wood)" />
            {[315, 345, 375, 405, 435].map(x => <path key={x} d={`M${x} 175v230`} stroke="#342c21" opacity=".5" />)}
            {[240, 290, 340, 390].map(y => <path key={y} d={`M300 ${y}h144`} stroke="#aa8860" strokeWidth="3" />)}
            {[250, 300, 350].map(y => <g key={y} fill="#b89766"><circle cx="320" cy={y} r="3" /><circle cx="420" cy={y} r="3" /></g>)}
          </g>
          <g className="pune-wada__door pune-wada__door--right">
            <path d="M450 174h156v231H450Z" fill="url(#wada-wood)" />
            {[465, 495, 525, 555, 585].map(x => <path key={x} d={`M${x} 175v230`} stroke="#342c21" opacity=".5" />)}
            {[240, 290, 340, 390].map(y => <path key={y} d={`M456 ${y}h144`} stroke="#aa8860" strokeWidth="3" />)}
            {[250, 300, 350].map(y => <g key={y} fill="#b89766"><circle cx="480" cy={y} r="3" /><circle cx="580" cy={y} r="3" /></g>)}
          </g>
        </g>
        <g transform="translate(0,-70)">
        <path d="M304 178h292v59H304Z" fill="#a0744f" />
        <path d="M306 183h288v8H306Zm0 43h288v10H306Z" fill="#614531" />
        {[328, 368, 408, 448, 488, 528, 568].map(x => (
          <g key={x}>
            <path d={`M${x} 223v-22a9 9 0 0 1 18 0v22Z`} fill="#3f3629" />
            <path d={`M${x - 5} 189v39`} stroke="#deb180" strokeWidth="4" />
          </g>
        ))}
        <path d="m285 178 31-37h268l31 37Z" fill="#984e38" />
        <path d="M285 178h330" stroke="#593d2e" strokeWidth="5" />
        <path d="m371 141 21-40h116l21 40Z" fill="#b26747" />
        <path d="M385 101h130m-141 40h152" stroke="#634430" strokeWidth="4" />
        <path d="M397 99h107v-8H397Z" fill="#98623f" />
        </g>
        <path d="M273 405h354v8H273Z" fill="#a38d70" />
        <path d="m280 413-10 9h360l-10-9Z" fill="#c7b394" />
      </svg>
      <button
        type="button"
        className="pune-wada__gate-control"
        aria-label={open ? 'Close the Shaniwar Wada gates' : 'Open the Shaniwar Wada gates'}
        aria-expanded={open}
        aria-controls="pune-courtyard-caption"
        onClick={onToggle}
      >
        <svg viewBox="0 0 56 68" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="wada-brass" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#f5dc9a" />
              <stop offset=".45" stopColor="#c39748" />
              <stop offset="1" stopColor="#795020" />
            </linearGradient>
          </defs>
          <path d="M22 8h12l4 15-10 9-10-9Z" fill="url(#wada-brass)" stroke="#62421f" strokeWidth="1.5" />
          <circle cx="28" cy="20" r="3" fill="#795020" />
          <circle cx="28" cy="41" r="17" fill="none" stroke="#392815" strokeWidth="8" opacity=".35" transform="translate(0 2)" />
          <circle cx="28" cy="41" r="17" fill="none" stroke="url(#wada-brass)" strokeWidth="6" />
          <path d="M14 39a14 14 0 0 1 11-12" fill="none" stroke="#f8e5b3" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {children}
    </div>
  );
}

export default function Pune() {
  const [gatesOpen, setGatesOpen] = useState(false);
  const [lastNote, setLastNote] = useState(null);
  const [audioError, setAudioError] = useState('');
  const [instrument, setInstrument] = useState('harmonium');
  const instrumentRef = useRef('harmonium');
  const gatesOpenRef = useRef(false);
  const mountedRef = useRef(true);
  const audioRef = useRef(null);
  const notesRef = useRef(new Set());
  const audioEnabledRef = useRef(false);
  const audioGenerationRef = useRef(0);
  const audioStartingRef = useRef(null);
  const motionUpdateRef = useRef(0);

  const silence = useCallback(() => {
    audioGenerationRef.current++;
    audioEnabledRef.current = false;
    audioStartingRef.current = null;
    for (const note of notesRef.current) {
      note.pending = null;
      for (const { oscillator } of note.partials) {
        try {
          oscillator.stop();
        } catch {
          // A stopped or interrupted oscillator may already have ended.
        }
      }
      note.dispose();
    }
  }, []);

  const followCurtain = useCallback(speed => {
    const context = audioRef.current;
    if (!mountedRef.current || !gatesOpenRef.current || !audioEnabledRef.current
      || context?.state !== 'running' || document.hidden) return;
    const now = context.currentTime;
    if (speed > 0 && now - motionUpdateRef.current < 0.05) return;
    motionUpdateRef.current = now;
    const movement = Math.min(1, Math.sqrt(Math.max(0, speed - 0.025) / 1.5));
    for (const note of notesRef.current) {
      if (note.retiring || note.disposed || now >= note.stopAt
        || now < note.start + note.profile.attack + note.profile.hold) continue;
      const moving = movement > 0;
      if (!moving && note.motionQuiet) continue;
      note.motionQuiet = !moving;
      note.motionTracked = true;
      const gain = note.envelope.gain;
      const current = gain.value;
      if (gain.cancelAndHoldAtTime) {
        gain.cancelAndHoldAtTime(now);
      } else {
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(current, now);
      }
      if (moving) {
        gain.linearRampToValueAtTime(Math.max(0.0001, note.peak * movement), now + 0.2);
        gain.exponentialRampToValueAtTime(0.0001, now + note.profile.decay);
        gain.linearRampToValueAtTime(0, now + note.profile.decay + 0.04);
        note.stopAt = now + note.profile.stop;
      } else {
        gain.linearRampToValueAtTime(0, now + 0.6);
        note.stopAt = now + 0.7;
      }
      note.partials.forEach(({ oscillator }) => oscillator.stop(note.stopAt));
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const pause = () => {
      silence();
      setLastNote(null);
    };
    const handleVisibility = () => {
      if (document.hidden) pause();
    };
    window.addEventListener('blur', pause);
    window.addEventListener('pagehide', pause);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      mountedRef.current = false;
      window.removeEventListener('blur', pause);
      window.removeEventListener('pagehide', pause);
      document.removeEventListener('visibilitychange', handleVisibility);
      silence();
      const context = audioRef.current;
      audioRef.current = null;
      if (context && context.state !== 'closed') context.close().catch(() => {});
    };
  }, [silence]);

  const prepareAudio = useCallback(() => {
    if (!mountedRef.current || !gatesOpenRef.current || document.hidden) return;
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) {
      setAudioError('This browser cannot play the strings. The curtain still follows your touch.');
      return;
    }
    try {
      if (!audioRef.current || audioRef.current.state === 'closed') audioRef.current = new Audio();
      const context = audioRef.current;
      if (context.state === 'running') {
        audioEnabledRef.current = true;
        setAudioError('');
        return;
      }
      if (audioStartingRef.current) return;
      const request = { generation: audioGenerationRef.current, context };
      audioStartingRef.current = request;
      const isCurrent = () => mountedRef.current
        && request.generation === audioGenerationRef.current
        && audioRef.current === context
        && gatesOpenRef.current
        && !document.hidden;
      Promise.resolve(context.resume()).then(() => {
        if (!isCurrent()) return;
        audioEnabledRef.current = context.state === 'running';
        setAudioError(audioEnabledRef.current ? '' : 'Sound is paused by your browser. Touch a string to try again.');
      }).catch(() => {
        if (isCurrent()) setAudioError('Sound could not start. Touch a string to try again; the curtain still works.');
      }).finally(() => {
        if (audioStartingRef.current === request) audioStartingRef.current = null;
      });
    } catch {
      audioStartingRef.current = null;
      setAudioError('Sound could not start in this browser. The curtain still follows your touch.');
    }
  }, []);

  const pluckString = useCallback(function pluck(note, strength = 0.7, delaySeconds = 0, voice = instrumentRef.current) {
    const context = audioRef.current;
    if (!mountedRef.current || !gatesOpenRef.current || !audioEnabledRef.current
      || context?.state !== 'running' || document.hidden || !Number.isFinite(note?.frequency)
      || note.frequency <= 0) return;
    const generation = audioGenerationRef.current;
    const profile = STRING_VOICES[voice];
    const intensity = Number.isFinite(strength) ? Math.min(1, Math.max(0.45, strength)) : 0.7;
    const delay = Number.isFinite(delaySeconds) ? Math.min(0.45, Math.max(0, delaySeconds)) : 0;
    setLastNote(note);

    if (notesRef.current.size >= MAX_PLUCKS) {
      const oldest = [...notesRef.current].find(active => !active.retiring) ?? notesRef.current.values().next().value;
      oldest.pending = { note, strength: intensity, delaySeconds: delay, generation, voice };
      if (!oldest.retiring) {
        oldest.retiring = true;
        const now = context.currentTime;
        const elapsed = now - oldest.start;
        const { attack, hold, sustain, decay } = oldest.profile;
        const releaseStart = attack + hold;
        const held = oldest.motionTracked ? oldest.envelope.gain.value : elapsed <= 0 ? 0 : elapsed < attack
          ? oldest.peak * elapsed / attack
          : elapsed < releaseStart
            ? oldest.peak * (1 - (1 - sustain) * (elapsed - attack) / hold)
            : elapsed < decay
              ? oldest.peak * sustain * (0.0001 / (oldest.peak * sustain)) ** ((elapsed - releaseStart) / (decay - releaseStart))
              : 0.0001 * Math.max(0, (decay + 0.04 - elapsed) / 0.04);
        const gain = oldest.envelope.gain;
        if (gain.cancelAndHoldAtTime) {
          gain.cancelAndHoldAtTime(now);
        } else {
          gain.cancelScheduledValues(now);
          gain.setValueAtTime(held, now);
        }
        gain.linearRampToValueAtTime(0, now + 0.012);
        oldest.partials.forEach(({ oscillator }) => oscillator.stop(now + 0.015));
      }
      return;
    }

    let active;
    try {
      const start = context.currentTime + delay;
      const peak = 0.14 * intensity;
      const envelope = context.createGain();
      active = { start, stopAt: start + profile.stop, peak, envelope, profile, partials: [], pending: null, retiring: false, disposed: false };
      active.dispose = () => {
        if (active.disposed) return;
        active.disposed = true;
        active.partials.forEach(({ oscillator, gain }) => {
          oscillator.onended = null;
          oscillator.disconnect();
          gain.disconnect();
        });
        envelope.disconnect();
        notesRef.current.delete(active);
      };
      notesRef.current.add(active);
      envelope.gain.setValueAtTime(0, context.currentTime);
      envelope.gain.setValueAtTime(0, start);
      envelope.gain.linearRampToValueAtTime(peak, start + profile.attack);
      if (profile.hold) {
        envelope.gain.linearRampToValueAtTime(peak * profile.sustain, start + profile.attack + profile.hold);
      }
      envelope.gain.exponentialRampToValueAtTime(0.0001, start + profile.decay);
      envelope.gain.linearRampToValueAtTime(0, start + profile.decay + 0.04);
      envelope.connect(context.destination);
      let remaining = profile.partials.length;
      profile.partials.forEach((amplitude, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        active.partials.push({ oscillator, gain });
        oscillator.type = 'sine';
        oscillator.frequency.value = note.frequency * (index + 1);
        oscillator.detune.value = profile.detune[index];
        gain.gain.setValueAtTime(amplitude, start);
        gain.gain.setValueAtTime(amplitude, start + profile.attack + profile.hold);
        gain.gain.exponentialRampToValueAtTime(amplitude * profile.partialEnd, start + profile.decay - index * profile.partialDecay);
        oscillator.connect(gain);
        gain.connect(envelope);
        oscillator.onended = () => {
          if (--remaining !== 0 || active.disposed) return;
          const pending = active.pending;
          active.dispose();
          // Reuse a voice only after its release, keeping all four-partial notes bounded.
          if (pending && pending.generation === audioGenerationRef.current) {
            pluck(pending.note, pending.strength, pending.delaySeconds, pending.voice);
          }
        };
        oscillator.start(start);
        oscillator.stop(start + profile.stop);
      });
    } catch {
      active?.partials.forEach(({ oscillator }) => {
        try {
          oscillator.stop();
        } catch {
          // Node creation can fail before an oscillator has started.
        }
      });
      active?.dispose();
      setAudioError('This browser could not play that string. The curtain is still interactive.');
    }
  }, []);

  const toggleGates = () => {
    const open = !gatesOpenRef.current;
    gatesOpenRef.current = open;
    setGatesOpen(open);
    setLastNote(null);
    if (open) prepareAudio();
    else silence();
  };

  return (
    <Box
      className="pune-page"
      position="relative"
      left="50%"
      transform="translateX(-50%)"
      w={{ base: '100%', lg: 'min(1160px, calc(100vw - 64px))' }}
    >
      <header className="pune-page__heading">
        <p className="pune-page__eyebrow">A CITY IN SMALL MOMENTS</p>
        <h2>music<span>.</span></h2>
        <p lang="mr">पेटीचे सूर आणि तंबोऱ्याचा नाद मला मनापासून आवडतात. म्हणून हा छोटासा सुरांचा खेळ!</p>
      </header>

      <div className="pune-page__scene">
        <div className="pune-page__landmark">
          <span className="pune-page__scene-number" aria-hidden="true">01 / SHANIWAR WADA</span>
          <div className="pune-page__curtain-toolbar">
            <p>Pause a moment. Listen to Pune.</p>
          </div>
          <ShaniwarWada open={gatesOpen} onToggle={toggleGates}>
            <PuneChimes
              open={gatesOpen}
              onInteract={prepareAudio}
              onPluck={pluckString}
              onMotion={followCurtain}
            />
          </ShaniwarWada>
          <p id="pune-courtyard-caption" className="pune-page__scene-caption">
            {gatesOpen ? 'पु + णे = पुणे. A curtain of strings inside the Delhi Darwaja. Move through it, slowly.' : 'A small piece of Pune, waiting to be heard.'}
          </p>
        </div>

      </div>
      <div className="pune-page__chime-controls">
        <div className="pune-page__voice-buttons" role="group" aria-label="Curtain tone voice">
          {Object.entries(STRING_VOICES).map(([value, { label }]) => (
            <button
              type="button"
              key={value}
              aria-pressed={instrument === value}
              onClick={() => {
                instrumentRef.current = value;
                setInstrument(value);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <p id="pune-chime-instructions">Brush through the strings or sweep gently with your finger. Focus a letter: ← / → change notes, ↑ / ↓ change octave, and Enter repeats.</p>
        <p className="pune-page__sound-note">
          The sound lingers with the sway, then settles into quiet. Higher near the top, lower near the bottom.
        </p>
        <p className="pune-page__bell-status" role="status" aria-atomic="true">
          {audioError || (lastNote ? `${lastNote.name} · ${lastNote.label} · ${lastNote.octaveLabel}` : 'Only your touch sets the strings singing; each note fades into quiet.')}
        </p>
      </div>

      <footer className="pune-page__credits">
        <div>
          <h3>Credits</h3>
          <p>Made with a little AP Physics and some JavaScript.</p>
          <p>Physics reference: <a href="https://github.com/liabru/matter-js" target="_blank" rel="noopener noreferrer">Matter.js by Liam Brummitt and contributors</a> (MIT).</p>
          <p>Curtain physics: Verlet particles with loose distance constraints, following the shared letter-curtain example.</p>
          <p>Hanging-string reference: <a href="https://codepen.io/shubniggurath/pen/ZYpjorm" target="_blank" rel="noopener noreferrer">Liam Egan's CodePen</a>. No external CodePen scripts are loaded.</p>
          <p>
            Interaction inspiration: <a href="https://marinabudarina.github.io/chimes/" target="_blank" rel="noopener noreferrer">Chimes by Marina Budarina</a>
            {' '}/ <a href="https://github.com/marinabudarina/chimes" target="_blank" rel="noopener noreferrer">her source repository</a>.
            {' '}Her work is all rights reserved. No code, artwork, or assets from her project were reused.
          </p>
          <p><a href="/THIRD-PARTY-NOTICES.txt" target="_blank" rel="noopener noreferrer">Open-source license notices</a></p>
          <p>Sound: original, interaction-triggered harmonium- and tanpura-style tones synthesized with the Web Audio API. No recordings or background music.</p>
        </div>
        <p>
          A stylized illustration, not an architectural reconstruction.{' '}
          <a href="https://pune.gov.in/en/tourist-place/shaniwarwada/" target="_blank" rel="noopener noreferrer">About Shaniwar Wada</a>.
          {' '}The chimes are a playful addition with synthesized tones, not a historical installation or field recording.
        </p>
      </footer>
    </Box>
  );
}
