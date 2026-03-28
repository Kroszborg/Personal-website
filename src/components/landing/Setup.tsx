'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import React, { useState } from 'react';

import SectionHeading from '../common/SectionHeading';
import Gear from '../svgs/Gear';

const setup = [
  {
    name: 'Gears Used',
    description: 'Productivity tools and gear I use to get my work done.',
    icon: <Gear className="size-4" />,
    href: '/gears',
  },
];

function SetupRow({ item }: { item: (typeof setup)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-border/50 group flex items-center justify-between gap-4 border-b py-3 last:border-0"
    >
      <div className="flex items-center gap-3">
        <div className="text-muted-foreground group-hover:text-foreground transition-colors">
          {item.icon}
        </div>
        <div>
          <p className="group-hover:text-foreground text-sm font-medium transition-colors">
            {item.name}
          </p>
          <p className="text-muted-foreground text-xs">{item.description}</p>
        </div>
      </div>
      <motion.div
        animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <ArrowRight className="text-muted-foreground size-3.5" />
      </motion.div>
    </Link>
  );
}

export default function Setup() {
  return (
    <section className="border-border/50 border-b py-12 last:border-0">
      <SectionHeading subHeading="Development" heading="Setup" />
      <div className="mt-6">
        {setup.map((item) => (
          <SetupRow key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
