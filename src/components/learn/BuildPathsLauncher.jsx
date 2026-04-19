import { useEffect } from 'react';
import { X, ChevronRight, Trophy, GraduationCap, Check } from 'lucide-react';
import { BUILD_PATHS } from '../../data/buildPaths';
import { BUILD_LITERACY_NAV_COLORS, getBuildClusterColors } from '../../data/buildLiteracy';

/**
 * Launcher modal for Build Literacy learning paths. Each cluster IS a path:
 * the topics are the steps, and a 5-question quiz at the end earns a badge.
 *
 * Mirrors PathsLauncher visually so the two sections feel like the same app.
 */
export default function BuildPathsLauncher({ isOpen, onClose, onSelectPath, mastered, badges }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };
  const cc = BUILD_LITERACY_NAV_COLORS;

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 animate-fade-in"
    >
      <div className="w-full max-w-4xl max-h-[92vh] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 lg:px-7 py-4 lg:py-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 min-w-0">
            <GraduationCap size={22} className={`${cc.accent} shrink-0`} />
            <div className="min-w-0">
              <h2 className="text-lg lg:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Build Literacy Paths
              </h2>
              <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400">
                {[...badges].filter(b => BUILD_PATHS.some(p => p.id === b)).length}/{BUILD_PATHS.length} badges earned
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Close paths"
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-3">
          {BUILD_PATHS.map(path => {
            const earned = badges.has(path.id);
            const masteredInPath = path.items.filter(id => mastered.has(id)).length;
            const masteredPercent = path.items.length
              ? Math.round((masteredInPath / path.items.length) * 100)
              : 0;
            const pathColors = getBuildClusterColors(path.id);

            return (
              <button
                key={path.id}
                onClick={() => onSelectPath(path)}
                className="w-full text-left group block rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors overflow-hidden"
              >
                <div className="flex items-start gap-4 p-4 lg:p-5">
                  <div className={`shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${pathColors.gradient} flex items-center justify-center shadow-md`}>
                    {earned ? (
                      <Trophy size={26} className="text-white" />
                    ) : (
                      <GraduationCap size={24} className="text-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg lg:text-xl font-bold text-zinc-900 dark:text-white truncate">
                        {path.name}
                      </h3>
                      {earned && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                          <Check size={12} /> Badge
                        </span>
                      )}
                    </div>
                    <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400 leading-snug mb-3 line-clamp-2">
                      {path.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${pathColors.gradient} transition-all duration-500`}
                          style={{ width: `${masteredPercent}%` }}
                        />
                      </div>
                      <span className="text-xs lg:text-sm text-zinc-500 dark:text-zinc-400 font-semibold whitespace-nowrap">
                        {masteredInPath}/{path.items.length} mastered
                      </span>
                    </div>
                  </div>

                  <ChevronRight size={20} className="shrink-0 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors mt-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
