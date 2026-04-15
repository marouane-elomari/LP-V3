#!/bin/bash

# Assistant de configuration du remote git Hostinger
# Simplifie la configuration initiale

echo "╔════════════════════════════════════════╗"
echo "║   🔗 Configuration Git Hostinger       ║"
echo "╚════════════════════════════════════════╝"
echo ""

echo "📋 Ce script va vous aider à configurer le remote git pour Hostinger."
echo ""

# Vérifier si dist/ existe
if [ ! -d "dist" ]; then
    echo "⚠️  Le dossier dist/ n'existe pas encore."
    echo "   Exécutez d'abord: npm run build:hostinger"
    exit 1
fi

cd dist/

# Vérifier si git est déjà initialisé
if [ -d ".git" ]; then
    echo "✅ Git déjà initialisé dans dist/"
    
    # Vérifier si le remote existe
    if git remote | grep -q "hostinger"; then
        CURRENT_URL=$(git remote get-url hostinger)
        echo "✅ Remote 'hostinger' déjà configuré:"
        echo "   $CURRENT_URL"
        echo ""
        read -p "Voulez-vous le modifier? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Configuration conservée. Bye!"
            cd ..
            exit 0
        fi
        git remote remove hostinger
    fi
else
    echo "🔧 Initialisation du repository git..."
    git init
    echo "✅ Git initialisé"
    echo ""
fi

# Demander l'URL
echo "📝 Configuration du remote Hostinger"
echo ""
echo "Où trouver votre URL git Hostinger:"
echo "  1. Connectez-vous à votre panneau Hostinger"
echo "  2. Allez dans la section 'Git' ou 'Deployment'"
echo "  3. Copiez l'URL du repository"
echo ""
echo "Format attendu:"
echo "  • https://git.hostinger.com/username/repo.git"
echo "  • git@git.hostinger.com:username/repo.git"
echo ""

read -p "Entrez l'URL du repository Hostinger: " GIT_URL

if [ -z "$GIT_URL" ]; then
    echo "❌ URL vide. Annulation."
    cd ..
    exit 1
fi

# Ajouter le remote
git remote add hostinger "$GIT_URL"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Remote 'hostinger' configuré avec succès!"
    echo ""
    echo "Configuration:"
    echo "  Remote: hostinger"
    echo "  URL: $GIT_URL"
    echo ""
    
    # Tester la connexion
    read -p "Voulez-vous tester la connexion? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "🔍 Test de connexion..."
        git ls-remote hostinger > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            echo "✅ Connexion réussie!"
        else
            echo "⚠️  Connexion échouée. Vérifiez:"
            echo "   • L'URL est correcte"
            echo "   • Vos identifiants git sont configurés"
            echo "   • Le repository existe sur Hostinger"
        fi
    fi
    
    cd ..
    
    echo ""
    echo "╔════════════════════════════════════════╗"
    echo "║       🎉 Configuration Terminée !      ║"
    echo "╚════════════════════════════════════════╝"
    echo ""
    echo "Vous pouvez maintenant déployer avec:"
    echo "  npm run deploy:hostinger"
    echo ""
else
    echo "❌ Erreur lors de la configuration du remote"
    cd ..
    exit 1
fi
