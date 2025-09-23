import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Zap, 
  Shield, 
  Palette, 
  Code, 
  Smartphone, 
  Users,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized components built with performance in mind. Get the best out of your Shopify apps.',
  },
  {
    icon: Shield,
    title: 'Production Ready',
    description: 'Battle-tested components used in production Shopify apps. Reliable and secure.',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Carefully crafted components that follow modern design principles and Shopify guidelines.',
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    description: 'Clean APIs, TypeScript support, and comprehensive documentation for developers.',
  },
  {
    icon: Smartphone,
    title: 'Responsive',
    description: 'Mobile-first design that works perfectly across all devices and screen sizes.',
  },
  {
    icon: Users,
    title: 'Accessible',
    description: 'Built with accessibility in mind. WCAG compliant components for inclusive experiences.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container space-y-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Why Choose ShopifyUI?
          </h2>
          <p className="leading-7 text-muted-foreground mt-4 max-w-[85%] mx-auto">
            Everything you need to build modern, accessible, and beautiful Shopify applications.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Ready to get started? Check out our comprehensive documentation and start building.
          </p>
        </div>
      </div>
    </section>
  );
}
