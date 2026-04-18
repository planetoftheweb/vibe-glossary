import { Github, FileText } from 'lucide-react';
import { version } from '../../../package.json';
import { CATEGORIES } from '../../data/categories';

const REPO_URL = 'https://github.com/planetoftheweb/vibe-glossary';
const CHANGELOG_URL = `${REPO_URL}/blob/main/CHANGELOG.md`;

export default function Footer() {
  const componentCount = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <footer className="shrink-0 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 lg:px-6 py-3 flex flex-wrap items-center justify-center lg:justify-between gap-x-6 gap-y-2 text-sm lg:text-base text-zinc-600 dark:text-zinc-300">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-zinc-800 dark:text-zinc-100">VibeGlossary</span>
        <span className="font-mono text-zinc-500 dark:text-zinc-400">v{version}</span>
        <span className="text-zinc-300 dark:text-zinc-700">·</span>
        <span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">{componentCount}</span> components
        </span>
      </div>
      <div className="flex items-center gap-5">
        <a
          href={CHANGELOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <FileText size={18} />
          Changelog
        </a>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <Github size={18} />
          GitHub
        </a>
      </div>
    </footer>
  );
}
