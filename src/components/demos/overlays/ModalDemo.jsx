import { useState } from 'react';
import { X } from 'lucide-react';

export default function ModalDemo({ activeOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  /** Bumps on each open so CSS entrance animations replay (otherwise they only run once per mount). */
  const [openNonce, setOpenNonce] = useState(0);
  const isBlur   = activeOptions.has('blur');
  const isAnim   = activeOptions.has('anim');
  const hasFooter = activeOptions.has('footer');
  const isLarge  = activeOptions.has('size');

  const handleOpen = () => {
    setOpenNonce((n) => n + 1);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative w-full p-8">
      <button
        type="button"
        onClick={handleOpen}
        className="px-6 py-3 bg-zinc-900 text-white rounded-lg text-lg font-medium hover:bg-zinc-800 transition-all shadow-md active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          key={openNonce}
          className={`absolute inset-0 z-50 flex items-center justify-center p-8 ${isBlur ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/50'} ${isAnim ? 'animate-modal-backdrop' : ''}`}
        >
          <div
            className={`bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full border border-zinc-200 dark:border-zinc-700 flex flex-col ${isLarge ? 'max-w-3xl h-[28rem]' : 'max-w-md'} ${isAnim ? 'animate-modal-dialog' : ''}`}
          >
            <div className="flex justify-between items-start p-8 pb-3">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Confirm Action</h3>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 pt-3 space-y-4 flex-1 overflow-y-auto">
              <div className="h-5 bg-zinc-100 dark:bg-zinc-700 rounded w-full"></div>
              <div className="h-5 bg-zinc-100 dark:bg-zinc-700 rounded w-3/4"></div>
              {isLarge && (
                <>
                  <div className="h-48 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg w-full mt-6 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center text-zinc-400 text-base">
                    Extra Content Area
                  </div>
                  <div className="h-5 bg-zinc-100 dark:bg-zinc-700 rounded w-full"></div>
                </>
              )}
            </div>
            {hasFooter ? (
              <div className="p-5 border-t border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 rounded-b-2xl flex justify-end space-x-3">
                <button onClick={() => setIsOpen(false)} className="px-5 py-2.5 text-base font-medium text-zinc-600 hover:bg-zinc-200 rounded-lg transition dark:text-zinc-300 dark:hover:bg-zinc-700">Cancel</button>
                <button onClick={() => setIsOpen(false)} className="px-5 py-2.5 text-base font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition shadow-sm dark:bg-white dark:text-zinc-900">Confirm</button>
              </div>
            ) : (
              <div className="p-8 pt-0 flex justify-end space-x-3">
                <button onClick={() => setIsOpen(false)} className="px-5 py-2.5 text-base font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition shadow-sm dark:bg-white dark:text-zinc-900">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
