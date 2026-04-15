export default function MasonryDemo({ activeOptions }) {
  const isAnim     = activeOptions.has('anim');
  const isGapless  = activeOptions.has('gap');

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-6 overflow-hidden flex items-center justify-center">
      <div className={`columns-3 ${isGapless ? 'gap-1' : 'gap-4'} w-64`}>
        {[12, 24, 16, 32, 20, 28].map((h, i) => (
          <div
            key={i}
            className={`w-full bg-zinc-300 dark:bg-zinc-700 rounded-lg mb-2 break-inside-avoid ${isAnim ? 'animate-slide-in-up' : ''}`}
            style={{ height: `${h * 4}px`, animationDelay: `${i * 100}ms` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
