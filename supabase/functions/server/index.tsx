import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-cfc3b146/health", (c) => {
  return c.json({ status: "ok" });
});

// Sitemap.xml endpoint - Generate dynamic sitemap for SEO
app.get("/make-server-cfc3b146/sitemap.xml", async (c) => {
  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
    );

    // Base URL - adjust this to your production domain
    const baseUrl = 'https://luuzon.com'; // TODO: Update with your actual domain

    // Static pages with their priorities and change frequencies
    const staticPages = [
      // Homepage
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/fr', changefreq: 'daily', priority: 1.0 },
      { url: '/en', changefreq: 'daily', priority: 1.0 },
      
      // Main sections
      { url: '/fr/manifesto', changefreq: 'weekly', priority: 0.8 },
      { url: '/en/manifesto', changefreq: 'weekly', priority: 0.8 },
      { url: '/fr/blog', changefreq: 'daily', priority: 0.9 },
      { url: '/en/blog', changefreq: 'daily', priority: 0.9 },
      
      // Legal pages
      { url: '/fr/privacy-policy', changefreq: 'monthly', priority: 0.3 },
      { url: '/en/privacy-policy', changefreq: 'monthly', priority: 0.3 },
      { url: '/fr/legal-notice', changefreq: 'monthly', priority: 0.3 },
      { url: '/en/legal-notice', changefreq: 'monthly', priority: 0.3 },
    ];

    // Fetch all published blog posts
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts for sitemap:', error);
    }

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    for (const page of staticPages) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += '  </url>\n';
    }

    // Add blog posts (FR and EN versions)
    if (blogPosts && blogPosts.length > 0) {
      for (const post of blogPosts) {
        const lastmod = post.updated_at || post.published_at || new Date().toISOString();
        const formattedDate = new Date(lastmod).toISOString().split('T')[0];

        // French version
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/fr/blog/${post.slug}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `    <lastmod>${formattedDate}</lastmod>\n`;
        xml += '  </url>\n';

        // English version
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/en/blog/${post.slug}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `    <lastmod>${formattedDate}</lastmod>\n`;
        xml += '  </url>\n';
      }
    }

    xml += '</urlset>';

    // Return XML with proper content type
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
});

Deno.serve(app.fetch);