export default function MasonryDemo({ activeOptions }) {
  const isAnim     = activeOptions.has('anim');
  const isGapless  = activeOptions.has('gap');

  return (
    <div className="h-full w-full p-8 overflow-hidden flex items-center justify-center">
      <div className={`columns-3 ${isGapless ? 'gap-1' : 'gap-5'} w-full max-w-2xl`}>
        {[12, 24, 16, 32, 20, 28].map((h, i) => (
          <div
            key={i}
            className={`w-full bg-zinc-300 dark:bg-zinc-700 rounded-xl mb-4 break-inside-avoid ${isAnim ? 'animate-slide-in-up' : ''}`}
            style={{ height: `${h * 6}px`, animationDelay: `${i * 100}ms` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
