import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AccordionDemo({ activeOptions }) {
  const [openState, setOpenState] = useState({ 0: true });
  const isMulti  = activeOptions.has('multi');
  const isBorder = activeOptions.has('border');

  const toggle = (i) => {
    if (isMulti) {
      setOpenState(prev => ({ ...prev, [i]: !prev[i] }));
    } else {
      setOpenState(prev => ({ ...(!prev[i] ? { [i]: true } : {}) }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className={`w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-xl overflow-hidden ${isBorder ? 'border border-zinc-200 dark:border-zinc-700' : 'shadow-md'}`}>
        {[0, 1, 2].map(i => (
          <div key={i} className={`${isBorder && i > 0 ? 'border-t border-zinc-100 dark:border-zinc-700' : ''}`}>
            <button onClick={() => toggle(i)} className="w-full flex justify-between items-center p-5 hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">Question {i + 1}?</span>
              <ChevronDown size={22} className={`text-zinc-400 transition-transform duration-200 ${openState[i] ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openState[i] ? 'max-h-32 p-5 pt-0 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-base text-zinc-500 dark:text-zinc-400">This is the expandable content area with details.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
