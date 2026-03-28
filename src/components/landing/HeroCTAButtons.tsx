'use client';

import CV from '@/components/svgs/CV';
import Chat from '@/components/svgs/Chat';
import { Button } from '@/components/ui/button';
import { InteractiveEyes } from '@/components/ui/interactive-eye';
import { LiquidMetalButton } from '@/components/ui/liquid-metal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { usePowerGlitch } from '@/hooks/use-power-glitch';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import { useRouter } from 'next/navigation';

interface HeroButton {
  variant: string;
  text: string;
  href: string;
  icon: string;
}

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

interface HeroCTAButtonsProps {
  buttons: HeroButton[];
}

export default function HeroCTAButtons({ buttons }: HeroCTAButtonsProps) {
  const router = useRouter();

  usePowerGlitch('#hero-avatar-glitch', {
    timing: { duration: 3000, iterations: Infinity },
    glitchTimeSpan: { start: 0.9, end: 1.0 },
    shake: { velocity: 8, amplitudeX: 0.05, amplitudeY: 0.05 },
    slice: {
      count: 3,
      velocity: 8,
      minHeight: 0.02,
      maxHeight: 0.08,
      hueRotate: false,
    },
    playMode: 'always',
    createContainers: true,
    hideOverflow: false,
  });

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      {buttons.map((button, index) => {
        const IconComponent =
          buttonIcons[button.icon as keyof typeof buttonIcons];

        if (index === 0) {
          return (
            <LiquidMetalButton
              key={index}
              metalConfig={{
                colorBack: '#888888',
                colorTint: '#ffffff',
                speed: 0.3,
                distortion: 0.1,
              }}
              size="sm"
              onClick={() => router.push(button.href)}
            >
              <span className="flex items-center gap-2">
                {IconComponent && <IconComponent />}
                {button.text}
                <InteractiveEyes size={16} pupilSize={6} gap={4} />
              </span>
            </LiquidMetalButton>
          );
        }

        return (
          <MagneticButton key={index} asChild className="inline-block">
            <Button
              variant={button.variant as 'outline' | 'default'}
              className={cn(
                button.variant === 'outline' && 'inset-shadow-indigo-500',
                button.variant === 'default' && 'inset-shadow-indigo-500',
              )}
            >
              {IconComponent && <IconComponent />}
              <Link href={button.href}>{button.text}</Link>
            </Button>
          </MagneticButton>
        );
      })}
    </div>
  );
}
