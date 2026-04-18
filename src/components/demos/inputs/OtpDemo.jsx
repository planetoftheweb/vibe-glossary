import { useState, useEffect } from 'react';

export default function OtpDemo({ activeOptions }) {
  const isMasked = activeOptions.has('mask');
  const hasSep   = activeOptions.has('sep');
  const [focusIdx, setFocusIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setFocusIdx(prev => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="flex items-center gap-3">
        {[0, 1, 2, 3].map(i => (
          <span key={i} className="contents">
            <div className={`w-20 h-24 border-2 rounded-xl flex items-center justify-center text-4xl font-mono transition-all ${i === focusIdx ? 'border-indigo-500 ring-4 ring-indigo-500/20 z-10' : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white'}`}>
              {i < focusIdx
                ? (isMasked ? '•' : Math.floor(Math.random() * 9))
                : i === focusIdx
                  ? <div className="w-0.5 h-10 bg-indigo-500 animate-pulse" />
                  : ''}
            </div>
            {hasSep && i === 1 && <span className="text-zinc-400 font-bold text-3xl">-</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
