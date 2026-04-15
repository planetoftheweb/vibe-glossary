import { Home, Users, Settings } from 'lucide-react';

export default function SidebarDemo({ activeOptions }) {
  const isRail  = activeOptions.has('rail');
  const hasUser = activeOptions.has('user');

  return (
    <div className="flex items-center justify-center h-full w-full bg-zinc-200 dark:bg-black p-4">
      <div className={`bg-white dark:bg-zinc-900 h-64 shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col ${isRail ? 'w-16' : 'w-48'} rounded-lg overflow-hidden`}>
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
          <div className="w-6 h-6 bg-indigo-600 rounded shrink-0"></div>
          <span className={`font-bold transition-opacity text-zinc-900 dark:text-white ${isRail ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>Acme</span>
        </div>
        <div className="flex-1 p-2 space-y-1">
          {[Home, Users, Settings].map((Icon, i) => (
            <div key={i} className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer text-zinc-600 dark:text-zinc-400">
              <Icon size={18} />
              <span className={`text-sm transition-opacity ${isRail ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>Item {i + 1}</span>
            </div>
          ))}
        </div>
        {hasUser && (
          <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full shrink-0"></div>
            <div className={`text-xs transition-opacity ${isRail ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
              <div className="font-bold text-zinc-900 dark:text-white">Jane</div>
              <div className="text-zinc-400">Admin</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
