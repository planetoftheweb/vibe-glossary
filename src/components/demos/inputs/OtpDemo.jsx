import { useRef, useState } from 'react';

export default function OtpDemo({ activeOptions }) {
  const isMasked = activeOptions.has('mask');
  const hasSep   = activeOptions.has('sep');
  const autoAdvance = activeOptions.has('focus');
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const focusInput = (index) => inputRefs.current[index]?.focus();

  const updateDigit = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    setDigits((current) => current.map((item, itemIndex) => itemIndex === index ? digit : item));
    if (digit && autoAdvance && index < digits.length - 1) focusInput(index + 1);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    }
    if (event.key === 'ArrowRight' && index < digits.length - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (event) => {
    const pastedDigits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, digits.length);
    if (!pastedDigits) return;
    event.preventDefault();
    const nextDigits = digits.map((_, index) => pastedDigits[index] || '');
    setDigits(nextDigits);
    focusInput(Math.min(pastedDigits.length, digits.length) - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <p className="mb-5 text-center text-base text-zinc-500 dark:text-zinc-300">
        Type or paste a four-digit code.
      </p>
      <fieldset>
        <legend className="sr-only">Four-digit verification code</legend>
        <div className="flex items-center gap-3" onPaste={handlePaste}>
        {[0, 1, 2, 3].map(i => (
          <span key={i} className="contents">
            <input
              ref={(node) => { inputRefs.current[i] = node; }}
              value={digits[i]}
              type={isMasked ? 'password' : 'text'}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              aria-label={`Digit ${i + 1} of 4`}
              className="h-24 w-20 rounded-xl border-2 border-zinc-300 bg-white text-center font-mono text-4xl text-zinc-900 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              onChange={(event) => updateDigit(i, event.target.value)}
              onKeyDown={(event) => handleKeyDown(i, event)}
            />
            {hasSep && i === 1 && <span className="text-zinc-400 font-bold text-3xl">-</span>}
          </span>
        ))}
        </div>
      </fieldset>
      <p className="mt-5 min-h-6 text-center text-base text-zinc-500 dark:text-zinc-300" aria-live="polite">
        {digits.every(Boolean) ? 'Code complete. All four boxes are filled.' : autoAdvance ? 'Auto-advance is on. Focus moves after each digit.' : 'Select Auto-Focus above to move between boxes as you type.'}
      </p>
    </div>
  );
}
