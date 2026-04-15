export default function SkeletonDemo({ activeOptions }) {
  const isShimmer = activeOptions.has('shimmer');
  const hasCircle = activeOptions.has('circle');
  const animClass = isShimmer
    ? 'animate-shimmer'
    : 'animate-pulse bg-zinc-200 dark:bg-zinc-800';

  return (
    <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
      <div className="w-64 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex gap-3">
          {hasCircle && <div className={`w-10 h-10 rounded-full shrink-0 ${animClass}`}></div>}
          <div className="space-y-2 w-full">
            <div className={`h-3 w-3/4 rounded ${animClass}`}></div>
            <div className={`h-3 w-1/2 rounded ${animClass}`}></div>
          </div>
        </div>
        <div className={`h-24 w-full rounded ${animClass}`}></div>
      </div>
    </div>
  );
}
