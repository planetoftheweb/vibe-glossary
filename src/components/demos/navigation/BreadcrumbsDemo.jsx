import { ChevronRight } from 'lucide-react';

export default function BreadcrumbsDemo({ activeOptions }) {
  const isSlash = activeOptions.has('slash');
  const hasBg   = activeOptions.has('bg');

  return (
    <div className="flex items-center justify-center h-full bg-zinc-50 dark:bg-zinc-900/50 w-full">
      <div className={`flex items-center gap-2 text-sm ${hasBg ? 'bg-white dark:bg-zinc-900 px-4 py-2 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800' : ''}`}>
        <span className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer">Home</span>
        <span className="text-zinc-300">{isSlash ? '/' : <ChevronRight size={14} />}</span>
        <span className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer">Settings</span>
        <span className="text-zinc-300">{isSlash ? '/' : <ChevronRight size={14} />}</span>
        <span className="font-bold text-zinc-900 dark:text-white">Profile</span>
      </div>
    </div>
  );
}
