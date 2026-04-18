import { useState } from 'react';
import { Search, FileText, Settings, Users, Zap, ArrowRight, Command, Hash } from 'lucide-react';

const COMMANDS = [
  { id: 'new', label: 'New File', icon: FileText, shortcut: '⌘N', group: 'Actions' },
  { id: 'settings', label: 'Open Settings', icon: Settings, shortcut: '⌘,', group: 'Actions' },
  { id: 'team', label: 'Invite Team Member', icon: Users, shortcut: null, group: 'Actions' },
  { id: 'deploy', label: 'Deploy to Production', icon: Zap, shortcut: '⌘⇧D', group: 'Actions' },
  { id: 'docs', label: 'Documentation', icon: FileText, shortcut: null, group: 'Navigation' },
  { id: 'dash', label: 'Dashboard', icon: Hash, shortcut: null, group: 'Navigation' },
];

export default function CommandPaletteDemo({ activeOptions }) {
  const hasFuzzy = activeOptions.has('fuzzy');
  const hasGroups = activeOptions.has('groups');
  const hasRecent = activeOptions.has('recent');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const filtered = query
    ? COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : COMMANDS;

  const groups = hasGroups
    ? [...new Set(filtered.map(c => c.group))]
    : [null];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100 dark:border-zinc-700">
          <Search size={22} className="text-zinc-400 shrink-0" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setActive(0); }}
            placeholder={hasFuzzy ? 'Type to fuzzy search...' : 'Search commands...'}
            className="bg-transparent outline-none text-base w-full text-zinc-900 dark:text-white placeholder:text-zinc-400"
            autoFocus
          />
          <kbd className="hidden sm:inline text-xs font-mono bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded text-zinc-400 shrink-0">ESC</kbd>
        </div>

        {hasRecent && !query && (
          <div className="px-3 py-3 border-b border-zinc-100 dark:border-zinc-700">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-3 mb-1.5">Recent</p>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-base text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-lg transition-colors">
              <Settings size={18} /> Open Settings
            </button>
          </div>
        )}

        <div className="max-h-80 overflow-y-auto p-2">
          {groups.map(group => (
            <div key={group || 'all'}>
              {group && <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-3 pt-3 pb-1.5">{group}</p>}
              {filtered.filter(c => !hasGroups || c.group === group).map((cmd, i) => {
                const Icon = cmd.icon;
                const isActive = i === active;
                return (
                  <button
                    key={cmd.id}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base transition-colors ${
                      isActive ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span className="font-medium">{cmd.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {cmd.shortcut && <kbd className="text-xs font-mono text-zinc-400 bg-zinc-50 dark:bg-zinc-600 px-2 py-1 rounded">{cmd.shortcut}</kbd>}
                      {isActive && <ArrowRight size={16} className="text-zinc-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-base text-zinc-400 py-10">No results found</p>
          )}
        </div>

        <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-700 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <div className="flex items-center gap-1"><Command size={11} />K</div>
        </div>
      </div>
    </div>
  );
}
