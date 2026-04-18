import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const PRESETS = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This month'];

export default function DatePickerDemo({ activeOptions }) {
  const isRange = activeOptions.has('range');
  const hasPresets = activeOptions.has('presets');
  const hasTime = activeOptions.has('time');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(isRange ? 'Apr 10 – Apr 17, 2026' : 'April 15, 2026');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="w-full max-w-md relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm hover:border-zinc-400 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-zinc-400" />
            <span className="text-lg text-zinc-900 dark:text-white font-medium">{value}</span>
          </div>
          <ChevronDown size={18} className={`text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in">
            {hasPresets && (
              <div className="border-b border-zinc-100 dark:border-zinc-700 p-3">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-3 mb-2">Quick Select</p>
                {PRESETS.map(p => (
                  <button key={p} onClick={() => { setValue(p); setOpen(false); }} className="w-full text-left px-4 py-2 text-base text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-md transition-colors">
                    {p}
                  </button>
                ))}
              </div>
            )}
            <div className="p-5">
              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} className="text-center text-xs font-semibold text-zinc-400 py-1.5">{d}</div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - 2;
                  if (day < 1 || day > 30) return <div key={i} />;
                  const isSelected = day === 15 || (isRange && day >= 10 && day <= 17);
                  return (
                    <button key={i} className={`aspect-square flex items-center justify-center rounded-md text-sm transition-all ${
                      isSelected ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                    }`}>
                      {day}
                    </button>
                  );
                })}
              </div>
              {hasTime && (
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-700">
                  <span className="text-sm text-zinc-400">Time:</span>
                  <input type="time" defaultValue="09:00" className="text-base bg-zinc-100 dark:bg-zinc-700 border-none rounded px-3 py-1.5 text-zinc-900 dark:text-white outline-none" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
