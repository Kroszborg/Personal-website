import { getPublishedBlogPosts } from '@/lib/blog';
import { Link } from 'next-view-transitions';
import React from 'react';

import { BlogCard } from '../blog/BlogCard';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';

/** The newest posts on the home page, laid out like the Projects section. */
export default function Blog() {
  const posts = getPublishedBlogPosts().slice(0, 4);
  if (posts.length === 0) return null;

  return (
    <section className="border-border/50 border-b py-6 last:border-0">
      <SectionHeading heading="Blogs" />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-6">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground hover:text-foreground -ml-2"
        >
          <Link href="/blog">View all blogs →</Link>
        </Button>
      </div>
    </section>
  );
}
