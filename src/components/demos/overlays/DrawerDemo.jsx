import { useState } from 'react';
import { X } from 'lucide-react';

export default function DrawerDemo({ activeOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const side      = activeOptions.has('left') ? 'left' : 'right';
  const isBlur    = activeOptions.has('blur');
  const hasFooter = activeOptions.has('footer');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 border-2 border-zinc-300 dark:border-zinc-600 rounded-lg bg-white shadow-md dark:bg-zinc-800 text-lg font-medium text-zinc-900 dark:text-white hover:border-zinc-400"
      >
        Open {side === 'left' ? 'Left' : 'Right'} Sheet
      </button>

      {isOpen && (
        <>
          <div
            className={`absolute inset-0 bg-black/30 z-40 ${isBlur ? 'backdrop-blur-sm' : ''} animate-fade-in`}
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute inset-y-0 ${side === 'right' ? 'right-0 border-l animate-slide-in-right' : 'left-0 border-r animate-slide-in-left'} z-50 w-96 bg-white dark:bg-zinc-800 p-8 shadow-2xl flex flex-col border-zinc-200 dark:border-zinc-700`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-2xl text-zinc-900 dark:text-white">Settings</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} className="text-zinc-400" />
              </button>
            </div>
            <div className="flex-1 space-y-5">
              <div className="h-12 bg-zinc-100 dark:bg-zinc-700 rounded-lg w-full"></div>
              <div className="h-12 bg-zinc-100 dark:bg-zinc-700 rounded-lg w-full"></div>
              <div className="h-12 bg-zinc-100 dark:bg-zinc-700 rounded-lg w-2/3"></div>
            </div>
            {hasFooter && (
              <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-700 flex gap-2">
                <button className="flex-1 py-3 bg-zinc-900 text-white rounded-lg text-base font-medium dark:bg-white dark:text-zinc-900">Save</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
