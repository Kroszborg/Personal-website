'use client';

import { useEffect, useState } from 'react';

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

const EMOJIS = [
  '🎉',
  '🚀',
  '⭐',
  '🎮',
  '💻',
  '🔥',
  '✨',
  '🎯',
  '🐱',
  '👾',
  '🌈',
  '⚡',
  '🎈',
  '🍕',
  '🎸',
  '🦄',
];

export default function KonamiCode() {
  const [, setInputSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInputSequence((prev) => {
        const next = [...prev, e.key].slice(-KONAMI_SEQUENCE.length);

        if (
          next.length === KONAMI_SEQUENCE.length &&
          next.every((key, i) => key === KONAMI_SEQUENCE[i])
        ) {
          setActivated(true);
          setTimeout(() => setActivated(false), 6000);
          return [];
        }

        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!activated) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden bg-black/20 backdrop-blur-[2px]">
      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce text-3xl sm:text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.8 + Math.random() * 1.2}s`,
          }}
        >
          {EMOJIS[Math.floor(Math.random() * EMOJIS.length)]}
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <p className="animate-pulse rounded-2xl border border-white/10 bg-black/90 px-10 py-5 text-4xl font-black text-white shadow-2xl backdrop-blur-md sm:text-5xl">
          +30 lives
        </p>
        <p className="font-mono text-sm text-white/90">
          Konami Code activated!
        </p>
      </div>
    </div>
  );
}
