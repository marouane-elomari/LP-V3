import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SEOHead } from "./SEOHead";
import { getBlogPosts, searchBlogPosts, type BlogPost } from "../../lib/strapi";

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white/60 overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-100" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-slate-100 rounded w-1/3" />
        <div className="h-5 bg-slate-100 rounded w-4/5" />
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-2/3" />
      </div>
    </div>
  );
}

function FeaturedCard({ post, lang }: { post: BlogPost; lang: string }) {
  return (
    <Link to={`/${lang}/blog/${post.slug}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden border border-[#e2e8f0] bg-white/70 backdrop-blur-sm min-h-[380px] flex flex-col justify-end hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      >
        {post.featured_image ? (
          <img
            src={post.featured_image.url}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#F4A6C4]/20 to-[#4A90E2]/10" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/60 to-transparent" />

        <div className="absolute top-6 left-6">
          <span className="px-3 py-1 text-xs font-semibold bg-[#cf3c7e] text-white rounded-full">
            {lang === 'fr' ? 'À la une' : 'Featured'}
          </span>
        </div>

        <div className="relative z-10 p-8">
          <div className="flex items-center gap-4 text-xs text-[#64748b] mb-3">
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt, lang)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {readingTime(post.content)} min
            </span>
          </div>
          <h2 className="text-[#0f172a] text-2xl md:text-3xl leading-snug mb-3">
            {post.title}
          </h2>
          <p className="text-[#64748b] text-sm line-clamp-2 mb-5 max-w-2xl">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#cf3c7e] group-hover:gap-3 transition-all duration-200">
            {lang === 'fr' ? 'Lire l\'article' : 'Read article'}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

function PostCard({ post, lang, index }: { post: BlogPost; lang: string; index: number }) {
  return (
    <Link to={`/${lang}/blog/${post.slug}`} className="block group h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
        className="h-full flex flex-col rounded-2xl border border-[#e2e8f0] bg-white/60 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        <div className="overflow-hidden h-52 bg-slate-50 flex-shrink-0">
          {post.featured_image ? (
            <img
              src={post.featured_image.url}
              alt={post.featured_image.alternativeText || post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F4A6C4]/20 to-[#4A90E2]/10 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-slate-300" />
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-3 text-xs text-[#64748b] mb-3">
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt, lang)}
              </span>
            )}
            {post.author_name && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.author_name}
              </span>
            )}
            <span className="flex items-center gap-1 ml-auto">
              <BookOpen className="w-3 h-3" />
              {readingTime(post.content)} min
            </span>
          </div>

          <h2 className="text-[#0f172a] text-lg font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-[#cf3c7e] transition-colors">
            {post.title}
          </h2>

          <p className="text-[#64748b] text-sm line-clamp-3 flex-1 mb-5">
            {post.excerpt}
          </p>

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#cf3c7e] group-hover:gap-3 transition-all duration-200 mt-auto">
            {lang === 'fr' ? 'Lire la suite' : 'Read more'}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

export function BlogList() {
  const { lang } = useParams<{ lang: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      setPosts(await getBlogPosts());
    } catch {
      setError(lang === 'fr' ? "Impossible de charger les articles." : "Unable to load posts.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query: string) {
    setSearchQuery(query);
    if (!query.trim()) { fetchPosts(); return; }
    try {
      setSearching(true);
      setPosts(await searchBlogPosts(query));
    } catch {
      setError(lang === 'fr' ? "Recherche échouée." : "Search failed.");
    } finally {
      setSearching(false);
    }
  }

  const [featured, ...rest] = posts;
  const isLoading = loading || searching;

  return (
    <>
      <SEOHead
        titleKey="page.title.blog"
        descriptionKey="page.description.blog"
        canonicalPath={`/${lang}/blog`}
      />
      <Navbar />

      <main className="min-h-screen pb-20 pt-28 px-4 max-w-6xl mx-auto">

        {/* ── Page title ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#cf3c7e]">
            {lang === 'fr' ? 'Ressources' : 'Resources'}
          </span>
          <h1
            className="text-5xl md:text-6xl text-[#0f172a] mt-2 mb-3 leading-tight"
            style={{ fontFamily: 'Instrument Serif, serif' }}
          >
            {lang === 'fr' ? 'Le blog Luuzon' : 'The Luuzon Blog'}
          </h1>
          <p className="text-[#64748b] text-lg max-w-lg">
            {lang === 'fr'
              ? 'Conseils, outils et actualités pour les agents immobiliers modernes.'
              : 'Tips, tools and news for modern real estate agents.'}
          </p>
        </motion.div>

        {/* ── Search ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="relative max-w-md mb-12"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            placeholder={lang === 'fr' ? 'Rechercher un article...' : 'Search articles...'}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#cf3c7e]/30 focus:border-[#cf3c7e]/40 transition-all"
          />
        </motion.div>

        {/* ── Loading ── */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Error ── */}
        {!isLoading && error && (
          <div className="text-center py-20">
            <p className="text-[#64748b] mb-4">{error}</p>
            <button
              onClick={fetchPosts}
              className="px-5 py-2.5 rounded-full border border-[#e2e8f0] bg-white/60 text-sm hover:bg-white transition-colors"
            >
              {lang === 'fr' ? 'Réessayer' : 'Try again'}
            </button>
          </div>
        )}

        {/* ── Empty ── */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-20 text-[#64748b]">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-200" />
            <p>{lang === 'fr' ? 'Aucun article trouvé.' : 'No articles found.'}</p>
          </div>
        )}

        {/* ── Posts ── */}
        {!isLoading && !error && posts.length > 0 && (
          <div className="space-y-10">
            {featured && <FeaturedCard post={featured} lang={lang!} />}

            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#64748b]">
                    {lang === 'fr' ? 'Tous les articles' : 'All articles'}
                  </span>
                  <div className="flex-1 h-px bg-[#e2e8f0]" />
                  <span className="text-xs text-[#64748b]">{rest.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <PostCard key={post.id} post={post} lang={lang!} index={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
