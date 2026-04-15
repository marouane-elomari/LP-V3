# 🔧 Guide de dépannage Supabase - Problème d'accès refusé

## Symptôme
Après avoir créé votre premier admin et vous être connecté, vous obtenez "Accès refusé" ou êtes redirigé vers la page d'accueil.

## Cause
Les politiques RLS (Row Level Security) créent une **dépendance circulaire** : pour lire votre profil, le système doit savoir que vous êtes authentifié, mais les anciennes politiques bloquaient cette lecture.

---

## ✅ Solution complète - À exécuter dans Supabase SQL Editor

### Étape 1: Supprimer les anciennes politiques problématiques

```sql
-- Supprimer toutes les politiques existantes sur user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
```

### Étape 2: Créer les nouvelles politiques corrigées

```sql
-- Politique 1: Chaque utilisateur peut lire son propre profil (ESSENTIEL)
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Politique 2: Les admins peuvent voir tous les profils
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );
```

### Étape 3: Vérifier que votre utilisateur a bien le rôle 'admin'

```sql
-- Voir tous les profils utilisateurs
SELECT id, email, role, full_name, created_at FROM user_profiles;

-- Si votre utilisateur n'a pas le rôle 'admin', le mettre à jour
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'votre-email@exemple.com';
```

### Étape 4: Vérifier les politiques RLS sur blog_posts

```sql
-- Vérifier que les politiques pour blog_posts permettent aux editors/admins de lire
-- Si vous avez des erreurs lors du chargement des blogs, supprimez et recréez:

DROP POLICY IF EXISTS "Editors can view all posts" ON blog_posts;

CREATE POLICY "Editors can view all posts" ON blog_posts
  FOR SELECT USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  );
```

---

## 🧪 Tester que tout fonctionne

1. **Déconnectez-vous** de votre application
2. **Reconnectez-vous** avec votre compte admin
3. **Vérifiez dans la console du navigateur** (F12) :
   - Vous devriez voir : `"Profile loaded successfully: {role: 'admin', ...}"`
   - PAS de message d'erreur RLS

4. **Accédez à** `/fr/admin` - vous devriez voir le dashboard

---

## 🔍 Commandes de diagnostic

### Vérifier l'utilisateur authentifié actuel
```sql
SELECT auth.uid() AS current_user_id;
```

### Vérifier les politiques actives
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'user_profiles';
```

### Tester manuellement la lecture du profil (en tant qu'utilisateur connecté)
Dans votre navigateur, ouvrez la console et exécutez :
```javascript
const { data, error } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('id', (await supabase.auth.getUser()).data.user.id)
  .single();

console.log('Profile data:', data);
console.log('Error:', error);
```

---

## 📋 Checklist complète

- [ ] Tables créées (user_profiles, blog_posts, mistral_config)
- [ ] Trigger `handle_new_user()` créé
- [ ] RLS activé sur toutes les tables
- [ ] Anciennes politiques supprimées
- [ ] Nouvelles politiques créées
- [ ] Premier utilisateur a le rôle 'admin'
- [ ] Variables d'environnement configurées (.env)
- [ ] Authentification email activée dans Supabase
- [ ] Test de connexion réussi

---

## ⚠️ Si le problème persiste

1. **Vérifiez les logs console** : Ouvrez F12 → Console
2. **Vérifiez que Supabase est configuré** : Les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont bien dans votre `.env`
3. **Redémarrez votre serveur de développement** après avoir modifié le `.env`
4. **Vérifiez que l'email est confirmé** : Dans Supabase, allez dans Authentication → Users et vérifiez que `email_confirmed_at` n'est pas null

---

## 💡 Explication technique

**Avant (problématique)** :
```sql
-- ❌ Dépendance circulaire !
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles  -- ← Essaie de lire user_profiles !
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

**Après (corrigé)** :
```sql
-- ✅ Sous-requête simple, pas de EXISTS
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );
```

La différence : PostgreSQL évalue la sous-requête simple **après** que la politique "Users can view own profile" ait autorisé la lecture de votre propre profil.
