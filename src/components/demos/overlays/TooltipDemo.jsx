import { Info } from 'lucide-react';

export default function TooltipDemo({ activeOptions }) {
  const isRight  = activeOptions.has('right');
  const hasArrow = activeOptions.has('arrow');
  const isDark   = activeOptions.has('dark');
  const hasDelay = activeOptions.has('delay');

  const posClass = isRight
    ? 'left-full top-1/2 -translate-y-1/2 ml-2'
    : 'bottom-full left-1/2 -translate-x-1/2 mb-2';

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="group relative">
        <button className="p-5 bg-white rounded-xl shadow-md border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
          <Info size={32} className="text-zinc-500" />
        </button>
        <div className={`absolute ${posClass} px-4 py-2 text-base rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 ${hasDelay ? 'duration-500 delay-150' : 'duration-200'} ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900 border border-zinc-200'}`}>
          Helper Text
          {hasArrow && (
            <div className={`absolute w-3 h-3 rotate-45 ${isDark ? 'bg-zinc-900' : 'bg-white border-l border-t border-zinc-200'} ${isRight ? 'right-full top-1/2 -translate-y-1/2 -mr-1.5 border-r-0 border-b-0' : 'top-full left-1/2 -translate-x-1/2 -mt-1.5 border-r-0 border-b-0'}`}></div>
          )}
        </div>
      </div>
      <div className="mt-6 text-sm text-zinc-400">Hover icon to see tooltip</div>
    </div>
  );
}
