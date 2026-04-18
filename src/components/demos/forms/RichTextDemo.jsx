import { Bold, Italic, Underline, List, ListOrdered, Link, Image, AlignLeft, AlignCenter, AlignRight, Code, Heading1, Heading2 } from 'lucide-react';

const TOOLBAR_GROUPS = [
  [{ icon: Heading1, label: 'H1' }, { icon: Heading2, label: 'H2' }],
  [{ icon: Bold, label: 'Bold', active: true }, { icon: Italic, label: 'Italic' }, { icon: Underline, label: 'Underline' }, { icon: Code, label: 'Code' }],
  [{ icon: List, label: 'Bullet List' }, { icon: ListOrdered, label: 'Numbered List' }],
  [{ icon: AlignLeft, label: 'Left', active: true }, { icon: AlignCenter, label: 'Center' }, { icon: AlignRight, label: 'Right' }],
  [{ icon: Link, label: 'Link' }, { icon: Image, label: 'Image' }],
];

export default function RichTextDemo({ activeOptions }) {
  const isMarkdown = activeOptions.has('markdown');
  const hasToolbar = activeOptions.has('toolbar');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-md overflow-hidden">
        {hasToolbar && (
          <div className="flex flex-wrap items-center gap-1 p-3 border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
            {TOOLBAR_GROUPS.map((group, gi) => (
              <div key={gi} className="flex items-center">
                {group.map(btn => {
                  const Icon = btn.icon;
                  return (
                    <button key={btn.label} className={`p-2 rounded-md transition-colors ${btn.active ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300'}`} title={btn.label}>
                      <Icon size={18} />
                    </button>
                  );
                })}
                {gi < TOOLBAR_GROUPS.length - 1 && <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1.5" />}
              </div>
            ))}
          </div>
        )}
        <div className="p-6 min-h-[280px]">
          {isMarkdown ? (
            <pre className="text-base text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap">
              <span className="text-violet-600 dark:text-violet-400"># </span>
              <span className="font-bold">Getting Started</span>
              {'\n\n'}
              Welcome to the <span className="text-violet-600 dark:text-violet-400">**</span><span className="font-bold">rich text editor</span><span className="text-violet-600 dark:text-violet-400">**</span>. You can write in <span className="text-violet-600 dark:text-violet-400">*</span><span className="italic">markdown</span><span className="text-violet-600 dark:text-violet-400">*</span> format.
              {'\n\n'}
              <span className="text-violet-600 dark:text-violet-400">- </span>Bullet point one
              {'\n'}
              <span className="text-violet-600 dark:text-violet-400">- </span>Bullet point two
              {'\n'}
              <span className="text-violet-600 dark:text-violet-400">- </span>Bullet point three
            </pre>
          ) : (
            <div className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Getting Started</h2>
              <p>Welcome to the <strong>rich text editor</strong>. You can write in <em>WYSIWYG</em> format with full formatting controls.</p>
              <ul className="list-disc list-inside space-y-1.5 text-zinc-600 dark:text-zinc-400">
                <li>Bullet point one</li>
                <li>Bullet point two</li>
                <li>Bullet point three</li>
              </ul>
            </div>
          )}
          <div className="w-0.5 h-6 bg-zinc-900 dark:bg-white animate-pulse inline-block ml-0.5" />
        </div>
        <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-700 flex items-center justify-between text-xs text-zinc-400">
          <span>{isMarkdown ? 'Markdown' : 'WYSIWYG'} mode</span>
          <span>142 words</span>
        </div>
      </div>
    </div>
  );
}
