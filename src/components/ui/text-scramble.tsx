'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleDuration?: number;
  characters?: string;
}

export function TextScramble({
  text,
  className,
  scrambleDuration = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()',
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * 2;

    const scrambleInterval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration / 2) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(''),
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(scrambleInterval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, scrambleDuration);

    intervalRef.current = scrambleInterval;
  };

  useEffect(() => {
    const currentInterval = intervalRef.current;
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  }, []);

  return (
    <span
      className={cn('cursor-default', className)}
      onMouseEnter={scramble}
      onFocus={scramble}
    >
      {displayText}
    </span>
  );
}
