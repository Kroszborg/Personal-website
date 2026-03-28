'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface MatrixTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const MATRIX_CHARS =
  'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:・."*=_+-<>[]{}';

export function MatrixText({ text, className = '', style }: MatrixTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const rafRef = useRef<number | null>(null);
  const originalTextRef = useRef(text);
  const iterationRef = useRef(0);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    originalTextRef.current = text;
    setDisplayText(text);
  }, [text]);

  const startMatrixEffect = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    iterationRef.current = 0;
    const originalText = originalTextRef.current;
    const maxIterations = originalText.length * 2;
    const frameInterval = 30;

    const animate = (timestamp: number) => {
      if (timestamp - lastFrameRef.current < frameInterval) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = timestamp;

      iterationRef.current += 0.5;
      const iter = iterationRef.current;

      if (iter >= maxIterations) {
        setDisplayText(originalText);
        rafRef.current = null;
        return;
      }

      setDisplayText(
        originalText
          .split('')
          .map((char, index) =>
            index < iter
              ? originalText[index]
              : MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
          )
          .join(''),
      );

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  const stopMatrixEffect = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setDisplayText(originalTextRef.current);
  };

  return (
    <span
      className={cn('cursor-default', className)}
      onMouseEnter={startMatrixEffect}
      onMouseLeave={stopMatrixEffect}
      style={style}
    >
      {displayText}
    </span>
  );
}
