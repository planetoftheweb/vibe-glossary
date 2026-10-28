import { useEffect, useLayoutEffect } from 'react';

/**
 * Nudge an absolutely positioned element sideways so it stays inside the
 * viewport (#137). Uses the individual `translate` property so it composes with
 * a Tailwind `-translate-x-1/2` transform instead of replacing it.
 */
export function clampToViewport(el, margin = 8) {
  if (!el || typeof document === 'undefined') return;
  el.style.translate = '';
  const rect = el.getBoundingClientRect();
  if (!rect.width) return;
  const vw = document.documentElement.clientWidth || window.innerWidth;
  let dx = 0;
  if (rect.right > vw - margin) dx = vw - margin - rect.right;
  if (rect.left + dx < margin) dx = margin - rect.left;
  if (Math.abs(dx) >= 0.5) el.style.translate = `${Math.round(dx)}px 0`;
}

/** Clamp a panel each time it opens, and on resize while it is open. */
export function useKeepPanelOnScreen(ref, active) {
  useLayoutEffect(() => {
    if (!active) return undefined;
    const run = () => clampToViewport(ref.current);
    run();
    window.addEventListener('resize', run);
    return () => window.removeEventListener('resize', run);
  }, [ref, active]);
}

/** Clamp a hover / focus tip right before it can show (parent hover or focus). */
export function useKeepTipOnScreen(ref, active = true, content) {
  useEffect(() => {
    if (!active) return undefined;
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return undefined;
    const run = () => clampToViewport(el);
    run();
    parent.addEventListener('pointerenter', run);
    parent.addEventListener('focusin', run);
    window.addEventListener('resize', run);
    return () => {
      parent.removeEventListener('pointerenter', run);
      parent.removeEventListener('focusin', run);
      window.removeEventListener('resize', run);
    };
  }, [ref, active, content]);
}
