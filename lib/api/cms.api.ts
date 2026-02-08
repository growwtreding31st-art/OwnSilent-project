import api from './axiosConfig';

const CMS_BASE = '/admin/cms';

// ===== CATEGORIES API =====
export const categoriesApi = {
    // Get all categories
    getAll: (params?: { search?: string; status?: string; page?: number; limit?: number }) =>
        api.get(`${CMS_BASE}/categories`, { params }),

    // Get category by ID
    getById: (id: string) =>
        api.get(`${CMS_BASE}/categories/${id}`),

    // Create new category
    create: (data: {
        name: string;
        shortDescription?: string;
        introduction: string;
        icon?: string;
        featuredImage?: string;
        seo?: {
            metaTitle?: string;
            metaDescription?: string;
            keywords?: string[];
        };
        tags?: string[];
        isActive?: boolean;
    }) =>
        api.post(`${CMS_BASE}/categories`, data),

    // Update category
    update: (id: string, data: any) =>
        api.put(`${CMS_BASE}/categories/${id}`, data),

    // Update category introduction only
    updateIntroduction: (id: string, introduction: string) =>
        api.put(`${CMS_BASE}/categories/${id}/introduction`, { introduction }),

    // Delete category
    delete: (id: string) =>
        api.delete(`${CMS_BASE}/categories/${id}`),

    // Upload category image
    uploadImage: (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post(`${CMS_BASE}/categories/upload-image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

// ===== CATEGORY UPDATES API =====
export const categoryUpdatesApi = {
    // Get all updates
    getAll: (params?: { category?: string; status?: string; search?: string; page?: number; limit?: number }) =>
        api.get(`${CMS_BASE}/category-updates`, { params }),

    // Get update by ID
    getById: (id: string) =>
        api.get(`${CMS_BASE}/category-updates/${id}`),

    // Create new update
    create: (data: {
        title: string;
        category: string;
        date: Date | string;
        shortDescription: string;
        longDescription: string;
        images?: string[];
        videos?: string[];
        tags?: string[];
        status?: 'Draft' | 'Published';
        displayOrder?: number;
    }) =>
        api.post(`${CMS_BASE}/category-updates`, data),

    // Update existing update
    update: (id: string, data: any) =>
        api.put(`${CMS_BASE}/category-updates/${id}`, data),

    // Delete update
    delete: (id: string) =>
        api.delete(`${CMS_BASE}/category-updates/${id}`),

    // Reorder updates
    reorder: (updates: { id: string; displayOrder: number }[]) =>
        api.put(`${CMS_BASE}/category-updates/reorder`, { updates }),

    // Upload update images
    uploadImages: (files: File[]) => {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        return api.post(`${CMS_BASE}/category-updates/upload-images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

// ===== FAQS API =====
export const faqsApi = {
    // Get all FAQs
    getAll: (params?: { search?: string; tags?: string[]; status?: string; page?: number; limit?: number }) =>
        api.get(`${CMS_BASE}/faqs`, { params }),

    // Get FAQ by ID
    getById: (id: string) =>
        api.get(`${CMS_BASE}/faqs/${id}`),

    // Create new FAQ
    create: (data: {
        question: string;
        answer: string;
        tags: string[];
        categories?: string[];
        displayOrder?: number;
        status?: 'Draft' | 'Published';
    }) =>
        api.post(`${CMS_BASE}/faqs`, data),

    // Update FAQ
    update: (id: string, data: any) =>
        api.put(`${CMS_BASE}/faqs/${id}`, data),

    // Delete FAQ
    delete: (id: string) =>
        api.delete(`${CMS_BASE}/faqs/${id}`),

    // Preview FAQ injection (shows which categories it will appear on)
    previewInjection: (id: string) =>
        api.get(`${CMS_BASE}/faqs/${id}/preview`),
};

// ===== TAGS API =====
export const tagsApi = {
    // Get all tags
    getAll: (params?: { type?: string; search?: string; page?: number; limit?: number }) =>
        api.get(`${CMS_BASE}/tags`, { params }),

    // Get tag by ID
    getById: (id: string) =>
        api.get(`${CMS_BASE}/tags/${id}`),

    // Create new tag
    create: (data: {
        name: string;
        type: 'category' | 'brand' | 'model' | 'city' | 'country' | 'general';
        relatedTags?: string[];
    }) =>
        api.post(`${CMS_BASE}/tags`, data),

    // Update tag
    update: (id: string, data: any) =>
        api.put(`${CMS_BASE}/tags/${id}`, data),

    // Delete tag (with reassignment)
    delete: (id: string, reassignTo?: string) =>
        api.delete(`${CMS_BASE}/tags/${id}`, { data: { reassignTo } }),

    // Merge tags
    merge: (tagIds: string[], primaryTagId: string) =>
        api.post(`${CMS_BASE}/tags/merge`, { tagIds, primaryTagId }),

    // Get tag suggestions (for autocomplete)
    getSuggestions: (query: string, type?: string) =>
        api.get(`${CMS_BASE}/tags/suggestions`, { params: { query, type } }),
};

// ===== COMMENTS API =====
export const commentsApi = {
    // Get all comments
    getAll: (params?: { category?: string; status?: string; search?: string; page?: number; limit?: number }) =>
        api.get(`${CMS_BASE}/comments`, { params }),

    // Get pending comments
    getPending: (params?: { category?: string; page?: number; limit?: number }) =>
        api.get(`${CMS_BASE}/comments/pending`, { params }),

    // Get comment by ID
    getById: (id: string) =>
        api.get(`${CMS_BASE}/comments/${id}`),

    // Approve comment
    approve: (id: string, moderationNote?: string) =>
        api.put(`${CMS_BASE}/comments/${id}/approve`, { moderationNote }),

    // Reject comment
    reject: (id: string, moderationNote?: string) =>
        api.put(`${CMS_BASE}/comments/${id}/reject`, { moderationNote }),

    // Mark as spam
    markAsSpam: (id: string) =>
        api.put(`${CMS_BASE}/comments/${id}/spam`),

    // Delete comment
    delete: (id: string) =>
        api.delete(`${CMS_BASE}/comments/${id}`),

    // Bulk moderate comments
    bulkModerate: (commentIds: string[], action: 'approve' | 'reject' | 'spam' | 'delete') =>
        api.put(`${CMS_BASE}/comments/bulk-moderate`, { commentIds, action }),
};

// Export all APIs
export default {
    categories: categoriesApi,
    categoryUpdates: categoryUpdatesApi,
    faqs: faqsApi,
    tags: tagsApi,
    comments: commentsApi,
};
