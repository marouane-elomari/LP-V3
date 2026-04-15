# 🔧 Correctifs Supabase - Problème d'accès refusé

## 📅 Date : 5 avril 2026

## 🐛 Problème corrigé
**Symptôme** : Après avoir configuré Supabase, créé le premier admin et tenté de se connecter, l'utilisateur obtient "Accès refusé" et est redirigé vers la page d'accueil.

**Cause racine** : Les politiques RLS (Row Level Security) sur la table `user_profiles` créaient une **dépendance circulaire**. Le système tentait de vérifier le rôle admin en interrogeant `user_profiles`, mais les politiques bloquaient cette lecture.

---

## ✅ Fichiers modifiés

### 1. `/SUPABASE_SETUP.md`
**Changement** : Correction des politiques RLS pour `user_profiles`

**Avant** :
```sql
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles  -- ❌ Dépendance circulaire
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

**Après** :
```sql
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'  -- ✅ Sous-requête simple
  );
```

---

### 2. `/src/app/contexts/AuthContext.tsx`
**Changement** : Ajout de logs détaillés pour diagnostiquer les erreurs de chargement de profil

**Améliorations** :
- ✅ Détection spécifique des erreurs RLS (codes `PGRST116` et `42501`)
- ✅ Messages d'erreur explicites dans la console
- ✅ Guide de dépannage pointant vers `SUPABASE_SETUP.md`
- ✅ Log de succès quand le profil est chargé correctement

**Code ajouté** :
```typescript
if (error.code === 'PGRST116' || error.code === '42501') {
  console.error('RLS Policy Error: User cannot read their own profile. Check your Supabase policies.');
}
console.error('1. The user_profiles table does not exist');
console.error('2. The RLS policies are blocking access');
console.error('3. The user was not added to user_profiles table');
```

---

### 3. `/src/app/components/AdminDashboard.tsx`
**Changement** : Vérification robuste du chargement du profil avant l'accès au dashboard

**Améliorations** :
- ✅ Ajout de la propriété `loading: authLoading` depuis `useAuth()`
- ✅ Attente que l'authentification soit chargée avant de vérifier les permissions
- ✅ Alerte explicite si le profil n'est pas chargé avec référence au fichier de config
- ✅ Redirection sécurisée vers la page d'accueil en cas d'erreur

**Code ajouté** :
```typescript
const { user, profile, signOut, isAdmin, isEditor, loading: authLoading } = useAuth();

if (authLoading) return;  // ← Nouveau

if (!profile) {  // ← Nouveau
  console.error('User profile not loaded. Cannot determine permissions.');
  alert(t('cms.admin.profileError'));
  navigate(`/${lang}`);
  return;
}
```

---

### 4. `/src/app/contexts/LanguageContext.tsx`
**Changement** : Ajout de nouvelles traductions pour les messages d'erreur

**Traductions ajoutées** :

**Anglais** :
```typescript
'cms.admin.profileError': 'Error: User profile could not be loaded. Please check your Supabase configuration (RLS policies). See SUPABASE_FIX_RLS.md for help.'
```

**Français** :
```typescript
'cms.admin.profileError': 'Erreur : Le profil utilisateur n\'a pas pu être chargé. Vérifiez votre configuration Supabase (politiques RLS). Consultez SUPABASE_FIX_RLS.md pour de l\'aide.'
```

---

### 5. `/SUPABASE_FIX_RLS.md` *(NOUVEAU)*
**Type** : Documentation complète de dépannage

**Contenu** :
- ✅ Explication du symptôme et de la cause
- ✅ Solution SQL complète (copier-coller ready)
- ✅ Étapes de diagnostic et de vérification
- ✅ Commandes de test SQL
- ✅ Checklist complète de configuration
- ✅ Section de dépannage avancé
- ✅ Explication technique de la dépendance circulaire

---

### 6. `/CHANGELOG_SUPABASE_FIX.md` *(CE FICHIER)*
**Type** : Documentation des changements

---

## 🚀 Instructions pour l'utilisateur

### Étape 1 : Appliquer le correctif SQL
1. Ouvrez **Supabase SQL Editor**
2. Copiez le contenu de la section "Solution complète" dans `/SUPABASE_FIX_RLS.md`
3. Exécutez les commandes SQL une par une

### Étape 2 : Vérifier votre rôle admin
```sql
-- Dans Supabase SQL Editor
UPDATE user_profiles SET role = 'admin' WHERE email = 'votre-email@exemple.com';
```

### Étape 3 : Tester la connexion
1. Déconnectez-vous de l'application
2. Reconnectez-vous
3. Ouvrez la console du navigateur (F12)
4. Vérifiez que vous voyez : `"Profile loaded successfully: {role: 'admin', ...}"`

### Étape 4 : Accéder au dashboard
- Allez sur `/fr/admin` ou `/en/admin`
- Vous devriez voir le dashboard CMS complet

---

## 🧪 Vérification post-correctif

Ouvrez la console de votre navigateur et exécutez :
```javascript
const { data: user } = await supabase.auth.getUser();
const { data: profile } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('id', user.user.id)
  .single();

console.log('User:', user);
console.log('Profile:', profile);
```

**Résultat attendu** :
- `User` : Objet avec votre email et ID
- `Profile` : Objet avec `role: 'admin'`
- Aucune erreur

---

## 📊 Impact des changements

| Fichier | Lignes modifiées | Type de changement |
|---------|-----------------|-------------------|
| SUPABASE_SETUP.md | ~5 | Correction SQL |
| AuthContext.tsx | ~15 | Logs & diagnostics |
| AdminDashboard.tsx | ~10 | Validation robuste |
| LanguageContext.tsx | 2 | Traductions |
| **SUPABASE_FIX_RLS.md** | ~250 | **Nouveau** |
| **CHANGELOG_SUPABASE_FIX.md** | ~200 | **Nouveau** |

**Total** : ~482 lignes ajoutées/modifiées

---

## 🔍 Points techniques clés

### Problème : Dépendance circulaire RLS
```
User tries to log in
  ↓
System tries to load profile from user_profiles
  ↓
RLS policy checks: "Is user admin?"
  ↓
To check admin, must read from user_profiles
  ↓
RLS policy blocks because... it's checking if user is admin
  ↓
❌ DENIED
```

### Solution : Politique en deux niveaux
```sql
-- Niveau 1 : Tout utilisateur peut lire SON PROPRE profil
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Niveau 2 : Admin peut lire TOUS les profils
-- (Fonctionne car Niveau 1 autorise déjà la lecture de son propre profil)
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );
```

---

## ⚠️ Notes importantes

1. **Redémarrage nécessaire** : Si vous modifiez `.env`, redémarrez votre serveur de développement
2. **Email confirmé** : Vérifiez que `email_confirmed_at` n'est pas null dans Supabase → Authentication → Users
3. **Service Role Key** : Ne jamais exposer la `SUPABASE_SERVICE_ROLE_KEY` côté frontend
4. **RLS toujours actif** : Ne désactivez JAMAIS RLS en production, corrigez les politiques à la place

---

## 📚 Ressources supplémentaires

- Documentation Supabase RLS : https://supabase.com/docs/guides/auth/row-level-security
- Guide PostgreSQL Policies : https://www.postgresql.org/docs/current/sql-createpolicy.html
- Fichier de setup initial : `/SUPABASE_SETUP.md`
- Guide de dépannage : `/SUPABASE_FIX_RLS.md`

---

## ✨ Résultat final

Après ces correctifs :
- ✅ Les utilisateurs peuvent se connecter sans "Accès refusé"
- ✅ Les profils se chargent correctement avec le rôle admin
- ✅ Le dashboard CMS est accessible aux admins et editors
- ✅ Les logs console aident au diagnostic en cas de problème
- ✅ Documentation complète pour reproduire la configuration
