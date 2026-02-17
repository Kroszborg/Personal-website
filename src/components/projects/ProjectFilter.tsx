'use client';

import { Project } from '@/types/project';
import { useState } from 'react';

import { Button } from '../ui/button';

interface ProjectFilterProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

export default function ProjectFilter({
  projects,
  onFilterChange,
}: ProjectFilterProps) {
  const [selectedTech, setSelectedTech] = useState<string>('all');

  // Extract unique technologies from all projects
  const technologies = Array.from(
    new Set(
      projects.flatMap((project) =>
        project.technologies.map((tech) => tech.name),
      ),
    ),
  ).sort();

  // Filter projects based on selected technology
  const handleFilter = (tech: string) => {
    let filtered = projects;

    // Filter by technology
    if (tech !== 'all') {
      filtered = filtered.filter((project) =>
        project.technologies.some((t) => t.name === tech),
      );
    }

    onFilterChange(filtered);
  };

  const handleTechChange = (tech: string) => {
    setSelectedTech(tech);
    handleFilter(tech);
  };

  return (
    <div className="space-y-4">
      {/* Technology Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedTech === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleTechChange('all')}
          className="rounded-full"
        >
          All
        </Button>
        {technologies.map((tech) => (
          <Button
            key={tech}
            variant={selectedTech === tech ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleTechChange(tech)}
            className="rounded-full"
          >
            {tech}
          </Button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-muted-foreground text-sm">
        Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
