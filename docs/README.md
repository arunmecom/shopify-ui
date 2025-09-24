# ShopifyUI Documentation

Welcome to the ShopifyUI project documentation! This comprehensive guide covers everything you need to know about our Shopify UI component library and design system.

## 📚 Documentation Structure

### Core Documentation
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Current project status, completed features, and planned features
- **[DEVELOPMENT_STANDARDS.md](./DEVELOPMENT_STANDARDS.md)** - Coding standards, conventions, and best practices
- **[FEATURE_ROADMAP.md](./FEATURE_ROADMAP.md)** - Detailed feature development timeline and specifications
- **[TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md)** - System architecture, data flow, and technical details

### Quick Reference
- **Getting Started** - Setup and installation guide
- **Development Workflow** - How to contribute and develop features
- **Deployment Guide** - How to deploy and manage the application
- **Troubleshooting** - Common issues and solutions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/shopifyui.git
cd shopifyui

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity credentials

# Start development server
npm run dev
```

### Environment Setup
Create a `.env.local` file with the following variables:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-09-23
SANITY_API_TOKEN=your_api_token
```

---

## 🏗️ Project Overview

### What is ShopifyUI?
ShopifyUI is a comprehensive UI component library and design system specifically built for Shopify app developers. It provides:

- **Modern React Components** - Built with Next.js 15 and shadcn/ui
- **Content Management** - Powered by Sanity CMS
- **Interactive Features** - Code playground, AI integration, and tutorials
- **Developer Experience** - Comprehensive documentation and examples

### Key Features
- ✅ **Blog System** - Full-featured blog with rich content
- ✅ **Code Blocks** - Syntax highlighting with copy functionality
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Real-time Updates** - Dynamic content without rebuilds
- 🚧 **Search Integration** - Algolia-powered search (planned)
- 🚧 **Tutorial System** - Interactive learning platform (planned)
- 🚧 **Code Playground** - Online code editor (planned)
- 🚧 **AI Integration** - AI-powered code generation (planned)

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **React Syntax Highlighter** - Code syntax highlighting

### Backend & CMS
- **Sanity.io** - Headless CMS
- **GROQ** - Query language for Sanity
- **Portable Text** - Rich text format

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **Vercel** - Deployment platform

---

## 📁 Project Structure

```
shopifyui/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── sanity/             # Sanity CMS configuration
│   ├── lib/                # Utility functions
│   └── hooks/              # Custom React hooks
├── docs/                   # Project documentation
├── public/                 # Static assets
└── styles/                 # Global styles
```

---

## 🎯 Development Workflow

### 1. Feature Development
1. Create a feature branch: `git checkout -b feature/feature-name`
2. Develop the feature following our [coding standards](./DEVELOPMENT_STANDARDS.md)
3. Test thoroughly
4. Create a pull request

### 2. Code Quality
- Follow our [development standards](./DEVELOPMENT_STANDARDS.md)
- Run `npm run lint` before committing
- Run `npm run format` to format code
- Ensure all tests pass

### 3. Documentation
- Update relevant documentation files
- Add JSDoc comments for new functions
- Update the project status if needed

---

## 🚀 Deployment

### Vercel Deployment
The application is automatically deployed to Vercel on every push to the main branch.

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables
Ensure all required environment variables are set in your deployment environment:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_TOKEN`

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

---

## 📊 Performance

### Current Metrics
- **Lighthouse Performance**: 95+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

### Optimization Features
- Image optimization with Next.js Image
- Dynamic imports for code splitting
- Tailwind CSS for minimal bundle size
- Sanity CDN for fast content delivery

---

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Review Process
- All changes require code review
- Ensure tests pass
- Follow coding standards
- Update documentation

---

## 🐛 Troubleshooting

### Common Issues

#### Sanity Studio Not Loading
- Check environment variables in `.env.local`
- Ensure `NEXT_PUBLIC_SANITY_API_VERSION` is set
- Verify project ID and dataset are correct

#### Blog Posts Not Showing
- Check if posts are published (not just saved)
- Verify Sanity client configuration
- Check browser console for errors

#### Build Errors
- Run `npm run lint` to check for syntax errors
- Ensure all environment variables are set
- Check for TypeScript errors if using TS

### Getting Help
- Check the [troubleshooting section](./TROUBLESHOOTING.md)
- Review our [development standards](./DEVELOPMENT_STANDARDS.md)
- Open an issue on GitHub

---

## 📈 Roadmap

### Phase 1: Foundation (Completed)
- ✅ Next.js setup with App Router
- ✅ Sanity CMS integration
- ✅ Blog system with rich content
- ✅ Code blocks with syntax highlighting

### Phase 2: Search & Content (In Progress)
- 🚧 Algolia search integration
- 🚧 Tutorial system
- 🚧 Enhanced content management

### Phase 3: Interactive Features (Planned)
- 📋 Code playground
- 📋 AI integration
- 📋 Advanced search features

### Phase 4: Advanced Features (Future)
- 📋 Real-time collaboration
- 📋 Advanced analytics
- 📋 Performance monitoring

---

## 📞 Support

### Documentation
- **Project Status**: [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **Development Standards**: [DEVELOPMENT_STANDARDS.md](./DEVELOPMENT_STANDARDS.md)
- **Feature Roadmap**: [FEATURE_ROADMAP.md](./FEATURE_ROADMAP.md)
- **Technical Architecture**: [TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md)

### Contact
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@shopifyui.dev

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Last Updated**: January 2025  
**Version**: 1.0.0