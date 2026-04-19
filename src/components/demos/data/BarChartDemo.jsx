const DATA = [
  { label: 'Jan', value: 40 },
  { label: 'Feb', value: 72 },
  { label: 'Mar', value: 56 },
  { label: 'Apr', value: 88 },
  { label: 'May', value: 64 },
];

const max = Math.max(...DATA.map(d => d.value), 1);

/** Single row height for the vertical bar plot — tall so relative bar heights read clearly */
const BAR_ROW_HEIGHT = 'h-64 sm:h-72 md:h-80 lg:h-[22rem]';

export default function BarChartDemo({ activeOptions }) {
  const horizontal = activeOptions.has('horizontal');
  const grid = activeOptions.has('grid');
  const stacked = activeOptions.has('stacked');

  if (horizontal) {
    return (
      <div className="flex items-center justify-center h-full w-full p-6 md:p-10">
        <div className="w-full max-w-xl space-y-4 md:space-y-5">
          {DATA.map(row => (
            <div key={row.label} className="flex items-center gap-4">
              <span className="w-11 md:w-12 text-sm md:text-base text-zinc-500 dark:text-zinc-400 shrink-0 text-right font-medium">
                {row.label}
              </span>
              <div className="flex-1 h-10 md:h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative min-w-0">
                {grid && (
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    {[0, 25, 50, 75, 100].map(p => (
                      <div key={p} className="w-px h-full bg-zinc-200/50 dark:bg-zinc-700/50" style={{ marginLeft: `${p}%` }} />
                    ))}
                  </div>
                )}
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg transition-all"
                  style={{ width: `${(row.value / max) * 100}%` }}
                />
              </div>
              <span className="w-9 md:w-10 text-sm md:text-base font-semibold text-zinc-700 dark:text-zinc-200 tabular-nums shrink-0">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 md:p-10 min-h-0">
      {/* Values + bars — fixed tall row, vertically centered in preview */}
      <div className={`flex items-end justify-center gap-4 sm:gap-5 md:gap-7 w-full max-w-3xl ${BAR_ROW_HEIGHT}`}>
        {DATA.map(row => {
          const pct = (row.value / max) * 100;
          return (
            <div
              key={row.label}
              className="flex flex-col items-center justify-end h-full flex-1 min-w-0 max-w-[4.5rem] sm:max-w-[5rem]"
            >
              <span className="text-sm sm:text-base font-semibold text-zinc-600 dark:text-zinc-300 mb-2 shrink-0 tabular-nums">
                {row.value}
              </span>
              <div className="relative w-full flex-1 flex items-end justify-center min-h-0">
                {grid && (
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className="border-t border-zinc-200/60 dark:border-zinc-700/60 w-full" />
                    ))}
                  </div>
                )}
                <div
                  className="relative z-[1] w-[72%] min-w-[2.25rem] sm:min-w-[2.75rem] max-w-[3.25rem] sm:max-w-[3.75rem] rounded-t-xl bg-gradient-to-t from-indigo-600 to-violet-500 shadow-md transition-all"
                  style={{ height: `${pct}%`, minHeight: stacked ? 12 : 8 }}
                >
                  {stacked && (
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-emerald-500/90 border-t border-emerald-400/30"
                      style={{ height: '38%' }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Month labels aligned under columns */}
      <div className="flex justify-center gap-4 sm:gap-5 md:gap-7 w-full max-w-3xl mt-3 md:mt-4">
        {DATA.map(row => (
          <span
            key={`${row.label}-axis`}
            className="flex-1 min-w-0 max-w-[4.5rem] sm:max-w-[5rem] text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium truncate"
          >
            {row.label}
          </span>
        ))}
      </div>
    </div>
  );
}
