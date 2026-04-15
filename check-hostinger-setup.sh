#!/bin/bash

# Script de vérification pré-déploiement pour Hostinger
# Vérifie que tous les fichiers nécessaires sont présents et valides

echo "╔════════════════════════════════════════╗"
echo "║   🔍 Vérification Pré-Déploiement     ║"
echo "╚════════════════════════════════════════╝"
echo ""

ERRORS=0
WARNINGS=0

# Couleurs
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Fonctions
error() {
    echo -e "${RED}❌ ERREUR:${NC} $1"
    ERRORS=$((ERRORS + 1))
}

warning() {
    echo -e "${YELLOW}⚠️  WARNING:${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

success() {
    echo -e "${GREEN}✅ OK:${NC} $1"
}

# 1. Vérifier les fichiers de configuration
echo "📋 1. Vérification des fichiers de configuration..."
echo ""

if [ -f ".htaccess" ]; then
    success ".htaccess trouvé"
    
    # Vérifier le contenu
    if grep -q "sitemap\.xml" .htaccess; then
        success ".htaccess contient la règle de redirection"
    else
        error ".htaccess ne contient pas la règle de redirection du sitemap"
    fi
    
    if grep -q "ittufwcrotfyklykdgwk" .htaccess; then
        success ".htaccess pointe vers le bon projet Supabase"
    else
        error ".htaccess ne contient pas l'ID du projet Supabase"
    fi
else
    error ".htaccess manquant"
fi

if [ -f "public/robots.txt" ]; then
    success "public/robots.txt trouvé"
    
    if grep -q "Sitemap:" public/robots.txt; then
        success "robots.txt contient le lien vers le sitemap"
    else
        error "robots.txt ne contient pas la ligne Sitemap:"
    fi
else
    error "public/robots.txt manquant"
fi

echo ""

# 2. Vérifier les scripts
echo "📜 2. Vérification des scripts..."
echo ""

if [ -f "deploy-hostinger.sh" ]; then
    success "deploy-hostinger.sh trouvé"
    if [ -x "deploy-hostinger.sh" ]; then
        success "deploy-hostinger.sh est exécutable"
    else
        warning "deploy-hostinger.sh n'est pas exécutable (chmod +x)"
    fi
else
    error "deploy-hostinger.sh manquant"
fi

if [ -f "build-for-hostinger.sh" ]; then
    success "build-for-hostinger.sh trouvé"
    if [ -x "build-for-hostinger.sh" ]; then
        success "build-for-hostinger.sh est exécutable"
    else
        warning "build-for-hostinger.sh n'est pas exécutable (chmod +x)"
    fi
else
    error "build-for-hostinger.sh manquant"
fi

echo ""

# 3. Vérifier package.json
echo "📦 3. Vérification de package.json..."
echo ""

if [ -f "package.json" ]; then
    success "package.json trouvé"
    
    if grep -q "build:hostinger" package.json; then
        success "Script npm 'build:hostinger' configuré"
    else
        error "Script npm 'build:hostinger' manquant"
    fi
    
    if grep -q "deploy:hostinger" package.json; then
        success "Script npm 'deploy:hostinger' configuré"
    else
        error "Script npm 'deploy:hostinger' manquant"
    fi
else
    error "package.json manquant"
fi

echo ""

# 4. Vérifier les composants React
echo "⚛️  4. Vérification des composants React..."
echo ""

if [ -f "src/app/components/SitemapRedirect.tsx" ]; then
    success "SitemapRedirect.tsx trouvé"
else
    error "src/app/components/SitemapRedirect.tsx manquant"
fi

if [ -f "src/app/App.tsx" ]; then
    success "App.tsx trouvé"
    
    if grep -q "SitemapRedirect" src/app/App.tsx; then
        success "Route /sitemap.xml configurée dans App.tsx"
    else
        error "Route /sitemap.xml manquante dans App.tsx"
    fi
else
    error "src/app/App.tsx manquant"
fi

echo ""

# 5. Vérifier l'Edge Function Supabase
echo "🔧 5. Vérification de l'Edge Function Supabase..."
echo ""

if [ -f "supabase/functions/server/index.tsx" ]; then
    success "Edge Function trouvée"
    
    if grep -q "sitemap\.xml" supabase/functions/server/index.tsx; then
        success "Route sitemap.xml configurée dans l'Edge Function"
    else
        error "Route sitemap.xml manquante dans l'Edge Function"
    fi
else
    error "supabase/functions/server/index.tsx manquant"
fi

echo ""

# 6. Vérifier la documentation
echo "📚 6. Vérification de la documentation..."
echo ""

DOCS=(
    "HOSTINGER_QUICKSTART.md"
    "HOSTINGER_DEPLOYMENT.md"
    "SITEMAP_INDEX.md"
    "GOOGLE_SITEMAP_GUIDE.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        success "$doc trouvé"
    else
        warning "$doc manquant"
    fi
done

echo ""

# 7. Test de build (optionnel)
echo "🔨 7. Test de build (optionnel)..."
echo ""

read -p "Voulez-vous tester un build maintenant ? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Building..."
    npm run build:hostinger
    
    if [ $? -eq 0 ]; then
        success "Build réussi"
        
        # Vérifier que les fichiers sont copiés dans dist/
        if [ -f "dist/.htaccess" ]; then
            success ".htaccess copié dans dist/"
        else
            error ".htaccess non copié dans dist/"
        fi
        
        if [ -f "dist/robots.txt" ]; then
            success "robots.txt copié dans dist/"
        else
            error "robots.txt non copié dans dist/"
        fi
    else
        error "Build échoué"
    fi
else
    warning "Test de build ignoré"
fi

echo ""

# 8. Vérifier la configuration git dans dist/
echo "🔗 8. Vérification de la configuration git..."
echo ""

if [ -d "dist/.git" ]; then
    success "Repository git initialisé dans dist/"
    
    cd dist/
    if git remote | grep -q "hostinger"; then
        success "Remote 'hostinger' configuré"
        REMOTE_URL=$(git remote get-url hostinger 2>/dev/null)
        echo "   URL: $REMOTE_URL"
    else
        error "Remote 'hostinger' non configuré"
        echo "   Ajoutez-le avec: cd dist/ && git remote add hostinger <URL>"
    fi
    cd ..
else
    warning "Repository git non initialisé dans dist/"
    echo "   Initialisez-le avec: cd dist/ && git init"
fi

echo ""

# Résumé
echo "╔════════════════════════════════════════╗"
echo "║            📊 RÉSUMÉ                   ║"
echo "╚════════════════════════════════════════╝"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ Parfait ! Tout est prêt pour le déploiement.${NC}"
    echo ""
    echo "Commande de déploiement :"
    echo "  npm run deploy:hostinger"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Configuration OK avec $WARNINGS warning(s).${NC}"
    echo ""
    echo "Vous pouvez déployer, mais vérifiez les warnings ci-dessus."
    echo ""
    echo "Commande de déploiement :"
    echo "  npm run deploy:hostinger"
else
    echo -e "${RED}❌ Configuration incomplète : $ERRORS erreur(s), $WARNINGS warning(s).${NC}"
    echo ""
    echo "Corrigez les erreurs avant de déployer."
    echo ""
    echo "Documentation :"
    echo "  • HOSTINGER_QUICKSTART.md"
    echo "  • HOSTINGER_DEPLOYMENT.md"
    exit 1
fi

echo ""
echo "Documentation complète : SITEMAP_INDEX.md"
echo ""
