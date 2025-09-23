'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../shopifyui/lib/utils';
import { navigation } from '../../../config/site';

export function Navigation({ className, ...props }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn('flex items-center space-x-6 text-sm font-medium', className)}
      {...props}
    >
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === item.href
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function BreadcrumbNavigation({ items }) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-muted-foreground/50">/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          ) : (
            <span className="text-foreground">{item.title}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export function PaginationNavigation({ currentPage, totalPages, basePath }) {
  const pages = [];
  
  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const getPageUrl = (page) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  return (
    <nav className="flex items-center justify-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Previous
        </Link>
      )}
      
      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={cn(
            'px-3 py-2 text-sm font-medium transition-colors',
            page === currentPage
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {page}
        </Link>
      ))}
      
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
