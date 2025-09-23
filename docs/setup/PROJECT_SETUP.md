# Project Setup Guide

## ShopifyUI - Shopify Component Library

This guide covers the initial setup and development workflow for the ShopifyUI project.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## Initial Setup

### 1. Clone and Install
```bash
git clone <repository-url>
cd shopifyui
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the project root:

```env
# Mailchimp Configuration (for newsletter)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your_list_id

# Add other environment variables as needed
```

### 3. Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (marketing)/       # Marketing pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── components/        # Components page
│   ├── docs/              # Documentation pages
│   └── tutorials/         # Tutorials pages
├── components/             # Reusable components
│   ├── home/              # Homepage sections
│   ├── layout/            # Layout components
│   ├── common/            # Common components
│   └── ui/                # UI component library
├── lib/                    # Utility functions
└── config/                 # Configuration files

docs/                       # Documentation and setup guides
├── setup/                  # Setup guides for features
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

### ✅ Implemented
- Homepage with hero, features, and newsletter sections
- Blog system with MDX support
- Documentation hub
- Tutorials platform
- Component showcase
- Newsletter integration with Mailchimp
- Responsive design
- SEO optimization

### 🔄 In Development
- Additional UI components
- More blog content
- Advanced documentation

## Development Workflow

### Adding New Components
1. Create component in `src/components/ui/`
2. Add to components page (`src/app/components/page.js`)
3. Update documentation if needed

### Adding Blog Posts
1. Create MDX file in `src/content/blog/`
2. Include proper frontmatter
3. Test the blog post page

### Adding New Pages
1. Create page file in appropriate `src/app/` subdirectory
2. Update navigation if needed
3. Test routing and SEO

## Deployment

### Build Process
```bash
npm run build
```

### Environment Variables for Production
Ensure all required environment variables are set in your deployment platform:
- Vercel: Add to project settings
- Netlify: Add to site settings
- Other platforms: Follow their environment variable setup

## Troubleshooting

### Common Issues

**Build Errors**
- Check for missing dependencies: `npm install`
- Verify environment variables are set
- Check for TypeScript/ESLint errors

**Newsletter Not Working**
- Verify Mailchimp credentials in `.env.local`
- Check API endpoint: `/api/newsletter`
- See [NEWSLETTER_SETUP.md](./NEWSLETTER_SETUP.md) for detailed troubleshooting

**Styling Issues**
- Check Tailwind CSS configuration
- Verify component imports
- Check for CSS conflicts

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Update documentation if needed
5. Submit pull request

## Support

For issues and questions:
- Check existing documentation in `docs/`
- Review setup guides in `docs/setup/`
- Check GitHub issues
