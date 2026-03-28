import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import { MatrixText } from '../ui/matrix-text';
import { TextScramble } from '../ui/text-scramble';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import HeroCTAButtons from './HeroCTAButtons';
import SpotifyNowPlaying from './SpotifyNowPlaying';

export default function Hero() {
  const { name, title, avatar, skills, description, buttons } = heroConfig;

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="text-primary whitespace-pre-wrap">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <Container className="mx-auto max-w-5xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-12">
        {/* ── Left: text content ── */}
        <div className="flex flex-col md:col-span-3">
          {/* Status badge */}
          <div className="border-border bg-muted/50 text-muted-foreground mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            Available for work
          </div>

          {/* Name + title */}
          <div className="mb-4">
            <p className="text-muted-foreground mb-1 text-sm tracking-widest uppercase">
              Hi, I&apos;m
            </p>
            <h1 className="text-5xl leading-[0.95] font-black tracking-tight md:text-6xl">
              <MatrixText text={name} />
            </h1>
            <div className="text-secondary mt-3 text-xl font-medium md:text-2xl">
              <TextScramble text={title} />
            </div>
          </div>

          {/* Description */}
          <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm leading-relaxed md:text-base">
            {renderDescription()}
          </div>

          {/* CTA Buttons (client — also runs PowerGlitch hook) */}
          <HeroCTAButtons buttons={buttons} />

          {/* Social links */}
          <div className="mt-6 flex gap-3">
            {socialLinks.map((link) => (
              <Tooltip key={link.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <span className="size-5">{link.icon}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* ── Right: avatar + spotify ── */}
        <div className="flex flex-col items-center gap-4 md:col-span-2 md:items-end">
          <div id="hero-avatar-glitch" className="relative inline-block">
            <div className="bg-primary/25 absolute inset-0 rounded-full blur-2xl" />
            <Image
              src={avatar}
              alt={name}
              width={160}
              height={160}
              className="border-border relative size-40 rounded-full border-2 bg-blue-300 object-cover shadow-xl dark:bg-yellow-300"
              priority
            />
          </div>

          <SpotifyNowPlaying />
        </div>
      </div>
    </Container>
  );
}
