import { useState } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

export default function SelectDemo({ activeOptions }) {
  const [isOpen, setIsOpen]     = useState(false);
  const [selected, setSelected] = useState(['Framework']);
  const isCombobox = activeOptions.has('combobox');
  const isMulti    = activeOptions.has('multi');
  const hasAvatars = activeOptions.has('avatars');

  const toggleSelection = (item) => {
    if (isMulti) {
      if (selected.includes(item)) {
        setSelected(selected.filter(i => i !== item));
      } else {
        setSelected(selected.includes('Framework') ? [item] : [...selected, item]);
      }
    } else {
      setSelected([item]);
      setIsOpen(false);
    }
  };

  const displayValue = isMulti
    ? (selected.includes('Framework') ? 'Select Frameworks...' : `${selected.length} selected`)
    : selected[0];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50">
      <div className="w-64 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-4 py-2.5 border rounded-lg bg-white dark:bg-zinc-900 dark:border-zinc-800 hover:border-zinc-400 transition-all shadow-sm text-left group"
        >
          {isMulti && !selected.includes('Framework') ? (
            <div className="flex gap-1 overflow-hidden">
              {selected.map(s => (
                <span key={s} className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap text-zinc-900 dark:text-zinc-200">{s}</span>
              ))}
            </div>
          ) : (
            <span className={`text-sm ${selected.includes('Framework') ? 'text-zinc-400' : 'text-zinc-900 dark:text-zinc-200'}`}>{displayValue}</span>
          )}
          <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} group-hover:text-zinc-600`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-lg z-20 overflow-hidden animate-slide-in-up origin-top">
            {isCombobox && (
              <div className="p-2 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center px-2 py-1.5 bg-zinc-50 dark:bg-zinc-950 rounded-md border border-zinc-200 dark:border-zinc-800">
                  <Search size={14} className="text-zinc-400 mr-2" />
                  <input className="bg-transparent border-none outline-none text-xs w-full placeholder:text-zinc-400 text-zinc-700 dark:text-zinc-200" placeholder="Search..." autoFocus />
                </div>
              </div>
            )}
            <div className="max-h-48 overflow-y-auto p-1">
              {['React', 'Vue', 'Svelte', 'Solid', 'Angular'].map((fw) => (
                <div
                  key={fw}
                  onClick={() => toggleSelection(fw)}
                  className={`px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer text-sm text-zinc-700 dark:text-zinc-200 flex items-center justify-between transition-colors ${selected.includes(fw) ? 'bg-zinc-50 dark:bg-zinc-800/50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {hasAvatars && (
                      <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[8px] text-indigo-700 dark:text-indigo-300 font-bold border border-zinc-200 dark:border-zinc-700">{fw[0]}</div>
                    )}
                    <span>{fw}</span>
                  </div>
                  {selected.includes(fw) && <Check size={14} className="text-indigo-600 animate-zoom-in" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
