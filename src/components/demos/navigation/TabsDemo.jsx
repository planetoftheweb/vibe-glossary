import { useState } from 'react';
import { User } from 'lucide-react';

export default function TabsDemo({ activeOptions }) {
  const [active, setActive] = useState(0);
  const isPills    = activeOptions.has('pills');
  const isUnderline = activeOptions.has('underline');
  const isIcons   = activeOptions.has('icons');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
      <div className={`flex ${isPills ? 'bg-zinc-200 dark:bg-zinc-800 p-1 rounded-full' : 'border-b border-zinc-200 dark:border-zinc-700 gap-4'}`}>
        {[0, 1, 2].map(i => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm relative transition-all ${isPills ? (active === i ? 'text-zinc-900 bg-white shadow rounded-full' : 'text-zinc-500') : (active === i ? 'text-indigo-600 font-bold dark:text-indigo-400' : 'text-zinc-500')}`}
          >
            {isIcons ? <User size={16} /> : `Tab ${i + 1}`}
            {isUnderline && active === i && !isPills && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 animate-zoom-in" />
            )}
          </button>
        ))}
      </div>
      <div className="mt-8 p-4 border border-dashed border-zinc-300 dark:border-zinc-700 rounded w-48 h-24 flex items-center justify-center text-zinc-400 text-xs">
        Content {active + 1}
      </div>
    </div>
  );
}
