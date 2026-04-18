import { useState } from 'react';

export default function PopoverDemo({ activeOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasArrow      = activeOptions.has('arrow');
  const isInteractive = activeOptions.has('interactive');
  const hasFocus      = activeOptions.has('focus');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative p-8">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-6 py-3 bg-zinc-900 text-white rounded-lg text-lg font-medium hover:bg-zinc-800 shadow-md dark:bg-white dark:text-zinc-900"
        >
          {isInteractive ? 'Edit Profile' : 'View Info'}
        </button>
        {isOpen && (
          <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-96 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-6 z-20 animate-zoom-in origin-top">
            {hasArrow && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-zinc-800 border-t border-l border-zinc-200 dark:border-zinc-700 rotate-45"></div>
            )}
            {isInteractive ? (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Edit Details</h4>
                <input
                  autoFocus={hasFocus}
                  className="w-full text-base border rounded-lg p-3 dark:bg-zinc-700 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100"
                  placeholder="Username"
                />
                <input
                  className="w-full text-base border rounded-lg p-3 dark:bg-zinc-700 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100"
                  placeholder="Email"
                />
              </div>
            ) : (
              <div className="text-base text-zinc-600 dark:text-zinc-300">
                This is a read-only popover with helpful information.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
