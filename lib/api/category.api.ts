import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

const publicApi = axios.create({
    baseURL: `${API_URL}/public`,
});

// ===== CATEGORIES =====
export const categoryApi = {
    getAll: () => publicApi.get('/categories'),
    getBySlug: (slug: string) => publicApi.get(`/categories/${slug}`),
    getUpdates: (slug: string, limit?: number) =>
        publicApi.get(`/categories/${slug}/updates`, { params: { limit } }),
    getFAQs: (slug: string) => publicApi.get(`/categories/${slug}/faqs`),
    getComments: (slug: string, limit?: number) =>
        publicApi.get(`/categories/${slug}/comments`, { params: { limit } }),
};

// ===== COMMENTS =====
export const commentApi = {
    submit: (data: { name: string; email: string; content: string; category: string }) =>
        publicApi.post('/comments', data),
    markHelpful: (id: string) => publicApi.post(`/comments/${id}/helpful`),
};

// ===== FAQS =====
export const faqApi = {
    markHelpful: (id: string) => publicApi.post(`/faqs/${id}/helpful`),
    markNotHelpful: (id: string) => publicApi.post(`/faqs/${id}/not-helpful`),
};

// ===== TAGS =====
export const tagApi = {
    getPopular: (limit?: number, type?: string) =>
        publicApi.get('/tags/popular', { params: { limit, type } }),
};

export default {
    category: categoryApi,
    comment: commentApi,
    faq: faqApi,
    tag: tagApi,
};
