/**
 * Construit l'URL complète d'une image Strapi
 * @param {Object|string} image - Objet image Strapi ou URL string
 * @returns {string} URL complète de l'image
 */
export function getStrapiImageUrl(image) {
  if (!image) return '';
  if (typeof image === 'string') return image;
  
  const baseUrl = import.meta.env.PUBLIC_STRAPI_URL;
  if (!baseUrl) {
    throw new Error('PUBLIC_STRAPI_URL must be defined in your environment variables');
  }
  
  // Strapi 5 : l'image peut être directement dans l'objet ou dans data.attributes
  let url = null;
  
  // Cas 1 : Structure Strapi 5 (image directement dans l'objet)
  if (image.url) {
    url = image.url;
  }
  // Cas 2 : Structure Strapi 4 (image dans data.attributes)
  else if (image.data) {
    url = image.data.attributes?.url || image.data.url;
  }
  // Cas 3 : Structure alternative
  else if (image.attributes?.url) {
    url = image.attributes.url;
  }
  
  if (url) {
    return url.startsWith('http') ? url : `${baseUrl}${url}`;
  }
  
  return '';
}

