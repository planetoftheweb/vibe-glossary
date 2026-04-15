import { Menu, Sun, Moon, Command, Type } from 'lucide-react';

export default function TopNav({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen, activeFilter, setActiveFilter, onGetStarted }) {
  return (
    <header className="h-14 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 shrink-0 z-50 fixed top-0 left-0 right-0">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-zinc-900 dark:text-white mr-4">
          <div className="bg-indigo-600 p-1 rounded-md text-white">
            <Type size={16} />
          </div>
          <span>VibeGlossary</span>
        </div>
        <div className="hidden md:flex h-5 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
        <nav className="hidden md:flex gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {['All', 'Components', 'Patterns', 'Showcase'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter === 'All' ? null : filter)}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                (activeFilter === filter) || (filter === 'All' && !activeFilter)
                  ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
                  : 'hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs text-zinc-500 font-mono mr-2">
          <Command size={10} /> K
        </div>
        <button
          onClick={onGetStarted}
          className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-1.5 rounded-md text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}
