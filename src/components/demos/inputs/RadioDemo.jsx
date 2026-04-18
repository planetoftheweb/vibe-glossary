import { useState } from 'react';

export default function RadioDemo({ activeOptions }) {
  const [selected, setSelected] = useState(0);
  const isCards = activeOptions.has('cards');
  const hasDesc = activeOptions.has('desc');

  return (
    <div className="flex flex-col justify-center items-center h-full w-full p-8">
      <div className="space-y-4 w-full max-w-md">
        {[0, 1].map(i => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={`flex items-start cursor-pointer transition-all duration-200 ${
              isCards
                ? `p-5 border-2 rounded-xl ${selected === i ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800'}`
                : 'p-2'
            }`}
          >
            <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === i ? 'border-indigo-600' : 'border-zinc-400'}`}>
              {selected === i && <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>}
            </div>
            <div className="ml-4">
              <div className={`text-lg font-semibold ${selected === i && isCards ? 'text-indigo-900 dark:text-indigo-100' : 'text-zinc-900 dark:text-zinc-100'}`}>
                Option {i + 1}
              </div>
              {hasDesc && <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">This is a helpful description.</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
