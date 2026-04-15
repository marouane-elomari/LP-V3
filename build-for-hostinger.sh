#!/bin/bash

# Script de build pour Hostinger
# Copie les fichiers nécessaires dans dist/ après le build

echo "🔨 Building application..."
npm run build

echo ""
echo "📦 Copying configuration files to dist/..."

# Copier .htaccess dans dist/
if [ -f ".htaccess" ]; then
    cp .htaccess dist/.htaccess
    echo "✅ .htaccess copied"
else
    echo "⚠️  .htaccess not found"
fi

# Copier robots.txt dans dist/
if [ -f "public/robots.txt" ]; then
    cp public/robots.txt dist/robots.txt
    echo "✅ robots.txt copied"
else
    echo "⚠️  robots.txt not found"
fi

echo ""
echo "✅ Build complete! The dist/ folder is ready for deployment."
echo ""
echo "📂 Contents of dist/:"
ls -lh dist/ | head -10

echo ""
echo "🚀 Next steps:"
echo "   1. Add the dist/ folder to your git repository"
echo "   2. Push to your Hostinger-linked git"
echo "   3. Verify https://luuzon.com/sitemap.xml"
echo "   4. Submit to Google Search Console"
