'use client';

import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import Skill from '../common/Skill';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExpandableExperienceCardProps {
  experience: Experience;
}

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

export function ExpandableExperienceCard({
  experience,
}: ExpandableExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(experience.isCurrent);

  return (
    <div className="flex flex-col gap-4">
      {/* Company Header */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <Image
            src={experience.image}
            alt={experience.company}
            width={100}
            height={100}
            className="size-12 rounded-md"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  'text-lg font-bold',
                  experience.isBlur ? 'blur-[5px]' : 'blur-none',
                )}
              >
                {experience.company}
              </h3>
              {experience.website && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.website}
                      target="_blank"
                      className="size-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      <Website />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Visit Website</TooltipContent>
                </Tooltip>
              )}
              {!experience.isCurrent && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 transition-transform duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? (
                        <ChevronUp className="size-4 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="size-4 transition-transform duration-200" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isExpanded ? 'Collapse details' : 'Expand details'}
                  </TooltipContent>
                </Tooltip>
              )}
              {experience.x && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.x}
                      target="_blank"
                      className="size-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      <X />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Follow on X</TooltipContent>
                </Tooltip>
              )}
              {experience.linkedin && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.linkedin}
                      target="_blank"
                      className="size-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      <LinkedIn />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Connect on LinkedIn</TooltipContent>
                </Tooltip>
              )}
              {experience.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={experience.github}
                      target="_blank"
                      className="size-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      <Github />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View GitHub</TooltipContent>
                </Tooltip>
              )}
              {experience.isCurrent && (
                <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                  <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
                  Working
                </div>
              )}
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {experience.position}
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-col text-sm text-neutral-600 md:text-right dark:text-neutral-400">
          <p>
            {experience.startDate} -{' '}
            {experience.isCurrent ? 'Present' : experience.endDate}
          </p>
          <p>{experience.location}</p>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 pt-2">
          {/* Technologies */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((technology, techIndex: number) => (
                <Skill
                  key={techIndex}
                  name={technology.name}
                  href={technology.href}
                >
                  {technology.icon}
                </Skill>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
            {experience.description.map(
              (description: string, descIndex: number) => (
                <p
                  key={descIndex}
                  dangerouslySetInnerHTML={{
                    __html: `• ${parseDescription(description)}`,
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
