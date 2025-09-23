import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8 text-center max-w-4xl">
        <div className="flex items-center space-x-2 rounded-full border bg-muted px-4 py-2 text-sm">
          <Sparkles className="h-4 w-4" />
          <span>Introducing ShopifyUI v2.0</span>
        </div>
        
        <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          Build Beautiful Shopify Apps
          <br />
          <span className="text-primary">Faster Than Ever</span>
        </h1>
        
        <p className="max-w-3xl leading-relaxed text-muted-foreground text-lg sm:text-xl">
          A comprehensive UI component library and design system built specifically for Shopify applications. 
          Get started with pre-built components, follow design best practices, and ship faster.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Button asChild size="lg" className="h-12 px-8">
            <Link href="/docs">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8">
            <Link href="/components">
              View Components
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Production Ready</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>Accessible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <span>Customizable</span>
          </div>
        </div>
      </div>
    </section>
  );
}
