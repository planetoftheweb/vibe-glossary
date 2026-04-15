import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { id: 1, title: 'Design Systems', subtitle: 'Build consistent UIs at scale', bg: 'from-violet-600 to-indigo-700' },
  { id: 2, title: 'Component Library', subtitle: 'Reusable, accessible building blocks', bg: 'from-cyan-500 to-blue-600' },
  { id: 3, title: 'AI Workflows', subtitle: 'Ship faster with AI-powered tools', bg: 'from-emerald-500 to-teal-600' },
  { id: 4, title: 'Responsive Design', subtitle: 'Beautiful on every screen size', bg: 'from-amber-500 to-orange-600' },
];

export default function CarouselDemo({ activeOptions }) {
  const isAutoPlay = activeOptions.has('autoplay');
  const hasDots = activeOptions.has('dots');
  const isFade = activeOptions.has('fade');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 3000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goTo = (i) => setCurrent(i);
  const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent(c => (c + 1) % SLIDES.length);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="w-full max-w-xl relative">
        <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[16/9]">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-gradient-to-br ${slide.bg} flex flex-col items-center justify-center text-white p-8 transition-all duration-500 ${
                isFade
                  ? (i === current ? 'opacity-100' : 'opacity-0')
                  : ''
              }`}
              style={!isFade ? { transform: `translateX(${(i - current) * 100}%)`, transition: 'transform 0.5s ease' } : undefined}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
              <p className="text-white/80 text-sm md:text-base">{slide.subtitle}</p>
            </div>
          ))}

          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {hasDots && (
          <div className="flex justify-center gap-2 mt-4">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-zinc-900 dark:bg-white scale-110' : 'bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400'}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
