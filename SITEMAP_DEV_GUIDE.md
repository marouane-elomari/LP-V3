# 🗺️ Sitemap Dynamique - Documentation Développeur

## Vue d'ensemble

Ce projet implémente un **sitemap XML dynamique** pour le SEO, généré automatiquement depuis Supabase Edge Functions. Le sitemap inclut toutes les pages statiques (FR/EN) et tous les articles de blog publiés.

---

## Architecture

```
┌─────────────────┐
│   Client        │
│  (Browser)      │
└────────┬────────┘
         │
         │ GET /sitemap.xml
         ▼
┌─────────────────┐
│   React App     │
│  SitemapRedirect│──────┐
└─────────────────┘      │
                         │ Redirect
                         ▼
┌──────────────────────────────────────┐
│   Supabase Edge Function             │
│   /make-server-cfc3b146/sitemap.xml  │
└───────────┬──────────────────────────┘
            │
            │ Query blog_posts
            ▼
┌──────────────────────┐
│   Supabase Database  │
│   (blog_posts table) │
└──────────────────────┘
```

---

## Fichiers Clés

### Backend (Supabase Edge Function)
- **`/supabase/functions/server/index.tsx`**
  - Route: `GET /make-server-cfc3b146/sitemap.xml`
  - Récupère les articles depuis `blog_posts` table
  - Génère le XML avec les pages statiques + articles
  - Cache: 1 heure (`max-age=3600`)

### Frontend (React)
- **`/src/app/components/SitemapRedirect.tsx`**
  - Redirige `/sitemap.xml` vers l'Edge Function
  - Utilise `window.location.replace()`
  
- **`/src/app/components/SEOHead.tsx`**
  - Ajoute `<link rel="sitemap">` dans le `<head>`
  - Pointe vers `https://luuzon.com/sitemap.xml`

- **`/src/app/App.tsx`**
  - Route: `<Route path="/sitemap.xml" element={<SitemapRedirect />} />`

### Configuration
- **`/public/robots.txt`**
  - Pointe vers le sitemap
  - Bloque les pages admin

- **`/vercel.json.example`** / **`/netlify.toml.example`**
  - Exemples de configuration pour la production
  - Redirection `/sitemap.xml` → Supabase Edge Function

---

## Structure du Sitemap

### Format XML
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://luuzon.com/fr</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>2026-04-05</lastmod>
  </url>
  <!-- ... -->
</urlset>
```

### Pages Statiques

| URL | Priority | Changefreq | Description |
|-----|----------|------------|-------------|
| `/`, `/fr`, `/en` | 1.0 | daily | Homepage |
| `/fr/blog`, `/en/blog` | 0.9 | daily | Blog index |
| `/fr/manifesto`, `/en/manifesto` | 0.8 | weekly | Manifeste |
| `/fr/privacy-policy`, `/en/privacy-policy` | 0.3 | monthly | Privacy |
| `/fr/legal-notice`, `/en/legal-notice` | 0.3 | monthly | Legal |

### Articles Dynamiques

Chaque article publié génère **2 URLs** :
- `https://luuzon.com/fr/blog/{slug}` (Priority: 0.7, Weekly)
- `https://luuzon.com/en/blog/{slug}` (Priority: 0.7, Weekly)

Le champ `<lastmod>` utilise `updated_at` ou `published_at` de l'article.

---

## Configuration de Développement

### Prérequis
- Node.js 18+
- Supabase CLI (optionnel)
- Projet Supabase configuré

### Installation
```bash
# Cloner le projet
git clone <repo-url>
cd <project-name>

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir SUPABASE_URL et SUPABASE_ANON_KEY
```

### Tester localement

#### Option 1 : Via React Dev Server
```bash
npm run dev

# Visiter http://localhost:5173/sitemap.xml
# → Sera redirigé vers l'Edge Function Supabase
```

#### Option 2 : Via Supabase CLI (Local)
```bash
# Démarrer Supabase localement
supabase start

# L'Edge Function sera accessible sur:
# http://localhost:54321/functions/v1/make-server-cfc3b146/sitemap.xml
```

#### Option 3 : Directement depuis Supabase (Production)
```bash
# Remplacer {PROJECT_ID} par votre ID Supabase
curl https://{PROJECT_ID}.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml
```

---

## Configuration de Production

### Étape 1 : Déployer l'Edge Function

Assurez-vous que votre Edge Function Supabase est déployée :

```bash
# Via Supabase CLI
supabase functions deploy

# Ou via le dashboard Supabase
# Functions → Deploy
```

### Étape 2 : Configurer la Redirection

#### Pour Vercel
```bash
# Copier le fichier exemple
cp vercel.json.example vercel.json

# Éditer et remplacer YOUR_SUPABASE_PROJECT_ID
nano vercel.json

# Déployer
vercel --prod
```

#### Pour Netlify
```bash
# Copier le fichier exemple
cp netlify.toml.example netlify.toml

# Éditer et remplacer YOUR_SUPABASE_PROJECT_ID
nano netlify.toml

# Déployer
git push origin main
# ou
netlify deploy --prod
```

### Étape 3 : Tester en Production
```bash
# Vérifier que le sitemap est accessible
curl https://luuzon.com/sitemap.xml

# Vérifier le robots.txt
curl https://luuzon.com/robots.txt

# Valider le XML
# Coller l'URL sur: https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

---

## Personnalisation

### Ajouter une page statique

Éditer `/supabase/functions/server/index.tsx` :

```typescript
const staticPages = [
  // ... pages existantes
  
  // Nouvelle page
  { url: '/fr/nouvelle-page', changefreq: 'weekly', priority: 0.8 },
  { url: '/en/new-page', changefreq: 'weekly', priority: 0.8 },
];
```

### Modifier les priorités

Recommandations Google :
- **1.0** : Homepage uniquement
- **0.8-0.9** : Pages principales
- **0.6-0.7** : Contenu secondaire
- **0.3-0.5** : Pages utilitaires

### Changer la fréquence de mise à jour

Options valides : `always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`

### Filtrer certains articles

Pour exclure certains articles du sitemap :

```typescript
const { data: blogPosts, error } = await supabase
  .from('blog_posts')
  .select('slug, updated_at, published_at')
  .eq('status', 'published')
  .eq('no_index', false) // Ajouter cette condition
  .order('published_at', { ascending: false });
```

---

## Débogage

### Le sitemap ne s'affiche pas

1. **Vérifier l'Edge Function**
   ```bash
   curl https://{PROJECT_ID}.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml
   ```
   Si erreur → Consulter les logs Supabase

2. **Vérifier la redirection**
   ```bash
   curl -I https://luuzon.com/sitemap.xml
   ```
   Doit retourner HTTP 200 ou 301/302

3. **Vérifier les logs Vercel/Netlify**
   ```bash
   vercel logs
   # ou
   netlify logs
   ```

### Les articles n'apparaissent pas

1. **Vérifier le statut des articles**
   ```sql
   SELECT slug, status FROM blog_posts;
   ```
   Seuls les articles `status = 'published'` sont inclus.

2. **Tester la requête Supabase**
   Aller dans Supabase Dashboard → SQL Editor :
   ```sql
   SELECT slug, updated_at, published_at 
   FROM blog_posts 
   WHERE status = 'published' 
   ORDER BY published_at DESC;
   ```

3. **Vérifier les permissions RLS**
   La table `blog_posts` doit être accessible en lecture publique (au moins pour `status = 'published'`).

### Google refuse le sitemap

1. **Valider le format XML**
   - Utiliser https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Vérifier qu'il n'y a pas de caractères spéciaux non échappés

2. **Vérifier les URLs**
   - Toutes les URLs doivent être accessibles (HTTP 200)
   - Pas d'URLs avec redirections infinies
   - Pas d'URLs bloquées par robots.txt

3. **Vérifier robots.txt**
   ```bash
   curl https://luuzon.com/robots.txt
   ```
   Doit contenir : `Sitemap: https://luuzon.com/sitemap.xml`

---

## Tests Automatisés

### Script de test
```bash
# Rendre le script exécutable
chmod +x test-sitemap.sh

# Lancer le test
./test-sitemap.sh YOUR_SUPABASE_PROJECT_ID
```

Le script vérifie :
- ✅ Accessibilité (HTTP 200)
- ✅ Format XML valide
- ✅ Nombre d'URLs
- ✅ Présence des pages principales
- ✅ robots.txt (si en production)

---

## Monitoring

### Métriques à surveiller

1. **Google Search Console**
   - Nombre d'URLs découvertes
   - Nombre d'URLs indexées
   - Erreurs de crawl
   - Couverture d'indexation

2. **Supabase Edge Functions**
   - Nombre de requêtes
   - Temps de réponse
   - Taux d'erreur
   - Utilisation des ressources

3. **Analytics**
   - Trafic organique
   - Pages les plus visitées
   - Taux de rebond
   - Conversions depuis le SEO

---

## Performance

### Cache
- **Supabase Edge Function** : Headers `Cache-Control: max-age=3600`
- **CDN (Vercel/Netlify)** : Cache additionnel de 1h
- **Google** : Re-crawl selon la `changefreq`

### Optimisations possibles

1. **Pagination du sitemap** (si > 50 000 URLs)
   ```xml
   <sitemapindex>
     <sitemap>
       <loc>https://luuzon.com/sitemap-pages.xml</loc>
     </sitemap>
     <sitemap>
       <loc>https://luuzon.com/sitemap-blog.xml</loc>
     </sitemap>
   </sitemapindex>
   ```

2. **Compression GZIP**
   - Activer la compression sur le CDN
   - Réduit la taille du sitemap de ~70%

3. **Cache distribué**
   - Utiliser Supabase Storage pour le cache
   - Régénérer le sitemap en arrière-plan (cron)

---

## Ressources

### Documentation
- [Sitemaps.org Protocol](https://www.sitemaps.org/protocol.html)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/advanced/sitemaps/overview)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

### Outils
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [Google Search Console](https://search.google.com/search-console)
- [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/)

---

## Support

Pour toute question ou problème :
1. Consulter `/GOOGLE_SITEMAP_GUIDE.md` (guide utilisateur)
2. Consulter `/SITEMAP_CONFIGURATION.md` (documentation technique)
3. Vérifier les logs Supabase Edge Functions
4. Tester avec `./test-sitemap.sh`

---

**Dernière mise à jour** : 5 avril 2026  
**Version** : 1.0.0
