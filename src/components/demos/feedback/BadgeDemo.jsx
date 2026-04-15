import { Bell } from 'lucide-react';

export default function BadgeDemo({ activeOptions }) {
  const isPing = activeOptions.has('ping');
  const isDot  = activeOptions.has('dot');

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 bg-zinc-50 dark:bg-zinc-900/50 w-full">
      <div className="relative p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700">
        <Bell size={24} className="text-zinc-600 dark:text-zinc-400" />
        <span className={`absolute -top-1 -right-1 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] text-white font-bold ${isDot ? 'w-3 h-3' : 'w-5 h-5'}`}>
          {!isDot && '3'}
          {isPing && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
          )}
        </span>
      </div>
    </div>
  );
}
