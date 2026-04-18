import { ChevronRight } from 'lucide-react';

export default function BreadcrumbsDemo({ activeOptions }) {
  const isSlash = activeOptions.has('slash');
  const hasBg   = activeOptions.has('bg');

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className={`flex items-center gap-3 text-xl lg:text-2xl ${hasBg ? 'bg-white dark:bg-zinc-800 px-8 py-4 rounded-full shadow-md border border-zinc-200 dark:border-zinc-700' : ''}`}>
        <span className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer">Home</span>
        <span className="text-zinc-400">{isSlash ? '/' : <ChevronRight size={22} />}</span>
        <span className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer">Settings</span>
        <span className="text-zinc-400">{isSlash ? '/' : <ChevronRight size={22} />}</span>
        <span className="font-bold text-zinc-900 dark:text-white">Profile</span>
      </div>
    </div>
  );
}
