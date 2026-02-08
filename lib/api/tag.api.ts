import axiosInstance from './axiosConfig';

const tagApi = {
    // Get all tags
    getAll: (params?: { type?: string; search?: string; page?: number; limit?: number }) => {
        return axiosInstance.get('/admin/tags', { params });
    },

    // Get tag by ID
    getById: (id: string) => {
        return axiosInstance.get(`/admin/tags/${id}`);
    },

    // Get popular tags
    getPopular: (limit: number = 20, type?: string) => {
        return axiosInstance.get('/admin/tags/popular', { params: { limit, type } });
    },

    // Get tag suggestions (autocomplete)
    getSuggestions: (searchTerm: string, limit: number = 10, type?: string) => {
        return axiosInstance.get('/admin/tags/suggestions', { params: { searchTerm, limit, type } });
    },

    // Create tag
    create: (data: { name: string; type: string; description?: string }) => {
        return axiosInstance.post('/admin/tags', data);
    },

    // Update tag
    update: (id: string, data: { name?: string; type?: string; description?: string; isActive?: boolean }) => {
        return axiosInstance.put(`/admin/tags/${id}`, data);
    },

    // Delete tag
    delete: (id: string, replacementTagId?: string) => {
        return axiosInstance.delete(`/admin/tags/${id}`, { data: { replacementTagId } });
    },

    // Merge tags
    merge: (tagIds: string[], primaryTagId: string) => {
        return axiosInstance.post('/admin/tags/merge', { tagIds, primaryTagId });
    },
};

export default tagApi;
