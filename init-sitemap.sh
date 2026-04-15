#!/bin/bash

# Script d'initialisation pour la première installation
# À exécuter UNE SEULE FOIS après avoir cloné le projet

echo "🚀 Initialisation du Projet Luuzon - Sitemap"
echo "=============================================="
echo ""

# 1. Rendre les scripts exécutables
echo "1️⃣  Rendant les scripts exécutables..."
chmod +x build-for-hostinger.sh
chmod +x deploy-hostinger.sh
chmod +x check-hostinger-setup.sh
chmod +x test-sitemap.sh
echo "   ✅ Scripts rendus exécutables"
echo ""

# 2. Vérifier la configuration
echo "2️⃣  Vérification de la configuration..."
./check-hostinger-setup.sh

echo ""
echo "=============================================="
echo "✅ Initialisation terminée !"
echo ""
echo "📋 Prochaines étapes :"
echo ""
echo "1. Configurer le remote git Hostinger :"
echo "   cd dist/"
echo "   git init"
echo "   git remote add hostinger <VOTRE_URL_GIT_HOSTINGER>"
echo "   cd .."
echo ""
echo "2. Déployer :"
echo "   npm run deploy:hostinger"
echo ""
echo "3. Tester :"
echo "   https://luuzon.com/sitemap.xml"
echo ""
echo "📚 Documentation complète : SITEMAP_INDEX.md"
echo ""
