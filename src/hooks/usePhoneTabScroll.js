import { useCallback, useRef } from 'react';

export const PHONE_SHELL_QUERY = '(max-width: 639.98px)';

/** True below the sm breakpoint, where the whole app shell scrolls (#137). */
export function isPhoneShell() {
  try {
    return typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia(PHONE_SHELL_QUERY).matches;
  } catch {
    return false;
  }
}

/**
 * Below sm the breadcrumb row and the Definition / Preview tab strip scroll away
 * with the content. Switching tabs brings the tab strip back to the top (under the
 * 80px pinned bar) so the learner lands at the start of the new pane.
 */
export default function usePhoneTabScroll() {
  const tabsRef = useRef(null);
  const scrollToTabs = useCallback(() => {
    if (!isPhoneShell()) return;
    const run = () => tabsRef.current?.scrollIntoView?.({ block: 'start' });
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(run);
    else run();
  }, []);
  return { tabsRef, scrollToTabs };
}
