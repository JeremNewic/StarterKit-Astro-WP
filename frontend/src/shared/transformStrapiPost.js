import { getStrapiImageUrl } from './getStrapiImageUrl.js';
import { calculateReadingTime } from './calculateReadingTime.js';

/**
 * Transforme un article brut de Strapi en format utilisable par les composants
 * Cette fonction doit être utilisée dans les pages, pas dans les composants
 * @param {Object} post - Article brut depuis l'API Strapi
 * @returns {Object|null} Article transformé ou null si invalide
 */
export function transformStrapiPost(post) {
  if (!post) {
    return null;
  }
  
  // Strapi 5 peut retourner les données directement dans l'objet ou dans attributes
  // Gérer les deux cas
  const attributes = post.attributes || post;
  const featuredImage = attributes.featuredImage || {};
  
  // Validation : un article doit avoir au minimum un titre
  if (!attributes.title) {
    return null;
  }
  
  // Générer un slug depuis le titre si le slug est null ou vide
  let slug = attributes.slug;
  if (!slug || slug === null) {
    // Générer un slug depuis le titre
    slug = attributes.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
      .replace(/[^a-z0-9]+/g, '-') // Remplacer les caractères spéciaux par des tirets
      .replace(/^-+|-+$/g, ''); // Enlever les tirets au début et à la fin
  }
  
  // Gérer le contenu Strapi 5 (peut être un tableau de blocks ou une string)
  let contentString = '';
  let contentBlocks = null;
  
  if (Array.isArray(attributes.content)) {
    // Si c'est un tableau de blocks (Strapi 5 Rich Text)
    contentBlocks = attributes.content;
    contentString = attributes.content
      .map(block => {
        // Gérer différents types de blocks
        if (block.type === 'paragraph' && block.children) {
          return block.children.map(child => child.text || '').join('');
        }
        if (block.type === 'heading' && block.children) {
          return block.children.map(child => child.text || '').join('') + '\n';
        }
        if (block.type === 'list' && block.children) {
          return block.children.map(item => {
            if (item.children) {
              return '- ' + item.children.map(child => child.text || '').join('');
            }
            return '';
          }).join('\n') + '\n';
        }
        return '';
      })
      .filter(text => text.trim() !== '')
      .join('\n');
  } else if (typeof attributes.content === 'string') {
    contentString = attributes.content;
  }
  
  // Si pas de contenu, utiliser l'excerpt comme fallback
  if (!contentString && attributes.excerpt) {
    contentString = attributes.excerpt;
  }

  // Gérer la date (Strapi 5 peut utiliser publishedAt ou publishedat)
  const dateRaw = attributes.publishedAt || attributes.publishedat || attributes.createdAt || '';
  // Formater la date en français si elle existe
  const date = dateRaw ? new Date(dateRaw).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return {
    id: post.id || attributes.id,
    title: attributes.title,
    slug: slug,
    excerpt: attributes.excerpt || attributes.description || '',
    date: date,
    featuredImage: getStrapiImageUrl(featuredImage),
    // Strapi 5 : les dimensions peuvent être directement dans l'objet ou dans data.attributes
    imageWidth: featuredImage?.width || featuredImage?.data?.attributes?.width || 800,
    imageHeight: featuredImage?.height || featuredImage?.data?.attributes?.height || 600,
    readingTime: calculateReadingTime(contentString || attributes.excerpt || ''),
    content: contentString,
    // Garder les blocks originaux pour un rendu plus riche si nécessaire
    contentBlocks: contentBlocks,
  };
}

