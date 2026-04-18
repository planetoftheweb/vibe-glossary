import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, CreditCard, MoreHorizontal } from 'lucide-react';

export default function DropdownMenuDemo({ activeOptions }) {
  const withIcons = activeOptions.has('icons');
  const withSep = activeOptions.has('separator');
  const withDanger = activeOptions.has('danger');
  const [open, setOpen] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-haspopup="true"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium shadow-sm min-h-[44px]"
        >
          <MoreHorizontal size={18} />
          Account
        </button>
        {open && (
          <ul
            role="menu"
            className="absolute left-0 top-full mt-2 min-w-[200px] rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-900 shadow-xl py-1 z-20"
          >
            <li role="menuitem" className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer rounded-lg mx-1">
              {withIcons && <User size={16} className="text-zinc-400" />}
              Profile
            </li>
            <li role="menuitem" className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer rounded-lg mx-1">
              {withIcons && <CreditCard size={16} className="text-zinc-400" />}
              Billing
            </li>
            {withSep && <li className="my-1 h-px bg-zinc-200 dark:bg-zinc-700 mx-2" aria-hidden />}
            <li role="menuitem" className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer rounded-lg mx-1">
              {withIcons && <Settings size={16} className="text-zinc-400" />}
              Settings
            </li>
            {withDanger && (
              <li
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer rounded-lg mx-1"
              >
                {withIcons && <LogOut size={16} />}
                Log out
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
