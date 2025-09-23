import { siteConfig } from '../config/site';

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
}) {
  const siteTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const siteDescription = description || siteConfig.description;
  const siteImage = image || siteConfig.ogImage;
  const siteUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;

  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: siteUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
      locale: 'en_US',
      type,
      publishedTime,
      modifiedTime,
      authors,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [siteImage],
      creator: '@shopifyui',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export function generateStructuredData({
  type = 'WebSite',
  name,
  description,
  url,
  author,
  datePublished,
  dateModified,
  image,
  breadcrumbs,
}) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: name || siteConfig.name,
    description: description || siteConfig.description,
    url: url || siteConfig.url,
    author: {
      '@type': 'Organization',
      name: author || siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
  };

  if (datePublished) {
    baseStructuredData.datePublished = datePublished;
  }

  if (dateModified) {
    baseStructuredData.dateModified = dateModified;
  }

  if (image) {
    baseStructuredData.image = image;
  }

  if (breadcrumbs) {
    baseStructuredData.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  }

  return baseStructuredData;
}

export function generateSitemap(posts = []) {
  const staticPages = [
    { url: '', priority: 1.0 },
    { url: '/components', priority: 0.9 },
    { url: '/docs', priority: 0.9 },
    { url: '/blog', priority: 0.8 },
    { url: '/tutorials', priority: 0.8 },
  ];

  const dynamicPages = posts.map((post) => ({
    url: `/${post.type}/${post.slug}`,
    priority: 0.7,
    lastmod: post.frontmatter.date,
  }));

  return [...staticPages, ...dynamicPages];
}
