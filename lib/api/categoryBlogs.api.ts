import api from './axiosConfig';

const CATEGORY_BLOGS_BASE = '';

export const categoryBlogsApi = {
    // ===== ADMIN ENDPOINTS =====
    admin: {
        // Blog CRUD
        getAll: (params?: { page?: number; limit?: number; search?: string; status?: string; category?: string }) =>
            api.get(`${CATEGORY_BLOGS_BASE}/admin/category-blogs`, { params }),

        getById: (id: string) =>
            api.get(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${id}`),

        create: (data: any) =>
            api.post(`${CATEGORY_BLOGS_BASE}/admin/category-blogs`, data),

        update: (id: string, data: any) =>
            api.put(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${id}`, data),

        delete: (id: string) =>
            api.delete(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${id}`),

        // Update Management
        addUpdate: (blogId: string, data: { title: string; content: string; date?: Date }) =>
            api.post(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${blogId}/updates`, data),

        updateUpdate: (blogId: string, updateId: string, data: { title: string; content: string; date?: Date }) =>
            api.put(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${blogId}/updates/${updateId}`, data),

        deleteUpdate: (blogId: string, updateId: string) =>
            api.delete(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${blogId}/updates/${updateId}`),

        // FAQ Management
        getFAQs: (blogId: string) =>
            api.get(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${blogId}/faqs`),

        addFAQ: (blogId: string, data: { question: string; answer: string; displayOrder?: number }) =>
            api.post(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${blogId}/faqs`, data),

        updateFAQ: (blogId: string, faqId: string, data: { question?: string; answer?: string; displayOrder?: number }) =>
            api.put(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${blogId}/faqs/${faqId}`, data),

        deleteFAQ: (blogId: string, faqId: string) =>
            api.delete(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${blogId}/faqs/${faqId}`),

        // Comment Moderation
        getComments: (blogId: string, params?: { status?: string }) =>
            api.get(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/${blogId}/comments`, { params }),

        approveComment: (commentId: string) =>
            api.put(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/comments/${commentId}/approve`),

        rejectComment: (commentId: string) =>
            api.put(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/comments/${commentId}/reject`),

        markAsSpam: (commentId: string) =>
            api.put(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/comments/${commentId}/spam`),

        deleteComment: (commentId: string) =>
            api.delete(`${CATEGORY_BLOGS_BASE}/admin/category-blogs/comments/${commentId}`),
    },

    // ===== PUBLIC ENDPOINTS =====
    public: {
        getAll: (params?: { page?: number; limit?: number; search?: string; category?: string; product?: string }) =>
            api.get(`${CATEGORY_BLOGS_BASE}/public/category-blogs`, { params }),

        getBySlug: (slug: string) =>
            api.get(`${CATEGORY_BLOGS_BASE}/public/category-blogs/${slug}`),

        submitComment: (slug: string, data: { user: { name: string; email: string }; content: string }) =>
            api.post(`${CATEGORY_BLOGS_BASE}/public/category-blogs/${slug}/comments`, data),

        getComments: (slug: string) =>
            api.get(`${CATEGORY_BLOGS_BASE}/public/category-blogs/${slug}/comments`),
    },
};

export default categoryBlogsApi;
