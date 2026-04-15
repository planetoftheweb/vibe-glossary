import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, ArrowDown } from 'lucide-react';

const ITEMS = [
  { id: 1, author: 'Sarah K.', avatar: 'SK', time: '2m ago', text: 'Just shipped the new dashboard redesign. Feels good to finally get this out the door!', likes: 12, comments: 3 },
  { id: 2, author: 'Mike R.', avatar: 'MR', time: '15m ago', text: 'Anyone else noticing Tailwind v4 is significantly faster? The compiler improvements are wild.', likes: 28, comments: 7 },
  { id: 3, author: 'Ava L.', avatar: 'AL', time: '1h ago', text: 'Protip: use CSS container queries for truly responsive components. Way better than media queries for component libraries.', likes: 45, comments: 11 },
  { id: 4, author: 'James W.', avatar: 'JW', time: '3h ago', text: 'Started building a component library from scratch today. Three hours in and I already have 8 components.', likes: 8, comments: 2 },
];

export default function ListDemo({ activeOptions }) {
  const isInfinite = activeOptions.has('infinite');
  const isVirtual = activeOptions.has('virtual');
  const [liked, setLiked] = useState(new Set());

  const toggleLike = (id) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center justify-start h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4 overflow-y-auto">
      <div className="w-full max-w-lg space-y-3">
        {isVirtual && (
          <div className="text-center text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-lg py-2 font-mono">
            Virtualized: rendering 4 of 10,000 items
          </div>
        )}
        {ITEMS.map(item => (
          <div key={item.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">{item.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-zinc-900 dark:text-white">{item.author}</span>
                    <span className="text-xs text-zinc-400">{item.time}</span>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-600"><MoreHorizontal size={16} /></button>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1.5 leading-relaxed">{item.text}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button onClick={() => toggleLike(item.id)} className={`flex items-center gap-1 text-xs transition-colors ${liked.has(item.id) ? 'text-rose-500' : 'text-zinc-400 hover:text-rose-500'}`}>
                    <Heart size={14} className={liked.has(item.id) ? 'fill-current' : ''} /> {item.likes + (liked.has(item.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1 text-xs text-zinc-400 hover:text-indigo-500 transition-colors">
                    <MessageCircle size={14} /> {item.comments}
                  </button>
                  <button className="flex items-center gap-1 text-xs text-zinc-400 hover:text-emerald-500 transition-colors">
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isInfinite && (
          <button className="w-full py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <ArrowDown size={14} /> Load more
          </button>
        )}
      </div>
    </div>
  );
}
