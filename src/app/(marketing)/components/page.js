import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { 
  MousePointer as ButtonIcon, 
  CreditCard as CardIcon, 
  Type as InputIcon, 
  Tag as BadgeIcon,
  Menu as NavIcon,
  PanelLeft as SheetIcon,
  MessageSquare as DialogIcon,
  Terminal as CommandIcon
} from 'lucide-react';

const components = [
  {
    name: 'Button',
    description: 'A versatile button component with multiple variants and sizes.',
    icon: ButtonIcon,
    status: 'stable',
    category: 'Form',
  },
  {
    name: 'Card',
    description: 'A flexible card component for displaying content.',
    icon: CardIcon,
    status: 'stable',
    category: 'Layout',
  },
  {
    name: 'Input',
    description: 'A customizable input component for forms.',
    icon: InputIcon,
    status: 'stable',
    category: 'Form',
  },
  {
    name: 'Badge',
    description: 'A small status indicator component.',
    icon: BadgeIcon,
    status: 'stable',
    category: 'Display',
  },
  {
    name: 'Navigation Menu',
    description: 'A navigation menu component with dropdown support.',
    icon: NavIcon,
    status: 'stable',
    category: 'Navigation',
  },
  {
    name: 'Sheet',
    description: 'A slide-out panel component.',
    icon: SheetIcon,
    status: 'stable',
    category: 'Overlay',
  },
  {
    name: 'Dialog',
    description: 'A modal dialog component.',
    icon: DialogIcon,
    status: 'stable',
    category: 'Overlay',
  },
  {
    name: 'Command',
    description: 'A command palette component for search and actions.',
    icon: CommandIcon,
    status: 'stable',
    category: 'Input',
  },
];

const categories = ['All', 'Form', 'Layout', 'Display', 'Navigation', 'Overlay', 'Input'];

export default function ComponentsPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Components</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of UI components built specifically for Shopify applications.
            All components are accessible, customizable, and production-ready.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Badge key={category} variant={category === 'All' ? 'default' : 'outline'}>
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {components.map((component) => (
            <Card key={component.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <component.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">{component.name}</CardTitle>
                  </div>
                  <Badge variant="secondary">{component.status}</Badge>
                </div>
                <Badge variant="outline" className="w-fit">
                  {component.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {component.description}
                </CardDescription>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    View Docs
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Need More Components?</h2>
          <p className="text-muted-foreground">
            We&apos;re constantly adding new components. Check back regularly or contribute to our open source project.
          </p>
          <div className="flex justify-center space-x-4">
            <Button>
              Request Component
            </Button>
            <Button variant="outline">
              Contribute
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
