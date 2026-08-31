import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { Eye, EyeOff, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { GLOSSARY_DATA } from '../../data/glossary';
import StudioShell from '../ui/StudioShell';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function subscribeReducedMotion(onStoreChange) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  try {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => onStoreChange();
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', handler);
    else if (typeof mq.addListener === 'function') mq.addListener(handler);
    return () => {
      if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', handler);
      else if (typeof mq.removeListener === 'function') mq.removeListener(handler);
    };
  } catch {
    return () => {};
  }
}

/** Live OS preference. Replay must not close over a stale first-paint value. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
}

function ChipButton({ onClick, pressed, children, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      aria-label={label}
      className="group inline-flex min-h-[44px] items-center justify-center bg-transparent px-1"
    >
      <span className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
        pressed
          ? 'border-indigo-600 bg-indigo-600 text-white'
          : 'border-zinc-200 bg-white text-zinc-700 group-hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
      }`}
      >
        {children}
      </span>
    </button>
  );
}

function kick(setGo) {
  setGo(false);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => setGo(true));
  });
}

// Glanceable motion constants. Tess #34/#35: travel and pieces must be
// measurable in px, not a 2-4px fade stub. DESIGN.md: readable at a glance.
export const STAGGER_TRAVEL_PX = 80;
export const STAGGER_DURATION_MS = 900;
export const STAGGER_STEP_MS = 200;

/**
 * Tess #34: snap to translateX(start), let that frame paint, then play to 0.
 * Replay must do this or the start never commits (2-5px cancel, empty getAnimations).
 */
export function commitStartThenPlay(setPhase, flushRoot) {
  let cancelled = false;
  flushSync(() => setPhase('start'));
  if (flushRoot) void flushRoot.offsetWidth;
  requestAnimationFrame(() => {
    if (cancelled) return;
    if (flushRoot) void flushRoot.offsetWidth;
    requestAnimationFrame(() => {
      if (cancelled) return;
      setPhase('end');
    });
  });
  return () => {
    cancelled = true;
  };
}

export const CONFETTI_COUNT = 28;
export const CONFETTI_SIZE_PX = 22;
export const CONFETTI_SPREAD_PX = 200;
export const CONFETTI_FLY_MS = 2000;
export const CONFETTI_FADE_DELAY_MS = 1600;
export const CONFETTI_FADE_MS = 700;

const EASING_TRAVELERS = [
  {
    id: 'ease-out', label: 'Ease-out', role: 'Arrive', timing: 'ease-out',
    headline: 'Fast first. Soft at the finish.',
    explanation: 'The equal-time footprints bunch up near the end. Use ease-out when something arrives and needs to settle.',
    path: 'M 12 104 C 42 28 112 20 178 18',
  },
  {
    id: 'ease-in', label: 'Ease-in', role: 'Leave', timing: 'ease-in',
    headline: 'Quiet start. Fast departure.',
    explanation: 'The footprints spread farther apart near the end. Use ease-in when something leaves the screen.',
    path: 'M 12 104 C 74 102 142 88 178 18',
  },
  {
    id: 'linear', label: 'Linear', role: 'Repeat', timing: 'linear',
    headline: 'Every step is identical.',
    explanation: 'Even spacing feels mechanical on interface objects. Save linear for progress, rotation, or an endless marquee.',
    path: 'M 12 104 L 178 18',
  },
];

function easingProgress(id, progress) {
  if (id === 'ease-out') return 1 - ((1 - progress) ** 3);
  if (id === 'ease-in') return progress ** 3;
  return progress;
}

function EasingPreview({ reduced }) {
  const [easing, setEasing] = useState('ease-out');
  const [slow, setSlow] = useState(false);
  const [run, setRun] = useState(1);
  const ms = reduced ? 0 : (slow ? 1200 : 300);
  const selected = EASING_TRAVELERS.find((option) => option.id === easing) || EASING_TRAVELERS[0];
  const trail = [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1].map((progress) => ({
    progress,
    position: easingProgress(easing, progress),
  }));

  function replay() {
    setRun((value) => value + 1);
  }

  function chooseEasing(id) {
    setEasing(id);
    setRun((value) => value + 1);
  }

  return (
    <div
      className="easing-lab"
      data-easing-lab=""
      data-selected-easing={easing}
      data-duration={String(ms)}
      data-run={String(run)}
      data-reduced={String(reduced)}
      style={{ '--easing-lab-duration': `${ms}ms`, '--easing-lab-curve': selected.timing }}
    >
      <div className="easing-lab__controls">
        <div className="easing-lab__curve-picker" role="group" aria-label="Easing curve">
          <span>Choose the feel</span>
          <div>
            {EASING_TRAVELERS.map((option) => (
              <button
                key={option.id}
                type="button"
                data-easing={option.id}
                data-timing={option.timing}
                data-duration-ms={String(ms)}
                aria-pressed={easing === option.id}
                aria-label={`${option.label}: ${option.role}`}
                onClick={() => chooseEasing(option.id)}
                style={{ transitionTimingFunction: option.timing }}
              >
                <strong>{option.label}</strong>
                <small>{option.role}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="easing-lab__transport">
          <button
            type="button"
            onClick={() => {
              setSlow((value) => !value);
              setRun((value) => value + 1);
            }}
            aria-pressed={slow}
            aria-label="Toggle slow motion"
            disabled={reduced}
          >
            <span className="easing-lab__speed-mark" aria-hidden="true">½×</span>
            {slow ? 'Slow study on' : 'Slow study'}
          </button>
          <button type="button" onClick={replay} aria-label="Replay easing compare">
            <RotateCcw size={17} aria-hidden="true" />
            Replay
          </button>
        </div>
      </div>

      <div className="easing-lab__stage">
        <div className="easing-lab__grid" aria-hidden="true" />
        <div className="easing-lab__wash" aria-hidden="true" />
        <div className="easing-lab__ghost" aria-hidden="true">{selected.role.toUpperCase()}</div>

        <div className="easing-lab__curve-panel">
          <div>
            <span>Speed over time</span>
            <strong>{selected.label}</strong>
          </div>
          <svg viewBox="0 0 190 116" role="img" aria-label={`${selected.label} speed curve`}>
            <path className="easing-lab__curve-axis" d="M 12 12 V 104 H 180" />
            <path key={easing} className="easing-lab__curve-line" d={selected.path} />
            <circle cx="12" cy="104" r="4" />
            <circle cx="178" cy="18" r="4" />
          </svg>
          <div className="easing-lab__curve-labels"><span>Start</span><span>Finish</span></div>
        </div>

        <div className="easing-lab__travel" aria-label="Equal-time movement samples">
          <div className="easing-lab__travel-label">
            <span>Equal-time footprints</span>
            <strong>Same distance · {ms}ms</strong>
          </div>
          <div className="easing-lab__rail">
            <span className="easing-lab__start-line" aria-hidden="true">Start</span>
            <span className="easing-lab__finish-line" aria-hidden="true">Finish</span>
            {trail.map((step, index) => (
              <i
                key={step.progress}
                data-easing-trail=""
                data-progress={String(step.progress)}
                style={{ left: `${7 + (step.position * 86)}%`, '--trail-index': index }}
              />
            ))}

            <article className="easing-lab__product-card" key={`${easing}-${slow}-${run}`}>
              <div>
                <span><Sparkles size={19} aria-hidden="true" /></span>
                <small>VIBE DEPLOY</small>
              </div>
              <p>YOUR IDEA IS LIVE</p>
              <h3>That thing in your head<br />is on the screen.</h3>
              <footer><span>v0.12.0</span><strong>View project</strong></footer>
            </article>
          </div>
        </div>

        <div className="easing-lab__timeline" aria-hidden="true">
          <span>0ms</span>
          <div><i key={`${easing}-${slow}-${run}-playhead`} /></div>
          <span>{ms}ms</span>
        </div>

        <div className="easing-lab__readout" aria-live="polite">
          <span>{selected.role}</span>
          <div>
            <strong>{reduced ? 'The final state appears without travel.' : selected.headline}</strong>
            <p>{reduced ? 'Reduced motion keeps the result and removes the speed demonstration.' : selected.explanation}</p>
          </div>
        </div>
      </div>

      <p className="easing-lab__memory">
        Ease-out gets there fast then settles. Ease-in creeps then rushes. Linear almost never feels right.
      </p>
    </div>
  );
}

export const PARTICLE_FIELD_COUNT = 96;

const PARTICLE_FORMATIONS = [
  { id: 'nebula', label: 'Nebula' },
  { id: 'current', label: 'Current' },
  { id: 'v-mark', label: 'V mark' },
];

const PARTICLE_DENSITIES = [
  { id: 'quiet', label: 'Quiet', count: 36 },
  { id: 'balanced', label: 'Balanced', count: 64 },
  { id: 'immersive', label: 'Immersive', count: PARTICLE_FIELD_COUNT },
];

function particlePosition(index, formation) {
  const jitterX = ((index * 29) % 17) - 8;
  const jitterY = ((index * 43) % 15) - 7;

  if (formation === 'current') {
    const lane = index % 3;
    const step = Math.floor(index / 3);
    const progress = step / 31;
    return {
      x: 70 + (progress * 860) + (jitterX * 0.6),
      y: 135 + (lane * 108) + (Math.sin((progress * Math.PI * 4) + (lane * 1.35)) * 38) + jitterY,
    };
  }

  if (formation === 'v-mark') {
    const isLeft = index < PARTICLE_FIELD_COUNT / 2;
    const progress = (index % (PARTICLE_FIELD_COUNT / 2)) / ((PARTICLE_FIELD_COUNT / 2) - 1);
    return {
      x: isLeft ? 145 + (progress * 355) + jitterX : 500 + (progress * 355) + jitterX,
      y: isLeft ? 90 + (progress * 330) + jitterY : 420 - (progress * 330) + jitterY,
    };
  }

  const angle = index * 2.3999632297;
  const radius = Math.sqrt((index + 1) / PARTICLE_FIELD_COUNT) * 250;
  return {
    x: 500 + (Math.cos(angle) * radius * 1.48),
    y: 252 + (Math.sin(angle) * radius * 0.72),
  };
}

function ParticleTrace({ formation }) {
  if (formation === 'current') {
    return (
      <g className="particle-field__traces">
        {[0, 1, 2].map((lane) => (
          <path
            key={lane}
            className="particle-field__trace"
            d={`M 55 ${142 + (lane * 108)} C 250 ${62 + (lane * 108)}, 350 ${222 + (lane * 108)}, 520 ${142 + (lane * 108)} S 790 ${222 + (lane * 108)}, 945 ${142 + (lane * 108)}`}
          />
        ))}
      </g>
    );
  }

  if (formation === 'v-mark') {
    return (
      <g className="particle-field__traces">
        <path className="particle-field__trace particle-field__trace--mark" d="M 145 90 L 500 420 L 855 90" />
      </g>
    );
  }

  return (
    <g className="particle-field__traces particle-field__traces--orbit">
      <ellipse className="particle-field__trace" cx="500" cy="252" rx="355" ry="168" />
      <ellipse className="particle-field__trace" cx="500" cy="252" rx="275" ry="118" />
      <ellipse className="particle-field__trace" cx="500" cy="252" rx="185" ry="72" />
    </g>
  );
}

function ParticlePreview({ reduced }) {
  const [visible, setVisible] = useState(true);
  const [moving, setMoving] = useState(() => !reduced);
  const [formation, setFormation] = useState('nebula');
  const [density, setDensity] = useState('balanced');
  const activeDensity = PARTICLE_DENSITIES.find((option) => option.id === density) || PARTICLE_DENSITIES[1];
  const activeFormation = PARTICLE_FORMATIONS.find((option) => option.id === formation) || PARTICLE_FORMATIONS[0];
  const dots = Array.from({ length: PARTICLE_FIELD_COUNT }, (_, index) => ({
    index,
    ...particlePosition(index, formation),
  }));

  useEffect(() => {
    if (reduced) setMoving(false);
  }, [reduced]);

  function moveField(event) {
    if (reduced || !moving) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) - 0.5;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) - 0.5;
    event.currentTarget.style.setProperty('--particle-pointer-x', `${pointerX * 18}px`);
    event.currentTarget.style.setProperty('--particle-pointer-y', `${pointerY * 14}px`);
  }

  function centerField(event) {
    event.currentTarget.style.setProperty('--particle-pointer-x', '0px');
    event.currentTarget.style.setProperty('--particle-pointer-y', '0px');
  }

  return (
    <div
      className={`particle-field-lab ${visible ? 'is-visible' : 'is-hidden'} ${moving && !reduced ? 'is-moving' : 'is-paused'}`}
      data-particle-lab=""
      data-formation={formation}
      data-density={density}
      data-field-visible={String(visible)}
      data-motion={moving && !reduced ? 'moving' : 'paused'}
    >
      <div className="particle-field__controls">
        <div className="particle-field__control-group" role="group" aria-label="Particle formation">
          <span>Formation</span>
          <div>
            {PARTICLE_FORMATIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={formation === option.id}
                onClick={() => setFormation(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="particle-field__control-group" role="group" aria-label="Particle density">
          <span>Density</span>
          <div>
            {PARTICLE_DENSITIES.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={density === option.id}
                onClick={() => setDensity(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="particle-field__transport" aria-label="Particle field playback">
          <button
            type="button"
            onClick={() => setMoving((value) => !value)}
            disabled={reduced}
            aria-pressed={moving && !reduced}
            aria-label={reduced ? 'Motion reduced by system preference' : moving ? 'Pause particle motion' : 'Play particle motion'}
          >
            {moving && !reduced ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
            <span>{reduced ? 'Reduced' : moving ? 'Pause' : 'Play'}</span>
          </button>
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-pressed={visible}
            aria-label={visible ? 'Hide particles' : 'Show particles'}
          >
            {visible ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
            <span>{visible ? 'Hide field' : 'Show field'}</span>
          </button>
        </div>
      </div>

      <div
        className="particle-field__viewport"
        onPointerMove={moveField}
        onPointerLeave={centerField}
      >
        <div className="particle-field__wash" aria-hidden="true" />
        <div className="particle-field__ghost" aria-hidden="true">ATMOSPHERE</div>

        <svg
          className="particle-field__field"
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <ParticleTrace formation={formation} />
          <g>
            {dots.map((dot) => (
              <circle
                key={dot.index}
                data-particle-dot=""
                data-particle-active={String(dot.index < activeDensity.count)}
                data-particle-layer={String(dot.index % 3)}
                cx={dot.x}
                cy={dot.y}
                r={dot.index % 11 === 0 ? 4.8 : dot.index % 4 === 0 ? 3.2 : 2.2}
                style={{
                  '--particle-delay': `${(dot.index % 16) * -0.24}s`,
                  '--particle-shift-x': `${((dot.index * 17) % 25) - 12}px`,
                  '--particle-shift-y': `${((dot.index * 31) % 21) - 10}px`,
                }}
              />
            ))}
          </g>
        </svg>

        <div className="particle-field__copy">
          <span className="particle-field__kicker">Content layer · always on</span>
          <h3>The page still reads</h3>
          <p>
            Particles can create mood and depth behind this message. They never carry the message, the action, or anything someone needs to understand.
          </p>
        </div>

        <div className="particle-field__readout" aria-live="polite">
          <span aria-hidden="true" />
          <div>
            <strong>{visible ? `${activeDensity.count} points · ${activeFormation.label}` : 'Decoration off · content intact'}</strong>
            <p>{visible ? (moving && !reduced ? 'Move across the field to change the depth.' : 'The shape is paused, not removed.') : 'The headline and explanation did not disappear.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParallaxPreview({ reduced }) {
  const scroller = useRef(null);
  const [scroll, setScroll] = useState(0);
  const layers = [
    { speed: 0.2, label: '0.2 far', cls: 'bg-zinc-300/90 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100' },
    { speed: 0.6, label: '0.6 mid', cls: 'bg-indigo-200/90 text-indigo-950 dark:bg-indigo-800 dark:text-indigo-50' },
    { speed: 1.0, label: '1.0 near', cls: 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100' },
  ];
  return (
    <div className="w-full max-w-lg space-y-3">
      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        Scroll the mini page. Far layers lag. Near layers keep up.
      </p>
      <div
        ref={scroller}
        data-parallax-scroller=""
        onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
        className="relative h-56 overflow-y-auto rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
      >
        <div className="relative h-[420px] px-4 pt-6">
          {layers.map((l, i) => (
            <div
              key={l.speed}
              data-parallax-speed={String(l.speed)}
              className={`absolute left-4 right-4 rounded-xl px-4 py-3 text-sm font-semibold ${l.cls}`}
              style={{
                top: 20 + i * 56,
                transform: reduced ? 'none' : `translateY(${scroll * (1 - l.speed)}px)`,
              }}
            >
              Speed {l.label}
            </div>
          ))}
          <p className="absolute bottom-6 left-4 right-4 text-base text-zinc-500 dark:text-zinc-400">
            Keep scrolling. The stack pulls apart.
          </p>
        </div>
      </div>
    </div>
  );
}

function StaggerPreview({ reduced: reducedProp }) {
  const items = [
    { label: 'Inbox', delay: 0, bar: 'bg-indigo-600', well: 'bg-white dark:bg-zinc-900' },
    { label: 'Drafts', delay: STAGGER_STEP_MS, bar: 'bg-indigo-500', well: 'bg-indigo-50 dark:bg-indigo-950/60' },
    { label: 'Sent', delay: STAGGER_STEP_MS * 2, bar: 'bg-sky-500', well: 'bg-sky-50 dark:bg-sky-950/40' },
  ];
  const [mode, setMode] = useState('stagger');
  const [phase, setPhase] = useState('start');
  const wellRef = useRef(null);
  const cancelRef = useRef(null);
  // Re-read matchMedia here. A first-paint `reduced` prop is not enough:
  // DevTools / OS can flip prefers-reduced-motion after mount (#44).
  const reduced = usePrefersReducedMotion() || reducedProp;

  const replay = useCallback(() => {
    if (cancelRef.current) cancelRef.current();
    // Honor the live OS preference on Replay, not a stale render-time flag.
    if (prefersReducedMotion() || reduced) {
      setPhase('end');
      return;
    }
    cancelRef.current = commitStartThenPlay(setPhase, wellRef.current);
  }, [reduced]);

  useEffect(() => {
    replay();
    return () => {
      if (cancelRef.current) cancelRef.current();
    };
  }, [replay, mode]);

  const fromX = `${STAGGER_TRAVEL_PX}px`;
  const toX = '0px';
  const atStart = phase === 'start' && !reduced;

  return (
    <div className="min-w-0 w-full max-w-lg space-y-4">
      <div className="flex flex-wrap items-center gap-1">
        <ChipButton onClick={() => setMode('together')} pressed={mode === 'together'} label="Play all at once">
          All at once
        </ChipButton>
        <ChipButton onClick={() => setMode('stagger')} pressed={mode === 'stagger'} label="Play 200 millisecond stagger">
          200ms stagger
        </ChipButton>
        <button type="button" onClick={replay} aria-label="Replay stagger" className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-500">Replay</button>
      </div>
      <p
        data-stagger-teach=""
        className="whitespace-normal break-words text-base leading-relaxed text-zinc-600 dark:text-zinc-300"
      >
        {reduced
          ? 'Reduced motion: Inbox, Drafts, and Sent are already in place. Travel is off.'
          : mode === 'together'
            ? `All at once: Inbox, Drafts, and Sent slide ${STAGGER_TRAVEL_PX}px together. No waiting.`
            : `200ms stagger: Inbox slides ${STAGGER_TRAVEL_PX}px first. Drafts waits 200ms. Sent waits 400ms. Watch Inbox, then Drafts, then Sent.`}
      </p>
      <ul
        ref={wellRef}
        data-stagger-mode={mode}
        data-stagger-well=""
        data-stagger-phase={atStart ? 'start' : 'end'}
        className="space-y-3"
      >
        {items.map((row) => {
          const shownDelay = mode === 'stagger' && !reduced ? row.delay : 0;
          const playDelay = atStart ? 0 : shownDelay;
          const x = atStart ? fromX : toX;
          return (
            <li
              key={row.label}
              data-stagger-row={row.label}
              data-stagger-delay={`${shownDelay}ms`}
              className={`rounded-xl border border-zinc-200 ${row.well} text-base font-semibold text-zinc-900 shadow-sm dark:border-zinc-700 dark:text-zinc-50`}
            >
              <div
                data-stagger-mover=""
                data-stagger-travel={String(STAGGER_TRAVEL_PX)}
                data-stagger-from={`translateX(${fromX})`}
                data-stagger-to={`translateX(${toX})`}
                data-stagger-phase={atStart ? 'start' : 'end'}
                className="flex items-center justify-between"
                style={{
                  width: `calc(100% - ${STAGGER_TRAVEL_PX}px)`,
                  opacity: 1,
                  transform: `translateX(${x})`,
                  transitionProperty: (atStart || reduced) ? 'none' : 'transform',
                  transitionDuration: reduced ? '0ms' : `${STAGGER_DURATION_MS}ms`,
                  transitionTimingFunction: 'ease-out',
                  transitionDelay: `${playDelay}ms`,
                }}
              >
                <span className="inline-flex min-h-[52px] items-center gap-3 px-4">
                  <span className={`h-8 w-1.5 rounded-full ${row.bar}`} aria-hidden />
                  {row.label}
                </span>
                <span className="mr-3 rounded-full bg-zinc-900 px-2.5 py-1 text-sm font-bold tabular-nums text-white dark:bg-white dark:text-zinc-900">{shownDelay}ms</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ScrollRevealPreview({ reduced }) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState({});
  const [nonce, setNonce] = useState(0);
  const cards = ['Nav bar', 'Hero', 'Pricing', 'Footer'];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setVisible(Object.fromEntries(cards.map((c) => [c, true])));
      return undefined;
    }
    setVisible({});
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-reveal-card');
          if (id) setVisible((v) => ({ ...v, [id]: true }));
        }
      });
    }, { root, threshold: 0.45 });
    root.querySelectorAll('[data-reveal-card]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [nonce, reduced]);

  function reset() {
    if (rootRef.current) rootRef.current.scrollTop = 0;
    setVisible({});
    setNonce((n) => n + 1);
  }

  return (
    <div className="w-full max-w-lg space-y-3">
      <ChipButton onClick={reset} label="Reset scroll reveal">Reset</ChipButton>
      <div
        ref={rootRef}
        data-scroll-reveal=""
        className="h-56 overflow-y-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
      >
        <p className="sticky top-0 z-10 border-b border-dashed border-indigo-400 bg-indigo-50/95 px-4 py-2 text-sm font-semibold text-indigo-900 dark:bg-indigo-950/95 dark:text-indigo-100">
          Cards rise as they cross this line
        </p>
        <div className="space-y-3 p-4">
          <div className="h-16" aria-hidden />
          {cards.map((c) => {
            const on = !!visible[c];
            return (
              <article
                key={`${c}-${nonce}`}
                data-reveal-card={c}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? 'translateY(0)' : 'translateY(16px)',
                  transition: reduced ? 'none' : 'opacity 400ms ease-out, transform 400ms ease-out',
                }}
              >
                {c}
              </article>
            );
          })}
          <div className="h-20" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function ToastCard({ instant, show, panel }) {
  return (
    <div
      data-motion-panel={panel}
      data-instant={instant ? 'true' : 'false'}
      className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : (instant ? 'translateY(0)' : 'translateY(12px)'),
        transition: instant ? 'none' : 'opacity 200ms ease-out, transform 200ms ease-out',
      }}
    >
      Draft saved
    </div>
  );
}

function ReducedMotionPreview({ reduced }) {
  const [show, setShow] = useState(false);
  const replay = useCallback(() => kick(setShow), []);
  useEffect(() => { replay(); }, [replay]);

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="flex flex-wrap items-center gap-1">
        <ChipButton onClick={replay} label="Replay reduced motion compare">Replay</ChipButton>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-2 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Motion on</p>
          <ToastCard panel="motion" instant={reduced} show={show} />
        </div>
        <div className="space-y-2 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Reduced</p>
          <ToastCard panel="reduced" instant show={show} />
        </div>
      </div>
      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        {reduced
          ? 'Your OS asked for reduced motion, so both toasts appear at once. The information stays. The travel is gone.'
          : 'Same toast. Motion on slides in. Reduced is instant. Do not just shorten the same loop.'}
      </p>
    </div>
  );
}

function PageTransitionPreview({ reduced }) {
  const [screen, setScreen] = useState('list');
  const [slow, setSlow] = useState(false);
  const [phase, setPhase] = useState('in');
  const ms = reduced ? 0 : (slow ? 900 : 200);

  function goTo(next) {
    if (reduced) {
      setScreen(next);
      setPhase('in');
      return;
    }
    setPhase('out');
    window.setTimeout(() => {
      setScreen(next);
      setPhase('in');
    }, ms);
  }

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex flex-wrap items-center gap-1">
        <ChipButton
          onClick={() => goTo(screen === 'list' ? 'detail' : 'list')}
          label={screen === 'list' ? 'Navigate to detail' : 'Back to list'}
        >
          {screen === 'list' ? 'Navigate' : 'Back'}
        </ChipButton>
        <ChipButton onClick={() => { setSlow(false); setScreen('list'); setPhase('in'); }} label="Replay page transition">
          Replay
        </ChipButton>
        <ChipButton onClick={() => setSlow((v) => !v)} pressed={slow} label="Toggle 900 millisecond contrast">
          {slow ? '900ms too slow' : '200ms'}
        </ChipButton>
      </div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <div
          data-page-screen={screen}
          data-page-ms={String(ms)}
          className="p-4"
          style={{
            opacity: phase === 'in' ? 1 : 0,
            transform: phase === 'in' ? 'translateX(0)' : 'translateX(12px)',
            transition: `opacity ${ms}ms ease-out, transform ${ms}ms ease-out`,
          }}
        >
          {screen === 'list' ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Inbox</p>
              {['Welcome note', 'Design review', 'Ship checklist'].map((row) => (
                <button
                  key={row}
                  type="button"
                  onClick={() => goTo('detail')}
                  className="flex min-h-[44px] w-full items-center rounded-xl border border-zinc-200 px-3 text-left text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
                >
                  {row}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Welcome note</p>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                A short fade. {slow ? '900ms traps clicks. That is too slow.' : '200ms is enough to feel the scene change.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SpringPreview({ reduced }) {
  const [go, setGo] = useState(false);
  const replay = useCallback(() => kick(setGo), []);
  useEffect(() => { replay(); }, [replay]);
  const ms = reduced ? 0 : 500;

  return (
    <div className="w-full max-w-lg space-y-4">
      <ChipButton onClick={replay} label="Replay spring compare">Replay</ChipButton>
      <div className="relative h-40 rounded-2xl border border-zinc-200 bg-white px-6 dark:border-zinc-700 dark:bg-zinc-900">
        <div
          data-target-line=""
          className="absolute left-4 right-4 top-10 border-t-2 border-dashed border-zinc-400 dark:border-zinc-500"
        />
        <p className="absolute left-6 top-2 text-sm font-semibold text-zinc-500">Target</p>
        <div className="absolute inset-x-6 bottom-4 flex items-end justify-around">
          {[
            { id: 'ease-out', label: 'Ease-out', timing: 'ease-out' },
            { id: 'spring', label: 'Spring', timing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
          ].map((t) => (
            <div key={t.id} className="flex w-24 flex-col items-center gap-2">
              <div
                data-spring={t.id}
                data-timing={t.timing}
                className="h-10 w-10 rounded-xl bg-indigo-600"
                style={{
                  transform: go ? 'translateY(0)' : 'translateY(72px)',
                  transitionProperty: 'transform',
                  transitionDuration: `${ms}ms`,
                  transitionTimingFunction: t.timing,
                }}
              />
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{t.label}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        Both aim at the dashed line. Ease-out lands. Spring overshoots, then settles.
      </p>
    </div>
  );
}

function HoverPreview({ reduced }) {
  return (
    <button
      type="button"
      className={`min-h-[44px] rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm ${reduced ? 'hover:bg-indigo-500' : 'transition duration-150 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5'}`}
    >
      Save draft
    </button>
  );
}

function ConfettiPreview({ reduced }) {
  const [burst, setBurst] = useState(false);
  const [toast, setToast] = useState(false);
  const [fly, setFly] = useState(false);
  const colors = ['bg-indigo-400', 'bg-amber-300', 'bg-emerald-300', 'bg-rose-400', 'bg-sky-300', 'bg-white'];
  const bits = Array.from({ length: CONFETTI_COUNT }, (_, i) => i);

  useEffect(() => {
    if (!burst || reduced) {
      setFly(false);
      return undefined;
    }
    setFly(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFly(true));
    });
    return () => cancelAnimationFrame(id);
  }, [burst, reduced]);

  function complete() {
    if (burst) return;
    setBurst(true);
    setToast(true);
  }

  function replay() {
    setBurst(false);
    setToast(false);
    setFly(false);
  }

  return (
    <div className="relative w-full max-w-lg space-y-3">
      <div className="flex flex-wrap items-center gap-1">
        <button type="button" onClick={complete} aria-label="Complete order" className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-500">Complete order</button>
        <button type="button" onClick={replay} aria-label="Replay confetti" className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">Replay</button>
      </div>
      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        Tap Complete order for a bright burst. Replay to arm it again.
      </p>
      <div
        className="relative flex min-h-[24rem] items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 px-5 py-10 dark:border-zinc-700"
        data-confetti-stage=""
        data-confetti-spread={String(CONFETTI_SPREAD_PX)}
        data-confetti-count={String(CONFETTI_COUNT)}
      >
        {burst && !reduced && bits.map((i) => {
          const angle = (i / CONFETTI_COUNT) * Math.PI * 2;
          const dist = CONFETTI_SPREAD_PX + (i % 5) * 16;
          const size = i % 3 === 0 ? CONFETTI_SIZE_PX + 6 : CONFETTI_SIZE_PX;
          const tall = i % 2 === 0 ? size : Math.round(size * 0.55);
          return (
            <span
              key={i}
              data-confetti-bit=""
              data-confetti-color={colors[i % colors.length]}
              data-confetti-size={String(size)}
              data-confetti-duration={String(CONFETTI_FLY_MS + CONFETTI_FADE_MS)}
              aria-hidden
              className={`pointer-events-none absolute left-1/2 top-1/2 ${i % 2 === 0 ? 'rounded-full' : 'rounded-sm'} ${colors[i % colors.length]}`}
              style={{
                width: `${size}px`,
                height: `${tall}px`,
                transform: fly
                  ? `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 36}px) rotate(${i * 28}deg)`
                  : 'translate(-50%, -50%)',
                opacity: fly ? 0 : 1,
                transition: `transform ${CONFETTI_FLY_MS}ms ease-out, opacity ${CONFETTI_FADE_MS}ms linear ${CONFETTI_FADE_DELAY_MS}ms`,
              }}
            />
          );
        })}
        <p className="relative z-10 text-center text-base font-semibold text-white">
          Fires once on a real win. Then it is gone.
        </p>
        {toast && (
          <p data-confetti-toast="" className="relative z-10 mt-4 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white">
            Order complete
          </p>
        )}
      </div>
    </div>
  );
}

function CountPreview({ reduced }) {
  const [n, setN] = useState(reduced ? 128 : 0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (reduced) {
      setN(128);
      return undefined;
    }
    setN(0);
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      setN(Math.min(128, Math.round(128 * (1 - Math.pow(1 - frame / 18, 3)))));
      if (frame >= 18) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [reduced, run]);
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-black tabular-nums text-zinc-900 dark:text-white" aria-label={`${n} learners`}>
        {n}
      </p>
      <button type="button" className="min-h-[44px] rounded-xl bg-indigo-600 px-5 text-base font-semibold text-white hover:bg-indigo-500" onClick={() => setRun((value) => value + 1)}>
        Replay count
      </button>
    </div>
  );
}

function MarqueePreview({ reduced }) {
  const row = ['Modal', 'Drawer', 'Toast', 'Tabs', 'Hero', 'Table'];
  const [paused, setPaused] = useState(false);
  if (reduced) {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {row.map((label) => (
          <span key={label} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {label}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 overflow-hidden">
      <button type="button" className="min-h-[44px] rounded-xl border border-zinc-200 bg-white px-5 text-base font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" onClick={() => setPaused((value) => !value)}>
        {paused ? 'Play row' : 'Pause row'}
      </button>
      <div className="w-full overflow-hidden">
        <div className="vg-marquee-track gap-3" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
          {[...row, ...row].map((label, i) => (
            <span key={`${label}-${i}`} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SharedMorphPreview({ reduced }) {
  const [open, setOpen] = useState(false);
  const ms = reduced ? 0 : 220;
  return (
    <div className="w-full max-w-sm space-y-3">
      <ChipButton onClick={() => setOpen((v) => !v)} label={open ? 'Back to list' : 'Open shared card'}>
        {open ? 'Back' : 'Open card'}
      </ChipButton>
      <div className="relative h-48 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <div
          data-shared-morph={open ? 'detail' : 'list'}
          className="rounded-xl bg-indigo-600 p-4 text-white shadow-sm"
          style={{
            width: open ? '100%' : '9rem',
            height: open ? '10rem' : '5.5rem',
            transition: `width ${ms}ms ease-out, height ${ms}ms ease-out`,
          }}
        >
          <p className="text-sm font-semibold">Card 12</p>
          {open && (
            <p className="mt-2 text-base leading-relaxed text-indigo-50">
              Same object. It grew in place. Under 300ms.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const MOTION_GUIDANCE = {
  particlefield: ['Choose V mark, switch to Immersive, then hide the field.', 'Watch the particles reshape without moving the headline. When the field disappears, the message still works. Atmosphere supports the page, it does not carry the meaning.'],
  easing: ['Choose Slow-mo, then press Replay.', 'Switch between Ease-out, Ease-in, and Linear. The footprints mark equal moments, so their spacing reveals where the object speeds up and slows down. Watch how each one starts and stops differently.'],
  parallax: ['Scroll the mini page slowly.', 'The far layer moves less than the near layer. That speed difference creates depth.'],
  stagger: ['Switch between All at once and 200ms stagger, then press Replay.', 'Watch whether your eye sees one pile or a clear first, second, and third item.'],
  scrollreveal: ['Scroll until each card crosses the guide line, then press Reset.', 'Each card appears when it enters the useful part of the viewport, not merely because time passed.'],
  reducedmotion: ['Press Replay and compare Motion on with Reduced.', 'The same information appears in both. Reduced motion removes travel without removing the result.'],
  pagetransition: ['Press Navigate, then compare 200ms with 900ms.', 'A short transition explains the page change. A long one makes the interface feel blocked.'],
  spring: ['Press Replay and watch both squares meet the target.', 'Ease-out stops at the line. Spring passes it briefly, then settles.'],
  hovermicro: ['Hover the button, then reach it with the Tab key.', 'The small lift should confirm that the button is interactive without moving surrounding content.'],
  confetti: ['Press Complete order once, then press Replay.', 'Celebration follows a real success and does not keep firing while nothing changes.'],
  countup: ['Press Replay count and follow the number to 128.', 'The count starts fast and slows near the final value so the result is easy to read.'],
  sharedmorph: ['Press Open card, then Back.', 'The same object changes size and position, which helps the eye understand where it went.'],
  marquee: ['Pause the row, then play it again.', 'The moving content remains readable and controllable instead of becoming decoration people cannot stop.'],
};

export default function MotionPatternDemo({ demoId }) {
  const reduced = prefersReducedMotion();
  const data = GLOSSARY_DATA[demoId];
  const title = data?.title || demoId;
  const guidance = MOTION_GUIDANCE[demoId] || ['Use the control in the live example.', 'Repeat the action and watch what changes.'];

  let body;
  if (demoId === 'particlefield') body = <ParticlePreview reduced={reduced} />;
  else if (demoId === 'easing') body = <EasingPreview reduced={reduced} />;
  else if (demoId === 'stagger') body = <StaggerPreview reduced={reduced} />;
  else if (demoId === 'scrollreveal') body = <ScrollRevealPreview reduced={reduced} />;
  else if (demoId === 'hovermicro') body = <HoverPreview reduced={reduced} />;
  else if (demoId === 'countup') body = <CountPreview reduced={reduced} />;
  else if (demoId === 'marquee') body = <MarqueePreview reduced={reduced} />;
  else if (demoId === 'reducedmotion') body = <ReducedMotionPreview reduced={reduced} />;
  else if (demoId === 'spring') body = <SpringPreview reduced={reduced} />;
  else if (demoId === 'confetti') body = <ConfettiPreview reduced={reduced} />;
  else if (demoId === 'parallax') body = <ParallaxPreview reduced={reduced} />;
  else if (demoId === 'pagetransition') body = <PageTransitionPreview reduced={reduced} />;
  else if (demoId === 'sharedmorph') body = <SharedMorphPreview reduced={reduced} />;
  else {
    body = (
      <p className="max-w-sm text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        Definition and prompt are ready. Motion stays optional.
      </p>
    );
  }

  return (
    <div className="pattern-studio-scroll dark">
      <StudioShell
        tone="motion"
        eyebrow={`Motion · ${title} studio`}
        title={`${title}: see the movement explain itself.`}
        stageLabel={`Live ${title}`}
        stageMeta="Use the controls inside the example"
        stage={demoId === 'particlefield' || demoId === 'easing'
          ? body
          : <div className="flex min-h-[420px] w-full items-center justify-center p-5 sm:p-8">{body}</div>}
        stageClassName="motion-pattern-studio__scene"
        noteLabel="Try this"
        noteTitle={guidance[0]}
        noteBody={guidance[1]}
        className="pattern-studio motion-pattern-studio"
      />
    </div>
  );
}

export { EASING_TRAVELERS };
