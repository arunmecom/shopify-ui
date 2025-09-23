import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { safeClient } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';

async function getAllPosts() {
  try {
    const client = safeClient();
    const posts = await client.fetch(`
      *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author->{
          name,
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
        readingTime
      }
    `)
    return posts || []
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insights, tutorials, and best practices for Shopify app development.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post._id || post.slug?.current || `post-${Math.random()}`} className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
                {/* Image Section */}
                {post.mainImage?.asset?.url && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage).width(400).height(300).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white">
                        {post.readingTime || '5 min read'}
                      </Badge>
                    </div>
                  </div>
                )}
                
                <CardHeader className={post.mainImage?.asset?.url ? "pt-6" : "pt-8"}>
                  {!post.mainImage?.asset?.url && (
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{post.readingTime || '5 min read'}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'No date'}
                      </div>
                    </div>
                  )}
                  
                  <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt || 'No excerpt available'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{post.author?.name || 'Anonymous'}</span>
                    </div>
                    {post.mainImage?.asset?.url && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'No date'}
                      </div>
                    )}
                  </div>
                  
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.categories.map((category) => (
                        <Badge key={category.slug?.current} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Read More Button */}
                  <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300">
                    <Link href={`/blog/${post.slug?.current}`}>
                      Read More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Stay Updated</h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter to get the latest updates and tutorials delivered to your inbox.
          </p>
          <div className="flex justify-center space-x-4">
            <Button>
              Subscribe to Newsletter
            </Button>
            <Button variant="outline">
              Follow on Twitter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
