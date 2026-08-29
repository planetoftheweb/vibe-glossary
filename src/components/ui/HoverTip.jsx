/**
 * In-app hover/focus tip for icon chrome. Decorative only: the control
 * still needs aria-label. Never use a native title= for the same job.
 */
export default function HoverTip({
  text,
  align = 'left',
  hideFrom,
  hidden = false,
}) {
  if (!text || hidden) return null;
  const alignClass = align === 'right'
    ? 'right-0 left-auto'
    : align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0';
  const hideClass = hideFrom === 'lg' ? 'lg:hidden' : hideFrom === 'xl' ? 'xl:hidden' : '';
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute top-full mt-1.5 z-[60] ${alignClass} whitespace-nowrap max-w-[min(20rem,calc(100vw-2rem))] truncate px-3 py-2 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 ring-1 ring-black/5 dark:ring-white/10 shadow-2xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity ${hideClass}`}
    >
      {text}
    </span>
  );
}
