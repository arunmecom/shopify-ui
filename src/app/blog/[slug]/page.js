'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { safeClient } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import { portableTextComponents } from '../../../components/portableText/PortableTextComponents';

async function getPostBySlug(slug) {
  try {
    const client = safeClient();
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
        mainImage{
          asset->{
            _id,
            url
          },
          alt
        },
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
    const client = safeClient();
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

// Removed generateStaticParams to make all blog posts fully dynamic
// This ensures new posts appear immediately without any caching delays


export default function BlogPost({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const resolvedParams = await params;
        const resolvedSlug = resolvedParams.slug;
        setSlug(resolvedSlug);
        
        const postData = await getPostBySlug(resolvedSlug);
        setPost(postData);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [params]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }
  
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
        <div className="space-y-6">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category, index) => (
                <Badge key={category.slug?.current || `category-${index}`} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
          
          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="font-medium">{post.author?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'No date'}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readingTime}
            </div>
          </div>
        </div>

        {/* Main Image */}
        {post.mainImage?.asset?.url && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Article Content */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
          <CardContent className="prose prose-lg max-w-none py-8 px-8">
            <PortableText 
              value={post.body} 
              components={portableTextComponents}
            />
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
