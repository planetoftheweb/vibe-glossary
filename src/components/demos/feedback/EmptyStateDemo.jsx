import { Ghost, Search } from 'lucide-react';

export default function EmptyStateDemo({ activeOptions }) {
  const isGhost  = activeOptions.has('ghost');
  const isDashed = activeOptions.has('dashed');

  return (
    <div className="flex items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
      <div className={`flex flex-col items-center text-center p-8 rounded-xl ${isDashed ? 'border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-full' : ''}`}>
        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          {isGhost ? <Ghost size={32} className="text-zinc-400" /> : <Search size={32} className="text-zinc-400" />}
        </div>
        <h3 className="font-bold text-zinc-900 dark:text-white">No Results</h3>
        <p className="text-xs text-zinc-500 mt-1 mb-4">Try adjusting your filters.</p>
        <button className="px-4 py-2 bg-zinc-900 text-white text-sm rounded-md dark:bg-white dark:text-zinc-900 hover:opacity-90">Clear All</button>
      </div>
    </div>
  );
}
