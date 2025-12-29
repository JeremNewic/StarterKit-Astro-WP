# Astro Strapi Headless Starter Kit

Un starter kit moderne et performant pour créer des sites rapides avec Astro et Strapi en mode headless.

## ✨ Fonctionnalités

- 🚀 **Astro 5** - Framework ultra-rapide avec génération statique
- 📝 **Strapi Headless** - Utilise Strapi comme CMS via l'API REST
- 🎨 **Tailwind CSS** - Framework CSS utilitaire pour un design moderne
- 🖼️ **Optimisation d'images** - Gestion intelligente des images Strapi
- 🔍 **SEO optimisé** - Métadonnées Open Graph et Twitter Cards
- 📱 **Responsive** - Design adapté à tous les écrans
- ⚡ **Performances** - Score Lighthouse proche de 100

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Une instance Strapi avec l'API REST activée

### Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-username/Starterkit-Astro-Strapi.git
   cd mon-blog-strapi
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   
   Copiez le fichier `.env.example` vers `.env` :
   ```bash
   cp .env.example .env
   ```
   
   Puis éditez le fichier `.env` avec vos paramètres :
   ```env
   PUBLIC_STRAPI_API_URL=http://localhost:1337/api
   PUBLIC_STRAPI_URL=http://localhost:1337
   PUBLIC_SITE_URL=http://localhost:4321
   PUBLIC_SITE_NAME=Starterkit Blog
   ```
   
   **Important** : Le fichier `.env` est ignoré par Git. Ne commitez jamais vos variables d'environnement !

4. **Démarrer votre instance Strapi**
   
   Assurez-vous que votre instance Strapi est démarrée et accessible à l'URL configurée dans votre `.env` (par défaut `http://localhost:1337`).

5. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   
   Le site sera accessible sur `http://localhost:4321`
   
   **Note** : Si vous voyez une erreur "Impossible de se connecter à Strapi", vérifiez que :
   - Votre instance Strapi est bien démarrée
   - L'URL dans votre fichier `.env` correspond à l'URL de votre instance Strapi
   - Les permissions de l'API publique sont configurées dans Strapi

## 📁 Structure du projet

```
/
├── public/                 # Fichiers statiques
│   └── site.webmanifest
├── src/
│   ├── components/        # Composants Astro réutilisables
│   │   ├── ArticleCard.astro
│   │   ├── FeaturedArticle.astro
│   │   ├── PostCard.astro
│   │   ├── SEO.astro
│   │   ├── StrapiImage.astro
│   │   └── layout/
│   │       ├── Footer.astro
│   │       ├── Header.astro
│   │       └── Layout.astro
│   ├── data/              # Appels API et clients
│   │   ├── client.js      # Client axios avec interceptors
│   │   └── strapi.js      # Fonctions API Strapi (données brutes)
│   ├── shared/            # Fonctions utilitaires partagées
│   │   ├── calculateReadingTime.js
│   │   ├── getStrapiImageUrl.js
│   │   ├── transformStrapiPost.js
│   │   └── types.ts
│   ├── lib/               # Constantes globales
│   │   └── constants.ts
│   ├── pages/             # Routes du site (file-based routing)
│   │   ├── index.astro    # Page d'accueil
│   │   ├── about.astro    # Page à propos
│   │   ├── 404.astro      # Page d'erreur
│   │   └── blog/
│   │       ├── [slug].astro   # Page article dynamique
│   │       └── index.astro    # Liste des articles
│   └── styles/
│       └── tailwind.css   # Styles Tailwind
├── astro.config.mjs       # Configuration Astro
├── tailwind.config.mjs    # Configuration Tailwind
└── package.json
```

## ⚙️ Configuration Strapi requise

**Important** : Ce starterkit est le **frontend Astro**. Vous devez avoir une **instance Strapi séparée** qui tourne.

### Si vous n'avez pas encore Strapi

Créez un nouveau projet Strapi dans un autre dossier :

```bash
# Créer un nouveau projet Strapi
npx create-strapi-app@latest mon-strapi --quickstart

# Ou avec yarn
yarn create strapi-app mon-strapi --quickstart
```

Puis démarrez Strapi :
```bash
cd mon-strapi
npm run develop
# Strapi sera accessible sur http://localhost:1337
```

### Configuration de votre instance Strapi

Votre installation Strapi doit avoir :

- **Strapi 4.0+**
- **API REST activée** (activée par défaut)
- **Collection Type "Article"** créée avec les champs suivants :
  - `title` (Text)
  - `slug` (UID, basé sur title)
  - `excerpt` (Text ou Rich Text)
  - `content` (Rich Text)
  - `featuredImage` (Media - Single)
  - `publishedAt` (Date)
- **Permissions configurées** : Dans Settings → Users & Permissions Plugin → Roles → Public, activez "find" et "findOne" pour la collection Article
- **CORS configuré** si Strapi et Astro sont sur des domaines différents

### Configuration CORS dans Strapi

Si nécessaire, configurez CORS dans `config/middlewares.js` de votre instance Strapi :

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:4321', 'https://votre-domaine.com'],
    },
  },
  // ... autres middlewares
];
```

## 🛠️ Commandes disponibles

| Commande              | Action                                              |
| :-------------------- | :-------------------------------------------------- |
| `npm install`         | Installer les dépendances                           |
| `npm run dev`         | Lancer le serveur de développement sur `localhost:4321` |
| `npm run build`       | Générer le site statique dans `./dist/`             |
| `npm run preview`     | Prévisualiser le build en local                     |
| `npm run astro ...`   | Exécuter des commandes Astro CLI                    |

## 🎨 Personnalisation

### Modifier les couleurs Tailwind

Éditez `tailwind.config.mjs` :

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#votre-couleur',
      },
    },
  },
}
```

### Ajouter de nouvelles pages

Créez simplement un fichier `.astro` dans `src/pages/`. Le routing est automatique :
- `src/pages/contact.astro` → `/contact`
- `src/pages/services/web.astro` → `/services/web`

### Personnaliser le Header/Footer

Modifiez les fichiers dans `src/components/layout/`.

## 📚 API Strapi disponible

Le fichier `src/data/strapi.js` expose plusieurs fonctions qui retournent les **données brutes** de l'API :

- `getAllPosts(limit)` - Récupérer tous les articles bruts
- `getPostBySlug(slug)` - Récupérer un article brut par son slug
- `getCategories()` - Récupérer toutes les catégories brutes
- `getPostsByCategory(categoryId, limit)` - Articles bruts par catégorie
- `getTags()` - Récupérer tous les tags bruts
- `getPages()` - Récupérer toutes les pages brutes

**Important** : Ces fonctions retournent les données brutes de Strapi. Pour transformer les données en format utilisable par les composants, utilisez `transformStrapiPost()` depuis `src/shared/transformStrapiPost.js`.

## 🚢 Déploiement

### Netlify

1. Connectez votre dépôt GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Ajoutez vos variables d'environnement :
   - `PUBLIC_STRAPI_API_URL`
   - `PUBLIC_STRAPI_URL`
   - `PUBLIC_SITE_URL`
   - `PUBLIC_SITE_NAME`

### Vercel

1. Importez votre projet GitHub
2. Framework Preset: `Astro`
3. Ajoutez vos variables d'environnement
4. Déployez !

### Build statique

```bash
npm run build
```

Le site généré sera dans le dossier `dist/` et peut être hébergé sur n'importe quel serveur statique.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT

## 🔗 Ressources utiles

- [Documentation Astro](https://docs.astro.build)
- [Documentation Strapi](https://docs.strapi.io)
- [Documentation Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

---

Créé avec ❤️ pour gagner du temps sur le lancement de projets web
