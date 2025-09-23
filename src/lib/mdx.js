import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getPostBySlug(slug, type = 'blog') {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, type, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: realSlug,
    frontmatter: data,
    content,
    readingTime: stats.text,
  };
}

export function getAllPosts(type = 'blog') {
  const postsDirectory = path.join(contentDirectory, type);
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .filter((slug) => slug.endsWith('.mdx'))
    .map((slug) => getPostBySlug(slug, type))
    .filter(Boolean)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB - dateA;
    });

  return posts;
}

export function getPostSlugs(type = 'blog') {
  const postsDirectory = path.join(contentDirectory, type);
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const slugs = fs.readdirSync(postsDirectory);
  return slugs
    .filter((slug) => slug.endsWith('.mdx'))
    .map((slug) => slug.replace(/\.mdx$/, ''));
}

export function getRelatedPosts(currentSlug, type = 'blog', limit = 3) {
  const allPosts = getAllPosts(type);
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) {
    return [];
  }

  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => {
      const currentTags = currentPost.frontmatter.tags || [];
      const postTags = post.frontmatter.tags || [];
      return currentTags.some(tag => postTags.includes(tag));
    })
    .slice(0, limit);

  return relatedPosts;
}
