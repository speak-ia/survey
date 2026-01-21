# Guide de Configuration Supabase

Ce guide vous explique comment configurer Supabase pour stocker les réponses de votre sondage.

## Étape 1 : Récupérer vos clés Supabase

1. Allez sur [https://supabase.com](https://supabase.com) et connectez-vous
2. Sélectionnez votre projet "survey"
3. Allez dans **Settings** (Paramètres) > **API**
4. Vous trouverez :
   - **Project URL** : L'URL de votre projet
   - **Project API keys** > **anon public** : La clé publique anonyme

## Étape 2 : Créer le fichier .env.local

1. Créez un fichier `.env.local` à la racine du projet
2. Copiez le contenu de `.env.example` dans `.env.local`
3. Remplissez les valeurs avec vos clés Supabase :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon-ici
```

## Étape 3 : Créer la table dans Supabase

1. Dans votre dashboard Supabase, allez dans **SQL Editor**
2. Cliquez sur **New query**
3. Copiez et collez tout le contenu du fichier `supabase-schema.sql`
4. Cliquez sur **Run** (ou appuyez sur Ctrl+Enter / Cmd+Enter)
5. Vous devriez voir un message de succès

La table `survey_responses` est maintenant créée avec :
- Toutes les colonnes nécessaires pour stocker les réponses
- Un index sur `created_at` pour les requêtes par date
- Row Level Security (RLS) activé
- Des politiques pour permettre l'insertion anonyme

## Étape 4 : Installer les dépendances

```bash
npm install
```

Cela installera le client Supabase (`@supabase/supabase-js`).

## Étape 5 : Tester

1. Redémarrez votre serveur de développement :
```bash
npm run dev
```

2. Remplissez le formulaire et soumettez-le
3. Vérifiez dans Supabase :
   - Allez dans **Table Editor**
   - Sélectionnez la table `survey_responses`
   - Vous devriez voir votre réponse enregistrée !

## Vérification des données

Pour voir toutes les réponses :

1. Dans Supabase Dashboard, allez dans **Table Editor**
2. Sélectionnez la table `survey_responses`
3. Vous verrez toutes les réponses avec leurs timestamps

## Sécurité (Production)

Pour la production, vous devriez :

1. **Restreindre la lecture** : Modifiez la politique RLS pour ne permettre la lecture qu'aux utilisateurs authentifiés
2. **Créer un rôle admin** : Créez un utilisateur admin pour gérer les réponses
3. **Limiter les insertions** : Ajoutez des validations et des limites de taux si nécessaire

Pour modifier les politiques RLS, allez dans **Authentication** > **Policies** dans votre dashboard Supabase.

## Dépannage

### Erreur : "Missing Supabase environment variables"
- Vérifiez que `.env.local` existe et contient les bonnes variables
- Redémarrez le serveur de développement après avoir créé/modifié `.env.local`

### Erreur : "relation 'survey_responses' does not exist"
- Assurez-vous d'avoir exécuté le script SQL dans l'éditeur SQL de Supabase
- Vérifiez que la table existe dans **Table Editor**

### Erreur : "new row violates row-level security policy"
- Vérifiez que les politiques RLS sont correctement configurées
- La politique "Allow anonymous inserts" doit être active

## Structure de la table

La table `survey_responses` contient :
- `id` : UUID unique pour chaque réponse
- `created_at` : Timestamp de création
- Toutes les colonnes correspondant aux questions du sondage
- Les colonnes sont nommées en snake_case (convention SQL)

Les données sont automatiquement transformées du format camelCase (JavaScript) vers snake_case (SQL) dans l'API route.