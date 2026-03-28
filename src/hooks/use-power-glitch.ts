'use client';

import { useEffect } from 'react';

interface GlitchConfig {
  timing?: {
    duration?: number;
    iterations?: number;
  };
  glitchTimeSpan?: {
    start?: number;
    end?: number;
  };
  shake?: {
    velocity?: number;
    amplitudeX?: number;
    amplitudeY?: number;
  };
  slice?: {
    count?: number;
    velocity?: number;
    minHeight?: number;
    maxHeight?: number;
    hueRotate?: boolean;
  };
  playMode?: 'always' | 'hover';
  createContainers?: boolean;
  hideOverflow?: boolean;
}

export function usePowerGlitch(selector: string, config: GlitchConfig) {
  useEffect(() => {
    let PowerGlitch:
      | {
          glitch: (selector: string, config: GlitchConfig) => void;
          destroy?: (selector: string) => void;
        }
      | undefined;

    const initGlitch = async () => {
      if (typeof window === 'undefined') return;

      try {
        const glitchModule = await import('powerglitch');
        PowerGlitch = glitchModule.PowerGlitch;
        if (PowerGlitch && PowerGlitch.glitch) {
          PowerGlitch.glitch(selector, config);
        }
      } catch (error) {
        console.error('Failed to initialize PowerGlitch:', error);
      }
    };

    initGlitch();

    return () => {
      if (PowerGlitch?.destroy) {
        PowerGlitch.destroy(selector);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);
}
