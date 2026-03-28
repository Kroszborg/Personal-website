'use client';

import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import { CommandPalette } from './CommandPalette';
import { SearchTrigger } from './SearchTrigger';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  return (
    <>
      <nav className="border-border/40 bg-background/80 fixed top-6 left-1/2 z-50 h-12 -translate-x-1/2 rounded-full border shadow-lg backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2.5">
              <Image
                className="h-6 w-6 rounded transition-opacity group-hover:opacity-70"
                src={navbarConfig.logo.src}
                alt={navbarConfig.logo.alt}
                width={24}
                height={24}
              />
              <span className="text-sm font-semibold">Abhiman</span>
            </Link>
            <div className="hidden items-center gap-5 md:flex">
              {navbarConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    item.invisible
                      ? 'group text-muted-foreground hover:text-foreground text-xs transition-colors'
                      : 'text-muted-foreground hover:text-foreground text-xs transition-colors'
                  }
                >
                  <span
                    className={
                      item.invisible
                        ? 'opacity-0 transition-opacity group-hover:opacity-100'
                        : undefined
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SearchTrigger />
            <ThemeToggleButton variant="circle" start="top-right" blur />
          </div>
        </div>
      </nav>
      <CommandPalette />
    </>
  );
}
