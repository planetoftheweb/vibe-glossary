export default function TimelineDemo({ activeOptions }) {
  const isHollow = activeOptions.has('hollow');
  const isPulse  = activeOptions.has('pulse');

  return (
    <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
      <div className="space-y-0">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full border-2 transition-all ${i === 1 ? 'border-indigo-600 bg-indigo-600' : 'border-zinc-300 dark:border-zinc-700'} ${isHollow && i === 1 ? 'bg-white dark:bg-black' : ''} ${isPulse && i === 1 ? 'animate-ping' : ''}`}></div>
              {i !== 3 && <div className="w-0.5 h-8 bg-zinc-200 dark:bg-zinc-700"></div>}
            </div>
            <div className="pb-6">
              <div className="text-xs font-bold text-zinc-900 dark:text-white">Step {i}</div>
              <div className="text-[10px] text-zinc-500">Details here</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
