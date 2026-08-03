import { GrainOverlay } from '@/components/common/GrainOverlay';
import About from '@/components/landing/About';
import CTA from '@/components/landing/CTA';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import HeroSidebar from '@/components/landing/HeroSidebar';
import Journey from '@/components/landing/Journey';
import Work from '@/components/landing/Projects';
import React from 'react';

export default function page() {
  return (
    <>
      {/* Grain overlay on top of shader background */}
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 pt-40 pb-16">
          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Left: Hero sidebar - shown at top on mobile, left side on desktop */}
            <aside className="w-full lg:w-64 lg:shrink-0">
              <div className="lg:sticky lg:top-32">
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
              <Journey />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
