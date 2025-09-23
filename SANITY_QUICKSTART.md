# 🚀 Sanity Blog Quick Start

## Quick Setup (5 minutes)

### 1. Create Sanity Project
```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Create new project
sanity init
# Choose: Create new project
# Name: shopifyui-blog
# Dataset: production
# Output path: ./studio
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your project details:
# NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
# NEXT_PUBLIC_SANITY_DATASET=production
# SANITY_API_TOKEN=your_api_token
```

### 3. Set Up Studio
```bash
# Copy schemas to studio
cp -r schemas/* studio/schemas/
cp sanity.config.js studio/

# Install studio dependencies
cd studio && npm install && cd ..

# Start studio (in new terminal)
npm run studio
```

### 4. Create Content
1. Open http://localhost:3333 (Sanity Studio)
2. Create an **Author** first
3. Create **Categories** (Development, Shopify, Tutorials)
4. Create your first **Blog Post**

### 5. View Your Blog
```bash
# Start Next.js dev server
npm run dev

# Visit http://localhost:3000/blog
```

## 📝 Creating Your First Blog Post

1. **Go to Sanity Studio** (http://localhost:3333)
2. **Click "Blog Posts"** → **"Create"**
3. **Fill in the form**:
   - Title: "My First Blog Post"
   - Slug: Auto-generated
   - Excerpt: "A brief description..."
   - Main Image: Upload an image
   - Author: Select your author
   - Categories: Select relevant categories
   - Published At: Today's date
   - Body: Write your content using the rich text editor
   - Reading Time: "5 min read"

4. **Click "Publish"**

## 🔧 Troubleshooting

**No posts showing?**
- Check your `.env.local` file has correct project ID
- Make sure you've published posts in Sanity Studio

**Studio won't start?**
- Run `cd studio && npm install`
- Make sure you copied the schemas correctly

**Images not loading?**
- Check your Sanity project settings
- Ensure images are published

## 📚 Full Documentation
See `docs/setup/SANITY_BLOG_SETUP.md` for detailed instructions.

---
**Need help?** Check the [Sanity Documentation](https://www.sanity.io/docs) or create an issue in your project.
