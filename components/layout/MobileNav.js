'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../shopifyui/lib/utils';
import { mobileNavigation } from '../../../config/navigation';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-3">
      {mobileNavigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-foreground/80',
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

export function CollapsibleMobileNav({ items }) {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (itemTitle) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemTitle)) {
      newOpenItems.delete(itemTitle);
    } else {
      newOpenItems.add(itemTitle);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <nav className="flex flex-col space-y-2">
      {items.map((item) => (
        <div key={item.title}>
          {item.items ? (
            <div>
              <button
                onClick={() => toggleItem(item.title)}
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground/60 hover:text-foreground/80"
              >
                <span>{item.title}</span>
                {openItems.has(item.title) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {openItems.has(item.title) && (
                <div className="ml-4 space-y-2">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block py-1 text-sm text-foreground/60 hover:text-foreground/80"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              href={item.href}
              className="block py-2 text-sm font-medium text-foreground/60 hover:text-foreground/80"
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
