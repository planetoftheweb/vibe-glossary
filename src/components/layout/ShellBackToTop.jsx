import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import HoverTip from '../ui/HoverTip';
import { isPhoneShell } from '../../hooks/usePhoneTabScroll';

/**
 * #137 / #133: below sm the breadcrumb (the back control) scrolls away with the
 * content, so a 44px control appears once it is out of view and returns to it.
 * It sits above the Learning HUD and is hidden from sm up, where the row is pinned.
 */
export default function ShellBackToTop({ shellRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shell = shellRef?.current;
    if (!shell) return undefined;
    const update = () => setVisible(isPhoneShell() && shell.scrollTop > 160);
    update();
    shell.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      shell.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [shellRef]);

  if (!visible) return null;

  return (
    <button
      type="button"
      data-testid="shell-back-to-top"
      aria-label="Back to topic navigation"
      onClick={() => shellRef.current?.scrollTo({ top: 0 })}
      className="vg-shell-back-to-top group fixed right-3 z-40 grid min-h-[44px] min-w-[44px] place-items-center rounded-full border border-zinc-300 bg-white text-zinc-700 shadow-lg transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
    >
      <ArrowUp size={20} aria-hidden="true" />
      <HoverTip text="Back to topic navigation" align="right" />
    </button>
  );
}
