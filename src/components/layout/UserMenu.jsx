import { useEffect, useRef, useState } from 'react';
import HoverTip from '../ui/HoverTip';
import {
  UserRound, LogOut, Trophy, FileCheck2, RotateCcw, Loader2, CloudUpload, CloudOff, Check,
} from 'lucide-react';

// Signing in is completely optional — progress always lives on the device.
// An account only adds a safer cloud backup of scores, badges, and progress.

const SYNC_LINES = {
  restoring: { icon: Loader2, spin: true, text: 'Restoring your backup…', tone: 'text-zinc-500 dark:text-zinc-400' },
  saving: { icon: CloudUpload, text: 'Backing up…', tone: 'text-zinc-500 dark:text-zinc-400' },
  saved: { icon: Check, text: 'Progress backed up', tone: 'text-emerald-600 dark:text-emerald-400' },
  error: { icon: CloudOff, text: 'Backup failed. Retries on your next change', tone: 'text-amber-600 dark:text-amber-400' },
  idle: { icon: CloudUpload, text: 'Backup on', tone: 'text-zinc-500 dark:text-zinc-400' },
};

const INPUT_CLASSES = 'w-full px-3.5 py-2.5 text-base bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400';

function initialOf(user) {
  const source = user?.displayName || user?.email || '?';
  return source.trim().charAt(0).toUpperCase();
}

function Avatar({ user, size = 'w-8 h-8', textSize = 'text-sm' }) {
  if (user?.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt=""
        referrerPolicy="no-referrer"
        className={`${size} rounded-full object-cover shrink-0`}
      />
    );
  }
  return (
    <span className={`${size} rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 ${textSize}`}>
      {initialOf(user)}
    </span>
  );
}

function MenuRow({ icon: Icon, onClick, children, tone = 'text-zinc-700 dark:text-zinc-200' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-base ${tone} hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors`}
    >
      <Icon size={18} />
      {children}
    </button>
  );
}

// Google "G" mark, inlined so we don't ship an icon set for one logo.
function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden className="shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function UserMenu({
  isOpen, onToggle, onClose,
  auth = {}, syncStatus = 'idle',
  score,
  onOpenScoreBreakdown, onOpenProof, onResetProgress,
}) {
  const wrapRef = useRef(null);
  const {
    user, busy, error, clearError,
    signInWithGoogle, signInWithEmail, registerWithEmail, signOut,
  } = auth;
  const [mode, setMode] = useState('signin'); // 'signin' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || busy) return;
    const ok = mode === 'register'
      ? await registerWithEmail?.(email, password)
      : await signInWithEmail?.(email, password);
    if (ok) {
      setEmail('');
      setPassword('');
    }
  };

  const handleReset = () => {
    const message = user
      ? 'Reset all progress? This clears this device and your cloud backup.'
      : 'Reset all progress on this device?';
    if (window.confirm(message)) {
      onResetProgress?.();
      onClose();
    }
  };

  const sync = SYNC_LINES[syncStatus] || SYNC_LINES.idle;
  const SyncIcon = sync.icon;

  return (
    <div ref={wrapRef} className="relative" data-tour="user-menu">
      <button
        onClick={() => { clearError?.(); onToggle(); }}
        aria-label={user ? `Account: ${user.displayName || user.email}` : 'Sign in. Back up your progress (optional)'}
        className={`group relative flex items-center justify-center min-w-[44px] min-h-[44px] w-10 h-10 rounded-full border transition-colors ${
          isOpen
            ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600'
            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
        }`}
      >
        {user
          ? <Avatar user={user} />
          : <UserRound size={20} className="text-zinc-600 dark:text-zinc-300" />}
        <HoverTip
          text={user ? 'Account' : 'Sign in. Back up your progress (optional)'}
          align="right"
          hidden={isOpen}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 right-0 bg-white dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 ring-1 ring-black/5 dark:ring-white/10 rounded-xl shadow-2xl z-50 py-1.5 animate-fade-in max-h-[75vh] overflow-y-auto opacity-100"
          style={{ width: 'min(340px, calc(100vw - 16px))' }}
        >
          {user ? (
            <>
              <div className="px-4 pt-2.5 pb-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                <Avatar user={user} size="w-11 h-11" textSize="text-lg" />
                <div className="min-w-0">
                  <p className="text-base font-bold text-zinc-900 dark:text-white truncate">
                    {user.displayName || 'Vibe learner'}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                  <p className={`flex items-center gap-1.5 text-xs font-semibold mt-1 ${sync.tone}`}>
                    <SyncIcon size={13} className={sync.spin ? 'animate-spin' : ''} />
                    {sync.text}
                  </p>
                </div>
              </div>
              <MenuRow icon={Trophy} onClick={() => { onOpenScoreBreakdown?.(); onClose(); }}>
                <span className="font-medium">VibeScore & level</span>
                {score && (
                  <span className="ml-auto text-sm font-bold text-zinc-400 tabular-nums">
                    {score.total} pts
                  </span>
                )}
              </MenuRow>
              <MenuRow icon={FileCheck2} onClick={() => { onOpenProof?.(); onClose(); }}>
                <span className="font-medium">Class proof</span>
              </MenuRow>
              <div className="my-1.5 border-t border-zinc-100 dark:border-zinc-800" />
              <MenuRow icon={RotateCcw} onClick={handleReset} tone="text-zinc-500 dark:text-zinc-400">
                <span className="font-medium text-sm">Reset progress</span>
              </MenuRow>
              <MenuRow icon={LogOut} onClick={async () => { await signOut?.(); onClose(); }}>
                <span className="font-medium">Sign out</span>
              </MenuRow>
            </>
          ) : (
            <>
              <div className="px-4 pt-2.5 pb-2">
                <p className="text-base font-bold text-zinc-900 dark:text-white">
                  Back up your progress
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                  Totally optional. Everything saves on this device either way.
                  Sign in to keep your score and badges safe and use them on any device.
                </p>
              </div>
              <div className="px-4 py-2">
                <button
                  onClick={() => signInWithGoogle?.()}
                  disabled={busy}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-600 text-base font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors disabled:opacity-50"
                >
                  <GoogleMark />
                  Continue with Google
                </button>
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">or email</span>
                  <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                </div>
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={INPUT_CLASSES}
                  />
                  <input
                    type="password"
                    required
                    minLength={6}
                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={INPUT_CLASSES}
                  />
                  {error && (
                    <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold transition-colors disabled:opacity-50"
                  >
                    {busy ? 'One sec…' : mode === 'register' ? 'Create account' : 'Sign in'}
                  </button>
                </form>
                <button
                  onClick={() => { setMode(mode === 'register' ? 'signin' : 'register'); clearError?.(); }}
                  className="mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {mode === 'register' ? 'Already have an account? Sign in' : 'New here? Create an account'}
                </button>
              </div>
              <div className="mt-1 border-t border-zinc-100 dark:border-zinc-800">
                <MenuRow icon={RotateCcw} onClick={handleReset} tone="text-zinc-500 dark:text-zinc-400">
                  <span className="font-medium text-sm">Reset progress on this device</span>
                </MenuRow>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
