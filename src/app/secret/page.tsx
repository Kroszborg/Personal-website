import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/secret'),
  robots: {
    index: false,
    follow: false,
  },
};

const SECTIONS = [
  {
    id: 'facts',
    title: 'Random Facts',
    content: (
      <ul className="text-muted-foreground space-y-2">
        <li>• I love building 3D web experiences with Three.js</li>
        <li>• Coffee is my fuel ☕</li>
        <li>• I enjoy solving complex problems</li>
        <li>• Always learning something new</li>
        <li>• Passionate about open source</li>
      </ul>
    ),
  },
  {
    id: 'music',
    title: 'Currently Listening',
    content: (
      <p className="text-muted-foreground">
        Check out my{' '}
        <Link
          href="https://open.spotify.com/user/kroszborg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Spotify profile
        </Link>{' '}
        to see what I&apos;m listening to!
      </p>
    ),
  },
  {
    id: 'easter-egg',
    title: 'Easter Egg',
    content: (
      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          You found a hidden easter egg! 🥚
        </p>
        <Link
          href="/resume"
          className="text-primary font-semibold hover:underline"
        >
          View my resume →
        </Link>
      </div>
    ),
  },
] as const;

export default function SecretPage() {
  return (
    <Container className="pt-40 pb-16">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Secret
          </h1>
          <p className="text-muted-foreground text-lg">
            You found the secret. Here&apos;s a bit about me.
          </p>
        </div>

        {/* Table of contents for this page */}
        <nav className="bg-muted/30 rounded-lg border p-4">
          <h2 className="mb-3 text-sm font-semibold">On this page</h2>
          <ul className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-primary text-sm hover:underline"
                >
                  {s.title}
                </a>
                {s.id !== SECTIONS[SECTIONS.length - 1].id && (
                  <span className="text-muted-foreground ml-2">·</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Separator />

        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
            <div className="bg-muted/10 rounded-lg border p-6">
              {section.content}
            </div>
          </section>
        ))}

        <section className="flex justify-center pt-4">
          <div className="relative">
            <Image
              src="/assets/catt.png"
              alt="Secret cat"
              width={200}
              height={200}
              className="border-primary rounded-lg border-2"
            />
            <div className="bg-primary text-primary-foreground absolute -right-2 -bottom-2 rounded-full px-3 py-1 text-xs font-bold">
              🐱
            </div>
          </div>
        </section>

        <Separator />

        <div className="text-center">
          <Link href="/" className="text-primary text-sm hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </Container>
  );
}
