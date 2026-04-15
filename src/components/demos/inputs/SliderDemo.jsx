import { useState } from 'react';

export default function SliderDemo({ activeOptions }) {
  const [val, setVal] = useState(50);
  const isDual      = activeOptions.has('dual');
  const hasTooltip  = activeOptions.has('tooltip');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8">
      <div className="w-64 space-y-4">
        <div className="flex justify-between text-xs font-medium text-zinc-500">
          <span>{isDual ? '20' : '0'}</span>
          <span>{val}</span>
          {isDual && <span>80</span>}
        </div>
        <div className="relative h-6 flex items-center group">
          <div className="absolute w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
          <div className="absolute h-1 bg-indigo-600 rounded-full" style={{ width: `${val}%`, left: '0%' }}></div>
          <input
            type="range"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className="absolute w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow transition-transform active:scale-110 pointer-events-none"
            style={{ left: `calc(${val}% - 8px)` }}
          >
            {hasTooltip && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {val}%
              </div>
            )}
          </div>
          {isDual && (
            <div className="absolute w-4 h-4 bg-white border-2 border-zinc-300 rounded-full shadow pointer-events-none" style={{ left: '20%' }}></div>
          )}
        </div>
      </div>
    </div>
  );
}
