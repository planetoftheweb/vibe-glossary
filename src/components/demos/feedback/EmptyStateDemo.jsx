import { Ghost, Search } from 'lucide-react';

export default function EmptyStateDemo({ activeOptions }) {
  const isGhost  = activeOptions.has('ghost');
  const isDashed = activeOptions.has('dashed');

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className={`flex flex-col items-center text-center p-12 rounded-2xl ${isDashed ? 'border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-full max-w-lg' : ''}`}>
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
          {isGhost ? <Ghost size={48} className="text-zinc-400" /> : <Search size={48} className="text-zinc-400" />}
        </div>
        <h3 className="font-bold text-2xl text-zinc-900 dark:text-white">No Results</h3>
        <p className="text-base text-zinc-500 mt-2 mb-6">Try adjusting your filters.</p>
        <button className="px-6 py-3 bg-zinc-900 text-white text-base rounded-lg dark:bg-white dark:text-zinc-900 hover:opacity-90 font-medium">Clear All</button>
      </div>
    </div>
  );
}
