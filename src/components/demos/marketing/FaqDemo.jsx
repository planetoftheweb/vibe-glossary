import { useState } from 'react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';

const FAQS = [
  { q: 'How do I get started?', a: "Sign up for a free account and you'll get instant access to all components. No credit card required.", category: 'Getting Started' },
  { q: 'Can I use this in commercial projects?', a: 'Yes! All plans include a commercial license. You can use these components in unlimited client and personal projects.', category: 'Licensing' },
  { q: 'Do you offer refunds?', a: "We offer a 14-day money-back guarantee. If you're not satisfied, just reach out to our support team.", category: 'Billing' },
  { q: 'Is there a free plan?', a: 'Yes, our free plan includes access to 20+ core components. Upgrade anytime for the full library and premium support.', category: 'Billing' },
  { q: 'How often do you add new components?', a: 'We ship new components and updates every two weeks. Pro and Enterprise users get early access to new releases.', category: 'Getting Started' },
];

export default function FaqDemo({ activeOptions }) {
  const hasSearch = activeOptions.has('search');
  const hasCategories = activeOptions.has('categories');
  const [openId, setOpenId] = useState(0);
  const [filter, setFilter] = useState('');
  const [activeCat, setActiveCat] = useState(null);

  const categories = [...new Set(FAQS.map(f => f.category))];
  let filtered = FAQS;
  if (filter) filtered = filtered.filter(f => f.q.toLowerCase().includes(filter.toLowerCase()));
  if (activeCat) filtered = filtered.filter(f => f.category === activeCat);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4 overflow-y-auto">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">Frequently Asked Questions</h2>
          <p className="text-sm text-zinc-400">Everything you need to know</p>
        </div>

        {hasSearch && (
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search questions..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:border-indigo-500 text-zinc-900 dark:text-white placeholder:text-zinc-400" />
          </div>
        )}

        {hasCategories && (
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <button onClick={() => setActiveCat(null)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${!activeCat ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>All</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${activeCat === cat ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>{cat}</button>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {filtered.map((faq, i) => {
            const isOpen = openId === i;
            return (
              <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden shadow-sm">
                <button onClick={() => setOpenId(isOpen ? -1 : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`text-zinc-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle size={24} className="text-zinc-300 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">No matching questions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
