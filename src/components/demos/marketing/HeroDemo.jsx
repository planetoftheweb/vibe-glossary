import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function HeroDemo({ activeOptions }) {
  const hasCTA = activeOptions.has('cta');
  const hasVideo = activeOptions.has('video');
  const isGradient = activeOptions.has('gradient');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className={`w-full max-w-xl rounded-2xl overflow-hidden shadow-lg ${isGradient ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600' : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700'}`}>
        <div className="p-8 md:p-12 text-center">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6 ${isGradient ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'}`}>
            <Sparkles size={12} /> New: AI-Powered Features
          </div>
          <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight ${isGradient ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
            Build faster with
            <br />
            <span className={isGradient ? 'text-white/90' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'}>intelligent components</span>
          </h1>
          <p className={`text-base mb-8 max-w-md mx-auto leading-relaxed ${isGradient ? 'text-white/80' : 'text-zinc-600 dark:text-zinc-400'}`}>
            Ship production-ready UI in minutes, not days. The component library that understands your design system.
          </p>
          {hasCTA && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-opacity hover:opacity-90 ${isGradient ? 'bg-white text-indigo-700 shadow-lg' : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'}`}>
                Get Started <ArrowRight size={16} />
              </button>
              {hasVideo && (
                <button className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors ${isGradient ? 'text-white/80 hover:text-white border border-white/20' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700'}`}>
                  <Play size={16} /> Watch Demo
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
