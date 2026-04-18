import { useState } from 'react';
import { Search, X } from 'lucide-react';

const PRESETS = ['Active users', 'Enterprise'];

export default function FilterBarDemo({ activeOptions }) {
  const showChips = activeOptions.has('chips');
  const showDate = activeOptions.has('date');
  const showSaved = activeOptions.has('saved');
  const [q, setQ] = useState('');
  const [chips, setChips] = useState(['Status: Active', 'Region: US']);
  const [preset, setPreset] = useState('');

  const remove = (c) => setChips(chips.filter(x => x !== c));

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 md:p-8">
      <div className="w-full max-w-3xl space-y-4">
        <div
          role="search"
          aria-label="Filter demo"
          className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
        >
          <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 shadow-sm">
            <Search size={18} className="text-zinc-400 shrink-0" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search…"
              className="flex-1 bg-transparent outline-none text-base text-zinc-900 dark:text-zinc-100 min-h-[44px]"
            />
          </div>
          {showDate && (
            <div className="flex gap-2 items-center text-sm text-zinc-600 dark:text-zinc-400">
              <label className="sr-only" htmlFor="fb-from">From</label>
              <input id="fb-from" type="date" className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-2 py-2 min-h-[44px]" />
              <span>–</span>
              <label className="sr-only" htmlFor="fb-to">To</label>
              <input id="fb-to" type="date" className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-2 py-2 min-h-[44px]" />
            </div>
          )}
          {showSaved && (
            <div className="flex items-center gap-2">
              <label htmlFor="fb-preset" className="sr-only">Saved view</label>
              <select
                id="fb-preset"
                value={preset}
                onChange={e => setPreset(e.target.value)}
                className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm min-h-[44px]"
              >
                <option value="">Saved views…</option>
                {PRESETS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        {showChips && chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {chips.map(c => (
              <span
                key={c}
                className="inline-flex items-center gap-1 pl-3 pr-1 py-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-700 text-sm text-zinc-800 dark:text-zinc-100"
              >
                {c}
                <button
                  type="button"
                  className="p-1.5 rounded-full hover:bg-zinc-300/80 dark:hover:bg-zinc-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={`Remove ${c}`}
                  onClick={() => remove(c)}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 px-2 py-2 min-h-[44px]"
              onClick={() => setChips([])}
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
