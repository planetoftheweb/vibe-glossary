import { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import HoverTip from '../ui/HoverTip';
import {
  WHATS_NEW, APP_VERSION, hasUnseenReleases, markReleasesSeen,
} from '../../data/releases';

const TAG_STYLES = {
  module: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  feature: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
  improvement: 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-300',
};
const TAG_LABELS = {
  module: 'New module',
  feature: 'New feature',
  improvement: 'Improved',
};

const CHANGELOG_URL = 'https://github.com/planetoftheweb/vibe-glossary/blob/main/CHANGELOG.md';

// Shared list body, used by the nav dropdown and the main-menu section.
function ReleaseList({ onAction, dense = false }) {
  return (
    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {WHATS_NEW.map(entry => {
        const clickable = !!entry.action;
        const Row = clickable ? 'button' : 'div';
        return (
          <Row
            key={entry.id}
            onClick={clickable ? () => onAction?.(entry.action) : undefined}
            className={`w-full text-left px-4 ${dense ? 'py-2.5' : 'py-3'} ${
              clickable ? 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${TAG_STYLES[entry.tag] || TAG_STYLES.improvement}`}>
                {TAG_LABELS[entry.tag] || entry.tag}
              </span>
              <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">v{entry.version}</span>
            </div>
            <p className="mt-1.5 text-base font-semibold text-zinc-900 dark:text-white leading-snug">
              {entry.title}
            </p>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400 leading-snug">
              {entry.blurb}
            </p>
            {entry.image && (
              <img
                src={entry.image}
                alt=""
                loading="lazy"
                className="mt-2 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 object-cover"
              />
            )}
          </Row>
        );
      })}
    </div>
  );
}

/**
 * Collapsible "What's New" section for the main hamburger menu. Only shown
 * below `sm`, where the sparkles pill doesn't fit in the nav bar.
 */
export function WhatsNewMenuSection({ onAction }) {
  const [open, setOpen] = useState(false);
  const [unseen, setUnseen] = useState(hasUnseenReleases);

  const toggle = () => {
    setOpen(prev => {
      const next = !prev;
      if (next) {
        markReleasesSeen();
        setUnseen(false);
      }
      return next;
    });
  };

  return (
    <div className="sm:hidden border-t border-zinc-100 dark:border-zinc-800">
      <button
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-center gap-2 px-4 pt-3 pb-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
      >
        <Sparkles size={14} />
        <span className="text-xs font-bold uppercase tracking-wider">What's New</span>
        {unseen && <span className="w-2 h-2 rounded-full bg-indigo-500" aria-hidden />}
        <span className="ml-auto text-xs text-zinc-400 font-semibold tabular-nums">v{APP_VERSION}</span>
        <ChevronRight size={16} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="animate-fade-in">
          <ReleaseList onAction={onAction} dense />
        </div>
      )}
    </div>
  );
}

/**
 * Sparkles pill + dropdown showcasing recent releases, with an unseen dot.
 */
export default function WhatsNewMenu({ isOpen, onToggle, onClose, onAction }) {
  const wrapRef = useRef(null);
  const [unseen, setUnseen] = useState(hasUnseenReleases);

  useEffect(() => {
    if (!isOpen) return undefined;
    markReleasesSeen();
    setUnseen(false);
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={wrapRef} className="relative" data-tour="whats-new">
      <button
        onClick={onToggle}
        aria-label="What's new"
        className={`group relative flex items-center justify-center min-w-[44px] min-h-[44px] px-3 py-2.5 rounded-lg transition-colors ${
          isOpen
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
            : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70'
        }`}
      >
        <Sparkles size={22} />
        <HoverTip text="What's new" align="right" hidden={isOpen} />
        {unseen && (
          <span
            className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-zinc-950"
            aria-hidden
          />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 right-0 bg-white dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 ring-1 ring-black/5 dark:ring-white/10 rounded-xl shadow-2xl z-50 animate-fade-in max-h-[75vh] overflow-y-auto opacity-100"
          style={{ width: 'min(380px, calc(100vw - 16px))' }}
        >
          <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <Sparkles size={14} className="text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              What's New
            </span>
            <span className="ml-auto text-xs font-semibold text-zinc-400 tabular-nums">v{APP_VERSION}</span>
          </div>
          <ReleaseList onAction={onAction} />
          <a
            href={CHANGELOG_URL}
            target="_blank"
            rel="noreferrer"
            className="block px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 border-t border-zinc-100 dark:border-zinc-800 transition-colors"
          >
            Full changelog →
          </a>
        </div>
      )}
    </div>
  );
}
