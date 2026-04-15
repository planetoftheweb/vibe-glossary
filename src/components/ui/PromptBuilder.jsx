import { useState } from 'react';
import { Terminal, Zap, CheckSquare, Square, Check, Copy } from 'lucide-react';

export default function PromptBuilder({ data, activeOptions, onOptionToggle, categoryColors, onCopy }) {
  const [copied, setCopied] = useState(false);

  if (!data?.prompt) return null;

  const promptText = `${data.prompt.base}${data.prompt.options
    .filter(opt => activeOptions.has(opt.id))
    .map(o => o.text)
    .join('')}.`;

  const handleCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = promptText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  const cc = categoryColors || {};

  return (
    <div className={`${cc.bg || 'bg-indigo-500/10'} ${cc.border || 'border-indigo-500/30'} border rounded-xl p-5 space-y-4 shadow-sm relative overflow-hidden group`}>
      <div className="flex items-center justify-between relative z-10">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${cc.text || 'text-indigo-400'}`}>
          <Terminal size={16} />
          Spec Generator
        </h3>
        <span className={`text-xs ${cc.bg || 'bg-indigo-500/10'} ${cc.text || 'text-indigo-400'} px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1`}>
          <Zap size={11} className="fill-current" /> Live
        </span>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10">
        {data.prompt.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onOptionToggle(opt.id)}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
              activeOptions.has(opt.id)
                ? `${cc.active || 'bg-indigo-600 text-white'} border-transparent shadow-md transform scale-105`
                : `bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 ${cc.hover || 'hover:border-indigo-300'} dark:hover:border-zinc-600`
            }`}
          >
            {activeOptions.has(opt.id) ? <CheckSquare size={15} /> : <Square size={15} />}
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="relative group/code z-10">
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 text-sm text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed min-h-[80px] shadow-inner">
          <span className={`${cc.accent || 'text-indigo-500'} select-none mr-2`}>$</span>
          {promptText}
          <span className={`inline-block w-2 h-4 ${cc.dot || 'bg-indigo-500'} ml-1 align-middle animate-pulse`}></span>
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-zinc-500 transition-colors opacity-0 group-hover/code:opacity-100"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}
