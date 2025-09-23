export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-23'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.warn('⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity features will be disabled.');
}
