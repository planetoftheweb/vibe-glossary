import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'CTO at Stackflow', text: 'This component library cut our development time in half. The quality is outstanding and the docs are incredible.', rating: 5, avatar: 'SC' },
  { name: 'Mike Torres', role: 'Lead Designer at Pixel', text: "Best design system I've worked with. Consistent, accessible, and beautifully crafted. Our team loves it.", rating: 5, avatar: 'MT' },
  { name: 'Ava Patel', role: 'Founder of ShipFast', text: 'Went from idea to production in a weekend. These components just work — no fighting with CSS or accessibility issues.', rating: 4, avatar: 'AP' },
];

const COLORS = ['from-violet-400 to-indigo-500', 'from-cyan-400 to-blue-500', 'from-emerald-400 to-teal-500'];

export default function TestimonialDemo({ activeOptions }) {
  const isCarousel = activeOptions.has('carousel');
  const hasRating = activeOptions.has('rating');
  const hasQuote = activeOptions.has('quote');
  const [current, setCurrent] = useState(0);

  if (isCarousel) {
    const t = TESTIMONIALS[current];
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm text-center relative">
          {hasQuote && <Quote size={32} className="text-zinc-100 dark:text-zinc-800 absolute top-4 left-4" />}
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${COLORS[current]} flex items-center justify-center text-white font-bold text-lg mx-auto mb-4`}>{t.avatar}</div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 relative z-10">"{t.text}"</p>
          {hasRating && (
            <div className="flex justify-center gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map(n => <Star key={n} size={14} className={n <= t.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'} />)}
            </div>
          )}
          <p className="font-semibold text-sm text-zinc-900 dark:text-white">{t.name}</p>
          <p className="text-xs text-zinc-400">{t.role}</p>
          <div className="flex justify-center gap-3 mt-5">
            <button onClick={() => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-700 transition-colors"><ChevronLeft size={16} /></button>
            <button onClick={() => setCurrent(c => (c + 1) % TESTIMONIALS.length)} className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-700 transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-3">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow-sm relative">
            {hasQuote && <Quote size={24} className="text-zinc-100 dark:text-zinc-800 absolute top-3 right-3" />}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${COLORS[i]} flex items-center justify-center text-white text-xs font-bold`}>{t.avatar}</div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                <p className="text-[10px] text-zinc-400">{t.role}</p>
              </div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">"{t.text}"</p>
            {hasRating && (
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(n => <Star key={n} size={12} className={n <= t.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
