import { useState, useMemo } from 'react';
import {
  Award, Check, X as CloseIcon, Copy, CheckCircle, ExternalLink,
  Sparkles, GraduationCap, Shield, ShieldCheck, ShieldAlert,
} from 'lucide-react';
import { LEVELS, levelFor } from '../../lib/scoring';
import {
  classBar,
  buildProofSnapshot,
  buildProofUrl,
  buildProofText,
  CLASS_BAR_POINTS,
} from '../../lib/proof';
import { goalProgress, reviewsCopy } from '../../lib/progressCoaching';
import { copyToClipboard } from '../../lib/share';

/**
 * Two modes:
 *
 * 1. **Live proof** (proofSnapshot is null): reads the student's own local
 *    progress and lets them generate + copy a proof URL / text.
 *
 * 2. **Verified proof** (proofSnapshot is provided): read-only card that an
 *    instructor sees when they open a #proof=... URL. Shows the snapshot data
 *    and whether the class bar was met.
 */
export default function ProofView({
  isOpen,
  onClose,
  score,
  level,
  badges,
  proofSnapshot = null,
  onContinueLearning,
}) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const isVerifyMode = !!proofSnapshot;

  const liveSnapshot = useMemo(() => {
    if (isVerifyMode) return null;
    if (!score) return null;
    return buildProofSnapshot({
      score: score.total,
      level,
      badges,
    });
  }, [isVerifyMode, score, level, badges]);

  const snapshot = proofSnapshot || liveSnapshot;

  const proofUrl = useMemo(() => {
    if (!snapshot) return '';
    return buildProofUrl(snapshot);
  }, [snapshot]);

  const proofText = useMemo(() => {
    if (!snapshot) return '';
    return buildProofText({ snapshot, proofUrl });
  }, [snapshot, proofUrl]);

  const bar = useMemo(() => {
    if (!snapshot) return { met: false, reasons: [] };
    return classBar({
      score: snapshot.s,
      badges: new Set(snapshot.b || []),
    });
  }, [snapshot]);

  const lvl = useMemo(() => {
    if (!snapshot) return null;
    return LEVELS.find(l => l.id === snapshot.l) || null;
  }, [snapshot]);

  const classGoal = useMemo(
    () => goalProgress(snapshot?.s || 0, CLASS_BAR_POINTS),
    [snapshot?.s]
  );

  const proofDate = useMemo(() => {
    if (!snapshot?.d) return null;
    return new Date(snapshot.d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [snapshot]);

  if (!isOpen) return null;

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  async function handleCopyUrl() {
    const ok = await copyToClipboard(proofUrl);
    if (ok) { setCopiedUrl(true); setTimeout(() => setCopiedUrl(false), 2000); }
  }

  async function handleCopyText() {
    const ok = await copyToClipboard(proofText);
    if (ok) { setCopiedText(true); setTimeout(() => setCopiedText(false), 2000); }
  }

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 animate-fade-in"
    >
      <div className="w-full max-w-lg max-h-[94vh] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="shrink-0 flex items-start justify-between gap-3 px-5 lg:px-7 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow ${
              bar.met
                ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                : 'bg-gradient-to-br from-zinc-400 to-zinc-600'
            }`}>
              {bar.met ? <ShieldCheck size={22} className="text-white" /> : <Shield size={22} className="text-white" />}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {isVerifyMode ? 'Class Proof' : 'Your Class Proof'}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {isVerifyMode ? 'Submitted by a VibeGlossary learner' : 'Copy this to submit your work'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Close proof"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 lg:px-7 py-5 space-y-5">

          {/* Class bar status */}
          <div className={`rounded-xl p-4 border ${
            bar.met
              ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40'
              : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              {bar.met ? (
                <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <ShieldAlert size={18} className="text-amber-600 dark:text-amber-400" />
              )}
              <span className={`text-sm font-bold uppercase tracking-wider ${
                bar.met
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-amber-700 dark:text-amber-300'
              }`}>
                Class bar: {bar.met ? 'Met' : 'Not yet met'}
              </span>
            </div>
            {bar.met ? (
              <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-snug">
                {bar.reasons.join('. ')}.
              </p>
            ) : (
              <div>
                <p className="text-base font-extrabold text-amber-900 dark:text-amber-100">
                  {classGoal.remaining} points left to meet the class requirement
                </p>
                <p className="mt-1 text-sm text-amber-700 dark:text-amber-300 leading-snug">
                  {reviewsCopy(classGoal.reviewRounds)}. Open five different items to unlock each review, then answer its five questions.
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-amber-200/70 dark:bg-amber-950">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
                    style={{ width: `${classGoal.percent}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-300">
                  <span>{snapshot?.s || 0} earned</span>
                  <span>{CLASS_BAR_POINTS} required</span>
                </div>
                {!isVerifyMode && onContinueLearning && (
                  <button
                    type="button"
                    onClick={onContinueLearning}
                    className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white hover:bg-amber-500"
                  >
                    Keep working toward Tinkerer
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Score card */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <span className="text-base font-bold">VibeScore</span>
              </div>
              <span className="text-2xl font-extrabold tabular-nums">{snapshot?.s ?? 0}</span>
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Level</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {lvl?.label || 'Lurker'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Badges earned</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {(snapshot?.b || []).length}
                </span>
              </div>
              {(snapshot?.b || []).length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {snapshot.b.map(id => (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-semibold"
                    >
                      <Award size={12} /> {id}
                    </span>
                  ))}
                </div>
              )}
              {proofDate && (
                <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">Date</span>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">{proofDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Level ladder */}
          <div className="flex flex-wrap gap-1.5">
            {LEVELS.map((l) => {
              const reached = (snapshot?.s ?? 0) >= l.min;
              const isCurrent = l.id === snapshot?.l;
              return (
                <span
                  key={l.id}
                  className={`px-2 py-0.5 rounded-full text-xs font-bold border transition-colors ${
                    isCurrent
                      ? 'bg-amber-500 text-white border-amber-500'
                      : reached
                        ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/40'
                        : 'bg-transparent text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {l.label}
                </span>
              );
            })}
          </div>

          {/* Actions: copy proof URL, copy proof text */}
          {!isVerifyMode && (
            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white text-sm font-bold px-4 py-2.5 transition-colors shadow-sm"
              >
                {copiedUrl ? (
                  <><Check size={16} /> Proof link copied!</>
                ) : (
                  <><ExternalLink size={16} /> Copy proof link</>
                )}
              </button>
              <button
                type="button"
                onClick={handleCopyText}
                className="flex items-center justify-center gap-2 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm font-semibold px-4 py-2.5 transition-colors"
              >
                {copiedText ? (
                  <><Check size={16} className="text-emerald-500" /> Proof text copied!</>
                ) : (
                  <><Copy size={16} /> Copy proof text for Canvas</>
                )}
              </button>
            </div>
          )}

          {/* Instructor note (verify mode only) */}
          {isVerifyMode && (
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug">
                This proof was generated from the student&apos;s local learning progress
                on VibeGlossary. Scores come from quizzes with integrity checks (time
                floors, cooldowns, variant rotation). The class bar requires reaching
                Tinkerer ({CLASS_BAR_POINTS} pts).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
