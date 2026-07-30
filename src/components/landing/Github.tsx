'use client';

import { githubConfig } from '@/config/Github';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import GithubIcon from '../svgs/Github';
import { Button } from '../ui/button';

const ActivityCalendar = dynamic(
  () => import('react-activity-calendar').then((mod) => mod.default),
  { ssr: false },
);

type ContributionItem = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GitHubContributionsResponse = {
  total?: Record<string, number>;
  contributions?: unknown[];
};

export default function Github() {
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${githubConfig.apiUrl}/${githubConfig.username}?y=last`,
        );
        if (!response.ok) {
          setHasError(true);
          return;
        }
        const data: GitHubContributionsResponse = await response.json();

        if (data?.contributions && Array.isArray(data.contributions)) {
          const validContributions = data.contributions
            .filter(
              (item: unknown): item is ContributionItem =>
                typeof item === 'object' &&
                item !== null &&
                'date' in item &&
                'count' in item &&
                'level' in item,
            )
            .map((item) => ({
              date: String(item.date),
              count: Number(item.count || 0),
              level: Math.min(
                Math.max(Number(item.level) || 0, 0),
                4,
              ) as ContributionItem['level'],
            }));

          if (validContributions.length > 0) {
            setTotalContributions(
              data.total?.lastYear ??
                validContributions.reduce((sum, item) => sum + item.count, 0),
            );
            setContributions(validContributions);
          } else {
            setHasError(true);
          }
        } else {
          setHasError(true);
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading && contributions.length > 0 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [isLoading, contributions]);

  return (
    <section className="border-border/50 border-b py-12 last:border-0">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.2em] uppercase">
            Activity
          </p>
          <h2 className="text-foreground mt-1.5 text-xl font-bold tracking-tight">
            GitHub
          </h2>
        </div>
        {!isLoading && !hasError && totalContributions > 0 && (
          <p className="text-muted-foreground pb-1 text-xs tabular-nums">
            <span className="text-foreground font-semibold">
              {totalContributions.toLocaleString()}
            </span>{' '}
            this year
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <div className="border-border border-t-foreground h-5 w-5 animate-spin rounded-full border-2" />
        </div>
      ) : hasError || contributions.length === 0 ? (
        <div className="border-border flex flex-col items-center gap-3 rounded-lg border border-dashed py-10 text-center">
          <GithubIcon className="h-7 w-7 opacity-30" />
          <p className="text-muted-foreground text-sm">
            {githubConfig.errorState.description}
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`https://github.com/${githubConfig.username}`}
              className="inline-flex items-center gap-2"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              {githubConfig.errorState.buttonText}
            </Link>
          </Button>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="no-scrollbar w-full cursor-grab overflow-x-auto select-none active:cursor-grabbing"
          onMouseDown={(e) => {
            isDragging.current = true;
            dragStartX.current = e.clientX;
            dragScrollLeft.current =
              scrollContainerRef.current?.scrollLeft ?? 0;
          }}
          onMouseMove={(e) => {
            if (!isDragging.current || !scrollContainerRef.current) return;
            scrollContainerRef.current.scrollLeft =
              dragScrollLeft.current - (e.clientX - dragStartX.current);
          }}
          onMouseUp={() => {
            isDragging.current = false;
          }}
          onMouseLeave={() => {
            isDragging.current = false;
          }}
        >
          <ActivityCalendar
            data={contributions}
            blockSize={11}
            blockMargin={3}
            fontSize={11}
            colorScheme="dark"
            maxLevel={githubConfig.maxLevel}
            hideTotalCount={true}
            hideColorLegend={true}
            hideMonthLabels={false}
            theme={githubConfig.theme}
            labels={{
              months: githubConfig.months,
              weekdays: githubConfig.weekdays,
              totalCount: githubConfig.totalCountLabel,
            }}
            style={{ color: 'rgb(139, 148, 158)' }}
          />
        </div>
      )}
    </section>
  );
}
