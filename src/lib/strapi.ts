const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || '';

const headers: Record<string, string> = {
  'Content-Type': 'application/json',
};
if (STRAPI_TOKEN) {
  headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StrapiImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_name: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  locale: 'fr' | 'en' | null;
  featured_image: StrapiImage | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildImageUrl(image: StrapiImage | null): string | null {
  if (!image) return null;
  if (image.url.startsWith('http')) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

// ─── API calls ────────────────────────────────────────────────────────────────

/** Fetch all published blog posts, sorted newest first */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const params = new URLSearchParams({
    'populate': 'featured_image',
    'sort': 'publishedAt:desc',
    'pagination[pageSize]': '100',
  });
  const res = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`, { headers });
  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);

  const json = await res.json();
  return (json.data as BlogPost[]).map(post => ({
    ...post,
    featured_image: post.featured_image
      ? { ...post.featured_image, url: buildImageUrl(post.featured_image) as string }
      : null,
  }));
}

/** Fetch a single blog post by slug */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const params = new URLSearchParams({
    'populate': 'featured_image',
    'filters[slug][$eq]': slug,
  });

  const res = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`, { headers });
  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);

  const json = await res.json();
  if (!json.data || json.data.length === 0) return null;

  const post: BlogPost = json.data[0];
  return {
    ...post,
    featured_image: post.featured_image
      ? { ...post.featured_image, url: buildImageUrl(post.featured_image) as string }
      : null,
  };
}

/** Search published blog posts by keyword in title or excerpt */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const params = new URLSearchParams({
    'populate': 'featured_image',
    'sort': 'publishedAt:desc',
    '_q': query,
  });
  const res = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`, { headers });
  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);

  const json = await res.json();
  return (json.data as BlogPost[]).map(post => ({
    ...post,
    featured_image: post.featured_image
      ? { ...post.featured_image, url: buildImageUrl(post.featured_image) as string }
      : null,
  }));
}
