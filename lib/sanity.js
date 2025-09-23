import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

// Image URL builder
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

// Blog post queries
export async function getAllPosts() {
  // Return empty array if Sanity is not configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo') {
    return []
  }
  
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author->{
          name,
          image
        },
        mainImage,
        categories[]->{
          title,
          slug
        },
        readingTime
      }
    `)
    return posts
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error)
    return []
  }
}

export async function getPostBySlug(slug) {
  // Return null if Sanity is not configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo') {
    return null
  }
  
  try {
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author->{
          name,
          bio,
          image
        },
        mainImage,
        categories[]->{
          title,
          slug
        },
        body,
        readingTime
      }
    `, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post from Sanity:', error)
    return null
  }
}

export async function getPostSlugs() {
  // Return empty array if Sanity is not configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo') {
    return []
  }
  
  try {
    const slugs = await client.fetch(`
      *[_type == "post"] {
        "slug": slug.current
      }
    `)
    return slugs.map(item => item.slug)
  } catch (error) {
    console.error('Error fetching post slugs from Sanity:', error)
    return []
  }
}
