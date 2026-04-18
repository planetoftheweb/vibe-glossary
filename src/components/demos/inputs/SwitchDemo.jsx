import { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function SwitchDemo({ activeOptions }) {
  const [isOn, setIsOn] = useState(false);
  const hasIcon  = activeOptions.has('icon');
  const hasLabel = activeOptions.has('label');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="flex items-center gap-4 px-8 py-6 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-md">
        {hasLabel && (
          <span className="text-xl font-semibold text-zinc-900 dark:text-white mr-6">Airplane Mode</span>
        )}
        <button
          onClick={() => setIsOn(!isOn)}
          className={`w-20 h-10 rounded-full p-1.5 transition-colors duration-300 relative ${isOn ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
        >
          <div className={`w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${isOn ? 'translate-x-10' : 'translate-x-0'}`}>
            {hasIcon && (isOn ? <Check size={16} className="text-indigo-600" /> : <X size={16} className="text-zinc-400" />)}
          </div>
        </button>
      </div>
    </div>
  );
}
