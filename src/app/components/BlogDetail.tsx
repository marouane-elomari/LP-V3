import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Tag, BookOpen, Check } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SEOHead } from './SEOHead';
import { getBlogPostBySlug, type BlogPost } from '../../lib/strapi';

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function renderMarkdown(text: string): string {
  return text
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul]|<\/p|<p)(.+)$/gm, '<p>$1</p>');
}

function LoadingSkeleton() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-20 px-4 max-w-3xl mx-auto animate-pulse space-y-4">
        <div className="h-4 bg-slate-200/60 rounded w-24" />
        <div className="h-10 bg-slate-200/60 rounded w-4/5" />
        <div className="h-10 bg-slate-200/60 rounded w-3/5" />
        <div className="h-4 bg-slate-200/60 rounded w-40 mt-6" />
        <div className="h-64 bg-slate-200/60 rounded-2xl mt-6" />
        <div className="space-y-3 mt-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-200/60 rounded" style={{ width: `${65 + Math.random() * 35}%` }} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export function BlogDetail() {
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    window.scrollTo(0, 0);
    fetchPost();
  }, [slug]);

  async function fetchPost() {
    try {
      setLoading(true);
      setError(null);
      const data = await getBlogPostBySlug(slug!);
      if (!data) { navigate(`/${lang}/blog`); return; }
      setPost(data);
    } catch {
      setError(lang === 'fr' ? "Article introuvable." : "Article not found.");
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: post?.title, text: post?.excerpt, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading) return <LoadingSkeleton />;

  if (error || !post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
          <BookOpen className="w-12 h-12 text-slate-300" />
          <p className="text-[#64748b]">{error}</p>
          <Link
            to={`/${lang}/blog`}
            className="px-5 py-2.5 rounded-full border border-[#e2e8f0] bg-white/60 text-sm hover:bg-white transition-colors"
          >
            {lang === 'fr' ? '← Retour au blog' : '← Back to blog'}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const keywords = post.meta_keywords
    ? post.meta_keywords.split(',').map(k => k.trim()).filter(Boolean)
    : [];

  return (
    <>
      <SEOHead
        titleKey={post.meta_title || post.title}
        descriptionKey={post.meta_description || post.excerpt}
        canonicalPath={`/${lang}/blog/${post.slug}`}
        type="article"
        keywords={post.meta_keywords || undefined}
        imageUrl={post.featured_image?.url}
      />
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 px-4 max-w-3xl mx-auto">

        {/* ── Back ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <Link
            to={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center flex-wrap gap-3 text-xs text-[#64748b] mb-5">
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt, lang!)}
              </span>
            )}
            {post.author_name && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author_name}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {readingTime(post.content)} min {lang === 'fr' ? 'de lecture' : 'read'}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl text-[#0f172a] leading-tight mb-5"
            style={{ fontFamily: 'Instrument Serif, serif' }}
          >
            {post.title}
          </h1>

          <p className="text-[#64748b] text-lg leading-relaxed border-l-2 border-[#cf3c7e] pl-4">
            {post.excerpt}
          </p>
        </motion.header>

        {/* ── Featured image ── */}
        {post.featured_image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 rounded-2xl overflow-hidden border border-[#e2e8f0]"
          >
            <img
              src={post.featured_image.url}
              alt={post.featured_image.alternativeText || post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </motion.div>
        )}

        {/* ── Share ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-end mb-8"
        >
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e2e8f0] bg-white/60 backdrop-blur-sm text-sm text-[#64748b] hover:bg-white hover:text-[#0f172a] transition-all"
          >
            {copied
              ? <><Check className="w-4 h-4 text-green-500" />{lang === 'fr' ? 'Copié !' : 'Copied!'}</>
              : <><Share2 className="w-4 h-4" />{lang === 'fr' ? 'Partager' : 'Share'}</>
            }
          </button>
        </motion.div>

        {/* ── Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* ── Tags ── */}
        {keywords.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[#e2e8f0] flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-[#64748b]" />
            {keywords.map(kw => (
              <span
                key={kw}
                className="px-3 py-1 text-xs rounded-full bg-white/60 border border-[#e2e8f0] text-[#64748b]"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* ── Footer CTA ── */}
        <div className="mt-14 pt-8 border-t border-[#e2e8f0]">
          <Link
            to={`/${lang}/blog`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#e2e8f0] bg-white/60 backdrop-blur-sm text-sm text-[#0f172a] hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'fr' ? 'Tous les articles' : 'All articles'}
          </Link>
        </div>
      </main>

      <Footer />

      <style>{`
        .blog-content {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.0625rem;
          line-height: 1.85;
          color: #1e293b;
        }
        .blog-content p { margin-bottom: 1.5rem; }
        .blog-content h1 { font-family: 'Instrument Serif', serif; font-size: 2rem; margin: 2.5rem 0 1rem; color: #0f172a; line-height: 1.2; }
        .blog-content h2 { font-family: 'Instrument Serif', serif; font-size: 1.6rem; margin: 2.5rem 0 1rem; color: #0f172a; line-height: 1.3; }
        .blog-content h3 { font-family: 'Instrument Serif', serif; font-size: 1.3rem; margin: 2rem 0 0.75rem; color: #0f172a; }
        .blog-content h4 { font-size: 1rem; font-weight: 700; margin: 1.5rem 0 0.5rem; color: #0f172a; }
        .blog-content strong { font-weight: 700; color: #0f172a; }
        .blog-content em { font-style: italic; }
        .blog-content a { color: #cf3c7e; text-decoration: underline; text-underline-offset: 3px; }
        .blog-content a:hover { color: #a3305f; }
        .blog-content code { font-family: monospace; background: rgba(241,245,249,0.8); padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.9em; color: #cf3c7e; }
        .blog-content ul { list-style: none; margin: 1.5rem 0; padding: 0; }
        .blog-content li { padding-left: 1.5rem; position: relative; margin-bottom: 0.5rem; }
        .blog-content li::before { content: ''; position: absolute; left: 0; top: 0.65em; width: 6px; height: 6px; border-radius: 50%; background: #cf3c7e; }
      `}</style>
    </>
  );
}
