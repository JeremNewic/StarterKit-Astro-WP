import axios from 'axios';

const STRAPI_API_URL = import.meta.env.PUBLIC_STRAPI_API_URL;

if (!STRAPI_API_URL) {
  throw new Error('PUBLIC_STRAPI_API_URL must be defined in your environment variables');
}

// Création du client axios avec configuration de base
const client = axios.create({
  baseURL: STRAPI_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pour les requêtes
client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor pour les réponses
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Erreur avec réponse du serveur
      const status = error.response.status;
      const statusText = error.response.statusText;
      const message = `Erreur API: ${status} ${statusText}`;
      
      // Ici vous pourriez ajouter un système de logging (Sentry, etc.)
      // logError(message, error.response.data);
      
      throw new Error(message);
    } else if (error.request) {
      // Requête faite mais pas de réponse
      const url = STRAPI_API_URL;
      throw new Error(
        `Impossible de se connecter à Strapi à l'adresse ${url}. ` +
        `Vérifiez que votre instance Strapi est démarrée et accessible. ` +
        `Assurez-vous aussi que PUBLIC_STRAPI_API_URL dans votre fichier .env est correct.`
      );
    } else {
      // Erreur lors de la configuration de la requête
      throw new Error(`Erreur de configuration: ${error.message}`);
    }
  }
);

export default client;

