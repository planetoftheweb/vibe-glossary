import { useState } from 'react';

export default function PopoverDemo({ activeOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasArrow      = activeOptions.has('arrow');
  const isInteractive = activeOptions.has('interactive');
  const hasFocus      = activeOptions.has('focus');

  return (
    <div className="flex flex-col items-center justify-center h-full relative bg-zinc-50 dark:bg-zinc-900/50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
        >
          {isInteractive ? 'Edit Profile' : 'View Info'}
        </button>
        {isOpen && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-4 z-20 animate-zoom-in origin-top">
            {hasArrow && (
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-zinc-900 border-t border-l border-zinc-200 dark:border-zinc-800 rotate-45"></div>
            )}
            {isInteractive ? (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-500 uppercase">Edit Details</h4>
                <input
                  autoFocus={hasFocus}
                  className="w-full text-sm border rounded p-1.5 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  placeholder="Username"
                />
                <input
                  className="w-full text-sm border rounded p-1.5 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  placeholder="Email"
                />
              </div>
            ) : (
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                This is a read-only popover with helpful information.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
