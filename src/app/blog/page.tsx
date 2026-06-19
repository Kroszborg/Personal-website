import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getPublishedBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/blog'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPage() {
  const posts = getPublishedBlogPosts();

  return (
    <Container className="pt-40 pb-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Notes on the things I&apos;ve built: how they work under the hood,
            the trade-offs I made, and what I picked up along the way.
          </p>
        </div>

        <Separator />

        {/* Posts */}
        <BlogList posts={posts} />
      </div>
    </Container>
  );
}
