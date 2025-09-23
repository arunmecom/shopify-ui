import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { getAllPosts } from '../../lib/mdx';

export default function BlogPage() {
  const posts = getAllPosts('blog');

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
                    <Badge variant="secondary">{post.frontmatter.readingTime || '5 min read'}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.frontmatter.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.frontmatter.title}</CardTitle>
                  <CardDescription className="text-base">
                    {post.frontmatter.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.frontmatter.author}
                    </div>
                  </div>
                  
                  {post.frontmatter.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.frontmatter.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Button asChild className="w-full">
                    <Link href={`/blog/${post.slug}`}>
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
