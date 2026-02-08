import axios from 'axios';
import { apiCache, createCacheKey, CACHE_TTL } from './cache';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",
  timeout: 30000, // 30 second timeout for slow networks
});

// Request deduplication map
const pendingRequests = new Map<string, Promise<any>>();

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response caching interceptor
api.interceptors.response.use(
  (response) => {
    // Only cache GET requests
    if (response.config.method === 'get' && typeof window !== 'undefined') {
      const cacheKey = createCacheKey(response.config.url || '', response.config.params);

      // Determine TTL based on endpoint
      let ttl = 180; // default 3 minutes
      const url = response.config.url || '';

      if (url.includes('/filters')) ttl = CACHE_TTL.FILTERS;
      else if (url.includes('/categories')) ttl = CACHE_TTL.CATEGORIES;
      else if (url.includes('/brands')) ttl = CACHE_TTL.BRANDS;
      else if (url.includes('/products/')) ttl = CACHE_TTL.PRODUCT_DETAIL;
      else if (url.includes('/products')) ttl = CACHE_TTL.PRODUCTS;
      else if (url.includes('/blog')) ttl = CACHE_TTL.BLOG_POSTS;
      else if (url.includes('/news')) ttl = CACHE_TTL.NEWS;
      else if (url.includes('/reviews')) ttl = CACHE_TTL.REVIEWS;

      apiCache.set(cacheKey, response.data, ttl);
    }
    return response;
  },
  async (error) => {
    // Retry logic for network errors
    const config = error.config;

    if (!config || !config.retry) {
      config.retry = 0;
    }

    if (config.retry < 2 && error.code === 'ECONNABORTED') {
      config.retry += 1;
      return api(config);
    }

    return Promise.reject(error);
  }
);

// Wrapper function with cache and deduplication
export const cachedGet = async <T = any>(url: string, params?: any): Promise<T> => {
  const cacheKey = createCacheKey(url, params);

  // Check cache first
  if (typeof window !== 'undefined') {
    const cached = apiCache.get<T>(cacheKey);
    if (cached) {
      console.log(`🎯 Cache HIT: ${url}`);
      return cached;
    }
  }

  // Check if request is already pending (deduplication)
  if (pendingRequests.has(cacheKey)) {
    console.log(`⏳ Request deduplication: ${url}`);
    return pendingRequests.get(cacheKey);
  }

  // Make the request
  console.log(`💾 Cache MISS: ${url}`);
  const requestPromise = api.get<T>(url, { params }).then(res => res.data);

  pendingRequests.set(cacheKey, requestPromise);

  try {
    const result = await requestPromise;
    return result;
  } finally {
    pendingRequests.delete(cacheKey);
  }
};

export default api;