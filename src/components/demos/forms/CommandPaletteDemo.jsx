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
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <Search size={18} className="text-zinc-400 shrink-0" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setActive(0); }}
            placeholder={hasFuzzy ? 'Type to fuzzy search...' : 'Search commands...'}
            className="bg-transparent outline-none text-sm w-full text-zinc-900 dark:text-white placeholder:text-zinc-400"
            autoFocus
          />
          <kbd className="hidden sm:inline text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 shrink-0">ESC</kbd>
        </div>

        {hasRecent && !query && (
          <div className="px-2 py-2 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2 mb-1">Recent</p>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">
              <Settings size={14} /> Open Settings
            </button>
          </div>
        )}

        <div className="max-h-64 overflow-y-auto p-2">
          {groups.map(group => (
            <div key={group || 'all'}>
              {group && <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2 pt-2 pb-1">{group}</p>}
              {filtered.filter(c => !hasGroups || c.group === group).map((cmd, i) => {
                const Icon = cmd.icon;
                const isActive = i === active;
                return (
                  <button
                    key={cmd.id}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={15} />
                      <span className="font-medium">{cmd.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {cmd.shortcut && <kbd className="text-[10px] font-mono text-zinc-400 bg-zinc-50 dark:bg-zinc-700 px-1.5 py-0.5 rounded">{cmd.shortcut}</kbd>}
                      {isActive && <ArrowRight size={12} className="text-zinc-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-zinc-400 py-8">No results found</p>
          )}
        </div>

        <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <div className="flex items-center gap-1"><Command size={9} />K</div>
        </div>
      </div>
    </div>
  );
}
