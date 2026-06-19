'use client';

import { navbarConfig } from '@/config/Navbar';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import { SearchTrigger } from './SearchTrigger';

export default function Navbar() {
  const { scrollY } = useScroll();

  // Smooth the raw scroll value with a spring so the shrink eases in and out
  // instead of tracking every pixel of scroll 1:1. Keeps it from feeling jumpy.
  const smoothScroll = useSpring(scrollY, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  // Expanded at the top, gradually shrinks over the first ~280px of scroll —
  // a longer range makes the transition feel slow and deliberate.
  // Desktop and mobile get their own max-width ranges so it looks right on both.
  const maxWidthDesktop = useTransform(smoothScroll, [0, 280], [1024, 640]);
  const maxWidthMobile = useTransform(smoothScroll, [0, 280], [560, 380]);
  const paddingX = useTransform(smoothScroll, [0, 280], [24, 16]);
  const height = useTransform(smoothScroll, [0, 280], [64, 52]);
  const borderRadius = useTransform(smoothScroll, [0, 280], [24, 9999]);
  const topOffset = useTransform(smoothScroll, [0, 280], [24, 14]);
  // Soften the shadow as it docks into a compact pill.
  const boxShadow = useTransform(
    smoothScroll,
    [0, 280],
    ['0 10px 30px -10px rgba(0,0,0,0.35)', '0 4px 16px -6px rgba(0,0,0,0.25)'],
  );

  // Pick the active max-width range based on viewport, kept in sync on resize.
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <motion.nav
      style={{
        maxWidth: isDesktop ? maxWidthDesktop : maxWidthMobile,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        height,
        borderRadius,
        top: topOffset,
        boxShadow,
      }}
      className="border-border/40 bg-background/80 fixed left-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 overflow-hidden border backdrop-blur-xl"
    >
      <div className="flex h-full items-center justify-between md:gap-6">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <Image
              className="h-6 w-6 rounded transition-opacity group-hover:opacity-70"
              src={navbarConfig.logo.src}
              alt={navbarConfig.logo.alt}
              width={24}
              height={24}
            />
            <span className="text-base font-semibold md:text-lg">Abhiman</span>
          </Link>
          {/* Nav items - visible on all screen sizes */}
          <div className="flex items-center gap-4 md:gap-6">
            {navbarConfig.navItems
              .filter((item) => !item.invisible)
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-sm whitespace-nowrap transition-colors md:text-base"
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Search trigger - desktop only */}
          <div className="hidden md:flex">
            <SearchTrigger />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
