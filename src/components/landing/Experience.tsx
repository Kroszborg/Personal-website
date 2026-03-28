import { type Experience, experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';
import { MagneticButton } from '../ui/magnetic-button';
import { ExpandableExperienceCard } from './ExpandableExperienceCard';

export default function Experience() {
  return (
    <section className="border-border/50 border-b py-12 last:border-0">
      <SectionHeading subHeading="Featured" heading="Experience" />
      <div className="mt-6 flex flex-col gap-4">
        {experiences.slice(0, 3).map((experience: Experience) => (
          <ExpandableExperienceCard
            key={experience.company}
            experience={experience}
          />
        ))}
      </div>
      <div className="mt-6">
        <MagneticButton strength={0.4}>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <Link href="/work-experience">View all experience →</Link>
          </Button>
        </MagneticButton>
      </div>
    </section>
  );
}
