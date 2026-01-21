# Sondage d'Auto-Évaluation

Un site web de sondage anonyme pour collecter des retours constructifs sur votre personnalité et votre développement personnel.

## Caractéristiques

- ✅ 100% anonyme - aucune authentification, aucun tracking
- ✅ Interface moderne et responsive (mobile-first)
- ✅ Support du mode sombre/clair avec toggle
- ✅ 8 sections de questions bien organisées
- ✅ Intégration Supabase pour stocker les réponses
- ✅ Indicateur de progression visuel
- ✅ Transitions fluides entre les sections
- ✅ Validation des champs requis

## Technologies

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Backend et base de données)

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Structure du Projet

```
├── app/
│   ├── api/
│   │   └── submit-survey/
│   │       └── route.ts        # Route API pour soumettre les réponses
│   ├── layout.tsx              # Layout principal avec ThemeProvider
│   ├── page.tsx                # Page principale du sondage
│   └── globals.css             # Styles globaux avec Tailwind
├── components/
│   ├── ClientLayout.tsx        # Wrapper client pour ThemeProvider
│   ├── ThemeProvider.tsx       # Gestion du thème dark/light
│   ├── Rating.tsx              # Composant pour les notes 1-5
│   ├── Textarea.tsx           # Composant textarea stylisé
│   ├── CheckboxGroup.tsx       # Composant pour les cases à cocher
│   ├── SelectOption.tsx        # Composant pour les options Oui/Non/etc
│   └── ProgressIndicator.tsx  # Indicateur de progression
├── lib/
│   └── supabase.ts            # Configuration du client Supabase
├── supabase-schema.sql        # Script SQL pour créer la table
├── SUPABASE_SETUP.md          # Guide de configuration Supabase
├── env.example                 # Exemple de variables d'environnement
└── package.json
```

## Sections du Sondage

1. **Compétences Techniques** - Évaluation technique et domaines d'amélioration
2. **Compétences Sociales** - Agréabilité et améliorations sociales
3. **Communication** - Clarté, écoute et suggestions
4. **Personnalité et État d'Esprit** - Attitude et traits à améliorer
5. **Traits de Personnalité** - Évaluation honnête (arrogance, égoïsme, agressivité, etc.)
6. **Qualité d'Enseignement** - Si applicable (compréhensibilité, vitesse, pédagogie)
7. **Ambitions et Vision** - Ambition, objectifs et conseils
8. **Retour Global et Critique** - Forces, faiblesses et retours critiques

## Stockage des Données avec Supabase

Les réponses sont maintenant stockées dans Supabase ! 

### Configuration Supabase

1. **Installer les dépendances** :
```bash
npm install
```

2. **Configurer Supabase** :
   - Suivez le guide complet dans `SUPABASE_SETUP.md`
   - Créez un fichier `.env.local` avec vos clés Supabase (voir `env.example`)
   - Exécutez le script SQL dans Supabase pour créer la table

3. **Tester** :
   - Remplissez le formulaire et soumettez
   - Vérifiez vos données dans Supabase Dashboard > Table Editor

### Structure de la base de données

La table `survey_responses` stocke toutes les réponses avec :
- Un ID unique et un timestamp pour chaque réponse
- Toutes les colonnes correspondant aux questions du sondage
- Row Level Security (RLS) activé pour la sécurité

Voir `supabase-schema.sql` pour le schéma complet.

## Production

Pour créer une build de production :

```bash
npm run build
npm start
```

## Notes

- Les champs de notation (1-5) sont obligatoires
- Les textareas sont optionnels mais encouragés
- Le mode sombre/clair est persistant via localStorage
- Le design est entièrement responsive et optimisé mobile

## Licence

MIT