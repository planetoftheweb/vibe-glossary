import { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquareQuote } from 'lucide-react';

/**
 * Talk to your AI: a copyable script someone can paste into ChatGPT, Claude,
 * Cursor, etc. to actually use the idea explained on the left. This is the
 * showpiece of the Build Literacy section, the answer to "I get it, but what
 * do I say?"
 */
export default function TalkToAiCard({ topic, categoryColors }) {
  const [copied, setCopied] = useState(false);
  const cc = categoryColors || {};

  const script = topic?.talkToAi;

  const handleCopy = () => {
    if (!script) return;
    navigator.clipboard?.writeText(script).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = script;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative rounded-2xl border ${cc.border || 'border-indigo-500/30'} bg-zinc-950 dark:bg-zinc-950 shadow-2xl overflow-hidden`}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
            <MessageSquareQuote size={14} className={cc.accent || 'text-indigo-400'} />
            Paste into your AI
          </div>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!script}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Copy AI prompt"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy
              </>
            )}
          </button>
        </div>

        <div className="px-5 py-6 lg:px-7 lg:py-8">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 ${cc.text || 'text-indigo-300'} text-xs font-bold uppercase tracking-wider mb-4`}>
            <Sparkles size={12} />
            Talk to your AI
          </div>

          {script ? (
            <p className="text-base lg:text-lg leading-relaxed text-zinc-100 font-mono whitespace-pre-wrap">
              <span className={`${cc.accent || 'text-indigo-400'} select-none mr-2`}>&gt;</span>
              {script}
            </p>
          ) : (
            <div className="text-sm lg:text-base text-zinc-400 italic leading-relaxed">
              <p className="mb-2">No script yet for this topic.</p>
              <p>
                Try this opener:{' '}
                <span className="text-zinc-200 not-italic font-mono">
                  &quot;Explain {topic?.title} in plain English, then show me one example I could use in our codebase.&quot;
                </span>
              </p>
            </div>
          )}
        </div>

        {topic?.mnemonic ? (
          <div className="px-5 py-4 lg:px-7 border-t border-zinc-800 bg-zinc-900/60">
            <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-1">
              If you remember nothing else
            </p>
            <p className="text-base lg:text-lg text-zinc-200 leading-snug font-medium">
              {topic.mnemonic}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
