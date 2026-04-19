import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  Loader2, Bell, Play, Share2, MapPin, GripVertical, Clock, CalendarRange,
  PanelTop, MessageSquare, Activity, Filter, Megaphone,
  Sparkles, Link2, ChevronDown, ChevronRight, Check, X, Pipette, Folder, FileCode, FileText,
  Globe,
} from 'lucide-react';
import QRCode from 'qrcode';
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
    <div className="flex h-full min-h-0 w-full flex-col bg-zinc-50/80 dark:bg-zinc-950/40">
      <div className="shrink-0 border-b border-zinc-200/80 px-4 pb-3 pt-4 dark:border-zinc-800/80 sm:px-6">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Pattern preview
        </p>
        <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">{title}</p>
      </div>
      <div className={PREVIEW.scroll}>
        <div className={PREVIEW.inner}>{body}</div>
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

/** One centered column for all batch-2 previews — avoids double max-width and uneven padding */
const PREVIEW = {
  scroll: 'flex-1 min-h-0 overflow-y-auto overflow-x-hidden',
  inner: 'mx-auto w-full max-w-xl px-5 py-8 sm:px-8 sm:py-10',
  lede: 'text-sm leading-relaxed text-zinc-600 dark:text-zinc-400',
  sectionTitle: 'text-base font-semibold tracking-tight text-zinc-900 dark:text-white',
  /** Centered form column inside the preview (inputs, search, URL bar, etc.) */
  formNarrow: 'mx-auto flex w-full max-w-md flex-col items-stretch gap-5',
  fieldLabel: 'mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200',
  /** Large, comfortable text fields — used across interactive + static demos */
  input:
    'min-h-[52px] w-full rounded-xl border-2 border-zinc-200 bg-white px-5 py-3.5 text-base leading-snug text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400',
};

const MULTI_IDS = ['design', 'eng', 'qa', 'docs', 'pm'];
const MULTI_LABELS = {
  design: 'Design',
  eng: 'Engineering',
  qa: 'QA',
  docs: 'Docs',
  pm: 'Product',
};

/** Months of sample MRR (thousands USD) — smooth upward trend with a believable dip. */
const LINE_CHART_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const LINE_CHART_REVENUE_K = [24, 28, 26, 34, 42, 52];
const LINE_CHART_COST_K = [20, 21, 22, 23, 24, 25];
const LINE_CHART_Y_MAX = 60;

/** Downtown San Francisco — real tiles via OpenStreetMap embed (no API key). */
const OSM_EMBED_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=-122.425%2C37.785%2C-122.395%2C37.805&layer=mapnik';

const MAP_SIDEBAR_PLACES = [
  { id: 'ferry', name: 'Ferry Building', detail: 'Embarcadero' },
  { id: 'coit', name: 'Coit Tower', detail: 'Telegraph Hill' },
  { id: 'mission', name: 'Mission Dolores', detail: 'Mission' },
];

function MapViewPatternPreview({ o }) {
  const showClusters = o('opt1');
  const listSync = o('opt2');
  const showGeo = o('opt3');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const mapShellClass = listSync
    ? 'relative min-h-[220px] w-full md:h-full md:min-h-[min(52vh,26rem)]'
    : 'relative h-[min(58vh,26rem)] min-h-[260px] w-full sm:min-h-[300px]';

  const mapFrame = (
    <div className={mapShellClass}>
      <iframe
        title="Interactive map — downtown San Francisco (OpenStreetMap)"
        src={OSM_EMBED_SRC}
        className="absolute inset-0 h-full w-full rounded-none border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      {showClusters && (
        <div
          className="pointer-events-none absolute left-[28%] top-[22%] z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-sm font-bold text-white shadow-lg dark:border-zinc-900"
          aria-hidden
        >
          12
        </div>
      )}
      {showGeo && (
        <div className="absolute bottom-3 right-3 z-10">
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-zinc-200 bg-white/95 px-4 text-sm font-semibold text-zinc-800 shadow-md backdrop-blur-sm dark:border-zinc-600 dark:bg-zinc-900/95 dark:text-zinc-100"
            aria-label="Use my location (demo — requests browser permission in a real app)"
          >
            <MapPin className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden />
            Use my location
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-2xl">
      <figure className={`${cx.card} m-0 overflow-hidden p-0 shadow-md`}>
        <div className="border-b border-zinc-200/90 bg-gradient-to-br from-sky-50/50 via-white to-white px-5 py-4 text-left dark:border-zinc-800 dark:from-sky-950/20 dark:via-zinc-900 dark:to-zinc-900 sm:px-6 sm:py-5">
          <p className={PREVIEW.sectionTitle}>Map embed</p>
          <p className={`mt-1 max-w-prose ${PREVIEW.lede}`}>
            Live OpenStreetMap tiles in an iframe — same integration shape as Mapbox or Google Maps JS.
          </p>
        </div>

        {listSync ? (
          <div className="grid min-h-[min(62vh,24rem)] grid-cols-1 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] md:min-h-[min(52vh,26rem)]">
            <ul
              className="flex max-h-48 flex-col divide-y divide-zinc-200 overflow-y-auto border-zinc-200 bg-zinc-50/80 dark:divide-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/50 md:max-h-none md:border-r"
              aria-label="Locations synced with map"
            >
              {MAP_SIDEBAR_PLACES.map((p, i) => {
                const on = i === selectedIdx;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedIdx(i)}
                      className={`w-full px-4 py-3.5 text-left text-sm transition ${
                        on
                          ? 'bg-indigo-50 font-semibold text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-100'
                          : 'text-zinc-700 hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-800/80'
                      }`}
                    >
                      <span className="block">{p.name}</span>
                      <span className="mt-0.5 block text-xs font-normal text-zinc-500 dark:text-zinc-400">{p.detail}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {mapFrame}
          </div>
        ) : (
          mapFrame
        )}

        <figcaption className="border-t border-zinc-200/80 px-4 py-3 text-left text-[11px] leading-relaxed text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:px-5">
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
          >
            © OpenStreetMap contributors
          </a>
          {' · '}
          <a
            href="https://www.openstreetmap.org/#map=15/37.795/-122.41"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            View larger map
          </a>
        </figcaption>
      </figure>
    </div>
  );
}

function LineChartPatternPreview({ o }) {
  const uid = useId().replace(/:/g, '');
  const showAxes = o('opt1');
  const showTooltip = o('opt2');
  const showSecond = o('opt3');

  const W = 480;
  const H = 228;
  const padL = showAxes ? 54 : 14;
  const padR = 14;
  const padT = 12;
  const padB = showAxes ? 42 : 20;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const bottomY = padT + innerH;

  const n = LINE_CHART_REVENUE_K.length;
  const idxToX = (i) => padL + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const valToY = (v) => padT + innerH - (v / LINE_CHART_Y_MAX) * innerH;

  const revPts = LINE_CHART_REVENUE_K.map((v, i) => ({
    x: idxToX(i),
    y: valToY(v),
    v,
    label: LINE_CHART_LABELS[i],
  }));
  const costPts = LINE_CHART_COST_K.map((v, i) => ({
    x: idxToX(i),
    y: valToY(v),
    v,
  }));

  const revLineD = revPts.map((p, i) => `${i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`}`).join(' ');
  const revAreaD = `${revLineD} L ${revPts[n - 1].x} ${bottomY} L ${revPts[0].x} ${bottomY} Z`;
  const costLineD = costPts.map((p, i) => `${i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`}`).join(' ');

  const tipIdx = 4;
  const tip = revPts[tipIdx];
  const yTicks = [60, 45, 30, 15, 0];

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className={`${cx.card} overflow-hidden shadow-md`}>
        <div className="border-b border-zinc-200/90 bg-gradient-to-br from-indigo-50/40 via-white to-white px-5 py-5 sm:px-7 sm:py-6 dark:border-zinc-800 dark:from-indigo-950/25 dark:via-zinc-900 dark:to-zinc-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-left">
              <p className={PREVIEW.sectionTitle}>MRR over time</p>
              <p className={`mt-1 max-w-md ${PREVIEW.lede}`}>
                Continuous time axis — readers follow the slope, not bar-to-bar gaps.
              </p>
            </div>
            {showSecond && (
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-9 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/40" />
                  Revenue
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-0 w-9 border-t-[3px] border-dashed border-violet-500" />
                  Operating cost
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-3 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
          <figure className="m-0">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-52 w-full sm:h-64"
              role="img"
              aria-label="Line chart of monthly recurring revenue in thousands of US dollars"
            >
              <defs>
                <linearGradient id={`lc-fill-${uid}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
                  <stop offset="70%" stopColor="#6366f1" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
                <filter id={`lc-line-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#6366f1" floodOpacity="0.35" />
                </filter>
              </defs>

              {showAxes &&
                yTicks.map((tick) => {
                  const y = valToY(tick);
                  return (
                    <g key={tick}>
                      <line
                        x1={padL}
                        x2={W - padR}
                        y1={y}
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-zinc-200 dark:text-zinc-700/90"
                        strokeDasharray="5 6"
                      />
                      <text
                        x={padL - 10}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-zinc-400 text-[11px] font-medium tabular-nums dark:fill-zinc-500"
                      >
                        ${tick}k
                      </text>
                    </g>
                  );
                })}

              {!showAxes && (
                <line
                  x1={padL}
                  x2={W - padR}
                  y1={bottomY}
                  y2={bottomY}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-zinc-200 dark:text-zinc-700"
                />
              )}

              <path d={revAreaD} fill={`url(#lc-fill-${uid})`} />

              {showSecond && (
                <path
                  d={costLineD}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="7 5"
                  opacity={0.92}
                />
              )}

              <path
                d={revLineD}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#lc-line-${uid})`}
              />

              {showTooltip &&
                revPts.map((p, i) => (
                  <circle
                    key={p.label}
                    cx={p.x}
                    cy={p.y}
                    r={i === tipIdx ? 6 : 3.5}
                    className="fill-white stroke-indigo-500 dark:fill-zinc-900"
                    strokeWidth={i === tipIdx ? 2.5 : 2}
                  />
                ))}

              {showTooltip && (
                <g transform={`translate(${tip.x}, ${tip.y})`}>
                  <g transform="translate(-70, -52)">
                    <rect
                      width={140}
                      height={44}
                      rx={10}
                      className="fill-white stroke-zinc-200 shadow-lg dark:fill-zinc-800 dark:stroke-zinc-600"
                      strokeWidth="1"
                    />
                    <text x={70} y={20} textAnchor="middle" className="fill-zinc-500 text-[11px] font-semibold uppercase tracking-wide">
                      {tip.label} 2026
                    </text>
                    <text x={70} y={36} textAnchor="middle" className="fill-zinc-900 text-sm font-bold tabular-nums dark:fill-white">
                      ${tip.v}k MRR
                    </text>
                  </g>
                </g>
              )}
            </svg>

            {showAxes && (
              <figcaption className="mt-3 grid grid-cols-6 gap-1 text-center text-[11px] font-medium text-zinc-500 dark:text-zinc-400 sm:text-xs">
                {LINE_CHART_LABELS.map((lab) => (
                  <span key={lab} className="min-w-0 truncate">
                    {lab}
                  </span>
                ))}
              </figcaption>
            )}
          </figure>

          {!showAxes && (
            <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
              Enable <span className="font-semibold text-zinc-600 dark:text-zinc-300">Axes and grid</span> for scale and dates.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Toolbar toggles (aria-pressed) — visually distinct from a settings switch (thumb in a track). */
function ToggleButtonPatternPreview({ o }) {
  const syncBoldFromPrompt = o('opt1');
  const withLabels = o('opt2');
  const mutuallyExclusive = o('opt3');

  const [fmt, setFmt] = useState(() => ({
    bold: syncBoldFromPrompt,
    italic: false,
    underline: false,
  }));

  useEffect(() => {
    setFmt((f) => {
      if (mutuallyExclusive && syncBoldFromPrompt) {
        return { bold: true, italic: false, underline: false };
      }
      return { ...f, bold: syncBoldFromPrompt };
    });
  }, [syncBoldFromPrompt, mutuallyExclusive]);

  const applyToggle = (key) => {
    setFmt((prev) => {
      if (mutuallyExclusive) {
        if (prev[key]) {
          return { bold: false, italic: false, underline: false };
        }
        return {
          bold: key === 'bold',
          italic: key === 'italic',
          underline: key === 'underline',
        };
      }
      return { ...prev, [key]: !prev[key] };
    });
  };

  const slots = [
    { key: 'bold', name: 'Bold', sym: 'B', symClass: 'font-bold' },
    { key: 'italic', name: 'Italic', sym: 'I', symClass: 'italic' },
    { key: 'underline', name: 'Underline', sym: 'U', symClass: 'underline' },
  ];

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 text-center">
      <div className="w-full">
        <p className={PREVIEW.sectionTitle}>Formatting toolbar</p>
        <p className={`mt-2 max-w-prose mx-auto ${PREVIEW.lede}`}>
          Each control is an independent pressed button — not an on/off track like a switch.
        </p>
      </div>
      <div
        role="toolbar"
        aria-label="Text formatting"
        className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-600 dark:bg-zinc-900/90"
      >
        {slots.map(({ key, name, sym, symClass }) => {
          const pressed = fmt[key];
          return (
            <button
              key={key}
              type="button"
              aria-pressed={pressed}
              onClick={() => applyToggle(key)}
              className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 px-4 text-base font-semibold transition ${
                withLabels ? 'min-w-0 sm:px-5' : 'min-w-[52px] px-0 sm:min-w-[56px]'
              } ${
                pressed
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:border-indigo-400 dark:bg-indigo-950/60 dark:text-indigo-50'
                  : 'border-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/90'
              }`}
            >
              <span className={`text-lg leading-none ${symClass}`}>{sym}</span>
              {withLabels && <span className="text-sm font-semibold tracking-tight">{name}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Interactive multi-select so toggles and chips actually work (RENDER map is otherwise static). */
function MultiSelectPatternPreview({ o }) {
  const maxPick = o('opt1') ? 3 : Infinity;
  const [selected, setSelected] = useState(() => new Set(['design', 'eng']));

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }
      if (next.size >= maxPick) return prev;
      next.add(id);
      return next;
    });
  };

  const remove = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const selectAll = () => {
    if (maxPick === Infinity) {
      setSelected(new Set(MULTI_IDS));
      return;
    }
    setSelected(new Set(MULTI_IDS.slice(0, maxPick)));
  };

  const clearAll = () => setSelected(new Set());

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className={`${cx.card} p-6 shadow-md sm:p-8`}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className={PREVIEW.sectionTitle}>Assign teams</p>
            <p className={`mt-1 ${PREVIEW.lede}`}>Pick everyone who should access this project.</p>
          </div>
          {o('opt1') && (
            <span
              className="shrink-0 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-200"
              aria-live="polite"
            >
              {selected.size} / {maxPick} max
            </span>
          )}
        </div>

        <div className="mb-4 flex min-h-[3rem] flex-wrap items-center gap-2">
          {selected.size === 0 ? (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">No teams selected — tap rows below.</span>
          ) : (
            [...selected].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => remove(id)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 pl-3 pr-2 text-sm font-medium text-indigo-900 shadow-sm transition hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-100 dark:hover:bg-indigo-900/80"
              >
                {MULTI_LABELS[id]}
                <span className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-indigo-200/80 dark:hover:bg-indigo-800/80" aria-hidden>
                  <X className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            ))
          )}
        </div>

        {o('opt2') && (
          <div className="mb-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="min-h-[44px] rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Select all
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="min-h-[44px] rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Clear
            </button>
          </div>
        )}

        <ul
          role="listbox"
          aria-label="Teams"
          aria-multiselectable="true"
          className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-600"
        >
          {MULTI_IDS.map((id) => {
            const on = selected.has(id);
            const atLimit = !on && selected.size >= maxPick;
            return (
              <li key={id} role="option" aria-selected={on} aria-disabled={atLimit} className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    if (atLimit) return;
                    toggle(id);
                  }}
                  disabled={atLimit}
                  className={`flex min-h-[52px] w-full items-center gap-4 px-5 py-3.5 text-left text-base transition sm:text-sm ${
                    atLimit
                      ? 'cursor-not-allowed opacity-45'
                      : 'cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/80'
                  } ${on ? 'bg-indigo-50/80 dark:bg-indigo-950/40' : ''}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                      on
                        ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500'
                        : 'border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900'
                    }`}
                    aria-hidden
                  >
                    {on && <Check className="h-4 w-4" strokeWidth={3} />}
                  </span>
                  <span className={`font-medium ${on ? 'text-indigo-950 dark:text-indigo-50' : 'text-zinc-900 dark:text-zinc-100'}`}>
                    {MULTI_LABELS[id]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {o('opt3') && (
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            In production: typeahead, Arrow keys to move, Space toggles, Esc closes.
          </p>
        )}
      </div>
    </div>
  );
}

const COLOR_SWATCHES = ['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#0ea5e9', '#64748b'];

function normalizeHex6(v) {
  let s = v.trim();
  if (!s.startsWith('#')) s = `#${s}`;
  return /^#[0-9a-f]{6}$/i.test(s) ? s.toLowerCase() : null;
}

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbaFromHex(hex, a) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;
}

/** Real color picking: native input, hex field, optional swatches / alpha / EyeDropper. */
function ColorPickerPatternPreview({ o }) {
  const [hex, setHex] = useState('#6366f1');
  const [hexDraft, setHexDraft] = useState('#6366f1');
  const [alphaPct, setAlphaPct] = useState(100);
  const [eyeMsg, setEyeMsg] = useState('');

  useEffect(() => {
    setHexDraft(hex);
  }, [hex]);

  const applyHexDraft = () => {
    const n = normalizeHex6(hexDraft);
    if (n) setHex(n);
    else setHexDraft(hex);
  };

  const alpha = o('opt1') ? alphaPct / 100 : 1;
  const previewBg = o('opt1') ? rgbaFromHex(hex, alpha) : hex;

  const runEyedropper = async () => {
    setEyeMsg('');
    try {
      const E = window.EyeDropper;
      if (!E) {
        setEyeMsg('EyeDropper not supported in this browser.');
        return;
      }
      const dropper = new E();
      const { sRGBHex } = await dropper.open();
      setHex(sRGBHex);
    } catch {
      setEyeMsg('');
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className={`${cx.card} space-y-6 p-6 sm:p-8`}>
        <div>
          <p className={PREVIEW.sectionTitle}>Color</p>
          <p className={`mt-1 ${PREVIEW.lede}`}>Use the bar, type a hex value, or tap a preset.</p>
        </div>

        <div className="relative h-28 w-full overflow-hidden rounded-2xl border-2 border-zinc-200 shadow-inner dark:border-zinc-600" aria-hidden>
          {o('opt1') && (
            <div
              className="absolute inset-0 dark:opacity-90"
              style={{
                backgroundColor: '#fafafa',
                backgroundImage:
                  'linear-gradient(45deg, #d4d4d8 25%, transparent 25%), linear-gradient(-45deg, #d4d4d8 25%, transparent 25%)',
                backgroundSize: '14px 14px',
                backgroundPosition: '0 0, 0 7px',
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: previewBg }}
          />
        </div>

        <div>
          <label htmlFor="vg-native-color" className={PREVIEW.fieldLabel}>
            System picker
          </label>
          <input
            id="vg-native-color"
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-16 w-full min-h-[52px] cursor-pointer rounded-xl border-2 border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-600 dark:bg-zinc-800"
            aria-label="Open system color picker"
          />
        </div>

        <div>
          <label htmlFor="vg-hex-input" className={PREVIEW.fieldLabel}>
            Hex value
          </label>
          <input
            id="vg-hex-input"
            type="text"
            value={hexDraft}
            onChange={(e) => setHexDraft(e.target.value)}
            onBlur={applyHexDraft}
            onKeyDown={(e) => {
              if (e.key === 'Enter') applyHexDraft();
            }}
            className={`${PREVIEW.input} font-mono tracking-wide`}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Color as hex value"
          />
        </div>

        {o('opt1') && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Opacity</span>
              <span className="text-sm font-mono tabular-nums text-zinc-600 dark:text-zinc-300">{alphaPct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={alphaPct}
              onChange={(e) => setAlphaPct(Number(e.target.value))}
              className="h-11 w-full cursor-pointer accent-indigo-600"
              aria-label="Opacity"
            />
          </div>
        )}

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {o('opt2') ? 'Brand presets' : 'Quick presets'}
          </p>
          <div className="flex flex-wrap gap-3">
            {COLOR_SWATCHES.map((c) => {
              const active = hex.toLowerCase() === c.toLowerCase();
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setHex(c)}
                  className={`h-12 w-12 min-h-[44px] min-w-[44px] rounded-xl border-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
                    active ? 'border-indigo-600 ring-2 ring-indigo-500' : 'border-zinc-300 dark:border-zinc-600'
                  }`}
                  style={{ backgroundColor: c }}
                  title={c}
                  aria-label={`Use ${c}`}
                  aria-pressed={active}
                />
              );
            })}
          </div>
        </div>

        {o('opt3') && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={runEyedropper}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              <Pipette className="h-4 w-4 shrink-0" aria-hidden />
              Pick from screen
            </button>
            {eyeMsg ? <p className="text-center text-xs text-amber-600 dark:text-amber-400">{eyeMsg}</p> : null}
          </div>
        )}
      </div>
    </div>
  );
}

const COMBO_OPTIONS = ['React', 'Vue', 'Svelte', 'Solid', 'Angular', 'Qwik'];

function highlightComboboxLabel(label, query, enabled) {
  if (!enabled || !query) return label;
  const q = query.trim();
  if (!q) return label;
  const i = label.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return label;
  return (
    <>
      {label.slice(0, i)}
      <mark className="rounded-sm bg-amber-200 px-0.5 dark:bg-amber-500/35">{label.slice(i, i + q.length)}</mark>
      {label.slice(i + q.length)}
    </>
  );
}

function ComboboxPatternPreview({ o }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const q = query.trim();

  useEffect(() => {
    if (!o('opt1')) {
      setLoading(false);
      setLoadError(false);
      return;
    }
    if (!q) {
      setLoading(false);
      setLoadError(false);
      return;
    }
    if (q.toLowerCase() === 'error') {
      setLoading(false);
      setLoadError(true);
      return;
    }
    setLoadError(false);
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(t);
  }, [q, o]);

  const filtered = useMemo(() => {
    if (!q) return COMBO_OPTIONS;
    return COMBO_OPTIONS.filter((x) => x.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  const showCreatable = o('opt2') && q.length > 0 && filtered.length === 0 && !loadError;

  const pick = (label) => {
    setSelected(label);
    setQuery(label);
  };

  const pickCreatable = () => {
    const label = `“${q}” (new)`;
    setSelected(label);
  };

  const showListBody = !(o('opt1') && loading && q) && !loadError;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8">
      <div className="w-full space-y-2 text-center sm:px-4">
        <p className={PREVIEW.lede}>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Combobox</span> — type to filter a fixed list,
          then pick one option (not the same as open search).
        </p>
        {o('opt1') && (
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Async demo: short “Searching…” delay while you type. Type{' '}
            <kbd className="rounded border border-zinc-300 bg-zinc-100 px-2 py-0.5 font-mono text-xs dark:border-zinc-600 dark:bg-zinc-800">
              error
            </kbd>{' '}
            for a fake error state.
          </p>
        )}
      </div>

      <div className={`${cx.card} w-full overflow-hidden p-0 shadow-md`}>
        <div className="space-y-2 border-b border-zinc-200 bg-zinc-50/90 px-5 py-5 dark:border-zinc-700 dark:bg-zinc-900/60 sm:px-6 sm:py-6">
          <label htmlFor="vg-combobox-input" className={PREVIEW.fieldLabel}>
            Framework
          </label>
          <input
            id="vg-combobox-input"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            autoComplete="off"
            placeholder="Type to filter…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={PREVIEW.input}
          />
        </div>

        <div role="listbox" aria-label="Matching frameworks" className="max-h-72 overflow-y-auto">
          {loadError && o('opt1') && (
            <div className="px-5 py-6 text-sm text-rose-600 dark:text-rose-400" role="alert">
              Couldn’t load suggestions. (Demo error — try another query.)
            </div>
          )}
          {o('opt1') && loading && q && !loadError && (
            <div className="flex items-center gap-3 px-5 py-6 text-sm text-zinc-500 dark:text-zinc-400">
              <Loader2 className="h-5 w-5 shrink-0 animate-spin text-indigo-500" aria-hidden />
              Searching…
            </div>
          )}
          {showListBody && filtered.length === 0 && !showCreatable && (
            <div className="px-5 py-6 text-sm text-zinc-500 dark:text-zinc-400">No framework matches that text.</div>
          )}
          {showListBody &&
            filtered.map((label) => {
              const active = selected === label;
              return (
                <button
                  key={label}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => pick(label)}
                  className={`flex min-h-[52px] w-full items-center border-b border-zinc-100 px-5 text-left text-base transition last:border-b-0 dark:border-zinc-800 sm:text-sm ${
                    active
                      ? 'bg-indigo-50 font-semibold text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-100'
                      : 'text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800/80'
                  }`}
                >
                  {highlightComboboxLabel(label, q, o('opt3'))}
                </button>
              );
            })}
          {showListBody && showCreatable && (
            <button
              type="button"
              onClick={pickCreatable}
              className="flex min-h-[52px] w-full items-center px-5 text-left text-base font-semibold text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40 sm:text-sm"
            >
              + Create “{q}”
            </button>
          )}
        </div>

        {selected ? (
          <div className="border-t border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
            <span className="text-zinc-500 dark:text-zinc-500">Selected:</span>{' '}
            <span className="font-semibold text-zinc-900 dark:text-white">{selected}</span>
          </div>
        ) : (
          <div className="border-t border-zinc-200 px-5 py-4 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
            Pick a row to set the value.
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Tree grid: hierarchy + columns. The full “Tree View” demo is hierarchy-only; this preview
 * stresses aligned metadata — at readable sizes (no microscopic type).
 */
function TreeGridPatternPreview({ o }) {
  const chevronCol = o('opt1');
  const showLazy = o('opt2');
  const alignCols = o('opt3');
  const colCount = 3 + (alignCols ? 1 : 0);

  const th = 'px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400';
  const td = 'px-4 py-3.5 align-middle text-sm text-zinc-800 dark:text-zinc-100';
  const sizeCell = ' text-right tabular-nums';

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className={`${cx.card} overflow-hidden p-0 shadow-md`}>
        <div className="border-b border-zinc-200/90 bg-gradient-to-br from-zinc-50/90 to-white px-5 py-4 dark:border-zinc-800 dark:from-zinc-900/80 dark:to-zinc-900 sm:px-6 sm:py-5">
          <p className={PREVIEW.sectionTitle}>Tree grid</p>
          <p className={`${PREVIEW.lede} mt-1 max-w-prose`}>
            Same hierarchy idea as <span className="font-medium text-zinc-700 dark:text-zinc-200">Tree view</span>, but each
            row lines up with <span className="font-medium text-zinc-700 dark:text-zinc-200">sortable columns</span> (size,
            dates, etc.) — the table is the teaching surface.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table
            role="treegrid"
            aria-label="Project files with metadata"
            className="w-full min-w-[min(100%,20rem)] border-collapse"
          >
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-100/80 dark:border-zinc-700 dark:bg-zinc-900/90">
                <th className={`${th} w-14`} scope="col">
                  <span className="sr-only">{chevronCol ? 'Expand or collapse' : 'Tree'}</span>
                </th>
                <th className={th} scope="col">
                  Name
                </th>
                <th className={`${th} w-[5.5rem] text-right tabular-nums sm:w-24`} scope="col">
                  Size
                </th>
                {alignCols && (
                  <th className={`${th} w-36 text-right`} scope="col">
                    Modified
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              <tr role="row" aria-level={1} aria-expanded="true" className="bg-white dark:bg-zinc-950/40">
                <td className={td}>
                  {chevronCol ? (
                    <button
                      type="button"
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      aria-label="Collapse folder src"
                    >
                      <ChevronDown className="h-5 w-5 shrink-0" aria-hidden />
                    </button>
                  ) : (
                    <span className="flex min-h-[44px] min-w-[44px] items-center justify-center text-zinc-400">
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </span>
                  )}
                </td>
                <td className={`${td} font-semibold`}>
                  <span className="inline-flex items-center gap-2.5">
                    <Folder className="h-5 w-5 shrink-0 text-amber-500" aria-hidden />
                    src
                  </span>
                </td>
                <td className={`${td} text-zinc-500 dark:text-zinc-400${sizeCell}`}>—</td>
                {alignCols && <td className={`${td} text-right text-zinc-500 dark:text-zinc-400`}>Today</td>}
              </tr>
              {showLazy && (
                <tr role="row">
                  <td colSpan={colCount} className={`${td} bg-indigo-50/50 py-3 pl-6 text-sm text-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-200`}>
                    <span className="inline-flex items-center gap-2.5">
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-indigo-600 dark:text-indigo-400" aria-hidden />
                      Loading children…
                    </span>
                  </td>
                </tr>
              )}
              <tr role="row" aria-level={2} className="bg-zinc-50/70 dark:bg-zinc-900/25">
                <td className={td} />
                <td className={`${td} pl-6 sm:pl-10`}>
                  <span className="inline-flex items-center gap-2.5">
                    <FileCode className="h-5 w-5 shrink-0 text-blue-500" aria-hidden />
                    App.jsx
                  </span>
                </td>
                <td className={`${td} text-zinc-700 dark:text-zinc-200${sizeCell}`}>12 KB</td>
                {alignCols && <td className={`${td} text-right tabular-nums text-zinc-500 dark:text-zinc-400`}>2:14 PM</td>}
              </tr>
              <tr role="row" aria-level={2} className="bg-zinc-50/70 dark:bg-zinc-900/25">
                <td className={td} />
                <td className={`${td} pl-6 sm:pl-10`}>
                  <span className="inline-flex items-center gap-2.5">
                    <FileCode className="h-5 w-5 shrink-0 text-blue-500" aria-hidden />
                    main.jsx
                  </span>
                </td>
                <td className={`${td} text-zinc-700 dark:text-zinc-200${sizeCell}`}>4 KB</td>
                {alignCols && <td className={`${td} text-right tabular-nums text-zinc-500 dark:text-zinc-400`}>2:02 PM</td>}
              </tr>
              <tr role="row" aria-level={1} className="bg-white dark:bg-zinc-950/40">
                <td className={td}>
                  <span className="block min-h-[44px] min-w-[44px]" aria-hidden />
                </td>
                <td className={td}>
                  <span className="inline-flex items-center gap-2.5 font-medium">
                    <FileText className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden />
                    README.md
                  </span>
                </td>
                <td className={`${td} text-zinc-700 dark:text-zinc-200${sizeCell}`}>2 KB</td>
                {alignCols && <td className={`${td} text-right tabular-nums text-zinc-500 dark:text-zinc-400`}>Mon</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const STICKY_TABLE_SAMPLE = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: ['Checkout flow', 'Billing portal', 'Team invites', 'API keys', 'Webhooks'][i % 5],
  status: ['Live', 'Beta', 'Draft'][i % 3],
  owner: ['A. Chen', 'J. Rivera', 'Ops bot'][i % 3],
}));

/** Sticky only works inside a scrolling box — this preview scrolls the tbody region so the behavior is visible. */
function StickyTableHeaderPatternPreview({ o }) {
  const stickyCorner = o('opt1');
  const strongLayer = o('opt2');
  const shadowWhenScrolled = o('opt3');
  const scrollRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const headBg = strongLayer
    ? 'bg-zinc-200 dark:bg-zinc-950'
    : 'bg-zinc-100 dark:bg-zinc-800';

  const onScroll = (e) => {
    setScrolled(e.currentTarget.scrollTop > 8);
  };

  const headShadow =
    shadowWhenScrolled && scrolled
      ? 'shadow-[0_8px_16px_-8px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)]'
      : '';

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className={`${cx.card} overflow-hidden p-0 shadow-md`}>
        <div className="border-b border-zinc-200/90 bg-gradient-to-br from-white to-zinc-50/90 px-5 py-4 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 sm:px-6 sm:py-5">
          <p className={PREVIEW.sectionTitle}>Sticky table header</p>
          <p className={`${PREVIEW.lede} mt-1 max-w-prose`}>
            <span className="font-medium text-zinc-800 dark:text-zinc-100">Scroll inside the frame</span> — the thead row
            stays pinned; without a scrolling ancestor, <code className="rounded bg-zinc-200/80 px-1 text-xs font-semibold dark:bg-zinc-800">sticky</code>{' '}
            never “sticks.”
          </p>
        </div>
        <div
          ref={scrollRef}
          onScroll={onScroll}
          tabIndex={0}
          role="region"
          aria-label="Table with scrollable body and sticky header"
          className="max-h-[min(52vh,320px)] overflow-auto scroll-smooth border-t border-zinc-100 dark:border-zinc-800"
        >
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr>
                <th
                  scope="col"
                  className={`sticky top-0 z-30 border-b border-zinc-300 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:border-zinc-600 dark:text-zinc-300 ${headBg} ${headShadow} ${
                    stickyCorner ? 'left-0 shadow-[4px_0_12px_-6px_rgba(0,0,0,0.12)] dark:shadow-[4px_0_12px_-6px_rgba(0,0,0,0.45)]' : ''
                  }`}
                >
                  #
                </th>
                <th
                  scope="col"
                  className={`sticky top-0 z-20 border-b border-zinc-300 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:border-zinc-600 dark:text-zinc-300 ${headBg} ${headShadow}`}
                >
                  Feature
                </th>
                <th
                  scope="col"
                  className={`sticky top-0 z-20 border-b border-zinc-300 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:border-zinc-600 dark:text-zinc-300 ${headBg} ${headShadow}`}
                >
                  Status
                </th>
                <th
                  scope="col"
                  className={`sticky top-0 z-20 border-b border-zinc-300 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:border-zinc-600 dark:text-zinc-300 ${headBg} ${headShadow}`}
                >
                  Owner
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {STICKY_TABLE_SAMPLE.map((row, i) => {
                const rowBg = i % 2 === 0 ? 'bg-white dark:bg-zinc-950' : 'bg-zinc-50/90 dark:bg-zinc-900/50';
                const cornerBg = i % 2 === 0 ? 'bg-white dark:bg-zinc-950' : 'bg-zinc-50/90 dark:bg-zinc-900/50';
                return (
                  <tr key={row.id} className={rowBg}>
                    <td
                      className={`whitespace-nowrap px-4 py-3 tabular-nums text-zinc-500 dark:text-zinc-400 ${
                        stickyCorner
                          ? `sticky left-0 z-10 border-r border-zinc-200 ${cornerBg} dark:border-zinc-700`
                          : ''
                      }`}
                    >
                      {row.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{row.name}</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{row.status}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.owner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="border-t border-zinc-100 px-4 py-3 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          {shadowWhenScrolled
            ? 'Shadow under the header appears after you scroll — layered above body text.'
            : 'Turn on Shadow in the spec to emphasize separation when scrolled.'}
        </p>
      </div>
    </div>
  );
}

const ACTIVITY_STREAM_EVENTS = [
  {
    id: '1',
    actor: 'Jordan Lee',
    verb: 'pushed a commit to',
    object: 'api-service',
    relative: 'Just now',
    iso: '2026-04-18T17:52:00.000Z',
    icon: Activity,
  },
  {
    id: '2',
    actor: 'Sam Kim',
    verb: 'commented on',
    object: 'PR #482',
    relative: '12 minutes ago',
    iso: '2026-04-18T17:40:00.000Z',
    icon: MessageSquare,
  },
  {
    id: '3',
    actor: 'Release bot',
    verb: 'merged',
    object: 'main',
    relative: '1 hour ago',
    iso: '2026-04-18T16:52:00.000Z',
    icon: Sparkles,
  },
  {
    id: '4',
    actor: 'Morgan Quinn',
    verb: 'deployed',
    object: 'checkout-web v4.2.1',
    relative: '3 hours ago',
    iso: '2026-04-18T14:52:00.000Z',
    icon: Megaphone,
  },
];

function ActivityStreamPatternPreview({ o }) {
  const actorLinks = o('opt1');
  const verbStyle = o('opt2');
  const loadMore = o('opt3');

  const Actor = ({ children }) =>
    actorLinks ? (
      <a
        href="#profile"
        className="font-semibold text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700 dark:text-indigo-400 dark:decoration-indigo-600 dark:hover:text-indigo-300"
      >
        {children}
      </a>
    ) : (
      <span className="font-semibold text-zinc-900 dark:text-zinc-100">{children}</span>
    );

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className={`${cx.card} overflow-hidden p-0 shadow-md`}>
        <div className="border-b border-zinc-200/90 bg-gradient-to-br from-white to-zinc-50/80 px-6 py-5 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 sm:px-7 sm:py-6">
          <p className={PREVIEW.sectionTitle}>Activity</p>
          <p className={`${PREVIEW.lede} mt-1 max-w-prose`}>
            Event log: who did what — large enough to scan without squinting; timestamps stay secondary.
          </p>
        </div>
        <ol className="divide-y divide-zinc-100 dark:divide-zinc-800" aria-label="Recent activity">
          {ACTIVITY_STREAM_EVENTS.map((e) => {
            const Icon = e.icon;
            return (
              <li key={e.id} className="flex gap-4 px-6 py-5 sm:gap-5 sm:px-7 sm:py-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/70 sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 sm:h-7 sm:w-7" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base leading-relaxed text-zinc-800 sm:text-[1.0625rem] dark:text-zinc-200">
                    <Actor>{e.actor}</Actor>
                    {verbStyle ? (
                      <>
                        {' '}
                        <span className="font-normal text-zinc-500 dark:text-zinc-400">{e.verb} </span>
                        <span className="font-semibold text-zinc-900 dark:text-white">{e.object}</span>
                      </>
                    ) : (
                      <>
                        {' '}
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {e.verb}{' '}
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{e.object}</span>
                        </span>
                      </>
                    )}
                  </p>
                  <time
                    dateTime={e.iso}
                    title={new Date(e.iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    className="mt-2 block text-sm font-medium text-zinc-500 dark:text-zinc-400"
                  >
                    {e.relative}
                  </time>
                </div>
              </li>
            );
          })}
        </ol>
        {loadMore && (
          <div className="border-t border-zinc-100 px-6 py-4 dark:border-zinc-800 sm:px-7">
            <button
              type="button"
              className="min-h-[48px] w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 text-base font-semibold text-zinc-800 shadow-sm transition hover:bg-white dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Load older events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const LINK_PREVIEW_DEMO_URL = 'https://vibe-glossary.web.app/patterns/modal';
const LINK_PREVIEW_HOST = 'vibe-glossary.web.app';

/** Rich link unfurl: OG metadata as a tappable card (chat apps, social). Options = loading / failure / domain emphasis. */
function LinkCardPatternPreview({ o }) {
  const skeleton = o('opt1');
  const broken = o('opt2');
  const domainBar = o('opt3');

  if (skeleton) {
    return (
      <div className="mx-auto w-full max-w-lg space-y-4">
        <div>
          <p className={PREVIEW.sectionTitle}>Link preview loading</p>
          <p className={`${PREVIEW.lede} mt-1`}>
            While Open Graph HTML is fetched, use a <strong className="text-zinc-800 dark:text-zinc-200">skeleton</strong> with a
            fixed image ratio so the layout does not jump when metadata arrives.
          </p>
        </div>
        <div className={`${cx.card} animate-pulse overflow-hidden p-0`}>
          <div className="aspect-[1200/630] bg-zinc-200 dark:bg-zinc-700" />
          <div className="space-y-3 p-5 sm:p-6">
            <div className="h-5 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-600" />
            <div className="h-4 w-full rounded-lg bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-11/12 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    );
  }

  if (broken) {
    return (
      <div className="mx-auto w-full max-w-lg space-y-4">
        <div>
          <p className={PREVIEW.sectionTitle}>Preview failed</p>
          <p className={`${PREVIEW.lede} mt-1`}>
            Crawlers can be blocked (robots, paywalls, 404). Show a compact error and{' '}
            <strong className="text-zinc-800 dark:text-zinc-200">keep the raw URL visible</strong> so users still know the destination.
          </p>
        </div>
        <article
          className={`${cx.card} border-rose-200 p-5 shadow-sm dark:border-rose-900/40 sm:p-6`}
          aria-live="polite"
        >
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/50">
              <X className="h-6 w-6 text-rose-600 dark:text-rose-400" strokeWidth={2.5} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Couldn’t load link preview</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                The fetch failed or the page returned an error — you can still open the link below.
              </p>
              <p className="mt-3 break-all font-mono text-sm font-medium text-indigo-600 dark:text-indigo-400">{LINK_PREVIEW_DEMO_URL}</p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-5">
      <div>
        <p className={PREVIEW.sectionTitle}>Rich link unfurl</p>
        <p className={`${PREVIEW.lede} mt-1 max-w-prose`}>
          Paste a URL in Slack, Discord, or iMessage and the client fetches{' '}
          <span className="font-medium text-zinc-800 dark:text-zinc-100">Open Graph</span> tags (
          <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-xs font-semibold dark:bg-zinc-800">og:title</code>,{' '}
          <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-xs font-semibold dark:bg-zinc-800">og:image</code>, etc.) to build
          this card — <span className="font-medium">it is not a stat tile or a generic “card” pattern</span>.
        </p>
      </div>
      <article className={`${cx.card} overflow-hidden p-0 shadow-md`}>
        {domainBar && (
          <div className="flex flex-wrap items-center gap-2 border-b border-amber-200/90 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/40 sm:px-5">
            <Globe className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden />
            <span className="font-mono text-base font-semibold tracking-tight text-amber-950 dark:text-amber-100">
              {LINK_PREVIEW_HOST}
            </span>
            <span className="text-sm font-medium text-amber-900/90 dark:text-amber-200/90">
              Always show hostname — helps spot look-alike phishing domains.
            </span>
          </div>
        )}
        <a
          href="#link-preview-demo"
          className="group block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
          aria-label={`Open preview: VibeGlossary — UI patterns as prompts (${LINK_PREVIEW_HOST})`}
        >
          <div
            className="aspect-[1200/630] w-full bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500"
            role="img"
            aria-label=""
          />
          <div className="space-y-2 p-5 sm:p-6">
            {!domainBar && (
              <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                <Globe className="h-4 w-4 shrink-0" aria-hidden />
                <span className="font-mono text-zinc-600 dark:text-zinc-300">{LINK_PREVIEW_HOST}</span>
              </p>
            )}
            <h3 className="text-lg font-bold leading-snug text-zinc-900 group-hover:underline dark:text-white sm:text-xl">
              VibeGlossary — UI patterns as prompts
            </h3>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              Pick a component, copy a structured prompt, and ship UI that matches how your team talks about interface design.
            </p>
          </div>
        </a>
      </article>
    </div>
  );
}

const QR_PREVIEW_URL = 'https://vibe-glossary.web.app';

function QrCodePatternPreview({ o }) {
  const highEc = o('opt1');
  const quietZone = o('opt2');
  const altAndUrl = o('opt3');
  const [dataUrl, setDataUrl] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    setDataUrl(null);
    QRCode.toDataURL(QR_PREVIEW_URL, {
      width: 320,
      margin: quietZone ? 4 : 1,
      errorCorrectionLevel: highEc ? 'H' : 'M',
      color: { dark: '#18181b', light: '#ffffff' },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [highEc, quietZone]);

  const imgAlt = altAndUrl
    ? 'QR code that encodes the VibeGlossary site URL — scan with a phone camera to open it'
    : 'QR code';

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="text-center sm:text-left">
        <p className={PREVIEW.sectionTitle}>QR code</p>
        <p className={`${PREVIEW.lede} mt-1`}>
          Encodes a real URL — scan with a camera app. Error correction {highEc ? <strong>H</strong> : <strong>M</strong>}
          {quietZone ? '; quiet zone preserved' : '; tight margin (riskier for scanners)'}.
        </p>
      </div>
      <div
        className={`flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-zinc-200 bg-white p-4 shadow-inner dark:border-zinc-600 ${
          quietZone ? 'p-8 sm:p-10' : 'p-3'
        } ${highEc ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950' : ''}`}
      >
        {dataUrl && !failed ? (
          <img
            src={dataUrl}
            width={320}
            height={320}
            alt={imgAlt}
            className="h-auto w-full max-w-[320px] select-none"
            draggable={false}
          />
        ) : failed ? (
          <p className="text-center text-sm font-medium text-rose-600 dark:text-rose-400">Could not generate QR code.</p>
        ) : (
          <Loader2 className="h-10 w-10 animate-spin text-indigo-500" aria-label="Generating QR code" />
        )}
      </div>
      {altAndUrl && (
        <p className="break-all text-center font-mono text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {QR_PREVIEW_URL}
        </p>
      )}
    </div>
  );
}

/** @type {Record<string, (o: (id: string) => boolean) => React.ReactNode>} */
const RENDER = {
  __generic(o, id) {
    return (
      <div className={`${cx.card} flex min-h-[14rem] flex-col items-center justify-center gap-3 px-6 py-10 text-center`}>
        <p className="text-base font-semibold capitalize text-zinc-800 dark:text-zinc-100">{id.replace(/-/g, ' ')}</p>
        <p className={`${cx.muted} max-w-sm text-sm leading-relaxed`}>
          Interactive demo coming soon — definition and spec generator are ready.
        </p>
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
    return <LineChartPatternPreview o={o} />;
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

  multiselect(o) {
    return <MultiSelectPatternPreview o={o} />;
  },

  daterange(o) {
    return (
      <div className="mx-auto flex w-full max-w-md justify-center">
        <div className={`${cx.card} flex flex-wrap items-center justify-center gap-4 p-6 sm:p-7`}>
          <CalendarRange className="h-6 w-6 shrink-0 text-indigo-500" />
          <div className="flex items-center gap-3 font-mono text-base text-zinc-800 dark:text-zinc-100">
            <span className="rounded-lg border-2 border-zinc-200 px-4 py-2.5 dark:border-zinc-600">Apr 1</span>
            <span className="text-zinc-400">→</span>
            <span className="rounded-lg border-2 border-zinc-200 px-4 py-2.5 dark:border-zinc-600">Apr 18</span>
          </div>
          {o('opt1') && <span className={`${cx.pill} text-amber-800 border-amber-300 text-xs`}>Presets</span>}
        </div>
      </div>
    );
  },

  timepicker(o) {
    return (
      <div className="mx-auto flex w-full max-w-md justify-center">
        <div className={`${cx.card} flex items-center justify-center gap-5 p-7 sm:p-8`}>
          <Clock className="h-7 w-7 shrink-0 text-indigo-500" />
          <div className="flex items-center gap-2 font-mono text-2xl font-bold tabular-nums text-zinc-800 dark:text-zinc-100">
            <span className="rounded-xl bg-zinc-100 px-4 py-2.5 dark:bg-zinc-800">02</span>
            <span className="text-zinc-400">:</span>
            <span className="rounded-xl bg-zinc-100 px-4 py-2.5 dark:bg-zinc-800">30</span>
            {o('opt1') && <span className="ml-1 text-base font-semibold text-zinc-500">PM</span>}
          </div>
        </div>
      </div>
    );
  },

  colorpicker(o) {
    return <ColorPickerPatternPreview o={o} />;
  },

  combobox(o) {
    return <ComboboxPatternPreview o={o} />;
  },

  inputgroup(o) {
    return (
      <div className={PREVIEW.formNarrow}>
        <label className={PREVIEW.fieldLabel}>Website URL</label>
        <div className="flex overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-950">
          <span className="flex shrink-0 items-center border-r border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            https://
          </span>
          <input
            className="min-h-[52px] flex-1 min-w-0 border-0 bg-transparent px-3 py-3 text-base text-zinc-900 outline-none dark:text-zinc-100"
            readOnly
            value="vibe.app"
          />
          {o('opt1') && (
            <button
              type="button"
              className="shrink-0 border-l border-zinc-200 px-4 text-sm font-semibold text-indigo-600 dark:border-zinc-700 dark:text-indigo-400"
            >
              Copy
            </button>
          )}
        </div>
      </div>
    );
  },

  textfield(o) {
    return (
      <div className={PREVIEW.formNarrow}>
        <div>
          <label className={PREVIEW.fieldLabel}>Display name</label>
          <input
            className={`${PREVIEW.input} ${o('opt1') ? 'ring-2 ring-indigo-500/30' : ''}`}
            readOnly
            value="Alex"
          />
        </div>
        {o('opt2') && <p className={`${cx.muted} text-center text-sm`}>Shown on your profile</p>}
      </div>
    );
  },

  passwordfield(o) {
    return (
      <div className={PREVIEW.formNarrow}>
        <label className={PREVIEW.fieldLabel}>Password</label>
        <div className="flex overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-950">
          <input
            type="password"
            className="min-h-[52px] flex-1 border-0 bg-transparent px-5 py-3.5 text-base tracking-widest text-zinc-900 outline-none dark:text-zinc-100"
            readOnly
            value="••••••••"
          />
          {o('opt1') && (
            <button
              type="button"
              className="border-l border-zinc-200 px-5 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
            >
              Show
            </button>
          )}
        </div>
      </div>
    );
  },

  searchfield(o) {
    return (
      <div className={PREVIEW.formNarrow}>
        <label className={PREVIEW.fieldLabel}>Search</label>
        <div className="flex min-h-[52px] items-center gap-3 rounded-xl border-2 border-zinc-200 bg-white px-4 shadow-sm dark:border-zinc-600 dark:bg-zinc-950 sm:px-5">
          <span className="text-lg text-zinc-400" aria-hidden>
            ⌕
          </span>
          <input
            className="min-h-[48px] flex-1 border-0 bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            placeholder="Search…"
            readOnly
          />
          {o('opt1') && (
            <kbd className="hidden shrink-0 rounded border border-zinc-300 px-2 py-1 text-xs text-zinc-400 sm:inline dark:border-zinc-600">
              ⌘K
            </kbd>
          )}
        </div>
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
    return <MapViewPatternPreview o={o} />;
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
    return <StickyTableHeaderPatternPreview o={o} />;
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
    return <QrCodePatternPreview o={o} />;
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
    return <LinkCardPatternPreview o={o} />;
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
    return <TreeGridPatternPreview o={o} />;
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
    return <ActivityStreamPatternPreview o={o} />;
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
    return <ToggleButtonPatternPreview o={o} />;
  },

  actionsheet(o) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-xl border border-zinc-300/80 bg-zinc-300/30 dark:border-zinc-600 dark:bg-zinc-900/60 min-h-[min(22rem,50vh)] max-h-[min(26rem,58vh)]">
        {/* In-flow “screen” so height includes the sheet — avoids clipping from overflow-auto ancestors */}
        <div className="flex min-h-[6rem] flex-1 flex-col items-center justify-center px-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Page
        </div>
        <div className="shrink-0 px-2 pb-3 pt-1">
          {o('opt3') && (
            <div className="mb-2 flex justify-center" aria-hidden>
              <div className="h-1 w-12 rounded-full bg-zinc-400/90 dark:bg-zinc-500" title="Drag handle" />
            </div>
          )}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl divide-y divide-zinc-100 dark:divide-zinc-800 dark:border-zinc-700 dark:bg-zinc-900">
            {['Duplicate', 'Share'].map((x) => (
              <button key={x} type="button" className="w-full py-3.5 text-sm font-medium text-zinc-800 dark:text-zinc-100 active:bg-zinc-100 dark:active:bg-zinc-800">
                {x}
              </button>
            ))}
            <button
              type="button"
              className={`w-full py-3.5 text-sm font-semibold active:bg-zinc-100 dark:active:bg-zinc-800 ${
                o('opt1')
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              Delete
            </button>
            {o('opt2') && (
              <button
                type="button"
                className="w-full border-t border-zinc-100 bg-zinc-50 py-3.5 text-sm font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-300"
              >
                Cancel
              </button>
            )}
          </div>
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
    const delayClass = o('opt1') ? 'group-hover:delay-[240ms] delay-0' : 'group-hover:delay-0';
    const focusOpen = o('opt2')
      ? 'group-focus-within:visible group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0'
      : '';

    return (
      <div className="flex w-full min-h-[12rem] flex-col items-center justify-start pt-2">
        {/* pb-* extends the group’s hover hit area so the pointer can reach the popover without leaving :hover */}
        <div className="group relative inline-flex flex-col items-center pb-40">
          <button
            type="button"
            className="rounded-sm border-b border-dashed border-indigo-400 text-base font-semibold text-indigo-600 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500/70 dark:text-indigo-400"
          >
            @alex
          </button>
          <div
            className={`absolute left-1/2 top-full z-30 mt-3 w-64 -translate-x-1/2 translate-y-1 rounded-xl border border-zinc-200 bg-white p-4 text-left shadow-xl transition-[opacity,transform] duration-200 ease-out dark:border-zinc-700 dark:bg-zinc-900 ${delayClass} invisible pointer-events-none opacity-0 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 ${focusOpen}`}
          >
            <p className="text-base font-bold text-zinc-900 dark:text-white">Alex Rivera</p>
            <p className={`${cx.muted} mt-1 text-sm`}>Design · NYC</p>
            {o('opt3') && (
              <a
                href="#hover-card-demo"
                className="mt-3 block text-sm font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-500 dark:text-indigo-400"
                onClick={(e) => e.preventDefault()}
              >
                Open profile
              </a>
            )}
          </div>
        </div>
      </div>
    );
  },

  producttour(o) {
    const mask = o('opt2');
    const tourChrome = o('opt1');
    const reduced = o('opt3');

    return (
      <div className="w-full space-y-5">
        <p className={PREVIEW.lede}>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Product tours</span> dim the rest of the UI
          and leave a clear window on one control, plus a step card. Use <span className="font-medium">Spotlight</span> in
          the spec to compare full mask vs ring-only emphasis.
        </p>

        {mask ? (
          <div
            className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] grid-rows-[minmax(2rem,auto)_auto_minmax(3rem,1fr)] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700"
            role="img"
            aria-label="Spotlight demo: dimmed fake UI with a clear rectangle around the Export button"
          >
            <div className="col-span-3 bg-black/72 dark:bg-black/78" />
            <div className="min-h-[3rem] bg-black/72 dark:bg-black/78" />
            <div className="flex items-center justify-center px-1 py-1">
              <button
                type="button"
                className={`relative z-10 min-w-[7.5rem] rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg ${reduced ? '' : 'motion-safe:ring-2 motion-safe:ring-white/90'}`}
              >
                Export
              </button>
            </div>
            <div className="min-h-[3rem] bg-black/72 dark:bg-black/78" />
            <div className="col-span-3 min-h-[5rem] bg-black/72 dark:bg-black/78" />
          </div>
        ) : (
          <div
            className="flex min-h-[11rem] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-100/90 p-6 dark:border-zinc-600 dark:bg-zinc-900/50"
            role="img"
            aria-label="Tour without full-page mask: only the target is emphasized"
          >
            <button
              type="button"
              className={`rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md ${
                reduced ? '' : 'motion-safe:animate-pulse motion-safe:ring-4 motion-safe:ring-amber-400/90 motion-safe:ring-offset-2 motion-safe:ring-offset-zinc-100 dark:motion-safe:ring-offset-zinc-900'
              }`}
            >
              Export
            </button>
            <p className="max-w-xs text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              With <span className="font-medium text-zinc-800 dark:text-zinc-200">Spotlight</span> off, many libraries
              still pulse or ring the target instead of dimming the whole page.
            </p>
          </div>
        )}

        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-900 sm:p-5">
          <div className="flex gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-bold text-zinc-900 dark:text-white">Step 1 — Export your work</p>
              <p className={`mt-2 ${PREVIEW.lede}`}>
                This panel is the tour copy for the current step. In a real product it advances with Next / Back.
              </p>
              {tourChrome && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <button type="button" className="min-h-[44px] text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300">
                    Skip tour
                  </button>
                  <span className="text-xs font-medium tabular-nums text-zinc-400">1 / 3</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="min-h-[44px] rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
                      aria-label="Previous step"
                    >
                      Back
                    </button>
                    <button type="button" className="min-h-[44px] rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
