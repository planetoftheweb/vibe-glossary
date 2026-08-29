import { useEffect, useState } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function Frame({ title, children }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-zinc-50/80 dark:bg-zinc-950/40">
      <div className="shrink-0 border-b border-zinc-200/80 px-4 pb-3 pt-4 dark:border-zinc-800/80 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Pattern preview
        </p>
        <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">{title}</p>
      </div>
      <div className="flex flex-1 items-center justify-center overflow-hidden p-6 sm:p-10">
        {children}
      </div>
    </div>
  );
}

function ParticlePreview({ reduced }) {
  const dots = Array.from({ length: reduced ? 18 : 36 }, (_, i) => i);
  return (
    <div className="relative h-48 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 dark:border-zinc-700">
      {dots.map((i) => (
        <span
          key={i}
          className={`absolute h-1.5 w-1.5 rounded-full bg-indigo-400/80 ${reduced ? '' : 'vg-bob'}`}
          style={{
            left: `${8 + ((i * 37) % 84)}%`,
            top: `${12 + ((i * 53) % 76)}%`,
            '--bob': `${(i % 6) * 0.2}s`,
            '--bob-d': `${4 + (i % 3)}s`,
          }}
        />
      ))}
      <p className="absolute inset-x-0 bottom-4 text-center text-sm font-semibold text-zinc-100">
        Wallpaper. The page still reads.
      </p>
    </div>
  );
}

function EasingPreview({ reduced }) {
  return (
    <div className="w-full max-w-sm space-y-4">
      {['ease-out', 'ease-in', 'linear'].map((name) => (
        <div key={name}>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500">{name}</p>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className={`h-full w-1/3 rounded-full bg-indigo-600 ${reduced ? '' : 'vg-bob'}`}
              style={{ '--bob-d': name === 'linear' ? '2s' : '2.6s' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function StaggerPreview({ reduced }) {
  return (
    <ul className="w-full max-w-xs space-y-2">
      {['Inbox', 'Drafts', 'Sent'].map((label, i) => (
        <li
          key={label}
          className={`rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 ${reduced ? '' : 'vg-reveal is-in'}`}
          style={reduced ? undefined : { animationDelay: `${i * 50}ms`, transitionDelay: `${i * 50}ms` }}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

function HoverPreview({ reduced }) {
  return (
    <button
      type="button"
      className={`rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm ${reduced ? 'hover:bg-indigo-500' : 'transition duration-150 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5'}`}
    >
      Save draft
    </button>
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
          <span key={label} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
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
          <span key={`${label}-${i}`} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {label}
          </span>
        ))}
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
  else if (demoId === 'stagger' || demoId === 'scrollreveal') body = <StaggerPreview reduced={reduced} />;
  else if (demoId === 'hovermicro') body = <HoverPreview reduced={reduced} />;
  else if (demoId === 'countup') body = <CountPreview reduced={reduced} />;
  else if (demoId === 'marquee') body = <MarqueePreview reduced={reduced} />;
  else if (demoId === 'reducedmotion') {
    body = (
      <p className="max-w-sm text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        Keep the information. Drop the spectacle. This preview stays still when the OS asks for reduced motion.
      </p>
    );
  } else if (demoId === 'spring') {
    body = (
      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-500 text-lg font-black text-white ${reduced ? '' : 'transition-transform duration-500 ease-out hover:scale-110'}`}>
        OK
      </div>
    );
  } else if (demoId === 'confetti') {
    body = (
      <p className="max-w-sm text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        A one-shot burst on a real win. Then it is gone. Pair it with a toast.
      </p>
    );
  } else if (demoId === 'parallax') {
    body = (
      <div className="relative h-40 w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="absolute inset-x-6 top-8 h-16 rounded-xl bg-zinc-300/80 dark:bg-zinc-700/80" />
        <div className="absolute inset-x-10 top-16 rounded-xl border border-zinc-200 bg-white p-4 text-sm font-semibold text-zinc-800 shadow-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100">
          Foreground stays readable
        </div>
      </div>
    );
  } else if (demoId === 'pagetransition' || demoId === 'sharedmorph') {
    body = (
      <div className="flex items-center gap-3">
        <div className="h-20 w-20 rounded-xl bg-indigo-600" />
        <span className="text-zinc-400">to</span>
        <div className="h-28 w-40 rounded-2xl bg-indigo-600/80" />
      </div>
    );
  } else {
    body = (
      <p className="max-w-sm text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        Definition and prompt are ready. Motion stays optional.
      </p>
    );
  }

  return <Frame title={title}>{body}</Frame>;
}
