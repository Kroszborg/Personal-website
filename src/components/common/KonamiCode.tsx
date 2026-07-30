'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const KEY_GLYPHS: Record<string, string> = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  b: 'B',
  a: 'A',
};

const EMOJIS = [
  '🎉',
  '🚀',
  '⭐',
  '🎮',
  '💻',
  '🔥',
  '✨',
  '🎯',
  '👾',
  '🌈',
  '⚡',
  '🕹️',
  '🍄',
  '💾',
  '🏆',
  '🦄',
];

const CONFETTI_COUNT = 80;
const EFFECT_DURATION = 6000;
const HINT_THRESHOLD = 4;

type ConfettiPiece = {
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  spin: number;
};

function makeConfetti(): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }, () => ({
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    left: Math.random() * 100,
    delay: Math.random() * 1.8,
    duration: 2.4 + Math.random() * 2.2,
    size: 1.4 + Math.random() * 1.4,
    drift: (Math.random() - 0.5) * 14,
    spin: (Math.random() - 0.5) * 720,
  }));
}

export default function KonamiCode() {
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);
  const [lives, setLives] = useState(30);

  const confetti = useMemo(
    () => (activated ? makeConfetti() : []),
    [activated],
  );

  const dismiss = useCallback(() => setActivated(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (activated && e.key === 'Escape') {
        dismiss();
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      setProgress((prev) => {
        if (key === KONAMI_SEQUENCE[prev]) {
          const next = prev + 1;
          if (next === KONAMI_SEQUENCE.length) {
            setActivated(true);
            setLives((l) => l + 30);
            return 0;
          }
          return next;
        }
        // Wrong key — but it might restart the sequence (e.g. ↑ after ↑↑↓)
        return key === KONAMI_SEQUENCE[0] ? 1 : 0;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activated, dismiss]);

  useEffect(() => {
    if (!activated) return;
    const timer = setTimeout(dismiss, EFFECT_DURATION);
    return () => clearTimeout(timer);
  }, [activated, dismiss]);

  // Reset partial progress after a pause so stale input doesn't linger
  useEffect(() => {
    if (progress === 0) return;
    const timer = setTimeout(() => setProgress(0), 3000);
    return () => clearTimeout(timer);
  }, [progress]);

  const showHint = !activated && progress >= HINT_THRESHOLD;

  if (!activated && !showHint) return null;

  return (
    <>
      <style>{`
        @keyframes konami-fall {
          0% { transform: translateY(-8vh) translateX(0) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translateY(108vh) translateX(var(--konami-drift)) rotate(var(--konami-spin)); opacity: 1; }
        }
        @keyframes konami-flash {
          0% { opacity: 0.55; }
          100% { opacity: 0; }
        }
        @keyframes konami-pop {
          0% { transform: scale(0.4); opacity: 0; }
          55% { transform: scale(1.12); opacity: 1; }
          75% { transform: scale(0.96); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes konami-shake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-6px, 3px); }
          40% { transform: translate(5px, -4px); }
          60% { transform: translate(-4px, -2px); }
          80% { transform: translate(3px, 4px); }
        }
        @keyframes konami-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>

      {showHint && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
          <div className="border-border/60 bg-background/90 flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-sm shadow-lg backdrop-blur-md">
            {KONAMI_SEQUENCE.map((key, i) => (
              <span
                key={i}
                className={
                  i < progress
                    ? 'text-green-500 transition-colors'
                    : 'text-muted-foreground/40 transition-colors'
                }
              >
                {KEY_GLYPHS[key]}
              </span>
            ))}
          </div>
        </div>
      )}

      {activated && (
        <div
          className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden"
          onClick={dismiss}
          role="presentation"
          style={{ animation: 'konami-shake 0.5s ease-in-out' }}
        >
          {/* Screen flash */}
          <div
            className="absolute inset-0 bg-white"
            style={{ animation: 'konami-flash 0.6s ease-out forwards' }}
          />

          {/* Dim + scanlines */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 4px)',
            }}
          />

          {/* Emoji confetti rain */}
          {confetti.map((piece, i) => (
            <div
              key={i}
              className="absolute top-0"
              style={
                {
                  left: `${piece.left}%`,
                  fontSize: `${piece.size}rem`,
                  '--konami-drift': `${piece.drift}vw`,
                  '--konami-spin': `${piece.spin}deg`,
                  animation: `konami-fall ${piece.duration}s linear ${piece.delay}s forwards`,
                  opacity: 0,
                } as React.CSSProperties
              }
            >
              {piece.emoji}
            </div>
          ))}

          {/* Arcade banner */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4">
            <div
              className="flex flex-col items-center gap-3 rounded-2xl border-2 border-green-500/60 bg-black/90 px-10 py-8 text-center shadow-[0_0_60px_rgba(34,197,94,0.35)] backdrop-blur-md sm:px-14"
              style={{
                animation:
                  'konami-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              }}
            >
              <p className="font-mono text-xs tracking-[0.35em] text-green-400 uppercase">
                Konami Code Accepted
              </p>
              <p className="text-5xl font-black text-white [text-shadow:0_0_24px_rgba(34,197,94,0.8)] sm:text-6xl">
                +30 LIVES
              </p>
              <p className="font-mono text-sm text-white/80 tabular-nums">
                LIVES ×{lives} · SCORE 999999
              </p>
              <p
                className="mt-1 font-mono text-[11px] tracking-widest text-white/50 uppercase"
                style={{ animation: 'konami-blink 1.2s step-end infinite' }}
              >
                Press Esc or click to continue
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
