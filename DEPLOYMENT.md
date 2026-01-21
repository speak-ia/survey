# Guide de Déploiement sur Netlify

## Étape 1 : Pousser le code sur GitHub

Le code est prêt à être poussé. Si vous avez des problèmes de permissions, voici les solutions :

### Option A : Utiliser SSH (recommandé)
```bash
# Vérifier si vous avez une clé SSH
ls -al ~/.ssh

# Si vous n'avez pas de clé SSH, en créer une
ssh-keygen -t ed25519 -C "votre-email@example.com"

# Ajouter la clé SSH à votre compte GitHub
# Copiez le contenu de ~/.ssh/id_ed25519.pub et ajoutez-le dans GitHub > Settings > SSH and GPG keys

# Changer le remote pour utiliser SSH
git remote set-url origin git@github.com:speak-ia/survey.git

# Pousser le code
git push -u origin main
```

### Option B : Utiliser un token d'accès personnel
1. Allez sur GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Créez un nouveau token avec les permissions `repo`
3. Utilisez le token comme mot de passe lors du push :
```bash
git push -u origin main
# Username: votre-username
# Password: votre-token
```

### Option C : Vérifier les permissions du dépôt
Assurez-vous d'avoir les droits d'écriture sur le dépôt `speak-ia/survey`.

## Étape 2 : Configurer Netlify

### 2.1 Créer un compte Netlify
1. Allez sur [https://www.netlify.com](https://www.netlify.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "Add new site" > "Import an existing project"

### 2.2 Connecter GitHub
1. Autorisez Netlify à accéder à votre compte GitHub
2. Sélectionnez le dépôt `speak-ia/survey`

### 2.3 Configuration du build
Netlify détectera automatiquement Next.js grâce au fichier `netlify.toml`. Les paramètres sont :
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18

### 2.4 Variables d'environnement
Dans les paramètres du site Netlify :
1. Allez dans **Site settings** > **Environment variables**
2. Ajoutez les variables suivantes :
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://axasmsdbxgdcgyvnflsw.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4YXNtc2RieGdkY2d5dm5mbHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NzcxNTEsImV4cCI6MjA4NDU1MzE1MX0.eTW4ik2MfEfxsVdhOqE5Rj2wM6NJLnu7HEJ9GHVor5c`

### 2.5 Déployer
1. Cliquez sur "Deploy site"
2. Netlify va automatiquement :
   - Cloner votre dépôt
   - Installer les dépendances (`npm install`)
   - Builder le projet (`npm run build`)
   - Déployer le site

## Étape 3 : Vérifier le déploiement

Une fois déployé, vous obtiendrez une URL comme `https://votre-site.netlify.app`

### Vérifications importantes :
1. ✅ Le site se charge correctement
2. ✅ Le formulaire fonctionne
3. ✅ Les données sont sauvegardées dans Supabase
4. ✅ Le mode sombre/clair fonctionne

## Configuration automatique

Le fichier `netlify.toml` est déjà configuré pour :
- Utiliser Next.js avec le plugin officiel
- Builder avec Node.js 18
- Publier depuis le dossier `.next`

## Mises à jour futures

Chaque fois que vous poussez du code sur GitHub, Netlify redéploiera automatiquement votre site.

## Dépannage

### Erreur de build
- Vérifiez que toutes les variables d'environnement sont configurées
- Vérifiez les logs de build dans Netlify Dashboard

### Erreur de connexion à Supabase
- Vérifiez que les variables d'environnement sont correctement configurées
- Vérifiez que les politiques RLS dans Supabase permettent les requêtes depuis votre domaine Netlify

### Le site ne se met pas à jour
- Vérifiez que le code a bien été poussé sur GitHub
- Vérifiez les logs de déploiement dans Netlify

## Support

Pour plus d'aide :
- Documentation Netlify : https://docs.netlify.com
- Documentation Next.js : https://nextjs.org/docs
- Documentation Supabase : https://supabase.com/docs