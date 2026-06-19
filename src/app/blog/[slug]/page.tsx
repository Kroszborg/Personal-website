import { BlogContent } from '@/components/blog/BlogContent';
import Container from '@/components/common/Container';
import ReadingProgress from '@/components/projects/ReadingProgress';
import ArrowLeft from '@/components/svgs/ArrowLeft';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/Meta';
import {
  getBlogPostBySlug,
  getBlogPostSlugs,
  getRelatedPosts,
} from '@/lib/blog';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all published blog posts
export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    return {
      title: 'Post Not Found',
    };
  }

  const { title, description, image } = post.frontmatter;

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${title} - Blog`,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, 2);

  return (
    <>
      <ReadingProgress />
      <Container className="pt-40 pb-16">
        <div className="space-y-12">
          {/* Back Button */}
          <div>
            <Button variant="ghost" asChild className="group">
              <Link href="/blog" className="flex items-center space-x-2">
                <ArrowLeft className="size-4" />
                <span>Back to Blog</span>
              </Link>
            </Button>
          </div>

          {/* Blog Content */}
          <BlogContent frontmatter={post.frontmatter} content={post.content} />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6">
              <Separator />
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Related Posts</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedPosts.map((related) => (
                    <div
                      key={related.slug}
                      className="group bg-card hover:bg-muted/50 rounded-lg border p-6 transition-colors"
                    >
                      <Link href={`/blog/${related.slug}`}>
                        <div className="space-y-3">
                          <h3 className="group-hover:text-primary text-lg font-semibold">
                            {related.frontmatter.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 text-sm">
                            {related.frontmatter.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {related.frontmatter.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="bg-muted rounded px-2 py-1 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Back to Blog CTA */}
          <div className="text-center">
            <Separator className="mb-8" />
            <Button asChild size="lg">
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
