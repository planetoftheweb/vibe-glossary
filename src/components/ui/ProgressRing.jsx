import { Circle } from 'lucide-react';

// Lucide circle artwork drawn as a progress ring (#92). The lucide Circle has
// r=10 in a 24-unit box, so its circumference is 2 * PI * 10 = 62.83 units.
// strokeDasharray is inherited from the svg root onto the circle.
const CIRCUMFERENCE = 2 * Math.PI * 10;

function clampPercent(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

function Ring({ percent, size, strokeWidth, trackClass, valueClass }) {
  const pct = clampPercent(percent);
  return (
    <>
      <Circle size={size} strokeWidth={strokeWidth} className={`absolute inset-0 m-auto ${trackClass}`} aria-hidden="true" />
      {pct > 0 && (
        <Circle
          size={size}
          strokeWidth={strokeWidth}
          className={`absolute inset-0 m-auto -rotate-90 ${valueClass}`}
          strokeDasharray={`${(pct / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          aria-hidden="true"
        />
      )}
    </>
  );
}

/**
 * size: documented icon size (24 for chrome, 32 for panels).
 * masteredPercent: optional outer ring; the visited ring then sits inside at 20px.
 */
export default function ProgressRing({
  percent,
  masteredPercent,
  size = 24,
  accentClass = 'text-indigo-500',
  trackClass = 'text-zinc-200 dark:text-zinc-700',
  children,
  className = '',
}) {
  const dual = masteredPercent !== undefined;
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
      data-progress-ring=""
    >
      {dual ? (
        <>
          <Ring percent={masteredPercent} size={size} strokeWidth={1.5} trackClass={trackClass} valueClass="text-indigo-500" />
          <Ring percent={percent} size={20} strokeWidth={3} trackClass={trackClass} valueClass={accentClass} />
        </>
      ) : (
        <Ring percent={percent} size={size} strokeWidth={3} trackClass={trackClass} valueClass={accentClass} />
      )}
      {children !== undefined && (
        <span className="relative text-xs font-bold tabular-nums text-zinc-700 dark:text-zinc-200">{children}</span>
      )}
    </span>
  );
}
