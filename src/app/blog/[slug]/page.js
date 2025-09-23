import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client } from '../../../sanity/lib/client';

async function getPostBySlug(slug) {
  try {
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author->{
          name,
          bio,
          image
        },
        mainImage,
        categories[]->{
          title,
          slug
        },
        body,
        readingTime
      }
    `, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post from Sanity:', error)
    return null
  }
}

async function getPostSlugs() {
  try {
    const slugs = await client.fetch(`
      *[_type == "post"] {
        "slug": slug.current
      }
    `)
    return slugs.map(item => item.slug)
  } catch (error) {
    console.error('Error fetching post slugs from Sanity:', error)
    return []
  }
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on our blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on our blog`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Button asChild variant="outline" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <div className="space-y-4">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge key={category.slug?.current} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl font-bold">{post.title}</h1>
          
          {post.excerpt && (
            <p className="text-xl text-muted-foreground">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author?.name || 'Anonymous'}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readingTime}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <Card>
          <CardContent className="prose prose-lg max-w-none py-8">
            <PortableText value={post.body} />
          </CardContent>
        </Card>

        {/* Back to Blog */}
        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
