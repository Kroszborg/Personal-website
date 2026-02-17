'use client';

import { Project } from '@/types/project';
import { useState } from 'react';

import ProjectFilter from './ProjectFilter';
import { ProjectList } from './ProjectList';

interface ProjectsWithFilterProps {
  projects: Project[];
}

export default function ProjectsWithFilter({
  projects: initialProjects,
}: ProjectsWithFilterProps) {
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(initialProjects);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          All Projects
          {filteredProjects.length > 0 && (
            <span className="text-muted-foreground ml-2 text-sm font-normal">
              ({filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'})
            </span>
          )}
        </h2>
      </div>

      <ProjectFilter
        projects={initialProjects}
        onFilterChange={setFilteredProjects}
      />

      <ProjectList projects={filteredProjects} />
    </div>
  );
}
