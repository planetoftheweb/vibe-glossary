import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

const EMOJIS = ['😠', '😕', '😐', '😊', '🤩'];
const LABELS = ['Terrible', 'Poor', 'Okay', 'Good', 'Amazing'];

export default function RatingDemo({ activeOptions }) {
  const isThumbs = activeOptions.has('thumbs');
  const isEmoji = activeOptions.has('emoji');
  const hasLabel = activeOptions.has('label');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [thumbs, setThumbs] = useState(null);

  if (isThumbs) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-8">
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-10 shadow-md text-center">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">Was this helpful?</p>
          <div className="flex items-center gap-6 justify-center">
            <button onClick={() => setThumbs('up')} className={`p-6 rounded-2xl border-2 transition-all ${thumbs === 'up' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 scale-110' : 'border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-emerald-300 hover:text-emerald-500'}`}>
              <ThumbsUp size={40} />
            </button>
            <button onClick={() => setThumbs('down')} className={`p-6 rounded-2xl border-2 transition-all ${thumbs === 'down' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-600 scale-110' : 'border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-rose-300 hover:text-rose-500'}`}>
              <ThumbsDown size={40} />
            </button>
          </div>
          {thumbs && <p className="text-sm text-zinc-400 mt-5">Thanks for your feedback!</p>}
        </div>
      </div>
    );
  }

  const display = hover || rating;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-10 shadow-md text-center">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">Rate your experience</p>
        <div className="flex items-center gap-3 justify-center mb-4">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-125"
            >
              {isEmoji ? (
                <span className={`text-5xl ${n <= display ? '' : 'grayscale opacity-30'} transition-all`}>{EMOJIS[n - 1]}</span>
              ) : (
                <Star size={44} className={`transition-colors ${n <= display ? 'text-amber-400 fill-amber-400' : 'text-zinc-300 dark:text-zinc-600'}`} />
              )}
            </button>
          ))}
        </div>
        {hasLabel && display > 0 && (
          <p className={`text-lg font-semibold transition-all ${display >= 4 ? 'text-emerald-600' : display >= 3 ? 'text-amber-600' : 'text-rose-500'}`}>
            {LABELS[display - 1]}
          </p>
        )}
        {rating > 0 && <p className="text-sm text-zinc-400 mt-3">You rated {rating}/5</p>}
      </div>
    </div>
  );
}
