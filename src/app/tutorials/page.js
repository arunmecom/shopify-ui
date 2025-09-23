import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { PlayCircle, Clock, Users, Star } from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: 'Building Your First Shopify App',
    description: 'Learn how to create a complete Shopify app from scratch using modern tools and best practices.',
    duration: '45 min',
    difficulty: 'Beginner',
    rating: 4.8,
    students: 1250,
    thumbnail: '/images/tutorial-1.jpg',
    tags: ['shopify', 'apps', 'getting-started'],
    href: '/tutorials/building-first-shopify-app'
  },
  {
    id: 2,
    title: 'Advanced Component Patterns',
    description: 'Master advanced React patterns and component composition techniques for scalable applications.',
    duration: '60 min',
    difficulty: 'Intermediate',
    rating: 4.9,
    students: 890,
    thumbnail: '/images/tutorial-2.jpg',
    tags: ['react', 'patterns', 'components'],
    href: '/tutorials/advanced-component-patterns'
  },
  {
    id: 3,
    title: 'Shopify Admin API Integration',
    description: 'Deep dive into Shopify\'s Admin API, GraphQL queries, and data management strategies.',
    duration: '90 min',
    difficulty: 'Advanced',
    rating: 4.7,
    students: 650,
    thumbnail: '/images/tutorial-3.jpg',
    tags: ['api', 'graphql', 'shopify'],
    href: '/tutorials/shopify-admin-api-integration'
  },
  {
    id: 4,
    title: 'Building Responsive Dashboards',
    description: 'Create beautiful, responsive admin dashboards with data visualization and real-time updates.',
    duration: '75 min',
    difficulty: 'Intermediate',
    rating: 4.6,
    students: 720,
    thumbnail: '/images/tutorial-4.jpg',
    tags: ['dashboard', 'responsive', 'data-viz'],
    href: '/tutorials/building-responsive-dashboards'
  },
  {
    id: 5,
    title: 'Testing Shopify Apps',
    description: 'Comprehensive guide to testing strategies, tools, and best practices for Shopify applications.',
    duration: '50 min',
    difficulty: 'Intermediate',
    rating: 4.8,
    students: 580,
    thumbnail: '/images/tutorial-5.jpg',
    tags: ['testing', 'quality', 'best-practices'],
    href: '/tutorials/testing-shopify-apps'
  },
  {
    id: 6,
    title: 'Performance Optimization',
    description: 'Learn how to optimize your Shopify apps for speed, efficiency, and better user experience.',
    duration: '65 min',
    difficulty: 'Advanced',
    rating: 4.9,
    students: 420,
    thumbnail: '/images/tutorial-6.jpg',
    tags: ['performance', 'optimization', 'speed'],
    href: '/tutorials/performance-optimization'
  }
];

const difficultyColors = {
  'Beginner': 'bg-green-100 text-green-800',
  'Intermediate': 'bg-yellow-100 text-yellow-800',
  'Advanced': 'bg-red-100 text-red-800'
};

export default function TutorialsPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Tutorials</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guides to master Shopify app development with hands-on examples and real-world projects.
          </p>
        </div>

        {/* Featured Tutorial */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <Badge variant="secondary">Featured</Badge>
            </div>
            <CardTitle className="text-2xl">{tutorials[0].title}</CardTitle>
            <CardDescription className="text-lg">
              {tutorials[0].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {tutorials[0].duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {tutorials[0].students.toLocaleString()} students
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                {tutorials[0].rating}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge className={difficultyColors[tutorials[0].difficulty]}>
                {tutorials[0].difficulty}
              </Badge>
              <Button asChild>
                <Link href={tutorials[0].href}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start Tutorial
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* All Tutorials */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">All Tutorials</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.slice(1).map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={difficultyColors[tutorial.difficulty]}>
                      {tutorial.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      {tutorial.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  <CardDescription>
                    {tutorial.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {tutorial.students.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorial.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link href={tutorial.href}>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Tutorial
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Learning Paths</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Beginner Path</CardTitle>
                <CardDescription>
                  Perfect for developers new to Shopify app development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Building Your First Shopify App</span>
                    <Badge variant="outline">45 min</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Understanding Shopify APIs</span>
                    <Badge variant="outline">30 min</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Basic Component Usage</span>
                    <Badge variant="outline">25 min</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  Start Beginner Path
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Advanced Path</CardTitle>
                <CardDescription>
                  For experienced developers looking to master advanced concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Advanced Component Patterns</span>
                    <Badge variant="outline">60 min</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Performance Optimization</span>
                    <Badge variant="outline">65 min</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Testing Strategies</span>
                    <Badge variant="outline">50 min</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  Start Advanced Path
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Ready to Learn?</h2>
          <p className="text-muted-foreground">
            Join thousands of developers who are already building amazing Shopify applications.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/docs">
                Read Documentation
              </Link>
            </Button>
            <Button variant="outline">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
