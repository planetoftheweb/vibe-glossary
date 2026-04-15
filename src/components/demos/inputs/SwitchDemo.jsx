import { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function SwitchDemo({ activeOptions }) {
  const [isOn, setIsOn] = useState(false);
  const hasIcon  = activeOptions.has('icon');
  const hasLabel = activeOptions.has('label');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
      <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        {hasLabel && (
          <span className="text-sm font-medium text-zinc-900 dark:text-white mr-4">Airplane Mode</span>
        )}
        <button
          onClick={() => setIsOn(!isOn)}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${isOn ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center ${isOn ? 'translate-x-6' : 'translate-x-0'}`}>
            {hasIcon && (isOn ? <Check size={10} className="text-indigo-600" /> : <X size={10} className="text-zinc-400" />)}
          </div>
        </button>
      </div>
    </div>
  );
}
