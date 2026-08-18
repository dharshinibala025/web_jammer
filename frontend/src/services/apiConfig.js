/**
 * API Configuration
 * Smart Classroom Mobile Usage Control System (Web Edition)
 * Base URL and web storage helpers for API calls.
 */
import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@focussync:accessToken',
  REFRESH_TOKEN: '@focussync:refreshToken',
  USER: '@focussync:user',
};

export const getAccessToken = async () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = async () => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const saveTokens = async (accessToken, refreshToken) => {
  if (accessToken) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const clearTokens = async () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const saveUser = async (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getStoredUser = async () => {
  const raw = localStorage.getItem(STORAGE_KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return null;
  }
};

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const apiFetch = async (path, options = {}) => {
  try {
    const method = (options.method || 'GET').toLowerCase();
    const token = await getAccessToken();
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    let data;
    if (options.body) {
      data = typeof options.body === 'string'
        ? (() => { try { return JSON.parse(options.body); } catch { return options.body; } })()
        : options.body;
    }

    const response = await axios({
      url: `${BASE_URL}${path}`,
      method,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    const err = new Error(error.response?.data?.error || `HTTP ${error.response?.status || 500}`);
    err.status = error.response?.status;
    err.data = error.response?.data;
    throw err;
  }
};

export default apiFetch;
