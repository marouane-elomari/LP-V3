#!/bin/bash

# Script de test du sitemap Luuzon
# Usage: ./test-sitemap.sh [VOTRE_PROJECT_ID]

echo "🧪 Test du Sitemap Luuzon"
echo "=========================="
echo ""

PROJECT_ID="${1:-YOUR_PROJECT_ID}"

if [ "$PROJECT_ID" = "YOUR_PROJECT_ID" ]; then
    echo "⚠️  Usage: ./test-sitemap.sh [VOTRE_PROJECT_ID]"
    echo ""
    echo "Exemple: ./test-sitemap.sh abcdefghijklmno"
    echo ""
    exit 1
fi

SITEMAP_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-cfc3b146/sitemap.xml"

echo "📍 Test de l'URL Supabase:"
echo "   $SITEMAP_URL"
echo ""

# Test 1: Vérifier que le sitemap est accessible
echo "1️⃣  Test d'accessibilité..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITEMAP_URL")

if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Sitemap accessible (HTTP $HTTP_CODE)"
else
    echo "   ❌ Erreur HTTP $HTTP_CODE"
    exit 1
fi

# Test 2: Vérifier que c'est du XML
echo ""
echo "2️⃣  Test du format XML..."
CONTENT=$(curl -s "$SITEMAP_URL" | head -n 1)

if [[ "$CONTENT" == *"<?xml"* ]]; then
    echo "   ✅ Format XML valide"
else
    echo "   ❌ Le contenu n'est pas du XML"
    echo "   Contenu reçu: $CONTENT"
    exit 1
fi

# Test 3: Compter les URLs
echo ""
echo "3️⃣  Analyse du contenu..."
URL_COUNT=$(curl -s "$SITEMAP_URL" | grep -c "<loc>")
echo "   📊 Nombre d'URLs trouvées: $URL_COUNT"

if [ "$URL_COUNT" -gt 0 ]; then
    echo "   ✅ Le sitemap contient des URLs"
else
    echo "   ⚠️  Aucune URL trouvée"
fi

# Test 4: Vérifier la présence des pages principales
echo ""
echo "4️⃣  Vérification des pages principales..."
SITEMAP_CONTENT=$(curl -s "$SITEMAP_URL")

if [[ "$SITEMAP_CONTENT" == *"luuzon.com/fr"* ]]; then
    echo "   ✅ Page FR trouvée"
else
    echo "   ⚠️  Page FR non trouvée"
fi

if [[ "$SITEMAP_CONTENT" == *"luuzon.com/en"* ]]; then
    echo "   ✅ Page EN trouvée"
else
    echo "   ⚠️  Page EN non trouvée"
fi

if [[ "$SITEMAP_CONTENT" == *"/blog/"* ]]; then
    echo "   ✅ Articles de blog trouvés"
else
    echo "   ⚠️  Aucun article de blog trouvé"
fi

# Test 5: Vérifier le robots.txt (si accessible)
echo ""
echo "5️⃣  Test du robots.txt (production)..."
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://luuzon.com/robots.txt")

if [ "$ROBOTS_CODE" = "200" ]; then
    echo "   ✅ robots.txt accessible"
    ROBOTS_CONTENT=$(curl -s "https://luuzon.com/robots.txt")
    if [[ "$ROBOTS_CONTENT" == *"Sitemap:"* ]]; then
        echo "   ✅ robots.txt contient le lien vers le sitemap"
    else
        echo "   ⚠️  robots.txt ne contient pas de lien vers le sitemap"
    fi
else
    echo "   ⚠️  robots.txt non accessible (HTTP $ROBOTS_CODE)"
    echo "      Normal si le site n'est pas encore en production"
fi

# Résumé
echo ""
echo "=========================="
echo "📋 Résumé"
echo "=========================="
echo ""
echo "✅ Sitemap fonctionnel"
echo "📊 $URL_COUNT URLs dans le sitemap"
echo ""
echo "🔗 URL du sitemap:"
echo "   $SITEMAP_URL"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Configurez la redirection dans vercel.json ou netlify.toml"
echo "   2. Déployez en production"
echo "   3. Testez https://luuzon.com/sitemap.xml"
echo "   4. Soumettez à Google Search Console"
echo ""
echo "🚀 Bonne indexation !"
