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
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
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
        ref={containerRef}
        className={cn(
          'inline-block transition-transform duration-150 ease-out',
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
      ref={containerRef as React.RefObject<HTMLButtonElement>}
      className={cn('transition-transform duration-150 ease-out', className)}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
      onMouseMove={
        handleMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>
      }
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
