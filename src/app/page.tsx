import { GrainOverlay } from '@/components/common/GrainOverlay';
import About from '@/components/landing/About';
import CTA from '@/components/landing/CTA';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import HeroSidebar from '@/components/landing/HeroSidebar';
import Journey from '@/components/landing/Journey';
import Work from '@/components/landing/Projects';
import Setup from '@/components/landing/Setup';
import React from 'react';

export default function page() {
  return (
    <>
      {/* Grain overlay on top of shader background */}
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 pt-40 pb-16">
          <div className="flex gap-12">
            {/* Left: Hero sidebar - fixed width */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-32">
                <HeroSidebar />
              </div>
            </aside>

            {/* Right: Main content */}
            <main className="min-w-0 flex-1">
              <Experience />
              <Work />
              <About />
              <Github />
              <CTA />
              <Setup />
              <Journey />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
