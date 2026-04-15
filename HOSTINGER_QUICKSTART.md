# 🚀 Déploiement Hostinger - Guide Express

## ⚡ La Commande Magique (Recommandée)

```bash
npm run deploy:hostinger
```

✅ **Cette seule commande fait TOUT** :
- Build l'application
- Copie `.htaccess` et `robots.txt`
- Commit dans git
- Push vers Hostinger

---

## 📋 Configuration Initiale (Une seule fois)

### 1. Première fois uniquement - Ajouter le remote git

```bash
cd dist/
git init
git remote add hostinger <VOTRE_URL_GIT_HOSTINGER>
cd ..
```

**Où trouver l'URL git Hostinger ?**
- Connectez-vous à votre panneau Hostinger
- Section "Git" ou "Déploiement"
- Copiez l'URL du type : `https://git.hostinger.com/username/repo.git`

### 2. Rendre les scripts exécutables

```bash
chmod +x build-for-hostinger.sh
chmod +x deploy-hostinger.sh
chmod +x test-sitemap.sh
```

---

## 🎯 Workflows de Déploiement

### Option 1 : Déploiement Automatique (⭐ Recommandé)

```bash
npm run deploy:hostinger "Ajout du sitemap dynamique"
```

### Option 2 : Déploiement Manuel

```bash
# 1. Build
npm run build:hostinger

# 2. Déployer
cd dist/
git add .
git commit -m "Deploy $(date +%Y-%m-%d)"
git push hostinger main
cd ..
```

### Option 3 : Script Bash

```bash
./deploy-hostinger.sh "Mon message de commit"
```

---

## ✅ Après le Premier Déploiement

### 1. Tester le Sitemap (2 minutes après le déploiement)

```bash
curl https://luuzon.com/sitemap.xml
```

Vous devriez voir du XML avec toutes vos pages.

### 2. Vérifier robots.txt

```bash
curl https://luuzon.com/robots.txt
```

Doit contenir : `Sitemap: https://luuzon.com/sitemap.xml`

### 3. Soumettre à Google

1. Allez sur [Google Search Console](https://search.google.com/search-console)
2. Ajoutez `luuzon.com` et vérifiez-le
3. Menu "Sitemaps" → Soumettre `sitemap.xml`

---

## 🔧 Structure du Déploiement

```
Votre Projet
    ↓
npm run deploy:hostinger
    ↓
┌─────────────────────────────┐
│ 1. Build (vite build)       │
│ 2. Copy .htaccess           │
│ 3. Copy robots.txt          │
│ 4. Git commit               │
│ 5. Git push hostinger       │
└─────────────────────────────┘
    ↓
Hostinger déploie
    ↓
https://luuzon.com/sitemap.xml ✅
```

---

## 📦 Ce qui est Déployé

Dans le dossier `dist/` qui va sur Hostinger :

```
dist/
├── .htaccess          ← Redirige /sitemap.xml vers Supabase
├── robots.txt         ← Instructions pour Google
├── index.html         ← Votre application React
└── assets/            ← CSS, JS, images
```

---

## 🎨 Commandes NPM Disponibles

```bash
# Build normal
npm run build

# Build pour Hostinger (avec .htaccess + robots.txt)
npm run build:hostinger

# Déploiement complet automatisé
npm run deploy:hostinger

# Avec message de commit personnalisé
npm run deploy:hostinger "Mon super message"
```

---

## ⚠️ Important : Le .htaccess

Le fichier `.htaccess` fait la redirection magique :

```apache
# Quand quelqu'un visite /sitemap.xml
RewriteRule ^sitemap\.xml$ https://ittufwcrotfyklykdgwk.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml [P,L]
```

**Avantages** :
- ✅ Le sitemap se met à jour automatiquement
- ✅ Pas besoin de rebuild quand vous publiez un article
- ✅ Toujours synchronisé avec Supabase

**Si ça ne marche pas** :
- Hostinger n'autorise peut-être pas `mod_proxy`
- Contactez le support Hostinger pour l'activer
- OU utilisez le sitemap statique (voir `/HOSTINGER_DEPLOYMENT.md`)

---

## 🧪 Tests

### Test Rapide Avant Déploiement

```bash
# Vérifier que les fichiers seront copiés
npm run build:hostinger
ls -la dist/.htaccess dist/robots.txt
```

### Test Après Déploiement

```bash
# Tester avec le script automatisé
./test-sitemap.sh ittufwcrotfyklykdgwk
```

---

## 🚨 Dépannage Rapide

### Problème : `command not found: npm run deploy:hostinger`
**Solution** : 
```bash
chmod +x deploy-hostinger.sh
```

### Problème : Le sitemap affiche du HTML au lieu de XML
**Solution** : Vérifier que `.htaccess` est dans `dist/`
```bash
ls -la dist/.htaccess
```

### Problème : 404 sur /sitemap.xml
**Causes possibles** :
1. `.htaccess` pas copié → Rebuild avec `npm run build:hostinger`
2. Hostinger ne lit pas `.htaccess` → Contacter le support
3. Module `mod_proxy` désactivé → Demander l'activation

### Problème : Git push échoue
**Solution** : Vérifier le remote
```bash
cd dist/
git remote -v
# Si pas de remote "hostinger", l'ajouter :
git remote add hostinger <VOTRE_URL_GIT_HOSTINGER>
cd ..
```

---

## 📚 Documentation Complète

Pour plus de détails, consultez :
- **Guide Hostinger complet** : `/HOSTINGER_DEPLOYMENT.md`
- **Guide Google Search Console** : `/GOOGLE_SITEMAP_GUIDE.md`
- **Documentation technique** : `/SITEMAP_CONFIGURATION.md`

---

## 💡 Astuces Pro

### Créer un Alias pour Aller Plus Vite

Ajoutez dans votre `~/.bashrc` ou `~/.zshrc` :

```bash
alias deploy='npm run deploy:hostinger'
```

Puis déployez en tapant simplement :
```bash
deploy "Mon message"
```

### Automatiser avec un Hook Git

Créez `.git/hooks/pre-commit` :
```bash
#!/bin/bash
npm run build:hostinger
```

---

## ✅ Checklist de Premier Déploiement

- [ ] Remote git hostinger configuré
- [ ] Scripts rendus exécutables (`chmod +x`)
- [ ] Build test réussi (`npm run build:hostinger`)
- [ ] `.htaccess` présent dans `dist/`
- [ ] `robots.txt` présent dans `dist/`
- [ ] Premier déploiement fait (`npm run deploy:hostinger`)
- [ ] Sitemap accessible sur `https://luuzon.com/sitemap.xml`
- [ ] Soumis à Google Search Console

---

**Prêt à déployer ! 🚀**

Commande unique : `npm run deploy:hostinger`
