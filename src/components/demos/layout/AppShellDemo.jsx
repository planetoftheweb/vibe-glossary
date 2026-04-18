import { Search, Bell, Menu } from 'lucide-react';

export default function AppShellDemo({ activeOptions }) {
  const withSidebar = activeOptions.has('sidebar');
  const withSearch = activeOptions.has('search');
  const dense = activeOptions.has('dense');
  const h = dense ? 'h-11' : 'h-14';
  const mainPad = dense ? 'p-4' : 'p-6';

  return (
    <div className="flex items-center justify-center h-full w-full p-4 md:p-8">
      <div className="w-full max-w-4xl rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg bg-zinc-50 dark:bg-zinc-950 flex min-h-[min(420px,70vh)]">
        {withSidebar && (
          <aside className="w-14 md:w-44 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col py-3 px-2 gap-2">
            <div className="hidden md:flex items-center gap-2 px-2 py-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
              Nav
            </div>
            <button type="button" className="rounded-lg px-2 py-2 text-left text-sm bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-medium">
              Home
            </button>
            <button type="button" className="rounded-lg px-2 py-2 text-left text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              Docs
            </button>
            <button type="button" className="rounded-lg px-2 py-2 text-left text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              Data
            </button>
          </aside>
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <header className={`shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 ${h}`}>
            <div className={`flex items-center gap-3 h-full px-3 md:px-4 ${withSearch ? 'justify-between' : ''}`}>
              {!withSidebar && (
                <button type="button" className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Open menu">
                  <Menu size={20} />
                </button>
              )}
              <span className="font-bold text-zinc-900 dark:text-white truncate">Acme App</span>
              {withSearch && (
                <div className="flex-1 max-w-md mx-2 hidden sm:flex">
                  <label className="relative flex-1">
                    <span className="sr-only">Search</span>
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="search"
                      placeholder="Search…"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-transparent text-sm text-zinc-900 dark:text-zinc-100"
                    />
                  </label>
                </div>
              )}
              <button type="button" className="ml-auto p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Notifications">
                <Bell size={18} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 shrink-0" aria-hidden />
            </div>
          </header>
          <main className={`flex-1 ${mainPad} text-zinc-600 dark:text-zinc-400 text-sm`}>
            <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Main content</p>
            <p>Pages render inside this region. The shell stays put while routes change.</p>
          </main>
        </div>
      </div>
    </div>
  );
}
