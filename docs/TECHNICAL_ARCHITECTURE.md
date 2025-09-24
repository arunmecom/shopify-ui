# Technical Architecture Documentation

## 🏗️ System Overview

### Architecture Diagram
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │  Sanity CMS     │    │  External APIs  │
│                 │    │                 │    │                 │
│  ┌───────────┐  │    │  ┌───────────┐  │    │  ┌───────────┐  │
│  │   Pages   │  │◄──►│  │  Studio   │  │    │  │   Algolia │  │
│  └───────────┘  │    │  └───────────┘  │    │  └───────────┘  │
│  ┌───────────┐  │    │  ┌───────────┐  │    │  ┌───────────┐  │
│  │Components │  │◄──►│  │   API     │  │    │  │  OpenAI   │  │
│  └───────────┘  │    │  └───────────┘  │    │  └───────────┘  │
│  ┌───────────┐  │    │  ┌───────────┐  │    │  ┌───────────┐  │
│  │   API     │  │    │  │ Database  │  │    │  │ Shopify   │  │
│  └───────────┘  │    │  └───────────┘  │    │  │    MCP    │  │
└─────────────────┘    └─────────────────┘    │  └───────────┘  │
         │                        │           └─────────────────┘
         │                        │                    │
         ▼                        ▼                    ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel CDN    │    │  Sanity CDN     │    │   Code Sandbox  │
│                 │    │                 │    │                 │
│ • Static Assets │    │ • Images        │    │ • Code Execution│
│ • Edge Caching  │    │ • Documents     │    │ • Sandbox Env   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React hooks (useState, useEffect)
- **Forms**: React Hook Form (planned)
- **Animations**: Framer Motion (planned)

### Backend & CMS
- **CMS**: Sanity.io
- **Database**: Sanity's hosted database
- **API**: Sanity's GraphQL/REST API
- **Authentication**: Sanity's built-in auth
- **Image Optimization**: Sanity CDN + Next.js Image

### External Services
- **Search**: Algolia (planned)
- **AI**: OpenAI/Anthropic API (planned)
- **Code Execution**: Sandpack/Monaco Editor (planned)
- **Analytics**: Vercel Analytics (planned)
- **Monitoring**: Sentry (planned)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git
- **Deployment**: Vercel

---

## 📁 Project Structure

```
shopifyui/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/             # Marketing pages group
│   │   │   ├── components/          # Marketing-specific components
│   │   │   └── layout.js            # Marketing layout
│   │   ├── api/                     # API routes
│   │   │   ├── newsletter/          # Newsletter API
│   │   │   ├── search/              # Search API (planned)
│   │   │   ├── generate-code/       # AI code generation (planned)
│   │   │   └── playground/          # Code execution API (planned)
│   │   ├── blog/                    # Blog pages
│   │   │   ├── [slug]/              # Dynamic blog post pages
│   │   │   └── page.js              # Blog listing page
│   │   ├── docs/                    # Documentation pages
│   │   ├── tutorials/               # Tutorial pages (planned)
│   │   ├── playground/              # Code playground (planned)
│   │   ├── globals.css              # Global styles
│   │   ├── layout.js                # Root layout
│   │   └── page.js                  # Home page
│   ├── components/                  # React components
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.js            # Button component
│   │   │   ├── card.js              # Card component
│   │   │   ├── dialog.js            # Dialog component
│   │   │   └── ...                  # Other UI components
│   │   ├── blog/                    # Blog-specific components
│   │   │   ├── BlogCard.js          # Blog post card
│   │   │   ├── BlogList.js          # Blog post list
│   │   │   └── BlogSearch.js        # Blog search (planned)
│   │   ├── common/                  # Common components
│   │   │   ├── BackToTop.js         # Back to top button
│   │   │   ├── SearchDialog.js      # Search dialog
│   │   │   └── ThemeToggle.js       # Theme toggle
│   │   ├── home/                    # Home page components
│   │   │   ├── HeroSection.js       # Hero section
│   │   │   ├── FeaturesSection.js   # Features section
│   │   │   └── NewsletterSection.js # Newsletter section
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.js            # Site header
│   │   │   └── Footer.js            # Site footer
│   │   └── portableText/            # Rich text components
│   │       ├── CodeBlock.js         # Code block with syntax highlighting
│   │       └── PortableTextComponents.js # PortableText configuration
│   ├── sanity/                      # Sanity CMS configuration
│   │   ├── lib/                     # Sanity utilities
│   │   │   ├── client.js            # Sanity client configuration
│   │   │   └── image.js             # Image URL builder
│   │   ├── schemaTypes/             # Content schemas
│   │   │   ├── postType.js          # Blog post schema
│   │   │   ├── authorType.js        # Author schema
│   │   │   ├── categoryType.js      # Category schema
│   │   │   ├── blockContentType.js  # Rich text schema
│   │   │   └── tutorialType.js      # Tutorial schema (planned)
│   │   ├── env.js                   # Environment variables
│   │   └── structure.js             # Studio structure (planned)
│   ├── lib/                         # Utility functions
│   │   ├── utils.js                 # General utilities
│   │   ├── mdx.js                   # MDX processing
│   │   └── seo.js                   # SEO utilities
│   └── hooks/                       # Custom React hooks
│       ├── useLocalStorage.js       # Local storage hook
│       ├── useScrollSpy.js          # Scroll spy hook
│       └── useSearch.js             # Search hook (planned)
├── docs/                            # Project documentation
│   ├── PROJECT_STATUS.md            # Project status and features
│   ├── DEVELOPMENT_STANDARDS.md     # Coding standards and guidelines
│   ├── FEATURE_ROADMAP.md           # Feature development roadmap
│   └── TECHNICAL_ARCHITECTURE.md    # This file
├── public/                          # Static assets
│   ├── icons/                       # Icon files
│   ├── images/                      # Image files
│   └── ...                          # Other static assets
├── styles/                          # Global styles
│   └── mdx.css                      # MDX-specific styles
├── .env.local                       # Environment variables (local)
├── .env.example                     # Environment variables template
├── components.json                  # shadcn/ui configuration
├── next.config.mjs                  # Next.js configuration
├── sanity.config.js                 # Sanity Studio configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── package.json                     # Dependencies and scripts
```

---

## 🔄 Data Flow Architecture

### Blog Content Flow
```
1. Content Creation
   Sanity Studio → Sanity Database → Sanity CDN

2. Content Delivery
   Next.js App → Sanity API → Rendered Pages → Vercel CDN

3. User Interaction
   User Request → Vercel Edge → Next.js App → Sanity API → Response
```

### Search Flow (Planned)
```
1. Content Indexing
   Sanity Webhook → Algolia API → Search Index

2. Search Query
   User Query → Next.js API → Algolia API → Search Results → User
```

### AI Code Generation Flow (Planned)
```
1. Code Generation
   User Prompt → Next.js API → OpenAI API → Generated Code

2. Code Validation
   Generated Code → Shopify MCP → Validation Results → User

3. Code Execution
   User Code → Code Sandbox → Execution Results → User
```

---

## 🗄️ Database Schema

### Sanity Content Types

#### Blog Post (post)
```javascript
{
  _id: string,
  _type: "post",
  title: string,
  slug: { current: string },
  excerpt: text,
  author: reference(author),
  mainImage: {
    asset: reference(asset),
    alt: string
  },
  categories: array(reference(category)),
  publishedAt: datetime,
  body: array(blockContent),
  readingTime: string
}
```

#### Author (author)
```javascript
{
  _id: string,
  _type: "author",
  name: string,
  bio: text,
  image: {
    asset: reference(asset),
    alt: string
  },
  social: {
    twitter: url,
    github: url,
    linkedin: url
  }
}
```

#### Category (category)
```javascript
{
  _id: string,
  _type: "category",
  title: string,
  slug: { current: string },
  description: text,
  color: string
}
```

#### Tutorial (tutorial) - Planned
```javascript
{
  _id: string,
  _type: "tutorial",
  title: string,
  slug: { current: string },
  description: text,
  difficulty: "beginner" | "intermediate" | "advanced",
  duration: string,
  prerequisites: array(reference(tutorial)),
  content: array(blockContent),
  resources: array({
    title: string,
    url: url,
    type: string
  }),
  author: reference(author),
  publishedAt: datetime,
  featured: boolean
}
```

---

## 🔌 API Architecture

### Internal APIs

#### Blog API
```javascript
// GET /api/blog/posts
// Returns: Array of blog posts

// GET /api/blog/posts/[slug]
// Returns: Single blog post

// GET /api/blog/categories
// Returns: Array of categories
```

#### Search API (Planned)
```javascript
// POST /api/search
// Body: { query: string, filters: object }
// Returns: Search results from Algolia
```

#### AI API (Planned)
```javascript
// POST /api/generate-code
// Body: { prompt: string, language: string, context: object }
// Returns: Generated code with validation

// POST /api/explain-code
// Body: { code: string, language: string }
// Returns: Code explanation
```

#### Playground API (Planned)
```javascript
// POST /api/playground/execute
// Body: { code: string, language: string }
// Returns: Execution results

// POST /api/playground/save
// Body: { code: string, language: string, title: string }
// Returns: Saved code snippet ID
```

### External APIs

#### Sanity API
```javascript
// GROQ Queries
const posts = await client.fetch(`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author->{ name, image },
    mainImage{ asset->{ _id, url }, alt },
    categories[]->{ title, slug },
    readingTime
  }
`);
```

#### Algolia API (Planned)
```javascript
// Search Configuration
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_API_KEY
);

const searchIndex = searchClient.initIndex('shopifyui_content');
```

---

## 🔒 Security Architecture

### Authentication & Authorization
```javascript
// Sanity Studio Authentication
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // For write operations
  useCdn: false // Disable CDN for fresh data
};
```

### API Security
```javascript
// Rate Limiting (Planned)
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// CORS Configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
};
```

### Data Validation
```javascript
// Input Validation (Planned)
const Joi = require('joi');

const codeGenerationSchema = Joi.object({
  prompt: Joi.string().min(10).max(1000).required(),
  language: Joi.string().valid('javascript', 'typescript', 'liquid').required(),
  context: Joi.object().optional()
});
```

---

## 📊 Performance Architecture

### Caching Strategy
```javascript
// Next.js Caching
export const revalidate = 0; // Disable static generation
export const dynamic = 'force-dynamic'; // Force dynamic rendering

// Sanity CDN Caching
const client = createClient({
  useCdn: false, // Disable CDN for fresh data
  perspective: 'published',
  stega: false
});

// Vercel Edge Caching
const headers = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};
```

### Image Optimization
```javascript
// Next.js Image Component
<Image
  src={urlFor(image).width(800).height(400).url()}
  alt={image.alt}
  width={800}
  height={400}
  className="rounded-lg shadow-lg"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
  priority={isPriority}
  loading={isPriority ? "eager" : "lazy"}
/>
```

### Bundle Optimization
```javascript
// Dynamic Imports
const CodePlayground = dynamic(() => import('./CodePlayground'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

// Tree Shaking
import { Button } from '@/components/ui/button'; // ✅ Good
import * as UI from '@/components/ui'; // ❌ Bad
```

---

## 🚀 Deployment Architecture

### Vercel Deployment
```javascript
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "src/app/api/**/*.js": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/blog/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

### Environment Variables
```bash
# Production
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-09-23
SANITY_API_TOKEN=your_api_token

# Development
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-09-23
SANITY_API_TOKEN=your_api_token

# Planned
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_SEARCH_API_KEY=your_search_api_key
OPENAI_API_KEY=your_openai_api_key
SHOPIFY_MCP_TOKEN=your_shopify_mcp_token
```

---

## 🔍 Monitoring & Analytics

### Performance Monitoring (Planned)
```javascript
// Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Monitoring (Planned)
```javascript
// Sentry Integration
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Custom Analytics (Planned)
```javascript
// Custom Event Tracking
const trackEvent = (eventName, properties) => {
  if (typeof window !== 'undefined') {
    // Send to analytics service
    analytics.track(eventName, properties);
  }
};

// Usage
trackEvent('tutorial_started', {
  tutorial_id: tutorial.id,
  difficulty: tutorial.difficulty
});
```

---

**Last Updated**: January 2025  
**Next Review**: Monthly or when architecture changes
