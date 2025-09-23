import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { client } from '../../sanity/lib/client';

async function getAllPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author->{
          name,
          image
        },
        mainImage,
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
  console.log('🔍 [BlogPage] Final posts received:', posts);
  console.log('🔍 [BlogPage] Posts length:', posts.length);

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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.readingTime || '5 min read'}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="text-base">
                    {post.excerpt || 'No excerpt available'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author?.name || 'Anonymous'}
                    </div>
                  </div>
                  
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category) => (
                        <Badge key={category.slug?.current} variant="outline" className="text-xs">
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Button asChild className="w-full">
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
