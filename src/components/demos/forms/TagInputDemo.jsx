import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const SUGGESTIONS = ['React', 'TypeScript', 'Tailwind', 'Node.js', 'GraphQL', 'Prisma', 'Next.js', 'Vite'];

export default function TagInputDemo({ activeOptions }) {
  const hasAutocomplete = activeOptions.has('autocomplete');
  const hasColors = activeOptions.has('colors');
  const hasLimit = activeOptions.has('limit');
  const [tags, setTags] = useState(['React', 'Tailwind']);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const TAG_COLORS = ['bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400', 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400', 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'];

  const maxTags = hasLimit ? 5 : Infinity;
  const filteredSuggestions = SUGGESTIONS.filter(s => !tags.includes(s) && s.toLowerCase().includes(input.toLowerCase()));

  const addTag = (tag) => {
    if (tags.length >= maxTags || tags.includes(tag)) return;
    setTags([...tags, tag]);
    setInput('');
    setShowSuggestions(false);
  };

  const removeTag = (tag) => setTags(tags.filter(t => t !== tag));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) { e.preventDefault(); addTag(input.trim()); }
    if (e.key === 'Backspace' && !input && tags.length) removeTag(tags[tags.length - 1]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="w-full max-w-md">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Technologies</label>
        <div className="relative">
          <div className="flex flex-wrap gap-1.5 p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm min-h-[44px] focus-within:border-indigo-500 transition-colors">
            {tags.map((tag, i) => (
              <span key={tag} className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${hasColors ? TAG_COLORS[i % TAG_COLORS.length] : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'}`}>
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:opacity-70 transition-opacity"><X size={12} /></button>
              </span>
            ))}
            {tags.length < maxTags && (
              <input
                value={input}
                onChange={e => { setInput(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length ? '' : 'Add tags...'}
                className="flex-1 min-w-[80px] bg-transparent outline-none text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 py-1"
              />
            )}
          </div>

          {hasAutocomplete && showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-20 p-1.5 animate-fade-in">
              {filteredSuggestions.slice(0, 5).map(s => (
                <button key={s} onMouseDown={() => addTag(s)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                  <Plus size={12} /> {s}
                </button>
              ))}
            </div>
          )}
        </div>
        {hasLimit && <p className="text-xs text-zinc-400 mt-2">{tags.length}/{maxTags} tags</p>}
      </div>
    </div>
  );
}
