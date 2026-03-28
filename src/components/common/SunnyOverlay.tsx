'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Sunny Mode — apartment building shadow overlay (light mode only).
 *
 * Buildings are skewed to simulate a cast shadow (sun angled from the right).
 * fillRule="evenodd" punches window holes through the building silhouette so
 * walls cast shadow while windows stay transparent.
 * A vertical gradient mask fades the shadow near the building tops.
 * A slow CSS sway animates the shadow as if the sun angle shifts with a breeze.
 */

function windowHoles(
  cols: number[],
  rows: number[],
  w: number,
  h: number,
): string {
  return cols
    .flatMap((x) => rows.map((y) => `M${x},${y} h${w} v${h} h-${w} Z`))
    .join(' ');
}

export function SunnyOverlay() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  // Only render in light mode
  if (isDark) return null;

  // Building A — tallest, main block (x 1060–1250)
  const buildingA = [
    'M1060,-40 L1250,-40 L1250,900 L1060,900 Z',
    windowHoles(
      [1085, 1135, 1185],
      [20, 75, 130, 185, 295, 350, 405, 460, 515, 625, 680, 735, 790, 845],
      40,
      32,
    ),
  ].join(' ');

  // Building B — medium, right-edge (x 1265–1440+)
  const buildingB = [
    'M1265,200 L1440,200 L1440,900 L1265,900 Z',
    windowHoles(
      [1285, 1375],
      [235, 290, 345, 400, 510, 565, 620, 675, 785, 840],
      40,
      32,
    ),
  ].join(' ');

  // Building C — shorter background building (x 850–1050)
  const buildingC = [
    'M850,420 L1050,420 L1050,900 L850,900 Z',
    windowHoles(
      [870, 922, 974],
      [452, 507, 562, 617, 672, 727, 782, 837],
      36,
      30,
    ),
  ].join(' ');

  return (
    <div className="shader-bg" aria-hidden="true">
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMaxYMax slice"
      >
        <defs>
          <linearGradient id="shadowFade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="black" stopOpacity="0.12" />
            <stop offset="50%" stopColor="black" stopOpacity="0.06" />
            <stop offset="100%" stopColor="black" stopOpacity="0.02" />
          </linearGradient>
          <mask id="shadowMask">
            <rect
              x="0"
              y="0"
              width="1440"
              height="900"
              fill="url(#shadowFade)"
            />
          </mask>
        </defs>
        <g
          mask="url(#shadowMask)"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'bottom right',
            animation: 'shadowSway 22s ease-in-out infinite',
          }}
        >
          <path
            fillRule="evenodd"
            fill="rgb(60, 45, 30)"
            opacity="0.08"
            d={buildingA}
          />
          <path
            fillRule="evenodd"
            fill="rgb(60, 45, 30)"
            opacity="0.05"
            d={buildingB}
          />
          <path
            fillRule="evenodd"
            fill="rgb(60, 45, 30)"
            opacity="0.03"
            d={buildingC}
          />
        </g>
      </svg>
    </div>
  );
}
