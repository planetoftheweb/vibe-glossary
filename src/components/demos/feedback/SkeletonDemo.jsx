export default function SkeletonDemo({ activeOptions }) {
  const isShimmer = activeOptions.has('shimmer');
  const hasCircle = activeOptions.has('circle');
  const animClass = isShimmer
    ? 'animate-shimmer'
    : 'animate-pulse bg-zinc-200 dark:bg-zinc-800';

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className="w-full max-w-xl p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-5">
        <div className="flex gap-4">
          {hasCircle && <div className={`w-16 h-16 rounded-full shrink-0 ${animClass}`}></div>}
          <div className="space-y-3 w-full">
            <div className={`h-5 w-3/4 rounded ${animClass}`}></div>
            <div className={`h-5 w-1/2 rounded ${animClass}`}></div>
          </div>
        </div>
        <div className={`h-40 w-full rounded-lg ${animClass}`}></div>
      </div>
    </div>
  );
}
