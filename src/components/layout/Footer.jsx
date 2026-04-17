import { Github, FileText } from 'lucide-react';
import { version } from '../../../package.json';
import { CATEGORIES } from '../../data/categories';

const REPO_URL = 'https://github.com/planetoftheweb/vibe-glossary';
const CHANGELOG_URL = `${REPO_URL}/blob/main/CHANGELOG.md`;

export default function Footer() {
  const componentCount = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <footer className="shrink-0 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 lg:px-6 py-2.5 flex flex-wrap items-center justify-center lg:justify-between gap-x-5 gap-y-1.5 text-xs lg:text-sm text-zinc-500 dark:text-zinc-400">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">VibeGlossary</span>
        <span className="font-mono text-zinc-400 dark:text-zinc-500">v{version}</span>
        <span className="text-zinc-300 dark:text-zinc-700">·</span>
        <span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">{componentCount}</span> components
        </span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={CHANGELOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <FileText size={14} />
          Changelog
        </a>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <Github size={14} />
          GitHub
        </a>
      </div>
    </footer>
  );
}
