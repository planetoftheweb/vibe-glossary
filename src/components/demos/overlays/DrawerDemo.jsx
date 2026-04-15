import { useState } from 'react';
import { X } from 'lucide-react';

export default function DrawerDemo({ activeOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const side      = activeOptions.has('left') ? 'left' : 'right';
  const isBlur    = activeOptions.has('blur');
  const hasFooter = activeOptions.has('footer');

  return (
    <div className="flex flex-col items-center justify-center h-full relative bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border border-zinc-300 rounded-md bg-white shadow-sm dark:bg-zinc-800 dark:border-zinc-700"
      >
        Open {side === 'left' ? 'Left' : 'Right'} Sheet
      </button>

      {isOpen && (
        <>
          <div
            className={`absolute inset-0 bg-black/20 z-40 ${isBlur ? 'backdrop-blur-sm' : ''} animate-fade-in`}
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute inset-y-0 ${side === 'right' ? 'right-0 border-l animate-slide-in-right' : 'left-0 border-r animate-slide-in-left'} z-50 w-72 bg-white dark:bg-zinc-900 p-6 shadow-2xl flex flex-col`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg dark:text-white">Settings</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={18} className="text-zinc-400" />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
              <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
              <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded w-2/3"></div>
            </div>
            {hasFooter && (
              <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
                <button className="flex-1 py-2 bg-zinc-900 text-white rounded text-sm dark:bg-white dark:text-zinc-900">Save</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
