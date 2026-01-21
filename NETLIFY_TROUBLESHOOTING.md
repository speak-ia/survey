# Dépannage Netlify - Guide de résolution

## Problème : Build échoue sur Netlify

### Vérifications à faire dans Netlify Dashboard

1. **Variables d'environnement**
   - Allez dans **Site settings** > **Environment variables**
   - Vérifiez que ces variables sont définies :
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Configuration du build**
   - Dans **Site settings** > **Build & deploy** > **Build settings**
   - Build command : `npm run build`
   - Publish directory : `.next`
   - Node version : `18` (ou laissez vide pour utiliser la version par défaut)

3. **Plugin Next.js**
   - Le plugin `@netlify/plugin-nextjs` doit être installé automatiquement
   - Si ce n'est pas le cas, allez dans **Plugins** et installez-le

### Erreurs courantes et solutions

#### Erreur : "Build script returned non-zero exit code"
**Solution :**
- Vérifiez les logs de build dans Netlify pour voir l'erreur exacte
- Assurez-vous que toutes les dépendances sont dans `package.json`
- Vérifiez que `npm install` fonctionne localement

#### Erreur : "Module not found"
**Solution :**
- Vérifiez que toutes les dépendances sont listées dans `package.json`
- Exécutez `npm install` localement pour vérifier

#### Erreur : "Environment variable not found"
**Solution :**
- Ajoutez les variables d'environnement dans Netlify Dashboard
- Redéployez après avoir ajouté les variables

#### Erreur : "Cannot find module '@netlify/plugin-nextjs'"
**Solution :**
- Le plugin devrait être installé automatiquement
- Si ce n'est pas le cas, ajoutez-le manuellement dans les plugins Netlify

### Configuration manuelle dans Netlify

Si le fichier `netlify.toml` ne fonctionne pas, configurez manuellement :

1. **Build settings :**
   - Build command : `npm run build`
   - Publish directory : `.next`

2. **Environment variables :**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://axasmsdbxgdcgyvnflsw.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4YXNtc2RieGdkY2d5dm5mbHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NzcxNTEsImV4cCI6MjA4NDU1MzE1MX0.eTW4ik2MfEfxsVdhOqE5Rj2wM6NJLnu7HEJ9GHVor5c
   ```

3. **Node version :**
   - Dans **Build settings** > **Environment**, définissez Node version à `18`

### Test local avant déploiement

Pour tester le build localement comme Netlify :

```bash
# Installer les dépendances
npm install

# Builder le projet
npm run build

# Vérifier que le build fonctionne
npm start
```

Si le build fonctionne localement mais échoue sur Netlify, le problème est probablement lié aux variables d'environnement ou à la configuration Netlify.

### Logs de build

Pour voir les logs détaillés :
1. Allez dans **Deploys** dans Netlify Dashboard
2. Cliquez sur le déploiement qui a échoué
3. Cliquez sur "View build log"
4. Cherchez l'erreur exacte dans les logs

### Contact support

Si le problème persiste :
- Vérifiez la documentation Netlify : https://docs.netlify.com
- Vérifiez la documentation Next.js : https://nextjs.org/docs
- Consultez les forums Netlify : https://answers.netlify.com