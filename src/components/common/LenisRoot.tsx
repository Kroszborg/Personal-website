'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface LenisRootProps {
  children: ReactNode;
}

export function LenisRoot({ children }: LenisRootProps) {
  return (
    <ReactLenis
      options={{
        duration: 0.8,
        touchMultiplier: 1,
        wheelMultiplier: 1,
        smoothWheel: true,
      }}
      root
    >
      {children}
    </ReactLenis>
  );
}
