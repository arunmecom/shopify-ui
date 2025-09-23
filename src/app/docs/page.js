import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { BookOpen, FileText, Code, Zap } from 'lucide-react';

const docsSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and set up your development environment',
    icon: BookOpen,
    items: [
      { title: 'Installation', href: '/docs/installation', status: 'ready' },
      { title: 'Quick Start', href: '/docs/quick-start', status: 'ready' },
      { title: 'Configuration', href: '/docs/configuration', status: 'ready' },
    ]
  },
  {
    title: 'Components',
    description: 'Comprehensive guide to all UI components',
    icon: Code,
    items: [
      { title: 'Button', href: '/docs/components/button', status: 'ready' },
      { title: 'Card', href: '/docs/components/card', status: 'ready' },
      { title: 'Input', href: '/docs/components/input', status: 'ready' },
      { title: 'Badge', href: '/docs/components/badge', status: 'ready' },
    ]
  },
  {
    title: 'Advanced',
    description: 'Advanced topics and customization',
    icon: Zap,
    items: [
      { title: 'Theming', href: '/docs/theming', status: 'ready' },
      { title: 'Custom Components', href: '/docs/custom-components', status: 'ready' },
      { title: 'Performance', href: '/docs/performance', status: 'ready' },
    ]
  },
  {
    title: 'API Reference',
    description: 'Complete API documentation',
    icon: FileText,
    items: [
      { title: 'Component Props', href: '/docs/api/props', status: 'ready' },
      { title: 'Utilities', href: '/docs/api/utilities', status: 'ready' },
      { title: 'Types', href: '/docs/api/types', status: 'ready' },
    ]
  }
];

export default function DocsPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know to build beautiful Shopify applications with our component library.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {docsSections.map((section) => (
            <Card key={section.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <section.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {section.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.title} className="flex items-center justify-between">
                      <Link 
                        href={item.href}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full mt-4">
                  <Link href={section.items[0].href}>
                    Start Reading
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Need Help?</h2>
          <p className="text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/components">
                Browse Components
              </Link>
            </Button>
            <Button variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
