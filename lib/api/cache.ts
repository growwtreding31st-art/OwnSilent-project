// Simple in-memory cache for API responses
interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number;
}

class APICache {
    private cache: Map<string, CacheEntry<any>> = new Map();

    set<T>(key: string, data: T, ttlSeconds: number = 300): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: ttlSeconds * 1000,
        });
    }

    get<T>(key: string): T | null {
        const entry = this.cache.get(key);

        if (!entry) {
            return null;
        }

        const now = Date.now();
        const isExpired = now - entry.timestamp > entry.ttl;

        if (isExpired) {
            this.cache.delete(key);
            return null;
        }

        return entry.data as T;
    }

    invalidate(key: string): void {
        this.cache.delete(key);
    }

    invalidatePattern(pattern: string): void {
        const regex = new RegExp(pattern);
        for (const key of this.cache.keys()) {
            if (regex.test(key)) {
                this.cache.delete(key);
            }
        }
    }

    clear(): void {
        this.cache.clear();
    }
}

// Export singleton instance
export const apiCache = new APICache();

// Helper function to create cache key from URL and params
export function createCacheKey(url: string, params?: any): string {
    const paramStr = params ? JSON.stringify(params) : '';
    return `${url}:${paramStr}`;
}

// Cache TTL constants (in seconds)
export const CACHE_TTL = {
    FILTERS: 300, // 5 minutes
    CATEGORIES: 300, // 5 minutes
    BRANDS: 300, // 5 minutes
    PRODUCTS: 180, // 3 minutes
    PRODUCT_DETAIL: 300, // 5 minutes
    BLOG_POSTS: 600, // 10 minutes
    NEWS: 600, // 10 minutes
    REVIEWS: 300, // 5 minutes
} as const;
