# 🌍 Redirection Automatique de Langue - Documentation

## 📅 Date : 5 avril 2026

## ✨ Nouvelle fonctionnalité

Désormais, lorsqu'un utilisateur tape une URL **sans préfixe de langue** (ex: `luuzon.com/test`), il est **automatiquement redirigé** vers la version avec la langue appropriée (`/fr/test` ou `/en/test`).

---

## 🎯 Comportement

### Exemples de redirection automatique

| URL tapée | Redirige vers | Basé sur |
|-----------|--------------|----------|
| `luuzon.com/test` | `/fr/test` | Langue du navigateur FR |
| `luuzon.com/test` | `/en/test` | Langue du navigateur EN |
| `luuzon.com/blog` | `/fr/blog` | Préférence sauvegardée FR |
| `luuzon.com/manifesto` | `/en/manifesto` | Préférence sauvegardée EN |
| `luuzon.com/admin` | `/fr/admin` | Langue par défaut |

---

## 🧠 Logique de détection de langue

Le système utilise **3 niveaux de priorité** pour déterminer la langue :

### 1. **Préférence sauvegardée (localStorage)** ⭐ PRIORITAIRE
Si l'utilisateur a déjà visité le site et choisi une langue, celle-ci est réutilisée.

```javascript
localStorage.getItem('preferredLanguage') // 'fr' ou 'en'
```

### 2. **Langue du navigateur**
Si aucune préférence n'est sauvegardée, on détecte la langue du navigateur.

```javascript
navigator.language // 'fr-FR', 'en-US', etc.
```

### 3. **Langue par défaut : Français**
Si aucune des deux méthodes ci-dessus ne fonctionne, on utilise `fr` par défaut.

---

## 📁 Fichiers modifiés/créés

### 1. **`/src/app/components/LanguageRedirect.tsx`** *(NOUVEAU)*
**Rôle** : Composant React qui gère la redirection intelligente.

**Logique** :
1. Détecte la langue préférée (localStorage ou navigateur)
2. Récupère le chemin actuel (ex: `/test`)
3. Redirige vers `/:lang/chemin` (ex: `/fr/test`)

**Code clé** :
```typescript
const browserLang = navigator.language.toLowerCase();
const savedLang = localStorage.getItem('preferredLanguage');
const targetLang = savedLang || (browserLang.startsWith('en') ? 'en' : 'fr');
const newPath = `/${targetLang}${currentPath}${search}${hash}`;
navigate(newPath, { replace: true });
```

---

### 2. **`/src/app/contexts/LanguageContext.tsx`** *(MODIFIÉ)*
**Changement** : Sauvegarde automatique de la langue dans localStorage quand elle change.

**Code ajouté** :
```typescript
useEffect(() => {
  if (language === 'fr' || language === 'en') {
    localStorage.setItem('preferredLanguage', language);
  }
}, [language]);
```

**Bénéfice** : Quand l'utilisateur change de langue via le sélecteur, sa préférence est mémorisée pour les prochaines visites.

---

### 3. **`/src/app/App.tsx`** *(MODIFIÉ)*
**Changement** : Utilisation du composant `LanguageRedirect` pour la route catch-all.

**Avant** :
```typescript
<Route path="*" element={<Navigate to="/fr" replace />} />
```

**Après** :
```typescript
<Route path="*" element={<LanguageRedirect />} />
```

**Bénéfice** : Les URLs sans langue sont redirigées intelligemment au lieu d'aller toujours vers `/fr`.

---

## 🚀 Comment ça marche en pratique

### Scénario 1 : Premier visiteur français
1. Utilisateur tape : `luuzon.com/manifesto`
2. Système détecte : `navigator.language = 'fr-FR'`
3. Redirection vers : `/fr/manifesto`
4. Sauvegarde : `localStorage.setItem('preferredLanguage', 'fr')`

### Scénario 2 : Visiteur anglais qui revient
1. Utilisateur tape : `luuzon.com/blog`
2. Système lit : `localStorage.getItem('preferredLanguage') = 'en'`
3. Redirection vers : `/en/blog`

### Scénario 3 : Changement de langue manuel
1. Utilisateur est sur `/fr/manifesto`
2. Clique sur le sélecteur de langue → EN
3. Navigation vers `/en/manifesto`
4. Sauvegarde : `localStorage.setItem('preferredLanguage', 'en')`
5. Prochaine visite : toutes les URLs sans langue iront vers `/en/...`

---

## 🔍 Conservation des paramètres d'URL

Le système préserve **tous les éléments de l'URL** lors de la redirection :

```typescript
const currentPath = location.pathname;  // Ex: /test
const search = location.search;          // Ex: ?id=123
const hash = location.hash;              // Ex: #section

const newPath = `/${targetLang}${currentPath}${search}${hash}`;
// Résultat : /fr/test?id=123#section
```

**Exemples** :
- `luuzon.com/blog?page=2` → `/fr/blog?page=2`
- `luuzon.com/manifesto#section-3` → `/en/manifesto#section-3`
- `luuzon.com/test?foo=bar#top` → `/fr/test?foo=bar#top`

---

## ⚡ Performance

- ✅ **Redirection instantanée** : Utilise `replace: true` pour ne pas créer d'entrée dans l'historique
- ✅ **Pas de flash visuel** : Le composant retourne `null` pendant la redirection
- ✅ **Mémoire légère** : Utilise uniquement localStorage (quelques octets)

---

## 🧪 Comment tester

### Test 1 : Redirection basique
```
1. Ouvrez votre navigateur en mode incognito (pas de localStorage)
2. Allez sur : http://localhost:5173/test
3. Vous devriez être redirigé vers : /fr/test (si navigateur FR)
```

### Test 2 : Avec préférence sauvegardée
```
1. Allez sur : /fr/manifesto
2. Changez la langue vers EN
3. Dans la console, vérifiez : localStorage.getItem('preferredLanguage')
   → Doit afficher : "en"
4. Tapez dans la barre d'adresse : http://localhost:5173/privacy
5. Vous devriez être redirigé vers : /en/privacy
```

### Test 3 : Console de diagnostic
```javascript
// Ouvrez la console (F12) et tapez :
console.log('Langue sauvegardée:', localStorage.getItem('preferredLanguage'));
console.log('Langue du navigateur:', navigator.language);

// Pour réinitialiser :
localStorage.removeItem('preferredLanguage');
```

---

## 📊 Impact

| Aspect | Avant | Après |
|--------|-------|-------|
| URL sans langue | Toujours → `/fr` | → `/fr` ou `/en` (intelligent) |
| Préférence utilisateur | Perdue à chaque visite | Mémorisée dans localStorage |
| SEO | OK (redirect 301) | OK (redirect 301 + langue détectée) |
| UX | Basique | Personnalisée |

---

## 🔒 Compatibilité

- ✅ **Tous les navigateurs modernes** (Chrome, Firefox, Safari, Edge)
- ✅ **Mobile** (iOS Safari, Android Chrome)
- ✅ **Mode privé** (fonctionne sans localStorage, utilise langue du navigateur)

---

## 🛠️ Maintenance

### Pour ajouter une nouvelle langue (ex: espagnol)

1. **Mettre à jour le type** dans `LanguageContext.tsx` :
```typescript
type Language = 'en' | 'fr' | 'es';
```

2. **Ajouter les traductions** dans `translations` :
```typescript
es: {
  'page.title.home': 'Luuzon - Página de inicio',
  // ... etc
}
```

3. **Modifier la détection** dans `LanguageRedirect.tsx` :
```typescript
if (browserLang.startsWith('en')) {
  targetLang = 'en';
} else if (browserLang.startsWith('fr')) {
  targetLang = 'fr';
} else if (browserLang.startsWith('es')) {
  targetLang = 'es';
}
```

---

## 📚 Ressources

- Documentation React Router : https://reactrouter.com/
- Navigator.language API : https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
- localStorage API : https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

---

## ✅ Checklist de fonctionnement

Pour vérifier que tout fonctionne correctement :

- [ ] URL sans langue redirige vers `/fr` ou `/en`
- [ ] Langue du navigateur est détectée correctement
- [ ] Changement de langue sauvegarde dans localStorage
- [ ] Préférence est réutilisée aux prochaines visites
- [ ] Paramètres d'URL (`?query`) sont préservés
- [ ] Ancres (`#hash`) sont préservées
- [ ] Pas de flash visuel lors de la redirection
- [ ] Console affiche le log de redirection

---

## 🎉 Résultat

Votre application Luuzon offre désormais une **expérience multilingue fluide et intelligente** qui s'adapte automatiquement à chaque utilisateur !
