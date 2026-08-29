import { useCallback, useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function Frame({ title, children, fill = false }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-zinc-50/80 dark:bg-zinc-950/40">
      <div className="shrink-0 border-b border-zinc-200/80 px-4 pb-3 pt-4 dark:border-zinc-800/80 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Pattern preview
        </p>
        <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">{title}</p>
      </div>
      <div className={`flex min-h-0 flex-1 overflow-auto p-4 sm:p-6 ${fill ? 'items-stretch' : 'items-center justify-center'}`}>
        {children}
      </div>
    </div>
  );
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

const EASING_TRAVELERS = [
  { id: 'ease-out', label: 'Ease-out', timing: 'ease-out' },
  { id: 'ease-in', label: 'Ease-in', timing: 'ease-in' },
  { id: 'linear', label: 'Linear', timing: 'linear' },
];

function EasingPreview({ reduced }) {
  const [go, setGo] = useState(false);
  const [slow, setSlow] = useState(false);
  const ms = reduced ? 0 : (slow ? 1200 : 300);

  const replay = useCallback(() => kick(setGo), []);
  useEffect(() => { replay(); }, [replay, slow, reduced]);

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="flex flex-wrap items-center gap-1">
        <ChipButton onClick={replay} label="Replay easing compare">Replay</ChipButton>
        <ChipButton onClick={() => setSlow((v) => !v)} pressed={slow} label="Toggle slow motion">
          {slow ? 'Slow-mo on' : 'Slow-mo'}
        </ChipButton>
      </div>
      <div className="space-y-3">
        {EASING_TRAVELERS.map((t) => (
          <div key={t.id}>
            <p className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-100">{t.label}</p>
            <div className="relative h-10 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
              <span
                data-easing={t.id}
                data-timing={t.timing}
                data-duration-ms={String(ms)}
                className="absolute top-1 h-8 w-8 rounded-full bg-indigo-600 shadow-sm"
                style={{
                  left: go ? 'calc(100% - 2.25rem)' : '0.25rem',
                  transitionProperty: 'left',
                  transitionDuration: `${ms}ms`,
                  transitionTimingFunction: t.timing,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        Same distance, same {slow ? '1200ms' : '300ms'}. Ease-out gets there fast then settles. Ease-in creeps then rushes. Linear almost never feels right.
      </p>
    </div>
  );
}

function ParticlePreview({ reduced }) {
  const [on, setOn] = useState(true);
  const dots = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div className="w-full max-w-lg space-y-3">
      <ChipButton onClick={() => setOn((v) => !v)} pressed={on} label={on ? 'Hide particles' : 'Show particles'}>
        {on ? 'Particles on' : 'Particles off'}
      </ChipButton>
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 px-6 py-8 dark:border-zinc-700">
        {on && dots.map((i) => (
          <span
            key={i}
            aria-hidden
            data-particle-dot=""
            className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-indigo-400/70 ${reduced ? '' : 'animate-pulse'}`}
            style={{
              left: `${8 + ((i * 37) % 84)}%`,
              top: `${10 + ((i * 53) % 78)}%`,
              animationDelay: reduced ? undefined : `${(i % 7) * 0.15}s`,
            }}
          />
        ))}
        <div className="relative z-10 space-y-2">
          <h3 className="text-xl font-extrabold tracking-tight text-white">The page still reads</h3>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-200">
            Headline and body sit on top of the field. Toggle the dots off. The words do not depend on them.
          </p>
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
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
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
          <p className="absolute bottom-6 left-4 right-4 text-sm text-zinc-500 dark:text-zinc-400">
            Keep scrolling. The stack pulls apart.
          </p>
        </div>
      </div>
    </div>
  );
}

function StaggerPreview({ reduced }) {
  const items = [
    { label: 'Inbox', delay: 0, bar: 'bg-indigo-600', well: 'bg-white dark:bg-zinc-900' },
    { label: 'Drafts', delay: 50, bar: 'bg-indigo-500', well: 'bg-indigo-50 dark:bg-indigo-950/60' },
    { label: 'Sent', delay: 100, bar: 'bg-sky-500', well: 'bg-sky-50 dark:bg-sky-950/40' },
  ];
  const [mode, setMode] = useState('stagger');
  const [go, setGo] = useState(false);
  const replay = useCallback(() => kick(setGo), []);
  useEffect(() => { replay(); }, [replay, mode]);

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="flex flex-wrap items-center gap-1">
        <ChipButton onClick={() => setMode('together')} pressed={mode === 'together'} label="Play all at once">
          All at once
        </ChipButton>
        <ChipButton onClick={() => setMode('stagger')} pressed={mode === 'stagger'} label="Play 50 millisecond stagger">
          50ms stagger
        </ChipButton>
        <button type="button" onClick={replay} aria-label="Replay stagger" className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-500">Replay</button>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {mode === 'together' ? 'All at once: Inbox, Drafts, and Sent rise together. No waiting.' : '50ms stagger: Inbox moves first. Drafts waits 50ms. Sent waits 100ms.'}
      </p>
      <ul data-stagger-mode={mode} className="space-y-3">
        {items.map((row) => {
          const delay = mode === 'stagger' && !reduced ? row.delay : 0;
          return (
            <li key={row.label} data-stagger-row={row.label} data-stagger-delay={`${delay}ms`} className={`flex items-center justify-between overflow-hidden rounded-xl border border-zinc-200 ${row.well} text-base font-semibold text-zinc-900 shadow-sm dark:border-zinc-700 dark:text-zinc-50`} style={{ opacity: go ? 1 : 0, transform: go ? 'translateX(0)' : 'translateX(-36px)', transitionProperty: 'opacity, transform', transitionDuration: reduced ? '0ms' : '520ms', transitionTimingFunction: 'ease-out', transitionDelay: `${delay}ms` }}>
              <span className="inline-flex min-h-[52px] items-center gap-3 px-4">
                <span className={`h-8 w-1.5 rounded-full ${row.bar}`} aria-hidden />
                {row.label}
              </span>
              <span className="mr-3 rounded-full bg-zinc-900 px-2.5 py-1 text-sm font-bold tabular-nums text-white dark:bg-white dark:text-zinc-900">{delay}ms</span>
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
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
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
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
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
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
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
  const colors = ['bg-indigo-500', 'bg-amber-400', 'bg-emerald-400', 'bg-rose-500', 'bg-sky-400', 'bg-violet-500'];
  const bits = Array.from({ length: 36 }, (_, i) => i);

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
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        Tap Complete order for a bright burst. Replay to arm it again.
      </p>
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 px-5 py-12 dark:border-zinc-700" data-confetti-stage="">
        {burst && !reduced && bits.map((i) => {
          const angle = (i / 36) * Math.PI * 2;
          const dist = 88 + (i % 5) * 14;
          const wide = i % 3 === 1;
          return (
            <span
              key={i}
              data-confetti-bit=""
              data-confetti-color={colors[i % colors.length]}
              aria-hidden
              className={`pointer-events-none absolute left-1/2 top-1/2 ${wide ? 'h-3 w-5' : 'h-3.5 w-3.5'} ${i % 2 === 0 ? 'rounded-full' : 'rounded-sm'} ${colors[i % colors.length]}`}
              style={{
                transform: fly ? `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 28}px) rotate(${i * 24}deg)` : 'translate(-50%, -50%)',
                opacity: fly ? 0 : 1,
                transition: 'transform 900ms ease-out, opacity 900ms ease-out',
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
  useEffect(() => {
    if (reduced) return undefined;
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      setN(Math.min(128, Math.round(128 * (1 - Math.pow(1 - frame / 18, 3)))));
      if (frame >= 18) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [reduced]);
  return (
    <p className="text-5xl font-black tabular-nums text-zinc-900 dark:text-white" aria-label="128 learners">
      {n}
    </p>
  );
}

function MarqueePreview({ reduced }) {
  const row = ['Modal', 'Drawer', 'Toast', 'Tabs', 'Hero', 'Table'];
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
    <div className="w-full max-w-md overflow-hidden">
      <div className="vg-marquee-track gap-3">
        {[...row, ...row].map((label, i) => (
          <span key={`${label}-${i}`} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {label}
          </span>
        ))}
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
            <p className="mt-2 text-sm leading-relaxed text-indigo-50">
              Same object. It grew in place. Under 300ms.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const COPY = {
  particlefield: 'Particle Field',
  easing: 'Easing',
  parallax: 'Parallax',
  stagger: 'Stagger',
  scrollreveal: 'Scroll Reveal',
  reducedmotion: 'Reduced Motion',
  pagetransition: 'Page Transition',
  spring: 'Spring / Bounce',
  hovermicro: 'Hover Micro-interaction',
  confetti: 'Confetti / Celebration',
  countup: 'Count-up / Ticker',
  sharedmorph: 'Shared-element Morph',
  marquee: 'Marquee',
};

export default function MotionPatternDemo({ demoId }) {
  const reduced = prefersReducedMotion();
  const title = COPY[demoId] || demoId;

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

  const fill = demoId === 'parallax' || demoId === 'scrollreveal';
  return <Frame title={title} fill={fill}>{body}</Frame>;
}

export { EASING_TRAVELERS };
