import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321', 
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src/',
      },
    },
    server: {
      watch: {
        usePolling: true, 
      },
    },
  },
  integrations: [
    sitemap({
      // Génère automatiquement le sitemap.xml
      filter: (page) => !page.includes('/admin/'),
    })
  ],
  image: {
    // Permet d'optimiser les images depuis Strapi
    // Pour la production, ajoutez votre domaine Strapi dans remotePatterns
    remotePatterns: [{
      protocol: 'http',
      hostname: 'localhost',
      port: '1337',
    }],
  },
  output: 'static', // Génération statique pour performance maximale
  build: {
    inlineStylesheets: 'auto',
  },
});