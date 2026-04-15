# Configuration Supabase pour le CMS Luuzon

## 🚀 Guide rapide de configuration

### 1. Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Remplissez les informations :
   - **Name**: luuzon-cms (ou le nom de votre choix)
   - **Database Password**: Créez un mot de passe fort
   - **Region**: Choisissez la région la plus proche de vos utilisateurs

### 2. Récupérer vos credentials

Une fois le projet créé (cela prend ~2 minutes) :

1. Allez dans **Settings** > **API**
2. Copiez les valeurs suivantes :
   - **Project URL** (ex: `https://xyzcompany.supabase.co`)
   - **anon/public key** (clé publique, commence par `eyJhbGciOiJIUzI1...`)

### 3. Configurer les variables d'environnement

1. Créez un fichier `.env` à la racine du projet (même niveau que `package.json`)
2. Ajoutez vos credentials :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Redémarrez votre serveur de développement** (important !)

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez :
npm run dev
```

---

## 📊 Configuration de la base de données

Le CMS nécessite 3 tables dans Supabase. Voici les scripts SQL à exécuter :

### 1. Aller dans l'éditeur SQL

1. Dans Supabase, allez dans **SQL Editor**
2. Cliquez sur **New query**
3. Copiez-collez les scripts ci-dessous un par un

### 2. Table des profils utilisateurs

```sql
-- Table profiles (utilisateurs)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT role_check CHECK (role IN ('admin', 'editor', 'viewer'))
);

-- RLS Policy : Les utilisateurs peuvent lire leur propre profil
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Function pour créer automatiquement un profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'viewer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour appeler la fonction
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 3. Table des articles de blog

```sql
-- Table blog_posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  author_name TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_ai_generated BOOLEAN DEFAULT FALSE,
  CONSTRAINT status_check CHECK (status IN ('draft', 'published', 'archived'))
);

-- RLS Policy : Tout le monde peut lire les articles publiés
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can read all posts"
  ON blog_posts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Editors can insert posts"
  ON blog_posts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editors can update posts"
  ON blog_posts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Admins can delete posts"
  ON blog_posts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

### 4. Table de configuration Mistral (IA)

```sql
-- Table mistral_config
CREATE TABLE mistral_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key TEXT NOT NULL,
  auto_publish BOOLEAN DEFAULT FALSE,
  publish_frequency TEXT NOT NULL DEFAULT 'manual',
  topics TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT frequency_check CHECK (publish_frequency IN ('daily', 'weekly', 'manual'))
);

-- RLS Policy : Seuls les admins peuvent accéder à la config Mistral
ALTER TABLE mistral_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage mistral config"
  ON mistral_config FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

## 👤 Créer votre premier utilisateur admin

### Option 1 : Via l'interface Supabase (recommandé)

1. Allez dans **Authentication** > **Users**
2. Cliquez sur **Add user** > **Create new user**
3. Entrez un email et mot de passe
4. Après création, allez dans **Table Editor** > **profiles**
5. Trouvez l'utilisateur et changez `role` de `viewer` à `admin`

### Option 2 : Via SQL

```sql
-- 1. D'abord, créez l'utilisateur via l'interface Supabase
-- 2. Ensuite, mettez à jour son rôle :
UPDATE profiles
SET role = 'admin'
WHERE email = 'votre-email@example.com';
```

---

## ✅ Vérifier que tout fonctionne

1. Redémarrez votre application
2. Allez sur `http://localhost:5173/fr/login`
3. Connectez-vous avec vos credentials
4. Vous devriez accéder au dashboard admin !

---

## 🔒 Sécurité

- ⚠️ **Ne commitez JAMAIS votre fichier `.env`** dans Git
- Le fichier `.env` est déjà dans `.gitignore` par défaut
- Les clés `anon/public` peuvent être exposées côté client
- Les opérations sensibles doivent utiliser RLS (Row Level Security)

---

## 🆘 Problèmes courants

### "Failed to fetch" ou erreurs de connexion

1. Vérifiez que `.env` existe et contient les bonnes valeurs
2. Vérifiez que vous avez bien redémarré le serveur après avoir créé `.env`
3. Vérifiez que l'URL Supabase est correcte (avec `https://`)

### "User profile not loaded"

- Vérifiez que la table `profiles` existe
- Vérifiez que le trigger `on_auth_user_created` est bien créé
- Pour les utilisateurs existants, créez manuellement un profil :

```sql
INSERT INTO profiles (id, email, role)
VALUES (
  'user-uuid-from-auth-users',
  'email@example.com',
  'admin'
);
```

### Impossible de créer/modifier des articles

- Vérifiez que votre rôle est bien `admin` ou `editor` dans la table `profiles`
- Vérifiez que les RLS policies sont bien créées

---

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide RLS Supabase](https://supabase.com/docs/guides/auth/row-level-security)
- [API Supabase JS](https://supabase.com/docs/reference/javascript/introduction)

---

Besoin d'aide ? Contactez l'équipe Luuzon ! 🚀
