import { useState } from 'react';
import { Terminal, Zap, CheckSquare, Square, Check, Copy, Code2, ShieldCheck, ChevronDown } from 'lucide-react';

const FRAMEWORKS = [
  { id: 'shadcn', label: 'shadcn/ui' },
  { id: 'headless', label: 'Headless UI' },
  { id: 'radix', label: 'Radix' },
  { id: 'html', label: 'Plain HTML' },
];

const JSX_KEYWORDS = new Set(['const', 'let', 'var', 'function', 'return', 'if', 'else', 'import', 'from', 'export', 'default', 'true', 'false', 'null', 'undefined', 'new', 'this']);

// Splits a markdown string into prose and fenced code block segments.
function splitMarkdown(text) {
  const segments = [];
  const re = /```(\w+)?\n([\s\S]*?)\n```/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segments.push({ type: 'prose', value: text.slice(last, m.index) });
    segments.push({ type: 'code', lang: m[1] || 'jsx', value: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) segments.push({ type: 'prose', value: text.slice(last) });
  return segments;
}

// Minimal JSX/HTML tokenizer for syntax highlighting.
function tokenizeJsx(code) {
  const tokens = [];
  const re = /(\/\/.*?$|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|"[^"]*"|'[^']*'|`[^`]*`|<\/?[A-Za-z][\w-]*|\/?>|[A-Za-z_][\w-]*(?=\s*=)|\b(?:const|let|var|function|return|if|else|import|from|export|default|true|false|null|undefined|new|this)\b|\{|\})/gm;
  let last = 0;
  let m;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) tokens.push({ type: 'plain', value: code.slice(last, m.index) });
    const v = m[0];
    let type = 'plain';
    if (v.startsWith('//') || v.startsWith('/*') || v.startsWith('<!--')) type = 'comment';
    else if (v[0] === '"' || v[0] === "'" || v[0] === '`') type = 'string';
    else if (v.startsWith('<') || v === '/>' || v === '>') type = 'tag';
    else if (v === '{' || v === '}') type = 'punct';
    else if (JSX_KEYWORDS.has(v)) type = 'keyword';
    else type = 'attr';
    tokens.push({ type, value: v });
    last = m.index + v.length;
  }
  if (last < code.length) tokens.push({ type: 'plain', value: code.slice(last) });
  return tokens;
}

const TOKEN_CLASS = {
  tag: 'text-rose-500 dark:text-rose-400',
  attr: 'text-amber-600 dark:text-amber-400',
  string: 'text-emerald-600 dark:text-emerald-400',
  keyword: 'text-violet-600 dark:text-violet-400 font-semibold',
  comment: 'text-zinc-400 italic',
  punct: 'text-sky-500 dark:text-sky-400',
  plain: '',
};

function HighlightedCode({ code }) {
  const tokens = tokenizeJsx(code);
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} className={TOKEN_CLASS[t.type]}>{t.value}</span>
      ))}
    </>
  );
}

export default function PromptBuilder({ data, activeOptions, onOptionToggle, categoryColors, onCopy }) {
  const [copied, setCopied] = useState(false);
  const [framework, setFramework] = useState('shadcn');
  const [fwOpen, setFwOpen] = useState(false);

  if (!data?.prompt) return null;

  const includeScaffold = activeOptions.has('_scaffold');
  const includeRequirements = activeOptions.has('_requirements');

  // Build prompt text
  let promptText = `## Component Spec\n${data.prompt.base}${data.prompt.options
    .filter(opt => activeOptions.has(opt.id))
    .map(o => o.text)
    .join('')}.`;

  if (includeRequirements && data.prompt.requirements) {
    promptText += `\n\n## Requirements\n${data.prompt.requirements.map(r => `- ${r}`).join('\n')}`;
  }

  if (includeScaffold && data.prompt.scaffolds?.[framework]) {
    promptText += `\n\n## Scaffold (${FRAMEWORKS.find(f => f.id === framework)?.label})\n\`\`\`jsx\n${data.prompt.scaffolds[framework]}\n\`\`\``;
  }

  const handleCopy = () => {
    navigator.clipboard?.writeText(promptText).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = promptText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  const cc = categoryColors || {};
  const activeLabel = FRAMEWORKS.find(f => f.id === framework)?.label;

  return (
    <div className={`${cc.bg || 'bg-indigo-500/10'} ${cc.border || 'border-indigo-500/30'} border rounded-xl lg:rounded-2xl p-4 lg:p-5 space-y-3 lg:space-y-4 shadow-sm relative group`}>
      <div className="flex items-center justify-between relative z-10">
        <h3 className={`text-sm lg:text-lg font-bold uppercase tracking-wider flex items-center gap-2 lg:gap-2.5 ${cc.text || 'text-indigo-400'}`}>
          <Terminal size={20} />
          Spec Generator
        </h3>
      </div>

      {/* Component options */}
      <div className="flex flex-wrap gap-2 lg:gap-3 relative z-10">
        {data.prompt.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onOptionToggle(opt.id)}
            className={`flex items-center space-x-1.5 lg:space-x-2.5 px-3 py-1.5 lg:px-5 lg:py-3 rounded-lg lg:rounded-xl border text-sm lg:text-lg font-medium transition-all duration-200 ${
              activeOptions.has(opt.id)
                ? `${cc.active || 'bg-indigo-600 text-white'} border-transparent shadow-md transform scale-105`
                : `bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 ${cc.hover || 'hover:border-indigo-300'} dark:hover:border-zinc-600`
            }`}
          >
            {activeOptions.has(opt.id) ? <CheckSquare size={18} /> : <Square size={18} />}
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-200/50 dark:border-zinc-700/50 relative z-10" />

      {/* Prompt enhancers: Scaffold, Requirements, Framework */}
      <div className="flex flex-wrap items-center gap-2 lg:gap-3 relative z-20">
        {data.prompt.scaffolds && (
          <button
            onClick={() => onOptionToggle('_scaffold')}
            className={`flex items-center space-x-1.5 lg:space-x-2 px-3 py-1.5 lg:px-4 lg:py-2.5 rounded-lg lg:rounded-xl border text-sm lg:text-base font-medium transition-all duration-200 ${
              includeScaffold
                ? 'bg-emerald-600 text-white border-transparent shadow-md'
                : 'bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 hover:border-emerald-300 dark:hover:border-zinc-600'
            }`}
          >
            <Code2 size={16} />
            <span>Scaffold</span>
          </button>
        )}

        {data.prompt.requirements && (
          <button
            onClick={() => onOptionToggle('_requirements')}
            className={`flex items-center space-x-1.5 lg:space-x-2 px-3 py-1.5 lg:px-4 lg:py-2.5 rounded-lg lg:rounded-xl border text-sm lg:text-base font-medium transition-all duration-200 ${
              includeRequirements
                ? 'bg-amber-600 text-white border-transparent shadow-md'
                : 'bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 hover:border-amber-300 dark:hover:border-zinc-600'
            }`}
          >
            <ShieldCheck size={16} />
            <span>Requirements</span>
          </button>
        )}

        {/* Framework picker — only visible when scaffold is active */}
        {includeScaffold && data.prompt.scaffolds && (
          <div className="relative">
            <button
              onClick={() => setFwOpen(!fwOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 lg:px-4 lg:py-2.5 rounded-lg lg:rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm lg:text-base font-medium text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
            >
              <span>{activeLabel}</span>
              <ChevronDown size={14} className={`text-zinc-400 transition-transform ${fwOpen ? 'rotate-180' : ''}`} />
            </button>
            {fwOpen && (
              <div className="absolute top-full left-0 mt-1 min-w-[160px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 py-1.5 animate-fade-in">
                {FRAMEWORKS.filter(f => data.prompt.scaffolds[f.id]).map(f => (
                  <button
                    key={f.id}
                    onClick={() => { setFramework(f.id); setFwOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm lg:text-base transition-colors ${
                      framework === f.id
                        ? 'bg-emerald-500/10 text-emerald-500 font-semibold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prompt output */}
      <div className="relative group/code z-10">
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg lg:rounded-xl text-sm lg:text-base text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed min-h-[70px] lg:min-h-[100px] shadow-inner p-4 lg:p-6 pr-14 lg:pr-16 space-y-3">
          {splitMarkdown(promptText).map((seg, i) => (
            seg.type === 'prose' ? (
              <div key={i} className="whitespace-pre-wrap break-words">
                {i === 0 && <span className={`${cc.accent || 'text-indigo-500'} select-none mr-2`}>$</span>}
                {seg.value}
                {i === splitMarkdown(promptText).length - 1 && (
                  <span className={`inline-block w-2.5 h-5 ${cc.dot || 'bg-indigo-500'} ml-1 align-middle animate-pulse`}></span>
                )}
              </div>
            ) : (
              <pre key={i} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 lg:p-4 overflow-x-auto text-xs lg:text-sm leading-relaxed">
                <div className="text-zinc-400 text-[10px] lg:text-xs uppercase tracking-wider mb-2 select-none">{seg.lang}</div>
                <code className="block whitespace-pre"><HighlightedCode code={seg.value} /></code>
              </pre>
            )
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-zinc-500 transition-colors opacity-0 group-hover/code:opacity-100"
          title="Copy to clipboard (markdown)"
        >
          {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}
