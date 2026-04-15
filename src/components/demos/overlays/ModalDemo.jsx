import { useState } from 'react';
import { X } from 'lucide-react';

export default function ModalDemo({ activeOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const isBlur   = activeOptions.has('blur');
  const isAnim   = activeOptions.has('anim');
  const hasFooter = activeOptions.has('footer');
  const isLarge  = activeOptions.has('size');

  return (
    <div className="flex flex-col items-center justify-center h-full relative w-full bg-zinc-50 dark:bg-zinc-900/50">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-all shadow-sm active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className={`absolute inset-0 z-50 flex items-center justify-center p-4 ${isBlur ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/50'} ${isAnim ? 'animate-fade-in' : ''}`}>
          <div className={`bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full border border-zinc-200 dark:border-zinc-800 flex flex-col ${isLarge ? 'max-w-2xl h-96' : 'max-w-sm'} ${isAnim ? 'animate-zoom-in' : ''}`}>
            <div className="flex justify-between items-start p-6 pb-2">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Confirm Action</h3>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 pt-2 space-y-4 flex-1 overflow-y-auto">
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4"></div>
              {isLarge && (
                <>
                  <div className="h-32 bg-zinc-50 dark:bg-zinc-800/50 rounded w-full mt-4 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 text-xs">
                    Extra Content Area
                  </div>
                  <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
                </>
              )}
            </div>
            {hasFooter ? (
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-b-xl flex justify-end space-x-2">
                <button onClick={() => setIsOpen(false)} className="px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-200 rounded transition dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button>
                <button onClick={() => setIsOpen(false)} className="px-3 py-1.5 text-sm bg-zinc-900 text-white rounded hover:bg-zinc-800 transition shadow-sm dark:bg-white dark:text-zinc-900">Confirm</button>
              </div>
            ) : (
              <div className="p-6 pt-0 flex justify-end space-x-2">
                <button onClick={() => setIsOpen(false)} className="px-3 py-1.5 text-sm bg-zinc-900 text-white rounded hover:bg-zinc-800 transition shadow-sm dark:bg-white dark:text-zinc-900">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
