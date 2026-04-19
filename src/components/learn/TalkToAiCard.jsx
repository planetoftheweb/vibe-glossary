import { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquareQuote, Wand2, FileCode } from 'lucide-react';

/**
 * Talk to your AI: two copyable scripts someone can paste into ChatGPT,
 * Claude, Cursor, etc. The first ("Starter") teaches the AI to interview
 * the user before writing anything. The second ("Real example") is a
 * concrete prompt they can adapt to their own project.
 *
 * `topic.talkToAi` accepts either the new shape `{ starter, example }`
 * or a legacy string (treated as the example) so partial migrations look
 * sane during refactors.
 */
export default function TalkToAiCard({ topic, categoryColors }) {
  const cc = categoryColors || {};

  const raw = topic?.talkToAi;
  const starter = raw && typeof raw === 'object' ? raw.starter || '' : '';
  const example = raw && typeof raw === 'object'
    ? raw.example || ''
    : (typeof raw === 'string' ? raw : '');

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative rounded-2xl border ${cc.border || 'border-indigo-500/30'} bg-zinc-950 dark:bg-zinc-950 shadow-2xl overflow-hidden`}
      >
        {/* Terminal title bar */}
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
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/80 ${cc.text || 'text-indigo-300'} text-xs font-bold uppercase tracking-wider`}>
            <Sparkles size={11} />
            Talk to your AI
          </div>
        </div>

        {/* Starter prompt panel */}
        {starter ? (
          <PromptPanel
            kind="starter"
            label="Starter prompt"
            sub="Copy this, fill in the brackets, let the AI interview you first."
            icon={<Wand2 size={14} className={cc.accent || 'text-indigo-400'} />}
            text={starter}
            cc={cc}
          />
        ) : null}

        {/* Real example panel */}
        {example ? (
          <PromptPanel
            kind="example"
            label="Real example"
            sub="A concrete version you can adapt to your own project."
            icon={<FileCode size={14} className={cc.accent || 'text-indigo-400'} />}
            text={example}
            cc={cc}
            divider={!!starter}
          />
        ) : null}

        {/* Empty state */}
        {!starter && !example ? (
          <div className="px-5 py-6 lg:px-7 lg:py-8 text-sm lg:text-base text-zinc-400 italic leading-relaxed">
            <p className="mb-2">No script yet for this topic.</p>
            <p>
              Try this opener:{' '}
              <span className="text-zinc-200 not-italic font-mono">
                &quot;Explain {topic?.title} in plain English, then ask me three questions
                that would help me apply it to my project.&quot;
              </span>
            </p>
          </div>
        ) : null}

        {/* Mnemonic footer */}
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

/**
 * One copyable prompt panel inside the terminal card. Local copy state so
 * the two panels don't share a single "Copied" flash.
 */
function PromptPanel({ kind, label, sub, icon, text, cc, divider }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    function fallbackCopy() {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
    }
  };

  return (
    <div className={`px-5 py-5 lg:px-7 lg:py-6 ${divider ? 'border-t border-zinc-800' : ''}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300 mb-0.5">
            {icon}
            {label}
          </div>
          <p className="text-xs text-zinc-500 leading-snug">{sub}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!text}
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={`Copy ${label}`}
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

      <p className="text-sm lg:text-base leading-relaxed text-zinc-100 font-mono whitespace-pre-wrap">
        <span className={`${cc.accent || 'text-indigo-400'} select-none mr-2`}>&gt;</span>
        {text}
      </p>
    </div>
  );
}
