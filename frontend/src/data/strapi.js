import client from './client.js';

/**
 * Récupère tous les articles depuis Strapi
 * @param {number} limit - Nombre d'articles à récupérer
 * @returns {Promise<Array>} Tableau d'articles bruts depuis l'API
 */
export async function getAllPosts(limit = 6) {
  // Utiliser status=published pour ne récupérer que les articles publiés (Strapi 5)
  // populate=featuredImage pour inclure l'image à la une
  const response = await client.get(
    `/articles?populate=featuredImage&pagination[limit]=${limit}&sort=publishedAt:desc&status=published`
  );
  
  const posts = response.data.data || [];
  
  if (!Array.isArray(posts)) {
    return [];
  }
  
  return posts;
}

/**
 * Récupère un article par son slug
 * @param {string} slug - Slug de l'article
 * @returns {Promise<Object|null>} Article brut ou null si non trouvé
 */
export async function getPostBySlug(slug) {
  // Utiliser status=published pour ne récupérer que les articles publiés (Strapi 5)
  const response = await client.get(
    `/articles?filters[slug][$eq]=${slug}&populate=featuredImage&status=published`
  );
  
  const posts = response.data.data || [];
  return posts[0] || null;
}

/**
 * Récupère toutes les catégories
 * @returns {Promise<Array>} Tableau de catégories brutes
 */
export async function getCategories() {
  const response = await client.get('/categories?pagination[limit]=100');
  return response.data.data || [];
}

/**
 * Récupère les articles d'une catégorie
 * @param {number} categoryId - ID de la catégorie
 * @param {number} limit - Nombre d'articles à récupérer
 * @returns {Promise<Array>} Tableau d'articles bruts
 */
export async function getPostsByCategory(categoryId, limit = 10) {
  // Utiliser status=published pour ne récupérer que les articles publiés (Strapi 5)
  const populate = 'populate=featuredImage';
  const response = await client.get(
    `/articles?filters[categories][id][$eq]=${categoryId}&${populate}&pagination[limit]=${limit}&sort=publishedAt:desc&status=published`
  );
  
  const posts = response.data.data || [];
  return Array.isArray(posts) ? posts : [];
}

/**
 * Récupère tous les tags
 * @returns {Promise<Array>} Tableau de tags bruts
 */
export async function getTags() {
  const response = await client.get('/tags?pagination[limit]=100');
  return response.data.data || [];
}

/**
 * Récupère toutes les pages
 * @returns {Promise<Array>} Tableau de pages brutes
 */
export async function getPages() {
  const response = await client.get('/pages?pagination[limit]=100');
  return response.data.data || [];
}

