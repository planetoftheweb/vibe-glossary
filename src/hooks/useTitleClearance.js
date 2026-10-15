import { useEffect } from 'react';

/**
 * #95: in the stacked (tablet / short desktop) layout the definition pane is
 * capped at a share of the height. Publish how tall the pane must be to show
 * its whole H1 so the CSS cap never hides the second line of a title.
 */
export default function useTitleClearance(paneRef, deps = []) {
  useEffect(() => {
    const pane = paneRef.current;
    if (!pane || typeof ResizeObserver === 'undefined') return undefined;
    const measure = () => {
      const h1 = pane.querySelector('h1');
      if (!h1) return;
      const paneTop = pane.getBoundingClientRect().top - pane.scrollTop;
      const bottom = h1.getBoundingClientRect().bottom - paneTop;
      pane.style.setProperty('--vg-def-head', `${Math.ceil(bottom + 16)}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(pane);
    const h1 = pane.querySelector('h1');
    if (h1) ro.observe(h1);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
