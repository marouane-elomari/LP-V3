/**
 * generate-sitemap.mjs
 *
 * Runs after `vite build`. Fetches all published blog posts from Strapi,
 * then writes dist/sitemap.xml with static pages + dynamic blog URLs.
 *
 * Usage:  node scripts/generate-sitemap.mjs
 * Env:    STRAPI_URL   (default: http://localhost:1337)
 *         SITE_URL     (default: https://luuzon.com)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Read .env file (no dotenv dependency needed) ─────────────────────────────
function readEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return {};
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  return Object.fromEntries(
    lines
      .filter(l => l.includes('=') && !l.startsWith('#'))
      .map(l => [l.split('=')[0].trim(), l.split('=').slice(1).join('=').trim()])
  );
}

const env = readEnv();
const STRAPI_URL = process.env.STRAPI_URL || env.VITE_STRAPI_URL || 'http://localhost:1337';
const SITE_URL   = process.env.SITE_URL   || env.VITE_SITE_URL   || 'https://luuzon.com';

// ── Static pages ─────────────────────────────────────────────────────────────
const STATIC_PAGES = [
  { path: '/fr',              priority: '1.0', changefreq: 'weekly'  },
  { path: '/en',              priority: '1.0', changefreq: 'weekly'  },
  { path: '/fr/blog',         priority: '0.9', changefreq: 'daily'   },
  { path: '/en/blog',         priority: '0.9', changefreq: 'daily'   },
  { path: '/fr/manifesto',    priority: '0.7', changefreq: 'monthly' },
  { path: '/en/manifesto',    priority: '0.7', changefreq: 'monthly' },
  { path: '/fr/privacy',      priority: '0.3', changefreq: 'yearly'  },
  { path: '/en/privacy',      priority: '0.3', changefreq: 'yearly'  },
  { path: '/fr/legal',        priority: '0.3', changefreq: 'yearly'  },
  { path: '/en/legal',        priority: '0.3', changefreq: 'yearly'  },
];

// ── Fetch blog posts from Strapi ──────────────────────────────────────────────
async function fetchBlogPosts() {
  const url = `${STRAPI_URL}/api/blog-posts?fields=slug,publishedAt,updatedAt&pagination[pageSize]=1000&sort=publishedAt:desc`;
  console.log(`  Fetching blog posts from ${url}`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn(`  ⚠ Could not reach Strapi (${err.message}). Blog posts will be skipped.`);
    return [];
  }
}

// ── Build XML ────────────────────────────────────────────────────────────────
function buildXml(staticPages, blogPosts) {
  const today = new Date().toISOString().split('T')[0];

  const staticEntries = staticPages.map(p => `
  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

  const blogEntries = blogPosts.flatMap(post => {
    const lastmod = post.updatedAt
      ? post.updatedAt.split('T')[0]
      : today;
    return ['fr', 'en'].map(lang => `
  <url>
    <loc>${SITE_URL}/${lang}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticEntries}
${blogEntries}
</urlset>`.trim();
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🗺  Generating sitemap...');
  console.log(`  Site URL:   ${SITE_URL}`);
  console.log(`  Strapi URL: ${STRAPI_URL}`);

  const blogPosts = await fetchBlogPosts();
  const xml = buildXml(STATIC_PAGES, blogPosts);

  const outPath = path.join(ROOT, 'dist', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');

  const total = STATIC_PAGES.length + blogPosts.length * 2;
  console.log(`  ✓ ${total} URLs written → dist/sitemap.xml`);
  console.log(`    (${STATIC_PAGES.length} static + ${blogPosts.length} blog posts × 2 langs)\n`);
}

main().catch(err => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
