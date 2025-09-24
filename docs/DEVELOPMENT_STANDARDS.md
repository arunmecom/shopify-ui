# Development Standards & Guidelines

## 🎯 Code Quality Standards

### JavaScript/TypeScript
```javascript
// ✅ Good: Modern ES6+ with async/await
const fetchData = async () => {
  try {
    const response = await api.getData();
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// ❌ Bad: Old callback style
const fetchData = (callback) => {
  api.getData((err, data) => {
    if (err) callback(err);
    else callback(null, data);
  });
};
```

### React Components
```javascript
// ✅ Good: Functional component with hooks
import { useState, useEffect } from 'react';

const BlogPost = ({ slug }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost(slug).then(setPost).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (!post) return <NotFound />;

  return (
    <article className="prose max-w-none">
      <h1>{post.title}</h1>
      <PortableText value={post.body} components={portableTextComponents} />
    </article>
  );
};

// ❌ Bad: Class component or inline styles
class BlogPost extends React.Component {
  render() {
    return (
      <div style={{ fontSize: '16px', color: 'black' }}>
        {this.props.post.title}
      </div>
    );
  }
}
```

### Styling Standards
```javascript
// ✅ Good: Tailwind CSS classes
<Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
  <CardContent className="prose prose-lg max-w-none py-8 px-8">
    <PortableText value={post.body} components={portableTextComponents} />
  </CardContent>
</Card>

// ❌ Bad: Inline styles or custom CSS
<div style={{ 
  border: 'none', 
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  background: 'linear-gradient(to bottom right, white, gray)'
}}>
```

---

## 📁 File Naming Conventions

### Files & Directories
```
✅ Good:
- src/components/ui/button.js
- src/components/blog/BlogCard.js
- src/app/blog/[slug]/page.js
- src/sanity/schemaTypes/postType.js

❌ Bad:
- src/components/ui/Button.js (inconsistent case)
- src/components/blog/blogCard.js (mixed case)
- src/app/blog/[slug]/Page.js (unnecessary capitalization)
```

### Component Names
```javascript
// ✅ Good: PascalCase for components
export const BlogCard = ({ post }) => { ... };
export const PortableTextComponents = { ... };
export default function BlogPost({ params }) { ... }

// ❌ Bad: camelCase or kebab-case
export const blogCard = ({ post }) => { ... };
export const portable-text-components = { ... };
```

---

## 🎨 Design System Standards

### Color Palette
```javascript
// ✅ Use design tokens consistently
const colors = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
  muted: 'text-muted-foreground',
  destructive: 'bg-destructive text-destructive-foreground'
};

// ❌ Hardcoded colors
<div className="bg-blue-500 text-white"> // Don't use
```

### Spacing System
```javascript
// ✅ Consistent spacing scale
<div className="space-y-4">     // 1rem
<div className="space-y-6">     // 1.5rem  
<div className="space-y-8">     // 2rem
<div className="py-8 px-8">     // 2rem padding

// ❌ Arbitrary spacing
<div className="space-y-5">     // Avoid odd numbers
<div className="py-7 px-9">     // Inconsistent
```

### Typography
```javascript
// ✅ Semantic typography classes
<h1 className="text-4xl md:text-5xl font-bold leading-tight">
<h2 className="text-3xl font-bold my-5">
<p className="text-xl text-muted-foreground leading-relaxed">

// ❌ Inline font styling
<h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
```

---

## 🔧 Component Architecture

### Component Structure
```javascript
// ✅ Good: Proper component organization
const BlogCard = ({ post }) => {
  // 1. Hooks
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. Event handlers
  const handleClick = () => { ... };
  
  // 3. Render logic
  if (isLoading) return <LoadingSpinner />;
  
  // 4. Main render
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Component JSX */}
    </Card>
  );
};

// Export
export default BlogCard;
```

### Props Interface
```javascript
// ✅ Good: Clear prop types and defaults
const BlogCard = ({ 
  post, 
  showExcerpt = true, 
  className = '',
  onReadMore 
}) => {
  // Component logic
};

// ✅ Good: TypeScript interfaces (when using TS)
interface BlogCardProps {
  post: BlogPost;
  showExcerpt?: boolean;
  className?: string;
  onReadMore?: (post: BlogPost) => void;
}
```

---

## 🚀 Performance Standards

### Code Splitting
```javascript
// ✅ Good: Dynamic imports for heavy components
const CodePlayground = dynamic(() => import('./CodePlayground'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

// ✅ Good: Lazy loading for images
<Image
  src={urlFor(post.mainImage).width(800).height(400).url()}
  alt={post.mainImage.alt || post.title}
  width={800}
  height={400}
  loading="lazy"
  className="rounded-lg shadow-lg"
/>
```

### Bundle Optimization
```javascript
// ✅ Good: Tree shaking friendly imports
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// ❌ Bad: Importing entire libraries
import * as UI from '@/components/ui';
```

---

## 📝 Documentation Standards

### Component Documentation
```javascript
/**
 * BlogCard component displays a blog post preview
 * 
 * @param {Object} post - Blog post data
 * @param {string} post.title - Post title
 * @param {string} post.excerpt - Post excerpt
 * @param {Object} post.author - Author information
 * @param {boolean} showExcerpt - Whether to show excerpt (default: true)
 * @param {string} className - Additional CSS classes
 * @param {Function} onReadMore - Callback when "Read More" is clicked
 * 
 * @example
 * <BlogCard 
 *   post={blogPost} 
 *   showExcerpt={false}
 *   onReadMore={(post) => router.push(`/blog/${post.slug}`)}
 * />
 */
const BlogCard = ({ post, showExcerpt = true, className, onReadMore }) => {
  // Component implementation
};
```

### API Documentation
```javascript
/**
 * Fetches a blog post by slug from Sanity
 * 
 * @param {string} slug - The post slug
 * @returns {Promise<Object|null>} Post data or null if not found
 * @throws {Error} When Sanity client is not configured
 * 
 * @example
 * const post = await getPostBySlug('my-blog-post');
 * if (post) {
 *   console.log(post.title);
 * }
 */
async function getPostBySlug(slug) {
  // Implementation
}
```

---

## 🧪 Testing Standards

### Component Testing
```javascript
// ✅ Good: Comprehensive component tests
describe('BlogCard', () => {
  const mockPost = {
    title: 'Test Post',
    excerpt: 'Test excerpt',
    author: { name: 'Test Author' },
    slug: { current: 'test-post' }
  };

  it('renders post title correctly', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('calls onReadMore when button is clicked', () => {
    const onReadMore = jest.fn();
    render(<BlogCard post={mockPost} onReadMore={onReadMore} />);
    
    fireEvent.click(screen.getByText('Read More'));
    expect(onReadMore).toHaveBeenCalledWith(mockPost);
  });
});
```

---

## 🔄 Git Workflow

### Commit Messages
```bash
# ✅ Good: Conventional commits
feat: add copy button to code blocks
fix: resolve client-side data fetching issue
docs: update development standards
style: improve blog card hover effects
refactor: simplify PortableText components
test: add unit tests for BlogCard component

# ❌ Bad: Unclear commits
fix stuff
update
changes
wip
```

### Branch Naming
```bash
# ✅ Good: Descriptive branch names
feature/blog-search-functionality
fix/code-block-rendering-issue
docs/update-development-standards
refactor/portable-text-components

# ❌ Bad: Unclear branch names
feature1
fix
update
test
```

---

## 📊 Quality Metrics

### Performance Targets
- **Lighthouse Performance**: >90
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms

### Code Quality
- **ESLint Errors**: 0
- **TypeScript Errors**: 0 (when using TS)
- **Test Coverage**: >80%
- **Bundle Size**: <500KB initial load

---

**Last Updated**: January 2025  
**Next Review**: Monthly
