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
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
      <div className={`w-64 bg-white dark:bg-zinc-900 rounded-lg overflow-hidden ${isBorder ? 'border border-zinc-200 dark:border-zinc-800' : 'shadow-sm'}`}>
        {[0, 1, 2].map(i => (
          <div key={i} className={`${isBorder && i > 0 ? 'border-t border-zinc-100 dark:border-zinc-800' : ''}`}>
            <button onClick={() => toggle(i)} className="w-full flex justify-between p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <span className="text-sm font-medium text-zinc-900 dark:text-white">Question {i + 1}?</span>
              <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${openState[i] ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openState[i] ? 'max-h-20 p-3 pt-0 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-xs text-zinc-500">This is the expandable content area with details.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
