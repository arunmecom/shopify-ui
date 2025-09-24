import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';
import CodeBlock from './CodeBlock';

export const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      
      return (
        <div className="my-6">
          <Image
            src={urlFor(value).width(800).height(400).url()}
            alt={value.alt || 'Blog image'}
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
          {value.caption && (
            <p className="text-sm text-muted-foreground mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: CodeBlock,
  },
  
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-5 mb-2 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-4 mb-2 text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed mb-4 text-muted-foreground">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/50 rounded-r-lg">
        <p className="text-muted-foreground italic">{children}</p>
      </blockquote>
    ),
  },
  
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
  },
  
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith('http');
      
      if (isExternal) {
        return (
          <a
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-2"
          >
            {children}
          </a>
        );
      }
      
      return (
        <Link
          href={value.href}
          className="text-primary hover:text-primary/80 underline underline-offset-2"
        >
          {children}
        </Link>
      );
    },
  },
};
