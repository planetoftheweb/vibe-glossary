export default function TimelineDemo({ activeOptions }) {
  const isHollow = activeOptions.has('hollow');
  const isPulse  = activeOptions.has('pulse');

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className="space-y-0">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full border-2 transition-all ${i === 1 ? 'border-indigo-600 bg-indigo-600' : 'border-zinc-300 dark:border-zinc-700'} ${isHollow && i === 1 ? 'bg-white dark:bg-zinc-900' : ''} ${isPulse && i === 1 ? 'animate-ping' : ''}`}></div>
              {i !== 3 && <div className="w-0.5 h-16 bg-zinc-200 dark:bg-zinc-700"></div>}
            </div>
            <div className="pb-10">
              <div className="text-lg font-bold text-zinc-900 dark:text-white">Step {i}</div>
              <div className="text-sm text-zinc-500 mt-1">Details here</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
