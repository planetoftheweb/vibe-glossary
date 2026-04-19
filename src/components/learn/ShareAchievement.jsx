import { useState, useRef, useEffect, useMemo, useId } from 'react';
import {
  Share2, Linkedin, Facebook, Mail, Link2, Check, X as CloseIcon,
} from 'lucide-react';
import {
  buildShareText,
  buildShareUrls,
  suggestedTags,
  canNativeShare,
  nativeShare,
  copyToClipboard,
  defaultShareUrl,
} from '../../lib/share';

/**
 * One-click sharing for learning achievements.
 *
 * Drops a "Share" button anywhere a learner just did something worth talking
 * about (hit a level, earned a badge, mastered a topic). Opens a small popover
 * with an editable preview of the message and a row of platform targets.
 *
 * Props:
 *   - achievement:  see `buildShareText` for the kind/title/score/level/etc.
 *   - shareUrl:     optional canonical URL (defaults to current origin)
 *   - variant:      'solid' (gradient) or 'soft' (low-key tinted button)
 *   - size:         'sm' or 'md' (default 'md')
 *   - align:        'left' | 'right' | 'center', controls popover anchoring
 *   - label:        button label override (default 'Share')
 *
 * Why a popover and not a full modal: the achievement context is already on
 * screen (a result card, a score modal). A small popover keeps the share flow
 * feeling like a side action, not a takeover.
 */
export default function ShareAchievement({
  achievement,
  shareUrl,
  variant = 'solid',
  size = 'md',
  align = 'right',
  label = 'Share',
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(() => buildShareText(achievement));
  const [copied, setCopied] = useState(false);
  const [nativeError, setNativeError] = useState(null);
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);
  const textareaRef = useRef(null);
  const popoverId = useId();

  const url = shareUrl || defaultShareUrl();
  const tags = useMemo(() => suggestedTags(achievement), [achievement]);
  const urls = useMemo(
    () => buildShareUrls({ text, url, tags }),
    [text, url, tags],
  );
  const supportsNative = typeof window !== 'undefined' && canNativeShare();

  // Reset preview text when the achievement changes (e.g. score updates while
  // popover is closed). Don't clobber user edits while it's open.
  useEffect(() => {
    if (!open) setText(buildShareText(achievement));
  }, [achievement, open]);

  // Click-outside + Escape to close. Mirrors the dismissal pattern used by
  // other popovers in the app for muscle-memory consistency.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') closePopover(); };
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) closePopover();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  function closePopover() {
    setOpen(false);
    setNativeError(null);
    // restore focus to the button so keyboard users land back on the trigger
    requestAnimationFrame(() => buttonRef.current?.focus());
  }

  function openPopover() {
    setText(buildShareText(achievement));
    setOpen(true);
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function openExternal(href) {
    window.open(href, '_blank', 'noopener,noreferrer,width=620,height=720');
  }

  async function handleCopyLink() {
    const ok = await copyToClipboard(`${text}\n\n${url}`);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  async function handleNative() {
    try {
      const ok = await nativeShare({
        title: 'Vibe Glossary',
        text,
        url,
      });
      if (ok) closePopover();
    } catch (err) {
      setNativeError(err.message || 'Share failed');
    }
  }

  const triggerSize =
    size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base';
  const triggerStyle =
    variant === 'solid'
      ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-sm'
      : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100';

  const popoverPos =
    align === 'left'
      ? 'left-0'
      : align === 'center'
        ? 'left-1/2 -translate-x-1/2'
        : 'right-0';

  return (
    <div ref={wrapRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? closePopover() : openPopover())}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popoverId}
        className={`inline-flex items-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${triggerSize} ${triggerStyle}`}
      >
        <Share2 size={size === 'sm' ? 14 : 16} />
        {label}
      </button>

      {open && (
        <div
          id={popoverId}
          role="dialog"
          aria-label="Share your achievement"
          className={`absolute z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl ${popoverPos}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Share what you learned
            </span>
            <button
              type="button"
              onClick={closePopover}
              className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
              aria-label="Close share menu"
            >
              <CloseIcon size={16} />
            </button>
          </div>

          {/* Editable preview */}
          <div className="px-4 pt-3">
            <label htmlFor={`${popoverId}-text`} className="sr-only">
              Share message
            </label>
            <textarea
              ref={textareaRef}
              id={`${popoverId}-text`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              maxLength={280}
              className="w-full resize-none rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
            <div className="mt-1 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
              <span>Edit before posting if you want.</span>
              <span className="tabular-nums">{text.length}/280</span>
            </div>
          </div>

          {/* Platform grid */}
          <div className="px-4 pt-3 pb-4 grid grid-cols-3 gap-2">
            <PlatformButton
              label="X"
              icon={<XLogo />}
              onClick={() => openExternal(urls.x)}
            />
            <PlatformButton
              label="LinkedIn"
              icon={<Linkedin size={18} />}
              onClick={() => openExternal(urls.linkedin)}
            />
            <PlatformButton
              label="Bluesky"
              icon={<BlueskyLogo />}
              onClick={() => openExternal(urls.bluesky)}
            />
            <PlatformButton
              label="Facebook"
              icon={<Facebook size={18} />}
              onClick={() => openExternal(urls.facebook)}
            />
            <PlatformButton
              label="Reddit"
              icon={<RedditLogo />}
              onClick={() => openExternal(urls.reddit)}
            />
            <PlatformButton
              label="Email"
              icon={<Mail size={18} />}
              onClick={() => { window.location.href = urls.mailto; }}
            />
          </div>

          {/* Footer actions: copy + native share */}
          <div className="px-4 pb-4 flex flex-col gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-200 px-3 py-2 transition-colors"
            >
              {copied ? (
                <><Check size={16} className="text-emerald-500" /> Copied!</>
              ) : (
                <><Link2 size={16} /> Copy text + link</>
              )}
            </button>
            {supportsNative && (
              <button
                type="button"
                onClick={handleNative}
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-amber-500 hover:bg-amber-400 text-sm font-bold text-white px-3 py-2 transition-colors"
              >
                <Share2 size={16} /> Open device share menu
              </button>
            )}
            {nativeError && (
              <p className="text-xs text-rose-500" role="alert">{nativeError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PlatformButton({ label, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-2 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40"
      aria-label={`Share to ${label}`}
    >
      <span className="text-zinc-600 dark:text-zinc-300">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// --- Brand glyphs ----------------------------------------------------------
// Inlined as tiny SVGs because lucide does not ship X/Bluesky/Reddit marks.
// Sized to sit comfortably alongside lucide's 18px icons.

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M18.244 2H21.5l-7.51 8.59L23 22h-6.79l-5.32-6.6L4.7 22H1.44l8.04-9.18L1 2h6.96l4.81 6.04L18.244 2zm-1.19 18h1.88L7.06 4H5.07l11.984 16z" />
    </svg>
  );
}

function BlueskyLogo() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M6.335 5.144c2.842 2.135 5.9 6.464 7.025 8.787 1.124-2.323 4.183-6.652 7.025-8.787 2.05-1.541 5.376-2.733 5.376 1.064 0 .758-.434 6.367-.689 7.278-.886 3.166-4.115 3.974-6.987 3.485 5.022.855 6.3 3.687 3.541 6.519-5.24 5.378-7.531-1.35-8.118-3.075-.108-.317-.158-.465-.158-.34 0-.125-.05.023-.158.34-.587 1.726-2.878 8.453-8.118 3.075-2.76-2.832-1.481-5.664 3.541-6.519-2.872.489-6.101-.319-6.987-3.485C.376 12.575-.058 6.966-.058 6.208c0-3.797 3.326-2.605 5.376-1.064z" />
    </svg>
  );
}

function RedditLogo() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M22 12.06c0-1.21-.99-2.2-2.2-2.2-.59 0-1.13.24-1.52.62-1.5-1.07-3.55-1.76-5.83-1.84l1-4.66 3.27.7c.04.83.71 1.5 1.55 1.5.86 0 1.55-.7 1.55-1.55s-.7-1.55-1.55-1.55c-.6 0-1.13.36-1.39.86l-3.62-.77c-.1-.02-.2-.01-.29.04-.09.05-.15.13-.17.23l-1.13 5.21c-2.31.07-4.39.76-5.91 1.84-.39-.38-.93-.62-1.52-.62-1.21 0-2.2.99-2.2 2.2 0 .87.51 1.61 1.24 1.97-.03.21-.05.42-.05.64 0 3.21 3.74 5.81 8.34 5.81 4.61 0 8.34-2.6 8.34-5.81 0-.22-.02-.43-.05-.63.74-.36 1.25-1.11 1.25-1.99zM7 13.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5S7 14.33 7 13.5zm8.71 4.13c-1.04.74-2.27 1.13-3.71 1.13-1.45 0-2.68-.39-3.71-1.13-.18-.13-.21-.39-.07-.57.13-.18.39-.21.57-.07.86.62 1.91.95 3.21.95 1.29 0 2.35-.32 3.21-.95.18-.14.45-.1.57.07.14.18.11.43-.07.57zm-.21-2.63c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}
