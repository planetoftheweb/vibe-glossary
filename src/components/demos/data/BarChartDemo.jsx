const DATA = [
  { label: 'Jan', value: 40 },
  { label: 'Feb', value: 72 },
  { label: 'Mar', value: 56 },
  { label: 'Apr', value: 88 },
  { label: 'May', value: 64 },
];

const max = Math.max(...DATA.map(d => d.value), 1);

export default function BarChartDemo({ activeOptions }) {
  const horizontal = activeOptions.has('horizontal');
  const grid = activeOptions.has('grid');
  const stacked = activeOptions.has('stacked');

  if (horizontal) {
    return (
      <div className="flex items-center justify-center h-full w-full p-6">
        <div className="w-full max-w-lg space-y-3">
          {DATA.map(row => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-10 text-sm text-zinc-500 dark:text-zinc-400 shrink-0 text-right">{row.label}</span>
              <div className="flex-1 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden relative">
                {grid && (
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    {[0, 25, 50, 75, 100].map(p => (
                      <div key={p} className="w-px h-full bg-zinc-200/50 dark:bg-zinc-700/50" style={{ marginLeft: `${p}%` }} />
                    ))}
                  </div>
                )}
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-md transition-all"
                  style={{ width: `${(row.value / max) * 100}%` }}
                />
              </div>
              <span className="w-8 text-sm font-medium text-zinc-700 dark:text-zinc-200">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end justify-center h-full w-full p-6 pb-12">
      <div className="flex items-end gap-4 md:gap-6 h-56 md:h-64 w-full max-w-lg px-2">
        {DATA.map(row => (
          <div key={row.label} className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{row.value}</span>
            <div className="relative w-full flex-1 flex items-end min-h-[120px]">
              {grid && (
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="border-t border-zinc-200/60 dark:border-zinc-700/60 w-full" />
                  ))}
                </div>
              )}
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-violet-500 relative z-[1] min-h-[8px] transition-all"
                style={{ height: `${(row.value / max) * 100}%` }}
              >
                {stacked && (
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-emerald-500/85"
                    style={{ height: '35%' }}
                  />
                )}
              </div>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate w-full text-center">{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
