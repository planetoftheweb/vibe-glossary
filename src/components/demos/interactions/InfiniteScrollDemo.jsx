import { useState, useRef, useEffect } from 'react';
import { Loader2, ArrowDown, ChevronsUp } from 'lucide-react';

function generateItems(start, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `Item #${start + i}`,
    desc: ['Design system update', 'API integration', 'Bug fix deployed', 'Feature shipped', 'Code review done'][((start + i) % 5)],
    time: `${((start + i) % 12) + 1}h ago`,
  }));
}

export default function InfiniteScrollDemo({ activeOptions }) {
  const isLoadMore = activeOptions.has('loadmore');
  const hasBackToTop = activeOptions.has('backtotop');
  const [items, setItems] = useState(() => generateItems(1, 8));
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const sentinelRef = useRef(null);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems(prev => [...prev, ...generateItems(prev.length + 1, 5)]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    if (isLoadMore) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && items.length < 30) loadMore();
    }, { root: containerRef.current, threshold: 0.5 });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loading, items.length, isLoadMore]);

  const scrollToTop = () => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="w-full max-w-sm relative">
        <div ref={containerRef} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm overflow-y-auto max-h-80">
          <div className="p-1.5 space-y-1">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  {item.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{item.title}</p>
                  <p className="text-xs text-zinc-400 truncate">{item.desc}</p>
                </div>
                <span className="text-[10px] text-zinc-400 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 size={18} className="animate-spin text-zinc-400" />
            </div>
          )}

          {isLoadMore && !loading && items.length < 30 && (
            <div className="p-3">
              <button onClick={loadMore} className="w-full py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                <ArrowDown size={14} /> Load more
              </button>
            </div>
          )}

          {!isLoadMore && <div ref={sentinelRef} className="h-4" />}
        </div>

        {hasBackToTop && (
          <button onClick={scrollToTop} className="absolute bottom-2 right-2 p-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full shadow-lg hover:scale-110 transition-transform">
            <ChevronsUp size={16} />
          </button>
        )}

        <p className="text-center text-xs text-zinc-400 mt-2">{items.length} items loaded</p>
      </div>
    </div>
  );
}
