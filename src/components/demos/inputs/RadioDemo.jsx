import { useState } from 'react';

export default function RadioDemo({ activeOptions }) {
  const [selected, setSelected] = useState(0);
  const isCards = activeOptions.has('cards');
  const hasDesc = activeOptions.has('desc');

  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="space-y-3 w-64">
        {[0, 1].map(i => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={`flex items-start cursor-pointer transition-all duration-200 ${
              isCards
                ? `p-3 border rounded-lg ${selected === i ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'}`
                : 'p-1'
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selected === i ? 'border-indigo-600' : 'border-zinc-400'}`}>
              {selected === i && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
            </div>
            <div className="ml-3">
              <div className={`text-sm font-medium ${selected === i && isCards ? 'text-indigo-900 dark:text-indigo-100' : 'text-zinc-900 dark:text-zinc-100'}`}>
                Option {i + 1}
              </div>
              {hasDesc && <div className="text-xs text-zinc-500 mt-0.5">This is a helpful description.</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
