/**
 * Type pour un article transformé depuis Strapi
 */
export interface TransformedPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage: string;
  imageWidth: number;
  imageHeight: number;
  readingTime: string;
  content: string;
}

