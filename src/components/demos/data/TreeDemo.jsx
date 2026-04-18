import { useState } from 'react';
import { ChevronRight, Folder, FolderOpen, FileText, FileCode, Image } from 'lucide-react';

const TREE = [
  { id: 'src', name: 'src', type: 'folder', children: [
    { id: 'components', name: 'components', type: 'folder', children: [
      { id: 'button', name: 'Button.tsx', type: 'code' },
      { id: 'card', name: 'Card.tsx', type: 'code' },
      { id: 'modal', name: 'Modal.tsx', type: 'code' },
    ]},
    { id: 'hooks', name: 'hooks', type: 'folder', children: [
      { id: 'useAuth', name: 'useAuth.ts', type: 'code' },
      { id: 'useTheme', name: 'useTheme.ts', type: 'code' },
    ]},
    { id: 'app', name: 'App.tsx', type: 'code' },
    { id: 'main', name: 'main.tsx', type: 'code' },
  ]},
  { id: 'public', name: 'public', type: 'folder', children: [
    { id: 'logo', name: 'logo.png', type: 'image' },
    { id: 'favicon', name: 'favicon.ico', type: 'image' },
  ]},
  { id: 'readme', name: 'README.md', type: 'file' },
  { id: 'pkg', name: 'package.json', type: 'file' },
];

const FILE_ICONS = { folder: Folder, folderOpen: FolderOpen, file: FileText, code: FileCode, image: Image };

function TreeNode({ node, depth = 0, hasIcons, hasLines }) {
  const [open, setOpen] = useState(depth < 1);
  const isFolder = node.type === 'folder';
  const Icon = isFolder ? (open ? FILE_ICONS.folderOpen : FILE_ICONS.folder) : FILE_ICONS[node.type] || FILE_ICONS.file;
  const iconColor = isFolder ? 'text-amber-500' : node.type === 'code' ? 'text-blue-500' : node.type === 'image' ? 'text-emerald-500' : 'text-zinc-400';

  return (
    <div>
      <button
        onClick={() => isFolder && setOpen(!open)}
        className={`w-full flex items-center gap-2 py-2 px-3 rounded-lg text-base hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group ${isFolder ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        {isFolder && <ChevronRight size={18} className={`text-zinc-400 transition-transform ${open ? 'rotate-90' : ''}`} />}
        {!isFolder && <span className="w-4" />}
        {hasIcons && <Icon size={20} className={iconColor} />}
        <span className={`${isFolder ? 'font-medium text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>{node.name}</span>
      </button>
      {isFolder && open && (
        <div className={hasLines ? 'border-l border-zinc-200 dark:border-zinc-700 ml-5' : ''}>
          {node.children?.map(child => (
            <TreeNode key={child.id} node={child} depth={depth + 1} hasIcons={hasIcons} hasLines={hasLines} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeDemo({ activeOptions }) {
  const hasIcons = activeOptions.has('icons');
  const hasLines = activeOptions.has('lines');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow-md">
        <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider px-3 pb-3 mb-2 border-b border-zinc-100 dark:border-zinc-700">Explorer</div>
        {TREE.map(node => (
          <TreeNode key={node.id} node={node} hasIcons={hasIcons} hasLines={hasLines} />
        ))}
      </div>
    </div>
  );
}
