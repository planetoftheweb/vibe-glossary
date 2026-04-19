import { useCallback, useRef } from 'react';

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

  const onResizeStart = useCallback((e) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMove = (ev) => {
      if (!isResizing.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (ev.clientX || ev.touches?.[0]?.clientX) - rect.left;
      const pct = Math.min(maxPercent, Math.max(minPercent, (x / rect.width) * 100));
      setPanelWidth(pct);
    };
    const handleUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      setPanelWidth(prev => {
        try { localStorage.setItem(storageKey, prev); } catch {}
        return prev;
      });
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
  }, [setPanelWidth, minPercent, maxPercent, storageKey]);

  return { containerRef, onResizeStart };
}
