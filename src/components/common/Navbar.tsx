'use client';

import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import { SearchTrigger } from './SearchTrigger';

export default function Navbar() {
  return (
    <nav className="border-border/40 bg-background/80 fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border shadow-lg backdrop-blur-xl transition-all duration-300 md:h-[60px] md:w-auto md:max-w-5xl md:rounded-full">
      <div className="flex h-14 items-center justify-between px-4 md:gap-6 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2.5">
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
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors md:text-base"
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
    </nav>
  );
}
