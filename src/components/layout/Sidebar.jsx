import { Search, SidebarClose } from 'lucide-react';
import { CATEGORY_COLORS } from '../../data/categories';

export default function Sidebar({ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen, activeItem, setActiveItem, searchTerm, setSearchTerm, filteredCategories, searchInputRef }) {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 pt-14 flex flex-col
      transition-transform duration-300 ease-in-out
      w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800
      lg:relative lg:translate-x-0 lg:z-auto lg:pt-0
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Navigation</span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          title="Collapse Sidebar"
        >
          <SidebarClose size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="relative group">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-md outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {filteredCategories.map(cat => {
          const colors = CATEGORY_COLORS[cat.id] || CATEGORY_COLORS.overlays;
          return (
            <div key={cat.id}>
              <div className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-2 px-2 ${colors.text}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                {cat.icon}
                <span>{cat.name}</span>
              </div>
              <ul className="space-y-0.5">
                {cat.items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveItem(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        activeItem === item.id
                          ? `${colors.active} shadow-sm`
                          : `text-zinc-600 dark:text-zinc-400 ${colors.hover} hover:text-zinc-900 dark:hover:text-zinc-200`
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {filteredCategories.length === 0 && (
          <div className="p-4 text-center text-xs text-zinc-400">No components found.</div>
        )}
      </nav>
    </aside>
  );
}
