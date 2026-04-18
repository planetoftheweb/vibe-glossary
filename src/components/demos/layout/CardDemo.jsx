export default function CardDemo({ activeOptions }) {
  const hasImage  = activeOptions.has('image');
  const hasHover  = activeOptions.has('hover');
  const hasFooter = activeOptions.has('footer');

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className={`w-full max-w-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 ${hasHover ? 'hover:-translate-y-2 hover:shadow-2xl' : 'shadow-lg'}`}>
        {hasImage && <div className="h-56 bg-zinc-200 dark:bg-zinc-700 w-full animate-pulse"></div>}
        <div className="p-6 space-y-4">
          <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-600 rounded"></div>
          <div className="space-y-3">
            <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-700 rounded"></div>
            <div className="h-3 w-5/6 bg-zinc-100 dark:bg-zinc-700 rounded"></div>
            <div className="h-3 w-4/6 bg-zinc-100 dark:bg-zinc-700 rounded"></div>
          </div>
        </div>
        {hasFooter && (
          <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-700 flex justify-end">
            <button className="text-base bg-zinc-900 text-white px-5 py-2 rounded-lg dark:bg-white dark:text-zinc-900 hover:opacity-90 font-medium">View</button>
          </div>
        )}
      </div>
    </div>
  );
}
