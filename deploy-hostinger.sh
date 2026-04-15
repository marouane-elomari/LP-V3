#!/bin/bash

# Script de déploiement complet pour Hostinger
# Usage: ./deploy-hostinger.sh [message]

set -e  # Exit on error

echo "╔════════════════════════════════════════╗"
echo "║   🚀 Déploiement Luuzon sur Hostinger  ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Message de commit (optionnel)
COMMIT_MESSAGE="${1:-Deploy $(date +%Y-%m-%d\ %H:%M)}"

# Étape 1 : Build
echo "📦 Étape 1/5 : Building application..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Erreur : Le dossier dist/ n'a pas été créé"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Étape 2 : Copier les fichiers de configuration
echo "📋 Étape 2/5 : Copying configuration files..."

# .htaccess
if [ -f ".htaccess" ]; then
    cp .htaccess dist/.htaccess
    echo "   ✅ .htaccess copied"
else
    echo "   ⚠️  .htaccess not found - creating from template..."
    cat > dist/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^sitemap\.xml$ https://ittufwcrotfyklykdgwk.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml [P,L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
EOF
    echo "   ✅ .htaccess created"
fi

# robots.txt
if [ -f "public/robots.txt" ]; then
    cp public/robots.txt dist/robots.txt
    echo "   ✅ robots.txt copied"
else
    echo "   ⚠️  robots.txt not found - creating..."
    cat > dist/robots.txt << 'EOF'
User-agent: *
Allow: /
Sitemap: https://luuzon.com/sitemap.xml
Disallow: /*/admin/
Disallow: /*/login
EOF
    echo "   ✅ robots.txt created"
fi

echo ""

# Étape 3 : Vérification
echo "🔍 Étape 3/5 : Verification..."
cd dist/

if [ -f ".htaccess" ] && [ -f "robots.txt" ] && [ -f "index.html" ]; then
    echo "   ✅ All required files present"
else
    echo "   ❌ Missing required files"
    exit 1
fi

echo ""

# Étape 4 : Git operations
echo "📤 Étape 4/5 : Git operations..."

# Initialiser git si nécessaire
if [ ! -d ".git" ]; then
    echo "   🔧 Initializing git repository..."
    git init
    echo "   ⚠️  Don't forget to add your Hostinger remote:"
    echo "      git remote add hostinger <YOUR_HOSTINGER_GIT_URL>"
    echo ""
    read -p "   Press Enter to continue or Ctrl+C to abort..."
fi

# Ajouter les fichiers
echo "   📝 Adding files..."
git add .

# Commit
echo "   💾 Committing..."
git commit -m "$COMMIT_MESSAGE"

echo "   ✅ Git operations complete"
echo ""

# Étape 5 : Push
echo "🚀 Étape 5/5 : Pushing to Hostinger..."

# Vérifier si le remote existe
if git remote | grep -q "hostinger"; then
    echo "   📡 Pushing to hostinger remote..."
    git push hostinger main || git push hostinger master
    echo "   ✅ Deployment complete!"
else
    echo "   ⚠️  No 'hostinger' remote found"
    echo "   Please add it with:"
    echo "      cd dist/"
    echo "      git remote add hostinger <YOUR_HOSTINGER_GIT_URL>"
    echo "      git push hostinger main"
    exit 1
fi

cd ..

echo ""
echo "╔════════════════════════════════════════╗"
echo "║           ✅ DEPLOYMENT SUCCESS        ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "🎯 Next steps:"
echo "   1. Wait 1-2 minutes for Hostinger to deploy"
echo "   2. Test: https://luuzon.com/sitemap.xml"
echo "   3. Verify: https://luuzon.com/robots.txt"
echo "   4. Submit to Google Search Console"
echo ""
echo "📊 Deployment summary:"
echo "   • Build: ✅"
echo "   • Configuration: ✅"
echo "   • Git commit: ✅"
echo "   • Push: ✅"
echo ""
echo "🔗 Useful links:"
echo "   • Sitemap: https://luuzon.com/sitemap.xml"
echo "   • Robots: https://luuzon.com/robots.txt"
echo "   • Site: https://luuzon.com"
echo ""
