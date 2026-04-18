import { useState } from 'react';

export default function SliderDemo({ activeOptions }) {
  const [val, setVal] = useState(50);
  const isDual      = activeOptions.has('dual');
  const hasTooltip  = activeOptions.has('tooltip');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="w-full max-w-xl space-y-6">
        <div className="flex justify-between text-base font-semibold text-zinc-600 dark:text-zinc-300">
          <span>{isDual ? '20' : '0'}</span>
          <span>{val}</span>
          {isDual && <span>80</span>}
        </div>
        <div className="relative h-10 flex items-center group">
          <div className="absolute w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
          <div className="absolute h-2 bg-indigo-600 rounded-full" style={{ width: `${val}%`, left: '0%' }}></div>
          <input
            type="range"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className="absolute w-7 h-7 bg-white border-[3px] border-indigo-600 rounded-full shadow-md transition-transform active:scale-110 pointer-events-none"
            style={{ left: `calc(${val}% - 14px)` }}
          >
            {hasTooltip && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {val}%
              </div>
            )}
          </div>
          {isDual && (
            <div className="absolute w-7 h-7 bg-white border-[3px] border-zinc-300 rounded-full shadow-md pointer-events-none" style={{ left: '20%' }}></div>
          )}
        </div>
      </div>
    </div>
  );
}
