import { Bell } from 'lucide-react';

export default function BadgeDemo({ activeOptions }) {
  const isPing = activeOptions.has('ping');
  const isDot  = activeOptions.has('dot');

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 w-full p-8">
      <div className="relative p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700">
        <Bell size={56} className="text-zinc-600 dark:text-zinc-400" />
        <span className={`absolute -top-2 -right-2 bg-red-500 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center text-sm text-white font-bold ${isDot ? 'w-6 h-6' : 'w-10 h-10'}`}>
          {!isDot && '3'}
          {isPing && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
          )}
        </span>
      </div>
    </div>
  );
}
