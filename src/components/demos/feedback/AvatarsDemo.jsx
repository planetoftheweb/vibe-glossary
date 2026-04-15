export default function AvatarsDemo({ activeOptions }) {
  const isOverlap = activeOptions.has('overlap');
  const isRing    = activeOptions.has('ring');

  return (
    <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
      <div className={`flex ${isOverlap ? '-space-x-4' : '-space-x-2'}`}>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-600 ${isRing ? 'ring-4 ring-white dark:ring-zinc-900' : 'border-2 border-white dark:border-zinc-900'}`}
          >
            U{i}
          </div>
        ))}
        <div className={`w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 ${isRing ? 'ring-4 ring-white dark:ring-zinc-900' : 'border-2 border-white dark:border-zinc-900'}`}>
          +5
        </div>
      </div>
    </div>
  );
}
