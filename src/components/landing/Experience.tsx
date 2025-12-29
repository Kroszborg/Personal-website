import { type Experience, experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';
import { ExpandableExperienceCard } from './ExpandableExperienceCard';

export default function Experience() {
  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Featured" heading="Experience" />
      <div className="mt-4 flex flex-col gap-6">
        {experiences.map((experience: Experience) => (
          <ExpandableExperienceCard
            key={experience.company}
            experience={experience}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline">
          <Link href="/work-experience">View detailed work experience</Link>
        </Button>
      </div>
    </Container>
  );
}
