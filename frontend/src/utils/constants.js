export const APP_NAME = 'YognaSetu';

const rawApiUrl = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL =
  rawApiUrl && rawApiUrl.trim() !== ''
    ? rawApiUrl.trim().replace(/\/+$/, '')
    : 'https://yognasetu-api.onrender.com/api/v1';