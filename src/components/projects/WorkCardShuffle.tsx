'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

interface Card {
  id: number;
  src: string;
  alt?: string;
}

interface WorkCardShuffleProps {
  cards: Card[];
  className?: string;
}

export const WorkCardShuffle = ({ cards, className }: WorkCardShuffleProps) => {
  const [isHovered, setHovered] = useState<boolean | null>(false);

  return (
    <div
      className={cn(
        'relative flex w-full items-center justify-start overflow-visible',
        className,
      )}
    >
      <AnimatePresence>
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="group relative z-50 flex h-[200px] w-full items-center"
        >
          {cards.map((card, index) => {
            const x = index * 55 - ((cards.length - 1) * 27) / 2;
            const hoverX = index * 28 - ((cards.length - 1) * 28) / 2;

            return (
              <motion.div
                key={card.id}
                className={cn(
                  'bg-card border-border absolute h-[160px] w-[180px] cursor-pointer rounded-[16px] border p-1 shadow-lg will-change-transform',
                )}
                animate={{
                  rotate: 8,
                  x: isHovered === true ? hoverX : x,
                  scale: isHovered === true ? 0.87 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                  <Image
                    src={card.src}
                    alt={card.alt ?? `Project ${card.id} showcase`}
                    fill
                    className="pointer-events-none object-cover"
                    sizes="(max-width: 768px) 100vw, 220px"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
