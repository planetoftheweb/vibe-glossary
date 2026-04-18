import { Home, Users, Settings } from 'lucide-react';

export default function SidebarDemo({ activeOptions }) {
  const isRail  = activeOptions.has('rail');
  const hasUser = activeOptions.has('user');

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className={`bg-white dark:bg-zinc-800 h-96 shadow-xl border border-zinc-200 dark:border-zinc-700 transition-all duration-300 flex flex-col ${isRail ? 'w-20' : 'w-72'} rounded-xl overflow-hidden`}>
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-700 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg shrink-0"></div>
          <span className={`font-bold text-lg transition-opacity text-zinc-900 dark:text-white ${isRail ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>Acme</span>
        </div>
        <div className="flex-1 p-3 space-y-1">
          {[Home, Users, Settings].map((Icon, i) => (
            <div key={i} className="flex items-center gap-4 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg cursor-pointer text-zinc-600 dark:text-zinc-400">
              <Icon size={22} />
              <span className={`text-base transition-opacity ${isRail ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>Item {i + 1}</span>
            </div>
          ))}
        </div>
        {hasUser && (
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-700 flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-700 rounded-full shrink-0"></div>
            <div className={`text-sm transition-opacity ${isRail ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
              <div className="font-bold text-zinc-900 dark:text-white">Jane</div>
              <div className="text-zinc-400">Admin</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
