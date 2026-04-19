import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'CTO at Stackflow', text: 'This component library cut our development time in half. The quality is outstanding and the docs are incredible.', rating: 5, avatar: 'SC' },
  { name: 'Mike Torres', role: 'Lead Designer at Pixel', text: "Best design system I've worked with. Consistent, accessible, and beautifully crafted. Our team loves it.", rating: 5, avatar: 'MT' },
  { name: 'Ava Patel', role: 'Founder of ShipFast', text: 'Went from idea to production in a weekend. These components just work, no fighting with CSS or accessibility issues.', rating: 4, avatar: 'AP' },
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
      <div className="flex flex-col items-center justify-center h-full w-full p-8">
        <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-3xl p-10 shadow-md text-center relative">
          {hasQuote && <Quote size={48} className="text-zinc-100 dark:text-zinc-700 absolute top-6 left-6" />}
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${COLORS[current]} flex items-center justify-center text-white font-bold text-2xl mx-auto mb-5`}>{t.avatar}</div>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-5 relative z-10">"{t.text}"</p>
          {hasRating && (
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(n => <Star key={n} size={20} className={n <= t.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'} />)}
            </div>
          )}
          <p className="font-semibold text-lg text-zinc-900 dark:text-white">{t.name}</p>
          <p className="text-sm text-zinc-400">{t.role}</p>
          <div className="flex justify-center gap-4 mt-7">
            <button onClick={() => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 hover:text-zinc-700 transition-colors"><ChevronLeft size={22} /></button>
            <button onClick={() => setCurrent(c => (c + 1) % TESTIMONIALS.length)} className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 hover:text-zinc-700 transition-colors"><ChevronRight size={22} /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-md relative">
            {hasQuote && <Quote size={32} className="text-zinc-100 dark:text-zinc-700 absolute top-4 right-4" />}
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${COLORS[i]} flex items-center justify-center text-white text-base font-bold`}>{t.avatar}</div>
              <div>
                <p className="text-base font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                <p className="text-sm text-zinc-400">{t.role}</p>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">"{t.text}"</p>
            {hasRating && (
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(n => <Star key={n} size={16} className={n <= t.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
