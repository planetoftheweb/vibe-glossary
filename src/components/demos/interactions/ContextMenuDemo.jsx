import { useState } from 'react';
import { Copy, Scissors, Clipboard, Trash2, Edit3, Share2, MoreHorizontal, FolderPlus } from 'lucide-react';

const MENU_ITEMS = [
  { icon: Scissors, label: 'Cut', shortcut: '⌘X' },
  { icon: Copy, label: 'Copy', shortcut: '⌘C' },
  { icon: Clipboard, label: 'Paste', shortcut: '⌘V' },
  null,
  { icon: Edit3, label: 'Rename', shortcut: 'F2' },
  { icon: FolderPlus, label: 'Move to...', shortcut: null },
  { icon: Share2, label: 'Share', shortcut: null },
  null,
  { icon: Trash2, label: 'Delete', shortcut: '⌘⌫', danger: true },
];

export default function ContextMenuDemo({ activeOptions }) {
  const hasIcons = activeOptions.has('icons');
  const hasShortcuts = activeOptions.has('shortcuts');
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const [selected, setSelected] = useState(null);

  const handleContext = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ visible: true, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleClick = (label) => {
    setSelected(label);
    setMenu({ ...menu, visible: false });
    setTimeout(() => setSelected(null), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div
        onContextMenu={handleContext}
        onClick={() => setMenu({ ...menu, visible: false })}
        className="relative w-full max-w-md h-64 bg-white dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-xl flex flex-col items-center justify-center cursor-context-menu select-none"
      >
        <MoreHorizontal size={24} className="text-zinc-300 dark:text-zinc-600 mb-2" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Right-click anywhere here</p>
        <p className="text-xs text-zinc-400 mt-1">or long-press on mobile</p>

        {selected && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-3 py-1.5 rounded-full text-xs font-medium animate-fade-in">
            {selected} triggered
          </div>
        )}

        {menu.visible && (
          <div
            className="absolute bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl z-50 py-1.5 min-w-[180px] animate-fade-in"
            style={{ left: menu.x, top: menu.y }}
            onClick={e => e.stopPropagation()}
          >
            {MENU_ITEMS.map((item, i) => {
              if (!item) return <div key={i} className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />;
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.label)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                    item.danger ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {hasIcons && <Icon size={14} />}
                    {item.label}
                  </div>
                  {hasShortcuts && item.shortcut && <kbd className="text-[10px] font-mono text-zinc-400">{item.shortcut}</kbd>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
