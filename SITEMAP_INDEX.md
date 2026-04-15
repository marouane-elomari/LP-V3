# 🗺️ Sitemap Dynamique Luuzon - INDEX

## 🎯 Vous Déployez sur Hostinger ?

**👉 COMMENCEZ ICI : [`HOSTINGER_QUICKSTART.md`](./HOSTINGER_QUICKSTART.md)**

---

## ⚡ Commande Rapide

```bash
# Configuration initiale (une seule fois)
chmod +x *.sh
cd dist/ && git init && git remote add hostinger <URL> && cd ..

# Déploiement (à chaque fois)
npm run deploy:hostinger
```

---

## 📚 Documentation Disponible

### 🚀 Pour Déployer

| Fichier | Description | Pour Qui ? |
|---------|-------------|------------|
| **[HOSTINGER_QUICKSTART.md](./HOSTINGER_QUICKSTART.md)** | **Guide express** | ⭐ **Commencez ici** |
| [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md) | Guide complet Hostinger | Détails techniques |
| [SITEMAP_TODO.md](./SITEMAP_TODO.md) | Checklist de déploiement | Planning étape par étape |

### 📖 Pour Comprendre

| Fichier | Description | Pour Qui ? |
|---------|-------------|------------|
| [SITEMAP_README.md](./SITEMAP_README.md) | Vue d'ensemble | Introduction générale |
| [SITEMAP_CONFIGURATION.md](./SITEMAP_CONFIGURATION.md) | Documentation technique | Architecture détaillée |
| [SITEMAP_DEV_GUIDE.md](./SITEMAP_DEV_GUIDE.md) | Guide développeur | Personnalisation |

### 🔍 Pour Google

| Fichier | Description | Pour Qui ? |
|---------|-------------|------------|
| [GOOGLE_SITEMAP_GUIDE.md](./GOOGLE_SITEMAP_GUIDE.md) | Soumettre à Google | Guide Search Console |
| [SITEMAP_RESUME.md](./SITEMAP_RESUME.md) | Résumé exécutif | Vue d'ensemble |

### 📝 Historique

| Fichier | Description | Pour Qui ? |
|---------|-------------|------------|
| [SITEMAP_CHANGELOG.md](./SITEMAP_CHANGELOG.md) | Changelog complet | Historique des modifs |

---

## 🛠️ Fichiers de Configuration

| Fichier | Description |
|---------|-------------|
| `/.htaccess` | Configuration Apache pour Hostinger |
| `/public/robots.txt` | Instructions pour les crawlers |
| `/vercel.json.example` | Config Vercel (si vous migrez) |
| `/netlify.toml.example` | Config Netlify (si vous migrez) |

---

## 📜 Scripts Disponibles

| Script | Commande | Description |
|--------|----------|-------------|
| **Déploiement complet** | `npm run deploy:hostinger` | ⭐ Recommandé |
| Build Hostinger | `npm run build:hostinger` | Build + copie config |
| Build normal | `npm run build` | Build Vite standard |
| Test sitemap | `./test-sitemap.sh ittufwcrotfyklykdgwk` | Vérifie le sitemap |
| Deploy manuel | `./deploy-hostinger.sh` | Script bash complet |
| Build manuel | `./build-for-hostinger.sh` | Build + config |

---

## 🎯 Workflow Recommandé

### 1. Premier Déploiement

```bash
# 1. Configuration initiale
chmod +x *.sh
cd dist/
git init
git remote add hostinger <VOTRE_URL_GIT_HOSTINGER>
cd ..

# 2. Déployer
npm run deploy:hostinger

# 3. Tester
curl https://luuzon.com/sitemap.xml

# 4. Soumettre à Google Search Console
# https://search.google.com/search-console
```

### 2. Déploiements Suivants

```bash
# Une seule commande !
npm run deploy:hostinger "Message de commit optionnel"
```

### 3. Publication d'Articles

**Bonne nouvelle** : Rien à faire !

Le sitemap se met à jour automatiquement quand vous publiez un article via le CMS.

---

## 🎨 Architecture du Sitemap

```
Client
  ↓
GET https://luuzon.com/sitemap.xml
  ↓
Apache (.htaccess)
  ↓
Proxy vers Supabase Edge Function
  ↓
https://ittufwcrotfyklykdgwk.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml
  ↓
Génère XML dynamique
  ↓
Retourne le sitemap avec :
  • Pages statiques (FR + EN)
  • Articles de blog publiés (FR + EN)
```

---

## ✅ Ce qui a été Configuré

### Backend (Supabase)
- ✅ Edge Function qui génère le sitemap XML
- ✅ Récupère automatiquement les articles publiés
- ✅ Cache de 1 heure

### Frontend (React)
- ✅ Route `/sitemap.xml` avec redirection
- ✅ Balise `<link rel="sitemap">` dans le `<head>`
- ✅ Component `SitemapRedirect`

### Configuration (Hostinger)
- ✅ `.htaccess` avec proxy vers Supabase
- ✅ `robots.txt` pointant vers le sitemap
- ✅ Scripts de build et déploiement automatisés

### Documentation
- ✅ 9 fichiers de documentation complets
- ✅ 3 scripts bash automatisés
- ✅ 2 scripts NPM

---

## 🔗 URLs Importantes

| URL | Description |
|-----|-------------|
| `https://luuzon.com/sitemap.xml` | Sitemap en production |
| `https://luuzon.com/robots.txt` | Robots.txt |
| `https://ittufwcrotfyklykdgwk.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml` | Sitemap Supabase (direct) |
| `https://search.google.com/search-console` | Google Search Console |

---

## 🧪 Tests

### Avant Déploiement
```bash
npm run build:hostinger
ls -la dist/.htaccess dist/robots.txt
```

### Après Déploiement
```bash
./test-sitemap.sh ittufwcrotfyklykdgwk
curl https://luuzon.com/sitemap.xml
curl https://luuzon.com/robots.txt
```

---

## 🆘 Aide Rapide

### Le sitemap ne s'affiche pas ?
1. Vérifier `.htaccess` dans `dist/` : `ls dist/.htaccess`
2. Tester l'URL Supabase directe
3. Contacter le support Hostinger pour activer `mod_proxy`

### Git push échoue ?
```bash
cd dist/
git remote -v
# Ajouter le remote si nécessaire
git remote add hostinger <URL>
```

### Build échoue ?
```bash
# Vérifier que les fichiers existent
ls -la .htaccess public/robots.txt
# Si manquants, les recréer (voir HOSTINGER_QUICKSTART.md)
```

---

## 📞 Support

**Documentation complète** : 
- Quick start : `HOSTINGER_QUICKSTART.md`
- Guide détaillé : `HOSTINGER_DEPLOYMENT.md`
- Google : `GOOGLE_SITEMAP_GUIDE.md`

**Test automatisé** :
```bash
./test-sitemap.sh ittufwcrotfyklykdgwk
```

**Logs Supabase** :
- Dashboard Supabase → Edge Functions → Logs

---

## 🎉 Prochaines Étapes

1. ✅ Configuration terminée
2. 👉 Lire [`HOSTINGER_QUICKSTART.md`](./HOSTINGER_QUICKSTART.md)
3. 🚀 Déployer : `npm run deploy:hostinger`
4. 🔍 Tester : `https://luuzon.com/sitemap.xml`
5. 📊 Soumettre à Google Search Console

---

**Bon déploiement ! 🚀**

*Configuration créée le 5 avril 2026*
