import { Eye, ClipboardCopy, GraduationCap, Award, Repeat } from 'lucide-react';

/**
 * Tiered status pill for a single topic. Replaces the binary "Mastered"
 * checkmark with a clear ladder so the learner can see what they have done
 * and what is next:
 *
 *   Visited  →  Used  →  Passed  →  Mastered  →  Retained ×N
 *
 * Tiers ascend, so we render only the highest reached. A `pendingNext` blurb
 * tells the learner what unlocks the next rung.
 */

const TIER_META = {
  visited:  { label: 'Visited',  icon: Eye,            classes: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700',
              next: 'Copy a prompt to reach Used.' },
  used:     { label: 'Used',     icon: ClipboardCopy,  classes: 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700/40',
              next: 'Pass Quiz Me to reach Passed.' },
  passed:   { label: 'Passed',   icon: GraduationCap,  classes: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/40',
              next: 'Reload tomorrow and pass a different question to Master it.' },
  mastered: { label: 'Mastered', icon: Award,          classes: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/40',
              next: 'A retention check unlocks 30 days from now.' },
  retained: { label: 'Retained', icon: Repeat,         classes: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/40',
              next: 'Stay sharp, the next retention check is roughly a month out.' },
};

function highestTier(tier) {
  if (!tier) return null;
  if (tier.retainedCount > 0) return 'retained';
  if (tier.mastered) return 'mastered';
  if (tier.passed) return 'passed';
  if (tier.used) return 'used';
  if (tier.visited) return 'visited';
  return null;
}

export default function TopicTierBadge({ tier, className = '' }) {
  const key = highestTier(tier);
  if (!key) return null;
  const meta = TIER_META[key];
  const Icon = meta.icon;
  const labelText = key === 'retained' && tier.retainedCount > 1
    ? `${meta.label} ×${tier.retainedCount}`
    : meta.label;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${meta.classes} ${className}`}
      title={meta.next}
    >
      <Icon size={11} className="shrink-0" />
      {labelText}
    </span>
  );
}
