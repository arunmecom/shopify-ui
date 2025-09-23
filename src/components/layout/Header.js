'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { siteConfig } from '../../config/site';
import { ThemeToggle } from '../common/ThemeToggle';
import { SearchDialog } from '../common/SearchDialog';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/components"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Components
            </Link>
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Documentation
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Blog
            </Link>
            <Link
              href="/tutorials"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Tutorials
            </Link>
          </nav>
        </div>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNavigation />
          </SheetContent>
        </Sheet>
        
        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchDialog />
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

function MobileNavigation() {
  return (
    <nav className="flex flex-col space-y-3">
      <Link
        href="/components"
        className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Components
      </Link>
      <Link
        href="/docs"
        className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Documentation
      </Link>
      <Link
        href="/blog"
        className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Blog
      </Link>
      <Link
        href="/tutorials"
        className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Tutorials
      </Link>
    </nav>
  );
}
