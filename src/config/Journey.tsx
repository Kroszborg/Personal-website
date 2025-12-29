import Calender from '@/components/svgs/Calender';
import React from 'react';

export type JourneyItem = {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

export const journeyItems: JourneyItem[] = [
  {
    name: 'My Journey',
    description: 'A timeline of my learning, projects, and milestones.',
    icon: Calender,
    href: '/journey',
  },
  // Temporarily hidden - uncomment to re-enable certificates page
  // {
  //   name: 'Certificates & Achievements',
  //   description: 'A curated list of certificates and achievements.',
  //   icon: CertificateIcon,
  //   href: '/journey/certificates',
  // },
];

const journeyConfig = {
  journeyItems,
};

export default journeyConfig;
