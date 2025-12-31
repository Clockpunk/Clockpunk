import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is required');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true,
  perspective: 'published',
});

export const clientFetch = async <T = unknown>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> => {
  return client.fetch<T>(query, params, {
    cache: 'force-cache',
    next: {
      revalidate: 180, // 3 минуты
    },
  });
};
