'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
  variant?: 'sidebar' | 'inline';
}

export default function TableOfContents({
  content,
  className,
  variant = 'sidebar',
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const headingRefs = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  useEffect(() => {
    // Extract headings from content using regex
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));

    const extractedHeadings: Heading[] = matches.map((match) => {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      return { id, text, level };
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            headingRefs.current[entry.target.id] = entry;
          } else {
            delete headingRefs.current[entry.target.id];
          }
        });

        // Find the heading that's currently in view
        const visibleHeadings = Object.values(headingRefs.current)
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      },
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length === 0) return null;

  if (variant === 'inline') {
    return (
      <nav
        className={cn('bg-muted/20 mb-8 rounded-lg border p-4', className)}
        aria-label="Table of contents"
      >
        <h2 className="mb-3 text-sm font-semibold">On this page</h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                type="button"
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  'text-left text-sm transition-colors hover:underline',
                  heading.level === 3 && 'ml-2',
                  activeId === heading.id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <div
      className={cn(
        'sticky top-20 hidden lg:block',
        'max-h-[calc(100vh-8rem)] overflow-y-auto',
        className,
      )}
    >
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Table of Contents</h3>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                'block w-full text-left text-sm transition-colors',
                heading.level === 3 && 'ml-4',
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
