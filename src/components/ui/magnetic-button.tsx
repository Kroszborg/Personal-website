'use client';

import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  asChild?: boolean;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  asChild = false,
  ...props
}: MagneticButtonProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const getRect = () => {
    if (asChild && divRef.current) {
      return divRef.current.getBoundingClientRect();
    }
    if (!asChild && buttonRef.current) {
      return buttonRef.current.getBoundingClientRect();
    }
    return null;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    const rect = getRect();
    if (!rect) return;

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTransform({
      x: x * strength,
      y: y * strength,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  if (asChild) {
    return (
      <div
        ref={divRef}
        className={cn(
          'inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          className,
        )}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={cn(
        'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        className,
      )}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
