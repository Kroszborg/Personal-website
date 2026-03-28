import { projects } from '@/config/Projects';
import { Link } from 'next-view-transitions';
import React from 'react';

import SectionHeading from '../common/SectionHeading';
import { ProjectList } from '../projects/ProjectList';
import { Button } from '../ui/button';

export default function Projects() {
  return (
    <section className="border-border/50 border-b py-6 last:border-0">
      <SectionHeading subHeading="Featured" heading="Projects" />
      <ProjectList className="mt-6" projects={projects.slice(0, 4)} />
      <div className="mt-6">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground hover:text-foreground -ml-2"
        >
          <Link href="/projects">View all projects →</Link>
        </Button>
      </div>
    </section>
  );
}
