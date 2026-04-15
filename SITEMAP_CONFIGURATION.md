# Configuration du Sitemap pour Google

## 🎯 Sitemap Dynamique Configuré

Votre sitemap XML dynamique est maintenant opérationnel et prêt à être soumis à Google !

### 📍 URL du Sitemap

**URL de production** : `https://luuzon.com/sitemap.xml`

⚠️ **IMPORTANT** : Le sitemap est actuellement accessible via l'Edge Function Supabase à :
```
https://{VOTRE_PROJECT_ID}.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml
```

Pour le mettre en production sur votre domaine `luuzon.com`, vous devez configurer une redirection.

---

## 🔧 Configuration Production

### Option 1 : Redirection via Vercel/Netlify (Recommandé)

Si vous déployez sur **Vercel**, ajoutez ce fichier `vercel.json` :

```json
{
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "https://{VOTRE_PROJECT_ID}.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml"
    }
  ]
}
```

Si vous déployez sur **Netlify**, ajoutez ce fichier `netlify.toml` :

```toml
[[redirects]]
  from = "/sitemap.xml"
  to = "https://{VOTRE_PROJECT_ID}.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml"
  status = 200
  force = true
```

### Option 2 : Configuration Nginx

Si vous avez un serveur Nginx :

```nginx
location /sitemap.xml {
    proxy_pass https://{VOTRE_PROJECT_ID}.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml;
    proxy_set_header Host $host;
    proxy_cache_valid 200 1h;
}
```

---

## 📋 Contenu du Sitemap

Le sitemap inclut **automatiquement** :

### Pages Statiques (Priorité)
- ✅ **Homepage** : `/`, `/fr`, `/en` - Priority 1.0 (Daily)
- ✅ **Blog** : `/fr/blog`, `/en/blog` - Priority 0.9 (Daily)
- ✅ **Manifesto** : `/fr/manifesto`, `/en/manifesto` - Priority 0.8 (Weekly)
- ✅ **Legal** : Privacy Policy, Legal Notice - Priority 0.3 (Monthly)

### Articles de Blog (Dynamique)
- ✅ Tous les articles **publiés** depuis Supabase
- ✅ Versions FR **ET** EN pour chaque article
- ✅ Priority 0.7 (Weekly)
- ✅ Date de dernière modification (`lastmod`)

### Mise à Jour Automatique
- 🔄 Le sitemap se régénère **à chaque appel**
- 📦 Cache de **1 heure** pour les performances
- 🚀 Aucune action manuelle requise

---

## 🚀 Soumission à Google Search Console

### Étape 1 : Vérifier votre site
1. Allez sur [Google Search Console](https://search.google.com/search-console)
2. Ajoutez votre propriété `luuzon.com`
3. Vérifiez la propriété (DNS, fichier HTML, ou Google Analytics)

### Étape 2 : Soumettre le sitemap
1. Dans le menu de gauche, cliquez sur **Sitemaps**
2. Dans "Ajouter un sitemap", entrez : `sitemap.xml`
3. Cliquez sur **Envoyer**

✅ Google va maintenant crawler votre sitemap régulièrement !

### Étape 3 : Vérification
- Attendez **24-48 heures**
- Retournez sur Search Console > Sitemaps
- Vérifiez que le statut est **"Réussite"**
- Consultez le nombre d'URLs découvertes

---

## 🔍 Test du Sitemap

### Tester en local
Pour tester le sitemap en développement :

```bash
# Lancer le projet Supabase localement (si configuré)
# puis visiter :
http://localhost:54321/functions/v1/make-server-cfc3b146/sitemap.xml
```

### Tester en production
Visitez directement l'URL :
```
https://{VOTRE_PROJECT_ID}.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml
```

Vous devriez voir un XML bien formaté avec toutes vos pages et articles.

---

## 🛠️ Personnalisation

### Changer le domaine de base

Dans `/supabase/functions/server/index.tsx`, modifiez :

```typescript
const baseUrl = 'https://luuzon.com'; // Votre domaine
```

### Ajouter/Modifier des pages statiques

Dans le même fichier, éditez le tableau `staticPages` :

```typescript
const staticPages = [
  { url: '/fr/nouvelle-page', changefreq: 'weekly', priority: 0.8 },
  // ...
];
```

### Modifier les priorités

Recommandations SEO :
- **1.0** : Homepage uniquement
- **0.8-0.9** : Pages principales (Blog, Manifesto)
- **0.6-0.7** : Articles de blog et sous-pages
- **0.3-0.5** : Pages légales et utilitaires

---

## 📊 Robots.txt

Créez un fichier `public/robots.txt` (si vous avez un dossier public) :

```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://luuzon.com/sitemap.xml

# Désactiver l'indexation des pages admin
Disallow: /*/admin/
Disallow: /*/login
```

---

## ✅ Checklist Finale

- [ ] Configurer la redirection `/sitemap.xml` sur votre hébergeur
- [ ] Remplacer `{VOTRE_PROJECT_ID}` par votre vrai ID Supabase
- [ ] Vérifier que le sitemap s'affiche correctement
- [ ] Créer un compte Google Search Console
- [ ] Vérifier la propriété du site
- [ ] Soumettre le sitemap
- [ ] Créer un fichier `robots.txt`
- [ ] Attendre 24-48h pour voir les résultats

---

## 🎉 Résultat Attendu

Une fois configuré, Google :
- ✅ Découvrira automatiquement toutes vos pages
- ✅ Indexera vos nouveaux articles de blog dans les 24-48h
- ✅ Crawlera régulièrement votre site selon les changefreq
- ✅ Priorisera l'indexation selon les valeurs de priority

**Votre SEO sera optimisé automatiquement !** 🚀
