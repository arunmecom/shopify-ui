import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Only create client if projectId is available
export const client = projectId ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for development to avoid caching issues
}) : null

// Helper function to safely use the client
export const safeClient = () => {
  if (!client) {
    throw new Error('Sanity client is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.');
  }
  return client;
}
