# Sanity CMS Blog Setup Guide

## Overview
This guide will help you set up Sanity CMS for your blog instead of MDX files. Sanity provides a visual, user-friendly interface for creating and managing blog posts.

## What's Been Set Up

### ✅ Dependencies Installed
- `@sanity/client` - For fetching data from Sanity
- `@sanity/image-url` - For handling images
- `@portabletext/react` - For rendering rich text content
- `sanity` - Sanity Studio and CLI
- `@sanity/vision` - Vision plugin for Sanity Studio

### ✅ Files Created
- `lib/sanity.js` - Sanity client configuration and queries
- `schemas/` - Sanity schema definitions for blog posts, authors, and categories
- `sanity.config.js` - Sanity Studio configuration
- `.env.example` - Environment variables template

### ✅ Pages Updated
- `src/app/blog/page.js` - Now uses Sanity data instead of MDX
- `src/app/blog/[slug]/page.js` - Individual blog post page updated for Sanity

## Setup Instructions

### Step 1: Create a Sanity Project

1. **Install Sanity CLI globally** (if not already installed):
   ```bash
   npm install -g @sanity/cli
   ```

2. **Login to Sanity**:
   ```bash
   sanity login
   ```

3. **Create a new Sanity project**:
   ```bash
   sanity init
   ```
   - Choose "Create new project"
   - Enter your project name (e.g., "shopifyui-blog")
   - Choose dataset name (default: "production")
   - Choose output path (use: `./studio`)

### Step 2: Configure Environment Variables

1. **Copy the environment template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your Sanity project details**:
   ```env
   # Get these from your Sanity project dashboard
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

### Step 3: Set Up Sanity Studio

1. **Update the studio configuration** (if you created it in a different location):
   ```bash
   # If you created the studio in ./studio directory
   cp -r schemas/* studio/schemas/
   cp sanity.config.js studio/
   ```

2. **Install studio dependencies**:
   ```bash
   cd studio
   npm install
   ```

3. **Start the Sanity Studio**:
   ```bash
   cd studio
   npm run dev
   ```

4. **Access Sanity Studio**:
   - Open http://localhost:3333 in your browser
   - You'll see the Sanity Studio interface

### Step 4: Create Your First Content

#### Create an Author
1. In Sanity Studio, go to "Authors"
2. Click "Create"
3. Fill in:
   - **Name**: Your name
   - **Slug**: Auto-generated from name
   - **Image**: Upload a profile picture
   - **Bio**: Brief description about yourself

#### Create Categories
1. Go to "Categories"
2. Click "Create"
3. Add categories like:
   - **Development** (slug: development)
   - **Shopify** (slug: shopify)
   - **Tutorials** (slug: tutorials)

#### Create Your First Blog Post
1. Go to "Blog Posts"
2. Click "Create"
3. Fill in all required fields:
   - **Title**: Your blog post title
   - **Slug**: Auto-generated from title
   - **Excerpt**: Brief description
   - **Main Image**: Featured image for the post
   - **Author**: Select the author you created
   - **Categories**: Select relevant categories
   - **Published At**: Set the publication date
   - **Body**: Write your blog post content
   - **Reading Time**: e.g., "5 min read"
   - **Featured**: Check if this is a featured post

### Step 5: Test Your Blog

1. **Start your Next.js development server**:
   ```bash
   npm run dev
   ```

2. **Visit your blog**:
   - Blog listing: http://localhost:3000/blog
   - Individual post: http://localhost:3000/blog/[your-post-slug]

## Content Management Features

### Rich Text Editor
Sanity provides a powerful rich text editor with:
- **Headings** (H1-H4)
- **Bold and Italic** text
- **Code blocks**
- **Lists** (bullet and numbered)
- **Links**
- **Images** (with hotspot support)
- **Blockquotes**

### Image Management
- **Upload images** directly in Sanity Studio
- **Image optimization** handled automatically
- **Hotspot support** for responsive images
- **Alt text** for accessibility

### Content Organization
- **Categories** for organizing posts
- **Tags** through categories
- **Featured posts** support
- **Publication scheduling**

## API Token Setup

For production deployment, you'll need a Sanity API token:

1. **Go to Sanity Management Console**:
   - Visit https://sanity.io/manage
   - Select your project

2. **Create API Token**:
   - Go to "API" → "Tokens"
   - Click "Add API token"
   - Give it a name (e.g., "Blog API Token")
   - Select permissions: "Read" (for fetching data)
   - Copy the token and add it to your `.env.local`

## Deployment Considerations

### Environment Variables for Production
Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

### Static Generation
The blog pages are set up for static generation:
- Blog listing page generates at build time
- Individual blog post pages generate at build time
- New posts require a rebuild or revalidation

## Troubleshooting

### Common Issues

1. **"No posts found" on blog page**:
   - Check your environment variables
   - Ensure you have published posts in Sanity
   - Verify your project ID and dataset name

2. **Images not loading**:
   - Check your Sanity project settings
   - Ensure images are published in Sanity
   - Verify the image URL builder configuration

3. **Studio not loading**:
   - Check if you're in the correct directory
   - Ensure all dependencies are installed
   - Try restarting the studio server

### Getting Help
- **Sanity Documentation**: https://www.sanity.io/docs
- **Sanity Community**: https://www.sanity.io/community
- **PortableText Documentation**: https://www.sanity.io/docs/presenting-block-text

## Next Steps

1. **Create your first blog post** using the Sanity Studio
2. **Customize the schema** if you need additional fields
3. **Set up webhooks** for automatic rebuilds when content changes
4. **Configure image optimization** for better performance
5. **Add more content types** (e.g., pages, case studies)

Your blog is now powered by Sanity CMS! 🎉
