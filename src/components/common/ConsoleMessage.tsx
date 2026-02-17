'use client';

import { useEffect } from 'react';

export default function ConsoleMessage() {
  useEffect(() => {
    const style = 'font-family: monospace; line-height: 1.5;';

    console.log(
      '%c\n  ╭─────────────────────────────────────────╮\n  │  👋 Hey, fellow developer!              │\n  │  Welcome to my portfolio.               │\n  │  Try: ↑↑↓↓←→←→ B A (Konami Code)       │\n  ╰─────────────────────────────────────────╯\n',
      `color: #22c55e; font-size: 13px; ${style}`,
    );
    console.log(
      '%c🔗 GitHub %c github.com/Kroszborg',
      'color: #f97316; font-weight: bold;',
      'color: #94a3b8;',
    );
    console.log(
      '%c🐦 Twitter %c @kroszborgg',
      'color: #3b82f6; font-weight: bold;',
      'color: #94a3b8;',
    );
    console.log(
      '%c📂 Source %c https://github.com/Kroszborg/Personal-website',
      'color: #8b5cf6; font-weight: bold;',
      'color: #94a3b8;',
    );
  }, []);

  return null;
}
