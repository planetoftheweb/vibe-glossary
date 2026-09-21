import { useCallback, useEffect, useRef } from 'react';

/**
 * Drag handle for a two-pane "info / preview" layout. The caller owns the
 * container ref (so the math is relative to the right element) and the
 * width state (so the value can be shared and persisted).
 *
 * Returns:
 *   - containerRef: attach to the flex container that holds both panes.
 *   - onResizeStart: hand to onMouseDown / onTouchStart on the divider.
 *
 * minPercent / maxPercent clamp how narrow or wide the left pane can get.
 * Default 25% to 60% matches the existing UI Glossary feel.
 */
export default function usePanelResize(setPanelWidth, {
  minPercent = 25,
  maxPercent = 60,
  storageKey = 'vg-panel-width',
} = {}) {
  const containerRef = useRef(null);
  const isResizing = useRef(false);
  // Held here so an unmount mid-drag can tear the window listeners down.
  const teardownRef = useRef(null);

  const onResizeStart = useCallback((e) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    // Touch events don't carry clientX at the top level; nullish coalesce
    // (not `||`) so a mouse resting on the exact left edge (clientX === 0)
    // is honored instead of collapsing to NaN.
    const pointerX = (ev) => ev.clientX ?? ev.touches?.[0]?.clientX;

    const handleMove = (ev) => {
      if (!isResizing.current || !containerRef.current) return;
      const px = pointerX(ev);
      if (px == null) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = Math.min(maxPercent, Math.max(minPercent, ((px - rect.left) / rect.width) * 100));
      setPanelWidth(pct);
    };
    const cleanup = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
      teardownRef.current = null;
    };
    const handleUp = () => {
      setPanelWidth(prev => {
        try { localStorage.setItem(storageKey, prev); } catch {}
        return prev;
      });
      cleanup();
    };
    teardownRef.current = cleanup;
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
  }, [setPanelWidth, minPercent, maxPercent, storageKey]);

  useEffect(() => () => { teardownRef.current?.(); }, []);

  return { containerRef, onResizeStart };
}
