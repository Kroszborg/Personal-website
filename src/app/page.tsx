import Container from '@/components/common/Container';
import About from '@/components/landing/About';
// import Blog from '@/components/landing/Blog'; // Temporarily hidden - uncomment to re-enable blog
import CTA from '@/components/landing/CTA';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Journey from '@/components/landing/Journey';
import Work from '@/components/landing/Projects';
import Setup from '@/components/landing/Setup';
// Shows Gears section (VS Code setup removed)
import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Experience />
      <Work />
      <About />
      <Github />
      {/* <Blog /> */} {/* Temporarily hidden - uncomment to re-enable blog */}
      <CTA />
      <Setup />{' '}
      {/* Shows Gears section only (VS Code setup removed from Setup component) */}
      <Journey />
    </Container>
  );
}
