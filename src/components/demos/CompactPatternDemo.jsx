import { useMemo } from 'react';
import {
  Loader2, Bell, Play, Share2, MapPin, QrCode, GripVertical, Clock, CalendarRange,
  PanelTop, MessageSquare, Activity, Filter, ToggleLeft, Megaphone,
  Sparkles, Link2, ChevronDown,
} from 'lucide-react';
import { useGlossary } from '../../hooks/useGlossary';

/**
 * Shared live preview for glossary batch-2 patterns. Uses `demoId` (glossary key) to pick a mock UI.
 * `activeOptions` toggles opt1/opt2/opt3 from the prompt builder where relevant.
 */
export default function CompactPatternDemo({ demoId, activeOptions = new Set() }) {
  const glossary = useGlossary();
  const data = glossary[demoId];
  const title = data?.title ?? demoId;

  const o = useMemo(
    () => (id) => activeOptions.has(id),
    [activeOptions]
  );

  const body = RENDER[demoId] ? RENDER[demoId](o) : RENDER.__generic(o, demoId);

  return (
    <div className="flex flex-col h-full w-full min-h-0 bg-zinc-50/80 dark:bg-zinc-950/40">
      <div className="shrink-0 px-4 pt-4 pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Pattern preview
        </p>
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">{title}</p>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 min-h-0 overflow-auto">
        <div className="w-full max-w-lg">{body}</div>
      </div>
    </div>
  );
}

const cx = {
  card: 'rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/90 shadow-sm',
  muted: 'text-zinc-500 dark:text-zinc-400 text-xs',
  pill: 'rounded-full px-2 py-0.5 text-[10px] font-semibold border border-zinc-200 dark:border-zinc-600',
  bar: 'rounded bg-zinc-200 dark:bg-zinc-700',
};

/** @type {Record<string, (o: (id: string) => boolean) => React.ReactNode>} */
const RENDER = {
  __generic(o, id) {
    return (
      <div className={`${cx.card} p-6 text-center`}>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{id}</p>
        <p className={`${cx.muted} mt-2`}>Interactive demo coming soon — definition & prompts are ready.</p>
      </div>
    );
  },

  spinner(o) {
    const motionClass = o('opt3') ? '' : 'animate-spin';
    return (
      <div className={`${cx.card} p-10 flex flex-col items-center gap-4`} aria-busy="true">
        <Loader2 className={`w-10 h-10 text-indigo-500 ${motionClass}`} />
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          {o('opt1') ? 'Saving…' : 'Loading…'}
        </p>
        {o('opt2') && (
          <span className={`${cx.pill} text-[10px] border-indigo-300 text-indigo-600 dark:text-indigo-300`}>
            aria-live
          </span>
        )}
      </div>
    );
  },

  linechart(o) {
    return (
      <div className={`${cx.card} p-4 relative`}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Revenue</span>
          {o('opt2') && (
            <span className="absolute top-10 left-1/3 z-10 rounded-md border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-2 py-1 text-[10px] shadow-md text-zinc-800 dark:text-zinc-100">
              Apr 12: $42k
            </span>
          )}
        </div>
        <svg viewBox="0 0 240 80" className="w-full h-24 text-indigo-500">
          {o('opt1') && (
            <g className="text-zinc-200 dark:text-zinc-700">
              {[0, 20, 40, 60, 80].map((y) => (
                <line key={y} x1="0" x2="240" y1={y} y2={y} stroke="currentColor" strokeWidth="0.5" />
              ))}
              <text x="2" y="12" className="text-[8px] fill-zinc-400">
                $50k
              </text>
              <text x="200" y="78" className="text-[8px] fill-zinc-400">
                Apr
              </text>
            </g>
          )}
          <defs>
            <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 60 L40 45 L80 50 L120 25 L160 35 L200 15 L240 20 V80 H0 Z" fill="url(#lg)" />
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            points="0,60 40,45 80,50 120,25 160,35 200,15 240,20"
          />
          {o('opt3') && (
            <polyline
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="4 3"
              points="0,70 40,65 80,55 120,50 160,45 200,40 240,35"
            />
          )}
        </svg>
        {o('opt3') && (
          <div className="mt-1 flex items-center gap-3 text-[10px] text-zinc-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-0.5 w-4 bg-indigo-500" /> Revenue
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-0.5 w-4 border-t-2 border-dashed border-violet-500" /> Costs
            </span>
          </div>
        )}
      </div>
    );
  },

  piechart(o) {
    const hole = o('opt1') ? 'inset-6' : 'inset-2';
    return (
      <div className={`${cx.card} p-6 flex flex-col sm:flex-row items-center justify-center gap-6`}>
        <div
          className="relative w-28 h-28 rounded-full"
          style={{
            background: o('opt3')
              ? 'conic-gradient(#6366f1 0% 55%, #94a3b8 55% 100%)'
              : 'conic-gradient(#6366f1 0% 40%, #a855f7 40% 70%, #22c55e 70% 100%)',
          }}
        >
          <div
            className={`absolute ${hole} rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-700 dark:text-zinc-200`}
          >
            {o('opt1') ? '42%' : 'Σ'}
          </div>
        </div>
        <div className="text-left space-y-1 max-w-[12rem]">
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Traffic</p>
          {o('opt2') && (
            <ul className="text-[10px] text-zinc-500 space-y-0.5">
              <li>Direct — 40%</li>
              <li>Search — 35%</li>
              <li>Social — 25%</li>
            </ul>
          )}
          {o('opt3') && <p className={cx.muted}>+ small slices → “Other”</p>}
        </div>
      </div>
    );
  },

  sparkline(o) {
    return (
      <div className="relative flex items-end gap-2">
        <span
          className={`text-lg font-bold tabular-nums ${o('opt1') ? 'text-emerald-500' : 'text-zinc-700 dark:text-zinc-200'}`}
        >
          +2.4%
        </span>
        <div className="relative">
          <svg viewBox="0 0 80 28" className="w-24 h-8 text-emerald-500">
            {o('opt2') && <line x1="0" x2="80" y1="22" y2="22" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.75" />}
            <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points="0,20 15,18 30,12 45,14 60,6 80,4" />
          </svg>
          {o('opt3') && (
            <span className="absolute -top-1 left-6 rounded border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-1 text-[8px] shadow-sm">
              high 6.2k
            </span>
          )}
        </div>
      </div>
    );
  },

  multiselect(o) {
    return (
      <div className={`${cx.card} p-3 space-y-2`}>
        <div className="flex flex-wrap items-center gap-1.5">
          {['Design', 'Eng'].map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 text-xs font-medium">
              {t} ×
            </span>
          ))}
          {o('opt1') && (
            <span className={`${cx.pill} text-amber-800 border-amber-300 dark:text-amber-200`}>2 / 5 max</span>
          )}
          {o('opt2') && (
            <button type="button" className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
              Select all
            </button>
          )}
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-600 divide-y divide-zinc-100 dark:divide-zinc-800">
          {['QA', 'Docs'].map((x) => (
            <div key={x} className="flex items-center gap-2 px-2 py-1.5 text-xs">
              <input type="checkbox" className="rounded border-zinc-300" readOnly checked={x === 'QA'} />
              {x}
            </div>
          ))}
        </div>
        {o('opt3') && (
          <p className="text-[10px] text-zinc-500">↑↓ navigate · Space toggles · Esc closes</p>
        )}
      </div>
    );
  },

  daterange(o) {
    return (
      <div className={`${cx.card} p-4 flex items-center gap-3 flex-wrap`}>
        <CalendarRange className="w-5 h-5 text-indigo-500 shrink-0" />
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="rounded-md border border-zinc-200 dark:border-zinc-600 px-2 py-1">Apr 1</span>
          <span className="text-zinc-400">→</span>
          <span className="rounded-md border border-zinc-200 dark:border-zinc-600 px-2 py-1">Apr 18</span>
        </div>
        {o('opt1') && <span className={`${cx.pill} text-amber-700 border-amber-300`}>Presets</span>}
      </div>
    );
  },

  timepicker(o) {
    return (
      <div className={`${cx.card} p-4 flex items-center justify-center gap-4`}>
        <Clock className="w-6 h-6 text-indigo-500" />
        <div className="flex items-center gap-1 font-mono text-xl font-bold text-zinc-800 dark:text-zinc-100">
          <span className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-2 py-1">02</span>
          <span>:</span>
          <span className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-2 py-1">30</span>
          {o('opt1') && <span className="text-sm font-semibold text-zinc-500 ml-1">PM</span>}
        </div>
      </div>
    );
  },

  colorpicker(o) {
    return (
      <div className={`${cx.card} p-4 space-y-3`}>
        <div className="h-8 rounded-lg bg-gradient-to-r from-rose-400 via-amber-300 to-indigo-500" />
        {o('opt1') && (
          <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div className="h-2 w-3/5 rounded-full bg-zinc-500" />
          </div>
        )}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-2 border-white shadow ring-2 ring-zinc-200 dark:ring-zinc-600"
            style={{ background: '#6366f1' }}
          />
          <span className="text-xs font-mono text-zinc-600 dark:text-zinc-300">#6366F1</span>
          {o('opt3') && <span className="text-[10px] text-zinc-400">Eyedropper</span>}
        </div>
        {o('opt2') && (
          <div className="flex gap-1.5">
            {['#6366f1', '#22c55e', '#f59e0b'].map((c) => (
              <div key={c} className="h-6 w-6 rounded-md border border-zinc-200 dark:border-zinc-600" style={{ background: c }} />
            ))}
          </div>
        )}
      </div>
    );
  },

  combobox(o) {
    return (
      <div className={`${cx.card} p-0 overflow-hidden`}>
        <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-200 dark:border-zinc-700">
          <input
            className="flex-1 bg-transparent text-sm outline-none"
            placeholder="Search framework…"
            readOnly
            value={o('opt2') ? 'Rea' : 'React'}
          />
          {o('opt1') && <span className="text-[10px] text-zinc-400">Loading…</span>}
        </div>
        <div className="py-1 max-h-28 overflow-hidden">
          {['React', 'Vue', 'Svelte'].map((x) => (
            <div
              key={x}
              className={`px-3 py-1.5 text-xs cursor-default ${x === 'React' ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-200' : 'text-zinc-600 dark:text-zinc-400'}`}
            >
              {o('opt3') && x === 'React' ? (
                <>
                  <mark className="bg-amber-200/80 dark:bg-amber-500/30 px-0.5">Rea</mark>
                  ct
                </>
              ) : (
                x
              )}
            </div>
          ))}
          {o('opt2') && <div className="px-3 py-1.5 text-xs text-indigo-600 dark:text-indigo-400">+ Create &quot;Rea&quot;</div>}
        </div>
      </div>
    );
  },

  inputgroup(o) {
    return (
      <div className={`${cx.card} flex overflow-hidden`}>
        <span className="shrink-0 px-3 flex items-center bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-500 border-r border-zinc-200 dark:border-zinc-700">
          https://
        </span>
        <input className="flex-1 min-w-0 px-3 py-2 text-sm bg-transparent outline-none" readOnly value="vibe.app" />
        {o('opt1') && (
          <button type="button" className="shrink-0 px-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border-l border-zinc-200 dark:border-zinc-700">
            Copy
          </button>
        )}
      </div>
    );
  },

  textfield(o) {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Display name</label>
        <input
          className={`w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-600 ${o('opt1') ? 'ring-2 ring-indigo-500/30' : ''}`}
          readOnly
          value="Alex"
        />
        {o('opt2') && <p className={cx.muted}>Shown on your profile</p>}
      </div>
    );
  },

  passwordfield(o) {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Password</label>
        <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-600 overflow-hidden">
          <input
            type="password"
            className="flex-1 px-3 py-2 text-sm bg-transparent outline-none tracking-widest"
            readOnly
            value="••••••••"
          />
          {o('opt1') && (
            <button type="button" className="px-3 text-xs text-zinc-500 border-l border-zinc-200 dark:border-zinc-700">
              Show
            </button>
          )}
        </div>
      </div>
    );
  },

  searchfield(o) {
    return (
      <div className={`${cx.card} flex items-center gap-2 px-3 py-2`}>
        <span className="text-zinc-400 text-sm">⌕</span>
        <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Search…" readOnly />
        {o('opt1') && <kbd className="hidden sm:inline text-[10px] text-zinc-400 border border-zinc-300 dark:border-zinc-600 rounded px-1">⌘K</kbd>}
      </div>
    );
  },

  splitpane(o) {
    return (
      <div className={`${cx.card} flex h-40 overflow-hidden`}>
        <div className="w-[42%] min-w-0 border-r border-zinc-200 dark:border-zinc-700 p-3 text-xs text-zinc-600 dark:text-zinc-300">
          Files
          <div className="mt-2 space-y-1">
            <div className={cx.bar + ' h-2 w-3/4'} />
            <div className={cx.bar + ' h-2 w-1/2'} />
          </div>
        </div>
        <div className="relative w-3 shrink-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center cursor-col-resize">
          <GripVertical className="w-4 h-4 text-zinc-400" />
        </div>
        <div className="flex-1 min-w-0 p-3 text-xs text-zinc-600 dark:text-zinc-300">
          {o('opt1') ? 'Preview' : 'Editor'}
        </div>
      </div>
    );
  },

  menubar(o) {
    return (
      <div className={`${cx.card} p-0 overflow-hidden`}>
        <div className="flex items-center gap-1 px-2 py-1.5 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/80">
          {['File', 'Edit', 'View'].map((m) => (
            <button
              key={m}
              type="button"
              className={`px-2 py-1 rounded text-xs font-medium ${m === 'File' && o('opt1') ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-600 dark:text-zinc-400'}`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="p-4 text-xs text-zinc-500">Canvas</div>
      </div>
    );
  },

  megamenu(o) {
    return (
      <div className={`${cx.card} p-0 overflow-hidden`}>
        <div className="flex items-center gap-4 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
          <span className="text-sm font-bold">Product</span>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </div>
        {o('opt1') && (
          <div className="grid grid-cols-3 gap-3 p-4 text-xs">
            <div>
              <p className="font-semibold text-zinc-700 dark:text-zinc-200 mb-2">Build</p>
              <p className="text-zinc-500 py-0.5">Ship</p>
              <p className="text-zinc-500 py-0.5">Scale</p>
            </div>
            <div>
              <p className="font-semibold text-zinc-700 dark:text-zinc-200 mb-2">Learn</p>
              <p className="text-zinc-500 py-0.5">Docs</p>
            </div>
            <div>
              <p className="font-semibold text-zinc-700 dark:text-zinc-200 mb-2">Support</p>
            </div>
          </div>
        )}
      </div>
    );
  },

  bottomnav(o) {
    return (
      <div className={`${cx.card} relative pt-4 pb-12`}>
        <p className="text-center text-xs text-zinc-500 px-4">Main content</p>
        <div className="absolute bottom-0 inset-x-0 flex justify-around border-t border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 py-2">
          {['Home', 'Search', 'Alerts', 'Profile'].map((x, i) => (
            <button
              key={x}
              type="button"
              className={`flex flex-col items-center gap-0.5 text-[10px] ${i === 0 ? 'text-indigo-500' : 'text-zinc-400'}`}
            >
              <span className="w-5 h-5 rounded-full bg-current opacity-20" />
              {x}
            </button>
          ))}
        </div>
      </div>
    );
  },

  segmented(o) {
    return (
      <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5">
        {['List', 'Board', 'Calendar'].map((x, i) => (
          <button
            key={x}
            type="button"
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              (i === 1 && o('opt1')) || (i === 0 && !o('opt1'))
                ? 'bg-white dark:bg-zinc-900 shadow text-zinc-900 dark:text-white'
                : 'text-zinc-500'
            }`}
          >
            {x}
          </button>
        ))}
      </div>
    );
  },

  virtuallist(o) {
    return (
      <div className={`${cx.card} p-3`}>
        <div className="flex justify-between text-[10px] text-zinc-500 mb-2">
          <span>Virtual scroll</span>
          {o('opt1') && <span>10k rows</span>}
        </div>
        <div className="space-y-1 font-mono text-[10px] text-zinc-600 dark:text-zinc-400 max-h-24 overflow-hidden">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-zinc-400 w-6">{i + 1}</span>
              <span className={cx.bar + ' h-3 flex-1'} />
            </div>
          ))}
        </div>
      </div>
    );
  },

  chatthread(o) {
    return (
      <div className={`${cx.card} p-3 space-y-2 max-h-48`}>
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-md bg-indigo-600 text-white text-xs px-3 py-2 max-w-[85%]">
            Ship the glossary update?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-md bg-zinc-200 dark:bg-zinc-700 text-xs px-3 py-2 max-w-[85%] text-zinc-800 dark:text-zinc-100">
            {o('opt1') ? 'On it — ETA EOD.' : 'Yes, rolling out now.'}
          </div>
        </div>
      </div>
    );
  },

  notificationcenter(o) {
    return (
      <div className={`${cx.card} p-0 overflow-hidden`}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 dark:border-zinc-700">
          <span className="text-xs font-bold flex items-center gap-1">
            <Bell className="w-4 h-4" /> Inbox
          </span>
          {o('opt1') && <span className="text-[10px] text-indigo-500 font-semibold">Mark all read</span>}
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {['Deploy finished', 'Review assigned'].map((t) => (
            <div key={t} className="px-3 py-2 text-xs text-zinc-700 dark:text-zinc-200">
              {t}
            </div>
          ))}
        </div>
      </div>
    );
  },

  codeblock(o) {
    return (
      <pre className={`${cx.card} p-4 text-left overflow-x-auto text-[11px] leading-relaxed font-mono bg-zinc-950 text-emerald-400`}>
        <code>
          {`function greet() {\n  `}
          <span className="text-indigo-400">return</span>
          {` "ok";\n}`}
        </code>
        {o('opt1') && <div className="mt-2 text-zinc-500 text-[10px]">Copy · Line wrap</div>}
      </pre>
    );
  },

  mediaplayer(o) {
    return (
      <div className={`${cx.card} p-4 space-y-3`}>
        <div className="aspect-video rounded-lg bg-zinc-900 flex items-center justify-center">
          <Play className={`w-12 h-12 text-white ${o('opt1') ? 'fill-white' : ''}`} fill="currentColor" />
        </div>
        <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
          <div className="h-full w-1/3 bg-indigo-500 rounded-full" />
        </div>
      </div>
    );
  },

  mapview(o) {
    return (
      <div className={`${cx.card} relative h-44 overflow-hidden rounded-xl`}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#bfdbfe_0%,#e0e7ff_40%,#fef3c7_100%)] dark:opacity-40" />
        <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-[radial-gradient(circle_at_30%_40%,#64748b_1px,transparent_1px)] bg-[length:12px_12px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <MapPin className={`w-8 h-8 text-rose-500 drop-shadow ${o('opt1') ? 'animate-pulse' : ''}`} />
        </div>
      </div>
    );
  },

  shortcutkeys(o) {
    return (
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {['⌘', 'K'].map((k) => (
          <kbd
            key={k}
            className="min-w-[2rem] h-9 px-2 rounded-md border border-b-2 border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-sm font-mono font-bold text-zinc-800 dark:text-zinc-100 shadow-sm flex items-center justify-center"
          >
            {k}
          </kbd>
        ))}
        {o('opt1') && <span className={`${cx.muted} w-full text-center`}>Command palette</span>}
      </div>
    );
  },

  disclosure(o) {
    return (
      <div className={`${cx.card} divide-y divide-zinc-200 dark:divide-zinc-700`}>
        <button type="button" className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold">
          Billing
          <ChevronDown className={`w-4 h-4 transition-transform ${o('opt1') ? 'rotate-180' : ''}`} />
        </button>
        {o('opt1') && (
          <div className="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">Payment method on file…</div>
        )}
      </div>
    );
  },

  scrollarea(o) {
    return (
      <div className={`${cx.card} p-0`}>
        <div className="max-h-32 overflow-y-auto p-3 text-xs text-zinc-600 dark:text-zinc-300 space-y-2">
          {Array.from({ length: o('opt1') ? 12 : 6 }, (_, i) => (
            <p key={i}>Section {i + 1} — scroll the pane, not the page.</p>
          ))}
        </div>
      </div>
    );
  },

  stickyheader(o) {
    return (
      <div className={`${cx.card} p-0 overflow-hidden max-h-40`}>
        <div className="sticky top-0 z-10 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 text-xs font-bold border-b border-zinc-200 dark:border-zinc-700">
          Column A · B · C
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="px-3 py-2 flex gap-2">
              <span className="w-8 text-zinc-400">{i + 1}</span>
              <span className={cx.bar + ' h-3 flex-1'} />
            </div>
          ))}
        </div>
      </div>
    );
  },

  toolbar(o) {
    return (
      <div className={`${cx.card} flex items-center gap-1 p-2 flex-wrap`}>
        <PanelTop className="w-4 h-4 text-zinc-400" />
        {['Bold', 'Italic', 'Link'].map((x) => (
          <button key={x} type="button" className="px-2 py-1 rounded text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            {x}
          </button>
        ))}
        {o('opt1') && <span className="ml-auto text-[10px] text-zinc-400">Saved</span>}
      </div>
    );
  },

  cookieconsent(o) {
    return (
      <div className="space-y-3">
        <div className={`${cx.card} p-3 text-xs text-zinc-600 dark:text-zinc-300`}>Page content</div>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center shadow-lg">
          <p className="text-xs flex-1">We use cookies to improve your experience.</p>
          <div className="flex gap-2 shrink-0">
            <button type="button" className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-600">
              {o('opt1') ? 'Settings' : 'Reject'}
            </button>
            <button type="button" className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white">
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  },

  sharesheet(o) {
    return (
      <div className={`${cx.card} p-4 space-y-3`}>
        <p className="text-xs font-semibold text-center text-zinc-600 dark:text-zinc-300">Share</p>
        <div className="flex justify-center gap-4">
          {[
            { Icon: MessageSquare, label: 'Message' },
            { Icon: Link2, label: 'Copy' },
            { Icon: Share2, label: 'More' },
          ].map(({ Icon, label }) => (
            <button key={label} type="button" className="flex flex-col items-center gap-1 text-[10px] text-zinc-600 dark:text-zinc-400">
              <span className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              {label}
            </button>
          ))}
        </div>
        {o('opt1') && <p className={`${cx.muted} text-center`}>iOS-style sheet</p>}
      </div>
    );
  },

  presencedot(o) {
    return (
      <div className={`${cx.card} p-4 flex items-center gap-3`}>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500" />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 ${
              o('opt1') ? 'bg-amber-400' : 'bg-emerald-500'
            }`}
          />
        </div>
        <div>
          <p className="text-sm font-semibold">Jordan</p>
          <p className={cx.muted}>{o('opt1') ? 'Away' : 'Online'}</p>
        </div>
      </div>
    );
  },

  countdown(o) {
    return (
      <div className={`${cx.card} p-6 text-center`}>
        <p className={`text-4xl font-black tabular-nums text-zinc-900 dark:text-white ${o('opt1') ? 'text-rose-500' : ''}`}>
          00:04:12
        </p>
        <p className={`${cx.muted} mt-2`}>Offer ends soon</p>
      </div>
    );
  },

  relativetime(o) {
    return (
      <div className={`${cx.card} p-4 flex items-center justify-between`}>
        <span className="text-sm text-zinc-700 dark:text-zinc-200">Merged PR #240</span>
        <time className={`text-xs font-medium ${o('opt1') ? 'text-indigo-500' : 'text-zinc-500'}`} dateTime="PT2H">
          2h ago
        </time>
      </div>
    );
  },

  qrcode(o) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          className={`w-36 h-36 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 p-2 ${o('opt1') ? 'ring-2 ring-indigo-400' : ''}`}
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg,#000 0,#000 2px,transparent 2px,transparent 4px),repeating-linear-gradient(0deg,#000 0,#000 2px,transparent 2px,transparent 4px)',
            backgroundSize: '8px 8px',
            backgroundBlendMode: 'multiply',
            opacity: 0.85,
          }}
        />
        <QrCode className="w-6 h-6 text-zinc-400" />
      </div>
    );
  },

  fileuploadrow(o) {
    return (
      <div className={`${cx.card} p-3 flex items-center gap-3`}>
        <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 text-xs font-bold">
          PDF
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate">brief.pdf</p>
          <div className="mt-1 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div className={`h-full bg-indigo-500 rounded-full ${o('opt1') ? 'w-[92%]' : 'w-3/5'}`} />
          </div>
        </div>
      </div>
    );
  },

  linkcard(o) {
    return (
      <div className={`${cx.card} overflow-hidden max-w-md`}>
        <div className="h-24 bg-gradient-to-r from-sky-400 to-indigo-500" />
        <div className="p-3">
          <p className="text-xs font-bold text-zinc-900 dark:text-white">Blog — Patterns</p>
          <p className={`${cx.muted} mt-1 line-clamp-2`}>
            {o('opt1') ? 'Open Graph title + image + domain' : 'vibe.glossary · preview'}
          </p>
        </div>
      </div>
    );
  },

  formcolumns(o) {
    return (
      <div className={`${cx.card} p-4 grid grid-cols-1 sm:grid-cols-2 gap-4`}>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-500">First</label>
          <div className="h-9 rounded border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-500">Last</label>
          <div className="h-9 rounded border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50" />
        </div>
        {o('opt1') && (
          <div className="sm:col-span-2 space-y-1">
            <label className="text-[10px] font-bold text-zinc-500">Notes</label>
            <div className="h-16 rounded border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50" />
          </div>
        )}
      </div>
    );
  },

  keyvalue(o) {
    return (
      <dl className={`${cx.card} divide-y divide-zinc-100 dark:divide-zinc-800`}>
        {[
          ['Region', 'us-east-1'],
          ['Plan', 'Pro'],
          ['Status', 'Active'],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between px-4 py-2 text-xs">
            <dt className="text-zinc-500">{k}</dt>
            <dd className="font-mono text-zinc-800 dark:text-zinc-100">{o('opt1') && k === 'Plan' ? 'Team' : v}</dd>
          </div>
        ))}
      </dl>
    );
  },

  treegrid(o) {
    return (
      <div className={`${cx.card} p-2 font-mono text-[10px]`}>
        <div className="flex gap-2 text-zinc-500 border-b border-zinc-200 dark:border-zinc-700 pb-1 mb-1">
          <span className="w-4" />
          <span className="flex-1">Name</span>
          <span className="w-12">Size</span>
        </div>
        <div className="space-y-0.5">
          <div className="flex gap-2 items-center">
            <ChevronDown className="w-3 h-3" />
            <span>src</span>
          </div>
          <div className="flex gap-2 pl-4 items-center">
            <span className="w-3" />
            <span className="flex-1">App.jsx</span>
            <span className="text-zinc-400">12k</span>
          </div>
        </div>
      </div>
    );
  },

  kanban(o) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['Todo', 'Doing', 'Done'].map((col) => (
          <div key={col} className={`min-w-[7rem] rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 p-2`}>
            <p className="text-[10px] font-bold text-zinc-500 mb-2">{col}</p>
            <div className="rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 p-2 text-[10px] shadow-sm">
              {col === 'Doing' && o('opt1') ? 'In progress card' : 'Card'}
            </div>
          </div>
        ))}
      </div>
    );
  },

  activitystream(o) {
    return (
      <div className={`${cx.card} p-3 space-y-3`}>
        {[
          { t: 'Pushed commit', icon: Activity },
          { t: 'Commented on PR', icon: MessageSquare },
        ].map(({ t, icon: Icon }) => (
          <div key={t} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-zinc-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-800 dark:text-zinc-100">{t}</p>
              <p className={cx.muted}>{o('opt1') ? 'Just now' : '2m ago'}</p>
            </div>
          </div>
        ))}
      </div>
    );
  },

  filterpanel(o) {
    return (
      <div className={`${cx.card} flex overflow-hidden max-h-44`}>
        <div className="w-28 shrink-0 border-r border-zinc-200 dark:border-zinc-700 p-2 space-y-1">
          {['Status', 'Owner', 'Tag'].map((x) => (
            <button key={x} type="button" className={`block w-full text-left text-[10px] py-1 px-1 rounded ${x === 'Status' ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700' : 'text-zinc-500'}`}>
              {x}
            </button>
          ))}
        </div>
        <div className="flex-1 p-2 space-y-1">
          {['Open', 'Closed'].map((x) => (
            <label key={x} className="flex items-center gap-2 text-xs">
              <input type="checkbox" readOnly checked={x === 'Open'} />
              {x}
            </label>
          ))}
          {o('opt1') && <Filter className="w-4 h-4 text-zinc-400 mt-2" />}
        </div>
      </div>
    );
  },

  radiocards(o) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          { id: 'a', title: 'Monthly', sub: '$9/mo' },
          { id: 'b', title: 'Yearly', sub: '$89/yr' },
        ].map((x, i) => (
          <button
            key={x.id}
            type="button"
            className={`rounded-xl border p-3 text-left transition-all ${
              (i === 1 && o('opt1')) || (i === 0 && !o('opt1'))
                ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30'
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <p className="text-sm font-bold text-zinc-900 dark:text-white">{x.title}</p>
            <p className={cx.muted}>{x.sub}</p>
          </button>
        ))}
      </div>
    );
  },

  togglebutton(o) {
    return (
      <div className="inline-flex rounded-lg border border-zinc-200 dark:border-zinc-700 p-0.5 bg-zinc-50 dark:bg-zinc-900">
        <button
          type="button"
          className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 ${
            o('opt1') ? 'bg-white dark:bg-zinc-800 shadow text-zinc-900 dark:text-white' : 'text-zinc-500'
          }`}
        >
          <ToggleLeft className="w-4 h-4" /> Bold
        </button>
        <button type="button" className="px-3 py-1.5 rounded-md text-xs font-semibold text-zinc-500">
          Italic
        </button>
      </div>
    );
  },

  actionsheet(o) {
    return (
      <div className="relative">
        <div className={`${cx.card} h-24 flex items-center justify-center text-xs text-zinc-500`}>Page</div>
        <div className="absolute inset-x-2 bottom-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden">
          {['Duplicate', 'Share', 'Delete'].map((x) => (
            <button key={x} type="button" className={`w-full py-3 text-sm font-medium ${x === 'Delete' ? 'text-rose-600' : 'text-zinc-800 dark:text-zinc-100'}`}>
              {x}
            </button>
          ))}
          {o('opt1') && (
            <button type="button" className="w-full py-3 text-sm font-semibold text-zinc-500">
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  },

  meter(o) {
    return (
      <div className={`${cx.card} p-4 space-y-2`}>
        <div className="flex justify-between text-xs font-semibold">
          <span>Storage</span>
          <span>72%</span>
        </div>
        <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
          <div className={`h-full rounded-full bg-indigo-500 w-[72%] ${o('opt1') ? 'bg-amber-500' : ''}`} />
        </div>
      </div>
    );
  },

  banner(o) {
    return (
      <div className="space-y-2">
        <div
          className={`rounded-lg px-4 py-2.5 text-sm font-medium flex items-center justify-between gap-3 ${
            o('opt1') ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100' : 'bg-indigo-600 text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 shrink-0" />
            New course drops Monday.
          </span>
          <button type="button" className="text-xs font-bold underline shrink-0">
            Details
          </button>
        </div>
      </div>
    );
  },

  hovercard(o) {
    return (
      <div className="flex justify-center pt-6">
        <div className="relative inline-block">
          <button type="button" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 border-b border-dashed border-indigo-400">
            @alex
          </button>
          {o('opt1') && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl p-3 z-10 text-left">
              <p className="text-sm font-bold">Alex Rivera</p>
              <p className={cx.muted}>Design · NYC</p>
            </div>
          )}
        </div>
      </div>
    );
  },

  producttour(o) {
    return (
      <div className={`${cx.card} relative p-8 min-h-[11rem]`}>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-indigo-500/20 border-2 border-indigo-500" />
        {o('opt1') && (
          <div className="absolute top-12 right-8 max-w-[200px] rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-zinc-900 shadow-lg p-3 text-xs">
            <p className="font-bold text-indigo-600 dark:text-indigo-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Step 2
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 mt-1">Export your glossary.</p>
          </div>
        )}
        <p className="text-xs text-zinc-500">Main UI — spotlight optional</p>
      </div>
    );
  },

  loadingoverlay(o) {
    return (
      <div className={`${cx.card} relative h-40 flex items-center justify-center overflow-hidden`}>
        <div className="space-y-2 w-full px-8 opacity-40">
          <div className={cx.bar + ' h-3 w-full'} />
          <div className={cx.bar + ' h-3 w-4/5'} />
        </div>
        <div className="absolute inset-0 bg-white/70 dark:bg-zinc-950/70 flex items-center justify-center backdrop-blur-[2px]">
          <Loader2 className={`w-10 h-10 text-indigo-500 animate-spin ${o('opt1') ? 'text-violet-500' : ''}`} />
        </div>
      </div>
    );
  },
};
