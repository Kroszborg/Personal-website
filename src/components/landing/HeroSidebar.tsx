import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Skill from '../common/Skill';
import { MatrixText } from '../ui/matrix-text';
import { TextScramble } from '../ui/text-scramble';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import HeroCTAButtons from './HeroCTAButtons';

export default function HeroSidebar() {
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
          <b key={part.key} className="text-foreground">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return <span key={part.key}>{part.text}</span>;
      }
      return null;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Avatar + status */}
      <div className="flex items-center gap-4">
        <div id="hero-avatar-glitch">
          <Image
            src={avatar}
            alt={name}
            width={56}
            height={56}
            className="ring-border/60 size-20 rounded-full object-cover ring-2"
            priority
          />
        </div>
      </div>

      {/* Big heading */}
      <div className="flex flex-col gap-1">
        <h1
          className="text-foreground text-[2.8rem] leading-[1.05] font-bold tracking-[-0.03em]"
          style={{ fontFamily: 'ClashDisplay, Hanken Grotesk, sans-serif' }}
        >
          <MatrixText text={name} />
        </h1>
        <p className="text-muted-foreground text-lg font-medium tracking-tight">
          <TextScramble text={title} />
        </p>
      </div>

      {/* Bio */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        <span className="inline-flex flex-wrap items-center gap-x-1 gap-y-1">
          {renderDescription()}
        </span>
      </p>

      {/* CTA buttons */}
      <HeroCTAButtons buttons={buttons} />

      {/* Social links */}
      <div className="flex items-center gap-4">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="block size-[30px]">{link.icon}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
