import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function HeroDemo({ activeOptions }) {
  const hasCTA = activeOptions.has('cta');
  const hasVideo = activeOptions.has('video');
  const isGradient = activeOptions.has('gradient');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className={`w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl ${isGradient ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'}`}>
        <div className="p-12 md:p-16 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 ${isGradient ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'}`}>
            <Sparkles size={14} /> New: AI-Powered Features
          </div>
          <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight ${isGradient ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
            Build faster with
            <br />
            <span className={isGradient ? 'text-white/90' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'}>intelligent components</span>
          </h1>
          <p className={`text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${isGradient ? 'text-white/80' : 'text-zinc-600 dark:text-zinc-400'}`}>
            Ship production-ready UI in minutes, not days. The component library that understands your design system.
          </p>
          {hasCTA && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className={`px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2 transition-opacity hover:opacity-90 ${isGradient ? 'bg-white text-indigo-700 shadow-lg' : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'}`}>
                Get Started <ArrowRight size={20} />
              </button>
              {hasVideo && (
                <button className={`px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2 transition-colors ${isGradient ? 'text-white/80 hover:text-white border border-white/20' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700'}`}>
                  <Play size={20} /> Watch Demo
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
