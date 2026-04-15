export default function CardDemo({ activeOptions }) {
  const hasImage  = activeOptions.has('image');
  const hasHover  = activeOptions.has('hover');
  const hasFooter = activeOptions.has('footer');

  return (
    <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
      <div className={`w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 ${hasHover ? 'hover:-translate-y-2 hover:shadow-xl' : 'shadow-md'}`}>
        {hasImage && <div className="h-32 bg-zinc-200 dark:bg-zinc-800 w-full animate-pulse"></div>}
        <div className="p-4 space-y-3">
          <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded"></div>
            <div className="h-2 w-5/6 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
          </div>
        </div>
        {hasFooter && (
          <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded dark:bg-white dark:text-zinc-900 hover:opacity-90">View</button>
          </div>
        )}
      </div>
    </div>
  );
}
