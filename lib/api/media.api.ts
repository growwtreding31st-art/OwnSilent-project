import api from './axiosConfig';

const mediaApi = {
    getGallery: (page: number = 1, limit: number = 20, search: string = '') => {
        return api.get(`/admin/media`, {
            params: { page, limit, search }
        });
    }
};

export default mediaApi;
