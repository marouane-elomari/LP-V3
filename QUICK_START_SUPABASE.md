# 🚀 Guide Rapide - Nouveau Projet Supabase

## ⚡ En 5 minutes chrono

### 1️⃣ Récupérer vos credentials Supabase (2 min)

```
📍 Supabase Dashboard → Settings → API

Copiez ces 2 valeurs :
✅ Project URL : https://xxxxx.supabase.co
✅ anon/public key : eyJhbGci...
```

---

### 2️⃣ Créer votre fichier .env (30 sec)

À la racine de votre projet, créez un fichier `.env` :

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...votre-cle-complete
```

**💡 Astuce** : Vous pouvez copier `.env.example` et le renommer en `.env`

---

### 3️⃣ Redémarrer le serveur (10 sec)

```bash
# Arrêtez avec Ctrl + C puis :
npm run dev
```

---

### 4️⃣ Créer les tables Supabase (2 min)

1. **Ouvrez** : [Supabase SQL Editor](https://app.supabase.com/project/_/sql)
2. **Copiez le script complet** depuis `/CHANGE_SUPABASE_PROJECT.md` (Étape 4)
3. **Collez et exécutez** (bouton "Run")

---

### 5️⃣ Créer votre admin (30 sec)

**Dans Supabase** :
```
Authentication → Users → Add User

Email : votre@email.com
Password : ••••••••
✅ Auto Confirm User
```

**Puis dans SQL Editor** :
```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'votre@email.com';
```

---

## ✅ Tester

1. **Ouvrez** : `http://localhost:5173/fr/login`
2. **Connectez-vous** avec vos identifiants
3. **Accédez à** : `/fr/admin`
4. 🎉 **Ça marche !**

---

## ❌ Problème ?

Consultez le guide détaillé : `/CHANGE_SUPABASE_PROJECT.md`

---

## 📋 Checklist ultra-rapide

```
[ ] Credentials copiées
[ ] Fichier .env créé
[ ] Serveur redémarré
[ ] Script SQL exécuté
[ ] Admin créé et confirmé
[ ] Connexion testée
```

---

## 🎯 C'est tout !

Vous êtes prêt à utiliser Luuzon avec votre nouveau projet Supabase ! 🚀
