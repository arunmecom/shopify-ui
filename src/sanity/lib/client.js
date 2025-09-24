import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Only create client if projectId is available
export const client = projectId ? createClient({
  projectId,
  dataset,
  apiVersion,
  // Use CDN in production for better performance, but disable for development
  useCdn: process.env.NODE_ENV === 'production' ? true : false,
  // Add token for write operations if available
  token: process.env.SANITY_API_TOKEN,
}) : null

// Helper function to safely use the client
export const safeClient = () => {
  if (!client) {
    throw new Error('Sanity client is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.');
  }
  return client;
}
