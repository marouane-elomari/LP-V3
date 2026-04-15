# 🔄 Changer de projet Supabase - Guide rapide

## 📅 Date : 5 avril 2026

---

## 🎯 Étapes pour configurer votre nouveau projet Supabase

### Étape 1️⃣ : Récupérer vos nouvelles credentials Supabase

1. **Connectez-vous à** [Supabase Dashboard](https://app.supabase.com)
2. **Sélectionnez votre nouveau projet**
3. **Allez dans** : `Settings` → `API`
4. **Copiez ces deux valeurs** :
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key** (commence par `eyJhbGci...`)

---

### Étape 2️⃣ : Mettre à jour votre fichier `.env`

À la racine de votre projet, **créez ou modifiez** le fichier `.env` :

```env
# Supabase Configuration - NOUVEAU PROJET
VITE_SUPABASE_URL=https://VOTRE-PROJET-ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.votre-cle-complete-ici

# ⚠️ NE JAMAIS EXPOSER LA SERVICE ROLE KEY CÔTÉ FRONTEND
# VITE_SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key (si vous en avez besoin)
```

**🔴 IMPORTANT** : 
- Remplacez `VOTRE-PROJET-ID` par votre véritable ID de projet
- Remplacez la clé `anon` complète
- **NE committez JAMAIS ce fichier sur Git** (déjà dans `.gitignore`)

---

### Étape 3️⃣ : Redémarrer votre serveur de développement

```bash
# Arrêtez le serveur (Ctrl + C)
# Puis relancez-le
npm run dev
```

**Pourquoi ?** Les variables d'environnement ne sont chargées qu'au démarrage.

---

### Étape 4️⃣ : Créer les tables dans votre nouveau projet Supabase

Votre nouveau projet Supabase est vide. Vous devez recréer toutes les tables et politiques.

#### Option A : Exécuter les scripts SQL complets

1. **Ouvrez** [Supabase SQL Editor](https://app.supabase.com/project/_/sql)
2. **Copiez-collez** le contenu du fichier **`/SUPABASE_SETUP.md`** section par section
3. **Exécutez chaque bloc SQL** (cliquez sur "Run")

#### Option B : Utiliser le script rapide ci-dessous

**Copiez-collez ce script complet dans Supabase SQL Editor** :

```sql
-- ==========================================
-- SCRIPT COMPLET POUR NOUVEAU PROJET SUPABASE
-- ==========================================

-- 1. Créer la table user_profiles
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Politiques RLS corrigées (sans dépendance circulaire)
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );

-- 2. Créer la table blog_posts
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  author_name TEXT,
  status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_ai_generated BOOLEAN DEFAULT FALSE
);

-- Activer RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Politiques pour blog_posts
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Editors can view all posts" ON blog_posts
  FOR SELECT USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  );

CREATE POLICY "Editors can insert posts" ON blog_posts
  FOR INSERT WITH CHECK (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  );

CREATE POLICY "Editors can update posts" ON blog_posts
  FOR UPDATE USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  );

CREATE POLICY "Admins can delete posts" ON blog_posts
  FOR DELETE USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );

-- 3. Créer la table mistral_config
CREATE TABLE mistral_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_key TEXT NOT NULL,
  auto_publish BOOLEAN DEFAULT FALSE,
  publish_frequency TEXT CHECK (publish_frequency IN ('daily', 'weekly', 'manual')) DEFAULT 'manual',
  topics TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE mistral_config ENABLE ROW LEVEL SECURITY;

-- Politiques pour mistral_config
CREATE POLICY "Admins can view config" ON mistral_config
  FOR SELECT USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can insert config" ON mistral_config
  FOR INSERT WITH CHECK (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can update config" ON mistral_config
  FOR UPDATE USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );

-- 4. Créer la fonction trigger pour créer automatiquement les profils utilisateurs
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    'viewer', -- Par défaut, nouvel utilisateur = viewer
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Créer le trigger sur auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- 6. Créer un index pour améliorer les performances
CREATE INDEX blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX blog_posts_status_idx ON blog_posts(status);
CREATE INDEX blog_posts_author_idx ON blog_posts(author_id);
CREATE INDEX user_profiles_role_idx ON user_profiles(role);

-- ==========================================
-- ✅ TOUTES LES TABLES SONT CRÉÉES !
-- ==========================================
```

---

### Étape 5️⃣ : Créer votre premier utilisateur admin

#### Option A : Via l'interface Supabase (RECOMMANDÉ)

1. **Allez dans** : `Authentication` → `Users` → `Add User`
2. **Entrez** :
   - Email : votre-email@exemple.com
   - Password : votre-mot-de-passe (min 6 caractères)
   - ✅ Cochez "Auto Confirm User" (important !)
3. **Cliquez sur** : `Create User`
4. **Notez l'ID de l'utilisateur** (commence par un UUID)

#### Option B : Via SQL

```sql
-- Cette requête doit être exécutée APRÈS avoir créé l'utilisateur via l'interface
-- Remplacez 'votre-email@exemple.com' par votre vrai email
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'votre-email@exemple.com';
```

---

### Étape 6️⃣ : Activer l'authentification par email

1. **Allez dans** : `Authentication` → `Providers`
2. **Email** doit être activé (normalement déjà actif par défaut)
3. **Confirmez que** "Enable email confirmations" est activé
   - Si vous testez en local, vous pouvez désactiver temporairement

---

### Étape 7️⃣ : Tester la connexion

1. **Ouvrez votre application** : `http://localhost:5173/fr/login`
2. **Connectez-vous** avec les identifiants de votre utilisateur admin
3. **Vérifiez la console (F12)** :
   - Vous devriez voir : `"Profile loaded successfully: {role: 'admin', ...}"`
4. **Accédez au dashboard** : `/fr/admin`
5. ✅ **Succès !** Vous devriez voir le CMS Dashboard

---

## 🔍 Vérification que tout fonctionne

### Test 1 : Variables d'environnement chargées

Ouvrez la console de votre navigateur (F12) et tapez :

```javascript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Key présente:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'OUI' : 'NON');
```

**Résultat attendu** :
- URL de votre nouveau projet
- "OUI" pour la clé

### Test 2 : Connexion Supabase

```javascript
const { data, error } = await supabase.auth.getSession();
console.log('Session:', data);
console.log('Error:', error);
```

### Test 3 : Lecture du profil

```javascript
const { data: user } = await supabase.auth.getUser();
const { data: profile, error } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('id', user.user.id)
  .single();

console.log('Profil:', profile);
console.log('Erreur:', error);
```

**Résultat attendu** : `profile.role === 'admin'`

---

## ⚠️ Problèmes courants

### ❌ Erreur : "Invalid API key"
**Solution** : Vérifiez que vous avez bien copié la clé `anon/public` et pas la `service_role`

### ❌ Erreur : "relation does not exist"
**Solution** : Les tables n'ont pas été créées. Retournez à l'Étape 4

### ❌ Erreur : "RLS policy violation"
**Solution** : Les politiques RLS ne sont pas correctes. Exécutez le script de `/SUPABASE_FIX_RLS.md`

### ❌ Erreur : "User not found"
**Solution** : Vérifiez que l'email est bien confirmé dans Supabase → Authentication → Users

### ❌ "Profile not loaded"
**Solution** : 
1. Vérifiez que le trigger `handle_new_user()` est créé
2. Vérifiez que l'utilisateur existe dans `user_profiles`
3. Si absent, créez-le manuellement :

```sql
INSERT INTO user_profiles (id, email, role, full_name)
VALUES (
  'UUID-DE-VOTRE-UTILISATEUR', -- Trouvez-le dans Authentication → Users
  'votre-email@exemple.com',
  'admin',
  'Votre Nom'
);
```

---

## 📋 Checklist complète

- [ ] Nouveau projet Supabase créé
- [ ] Credentials copiées (URL + anon key)
- [ ] Fichier `.env` mis à jour
- [ ] Serveur de développement redémarré
- [ ] Script SQL complet exécuté dans Supabase
- [ ] Tables créées (user_profiles, blog_posts, mistral_config)
- [ ] Trigger `handle_new_user()` créé
- [ ] RLS activé sur toutes les tables
- [ ] Premier utilisateur créé via Supabase
- [ ] Email confirmé (ou "Auto Confirm" activé)
- [ ] Rôle 'admin' attribué à l'utilisateur
- [ ] Test de connexion réussi
- [ ] Dashboard `/fr/admin` accessible

---

## 🎉 Félicitations !

Votre nouveau projet Supabase est maintenant configuré et fonctionnel avec Luuzon ! 🚀

---

## 📚 Fichiers de référence

- `/SUPABASE_SETUP.md` - Setup complet détaillé
- `/SUPABASE_FIX_RLS.md` - Dépannage des politiques RLS
- `/CHANGELOG_SUPABASE_FIX.md` - Documentation des correctifs
- **`/CHANGE_SUPABASE_PROJECT.md`** - Ce fichier

---

## 💡 Conseils

1. **Sauvegardez vos credentials** dans un gestionnaire de mots de passe
2. **Ne committez jamais** le fichier `.env` sur Git
3. **Documentez** votre configuration pour votre équipe
4. **Testez régulièrement** la connexion Supabase
5. **Activez 2FA** sur votre compte Supabase pour la sécurité
