# 🌐 Guide de Déploiement Hostinger - Sitemap

## 📋 Votre Workflow de Déploiement

```
Projet Source
    ↓
npm run build
    ↓
Dossier dist/
    ↓
Git Repository
    ↓
Hostinger (Apache)
```

---

## ✅ Configuration pour Hostinger

### Fichiers Créés pour Hostinger

1. **`/.htaccess`** - Configuration Apache
   - Redirige `/sitemap.xml` vers Supabase Edge Function
   - Configure le SPA React
   - Headers de cache optimisés
   - Compression GZIP

2. **`/build-for-hostinger.sh`** - Script de build automatisé
   - Exécute `npm run build`
   - Copie `.htaccess` dans `dist/`
   - Copie `robots.txt` dans `dist/`

3. **`/public/robots.txt`** - Déjà créé
   - Pointe vers le sitemap
   - Bloque les pages admin

---

## 🚀 Comment Déployer (3 étapes)

### Étape 1 : Build avec le Script Automatisé

```bash
# Rendre le script exécutable
chmod +x build-for-hostinger.sh

# Lancer le build
./build-for-hostinger.sh
```

Ce script va :
- ✅ Builder l'application (`npm run build`)
- ✅ Copier `.htaccess` dans `dist/`
- ✅ Copier `robots.txt` dans `dist/`
- ✅ Afficher un résumé

### Étape 2 : Déployer sur Hostinger

```bash
# Aller dans le dossier dist
cd dist/

# Vérifier que .htaccess et robots.txt sont présents
ls -la

# Initialiser git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Deploy with sitemap configuration"

# Ajouter votre remote Hostinger (première fois uniquement)
git remote add hostinger <VOTRE_URL_GIT_HOSTINGER>

# Pusher
git push hostinger main
```

### Étape 3 : Vérifier le Déploiement

Une fois déployé sur Hostinger :

1. **Tester le sitemap** :
   ```
   https://luuzon.com/sitemap.xml
   ```
   Vous devriez voir le XML avec toutes vos pages

2. **Tester le robots.txt** :
   ```
   https://luuzon.com/robots.txt
   ```
   Doit contenir `Sitemap: https://luuzon.com/sitemap.xml`

3. **Vérifier la redirection** :
   - Le sitemap vient bien de Supabase
   - Les articles de blog sont listés

---

## 🔧 Comment Fonctionne la Redirection

### Architecture avec Hostinger

```
Client
  ↓
GET https://luuzon.com/sitemap.xml
  ↓
Apache (Hostinger)
  ↓
.htaccess RewriteRule
  ↓
Proxy vers Supabase Edge Function
  ↓
https://ittufwcrotfyklykdgwk.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml
  ↓
Retourne le XML
```

### Le `.htaccess` Fait Quoi ?

```apache
RewriteRule ^sitemap\.xml$ https://ittufwcrotfyklykdgwk.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml [P,L]
```

**Explications** :
- `^sitemap\.xml$` : Capture les requêtes vers `/sitemap.xml`
- `[P]` : **Proxy** - Apache récupère le contenu depuis Supabase et le sert
- `[L]` : **Last** - Arrête le traitement des règles

**Avantage** : Le sitemap reste à jour automatiquement sans rebuild !

---

## 🛠️ Alternative : Sitemap Statique (si le proxy ne marche pas)

Si Hostinger ne permet pas le module `mod_proxy`, utilisez cette alternative :

### Créer un Script de Génération

```bash
# Créer generate-sitemap.sh
cat > generate-sitemap.sh << 'EOF'
#!/bin/bash
echo "📥 Fetching sitemap from Supabase..."
curl -s https://ittufwcrotfyklykdgwk.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml > dist/sitemap.xml
echo "✅ Sitemap saved to dist/sitemap.xml"
EOF

chmod +x generate-sitemap.sh
```

### Modifier le Workflow de Build

```bash
# Build l'application
npm run build

# Générer le sitemap statique
./generate-sitemap.sh

# Copier les fichiers
cp .htaccess dist/
cp public/robots.txt dist/

# Déployer normalement
cd dist/
git add .
git commit -m "Deploy with sitemap"
git push hostinger main
```

**⚠️ Important** : Avec cette méthode, vous devez rebuild et redéployer après chaque nouveau article publié.

---

## ✅ Checklist de Déploiement

### Avant le Premier Déploiement
- [ ] Le fichier `.htaccess` existe à la racine
- [ ] Le fichier `public/robots.txt` existe
- [ ] Le script `build-for-hostinger.sh` est exécutable

### Pour Chaque Déploiement
- [ ] Exécuter `./build-for-hostinger.sh`
- [ ] Vérifier que `.htaccess` est dans `dist/`
- [ ] Vérifier que `robots.txt` est dans `dist/`
- [ ] Commiter et pusher le dossier `dist/`
- [ ] Attendre le déploiement Hostinger (1-2 min)
- [ ] Tester `https://luuzon.com/sitemap.xml`

### Après le Premier Déploiement
- [ ] Vérifier que le sitemap s'affiche correctement
- [ ] Vérifier que les articles de blog sont listés
- [ ] Soumettre à Google Search Console
- [ ] Attendre 24-48h pour l'indexation

---

## 🧪 Tests

### Test 1 : Vérifier .htaccess
```bash
cd dist/
ls -la | grep htaccess
```
✅ Doit afficher `.htaccess`

### Test 2 : Vérifier robots.txt
```bash
cat dist/robots.txt
```
✅ Doit contenir `Sitemap: https://luuzon.com/sitemap.xml`

### Test 3 : Tester en production
```bash
curl -I https://luuzon.com/sitemap.xml
```
✅ Doit retourner HTTP 200

### Test 4 : Vérifier le contenu
```bash
curl https://luuzon.com/sitemap.xml | head -20
```
✅ Doit afficher du XML valide avec vos URLs

---

## 🔍 Dépannage

### Problème : Le sitemap ne s'affiche pas (404)

**Cause** : `.htaccess` n'est pas dans `dist/` ou Hostinger ne le lit pas

**Solutions** :
1. Vérifier que `.htaccess` est bien dans `dist/` :
   ```bash
   ls -la dist/.htaccess
   ```

2. Vérifier dans le panneau Hostinger que `.htaccess` est activé

3. Si Hostinger n'autorise pas `.htaccess`, utiliser la méthode du sitemap statique

### Problème : Le sitemap affiche une page HTML

**Cause** : La redirection SPA React capture la requête

**Solution** : Vérifier l'ordre des règles dans `.htaccess`. La règle du sitemap doit être AVANT la règle SPA :
```apache
# SITEMAP EN PREMIER
RewriteRule ^sitemap\.xml$ ... [P,L]

# SPA APRÈS
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . /index.html [L]
```

### Problème : Erreur 500 (Internal Server Error)

**Cause** : Module `mod_proxy` non activé sur Hostinger

**Solutions** :
1. Contacter le support Hostinger pour activer `mod_proxy`
2. OU utiliser la méthode du sitemap statique (voir section Alternative)

### Problème : Le sitemap ne se met pas à jour

**Avec proxy** : Normal, le cache est de 1h. Attendez ou videz le cache Hostinger.

**Avec sitemap statique** : Vous devez rebuild et redéployer après chaque publication d'article.

---

## 📦 Structure Finale du Dossier dist/

```
dist/
├── .htaccess          ✅ Configuration Apache
├── robots.txt         ✅ Instructions pour crawlers
├── index.html         ✅ Application React
├── assets/            ✅ CSS, JS, images
│   ├── index-abc123.js
│   ├── index-def456.css
│   └── ...
└── [autres fichiers build]
```

---

## 🎯 Commandes Rapides

### Build complet automatisé
```bash
./build-for-hostinger.sh
```

### Build + Déploiement Hostinger
```bash
# Build
./build-for-hostinger.sh

# Déployer
cd dist/
git add .
git commit -m "Deploy $(date +%Y-%m-%d)"
git push hostinger main
cd ..
```

### Créer un alias pour simplifier
Ajoutez dans votre `~/.bashrc` ou `~/.zshrc` :
```bash
alias deploy-luuzon='./build-for-hostinger.sh && cd dist/ && git add . && git commit -m "Deploy $(date +%Y-%m-%d)" && git push hostinger main && cd ..'
```

Ensuite, déployez en une seule commande :
```bash
deploy-luuzon
```

---

## 📊 Workflow Complet Recommandé

### Développement
```bash
# Développer normalement
npm run dev

# Tester localement
```

### Publication d'un Article
```bash
# Publier l'article via le CMS admin
# (pas besoin de redéployer si vous utilisez le proxy .htaccess)
```

### Déploiement de Nouvelles Fonctionnalités
```bash
# Build pour Hostinger
./build-for-hostinger.sh

# Vérifier
cd dist/
ls -la .htaccess robots.txt

# Déployer
git add .
git commit -m "Feature: nouvelle fonctionnalité"
git push hostinger main
cd ..

# Tester en production
curl https://luuzon.com/sitemap.xml
```

---

## 🚀 Prochaines Étapes

1. **Maintenant** : Exécuter `./build-for-hostinger.sh`
2. **Ensuite** : Déployer le dossier `dist/` sur Hostinger
3. **Vérifier** : Visiter `https://luuzon.com/sitemap.xml`
4. **Soumettre** : Google Search Console

**Votre sitemap sera automatiquement à jour grâce au proxy Apache ! 🎉**

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifier que `.htaccess` est dans `dist/`
2. Vérifier les logs Apache dans le panneau Hostinger
3. Contacter le support Hostinger si `mod_proxy` n'est pas activé
4. Utiliser la méthode du sitemap statique en alternative

---

**Configuration Hostinger terminée ! 🌐**
