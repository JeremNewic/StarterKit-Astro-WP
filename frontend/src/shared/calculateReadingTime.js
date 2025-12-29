/**
 * Calcule le temps de lecture estimé d'un contenu
 * @param {string} content - Contenu HTML ou texte
 * @returns {string} Temps de lecture formaté (ex: "5 min")
 */
export function calculateReadingTime(content) {
  if (!content) return '1 min';
  
  const wordsPerMinute = 200;
  const plainText = content.replace(/<[^>]*>/g, '');
  const words = plainText.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.ceil(words / wordsPerMinute) || 1;
  return `${minutes} min`;
}

