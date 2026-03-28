'use client';

import { ctaConfig } from '@/config/CTA';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import Cal, { getCalApi } from '@calcom/embed-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface CallToActionProps {
  profileImage?: string;
  profileAlt?: string;
  linkText?: string;
  calLink?: string;
  preText?: string;
}

export default function CTA({
  profileImage = ctaConfig.profileImage,
  profileAlt = ctaConfig.profileAlt,
  linkText = ctaConfig.linkText,
  calLink = ctaConfig.calLink,
  preText = ctaConfig.preText,
}: CallToActionProps) {
  const { triggerHaptic, isMobile } = useHapticFeedback();
  const [showCalPopup, setShowCalPopup] = useState(false);

  useEffect(() => {
    const cal = async () => {
      try {
        const calApi = await getCalApi();
        if (calApi) {
          calApi('on', {
            action: 'bookingSuccessful',
            callback: () => setShowCalPopup(false),
          });
        }
      } catch {
        /* silent */
      }
    };
    cal();
  }, []);

  const handleButtonClick = () => {
    if (isMobile()) triggerHaptic('medium');
    setShowCalPopup(true);
  };

  return (
    <>
      <section className="border-border/50 border-b py-12">
        <div className="border-border/60 bg-muted/30 flex flex-col gap-6 rounded-xl border p-8">
          <p
            className="text-foreground text-xl leading-snug font-medium tracking-tight"
            style={{ fontFamily: 'ClashDisplay, Hanken Grotesk, sans-serif' }}
          >
            {preText}
          </p>
          <div
            className="group border-border bg-background hover:bg-muted inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border px-3 py-2 text-sm font-medium transition-all"
            onClick={handleButtonClick}
          >
            <div className="relative flex items-center gap-2">
              <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  alt={profileAlt}
                  width={20}
                  height={20}
                  className="h-full w-full object-cover"
                  src={profileImage}
                />
              </div>
              <span className="font-semibold">{linkText}</span>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      <Dialog open={showCalPopup} onOpenChange={setShowCalPopup}>
        <DialogContent className="max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-hidden sm:max-w-[calc(100vw-4rem)] md:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Book a Meeting</DialogTitle>
            <DialogDescription>
              Schedule a time to connect and discuss opportunities
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[calc(90vh-220px)] overflow-y-auto rounded-lg">
            <Cal
              calLink={calLink}
              config={{
                name: 'Portfolio Visitor',
                email: '',
                notes: 'Booked from portfolio website',
              }}
              className="h-[500px] w-full rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
