'use client';

import { about, mySkills } from '@/config/About';
import { motion } from 'motion/react';
import Image from 'next/image';
import React from 'react';

import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function About() {
  return (
    <section className="border-border/50 border-b py-12 last:border-0">
      <SectionHeading subHeading="About" heading="Me" />
      <div className="mt-8 flex flex-col gap-6">
        <div className="group overflow-hidden rounded-xl">
          <Image
            src="/assets/catt.png"
            alt="About"
            width={240}
            height={240}
            quality={100}
            className="border-secondary size-60 rounded-md border-2 object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <motion.h3
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {about.name}
          </motion.h3>
          <motion.p
            className="text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {about.description}
          </motion.p>
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.12em] uppercase">
              Skills
            </p>
            <div className="flex flex-wrap gap-3">
              {mySkills.map((skill) => (
                <Tooltip key={skill.key}>
                  <TooltipTrigger asChild>
                    <div className="size-6 transition-transform hover:scale-110 hover:cursor-pointer">
                      {skill}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{skill.key}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
