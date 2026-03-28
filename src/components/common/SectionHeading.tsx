import React from 'react';

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
}

export default function SectionHeading({
  subHeading,
  heading,
}: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <p className="text-muted-foreground mb-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase">
        {subHeading}
      </p>
      <h2 className="text-foreground text-xl font-bold tracking-tight">
        {heading}
      </h2>
    </div>
  );
}
