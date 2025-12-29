'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function SearchTrigger() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const handleClick = () => {
    // Trigger Ctrl+K event
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      code: 'KeyK',
      ctrlKey: !isMac,
      metaKey: isMac,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <Button
      variant="outline"
      className="hover:bg-accent relative flex h-9 items-center justify-start gap-2 rounded-md border px-3 text-sm font-normal shadow-sm transition-colors"
      onClick={handleClick}
    >
      <span className="text-muted-foreground hidden md:inline-flex">
        Search
      </span>
      <span className="text-xs">{isMac ? '⌘' : 'Ctrl +'}</span>K
    </Button>
  );
}
