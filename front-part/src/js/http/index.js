import axios from 'axios';
import { createAuthRefresh } from 'axios-auth-refresh';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,

})

api.interceptors.request.use(config => {
    // Если запрос уже идет на refresh, не добавляем токен (не мешаем)
    if (config._isRefresh) return config;
    
    const token = localStorage.getItem('AccessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

const RefreshAuthLogic = async (failedRequest) => {
    try {
        const response = await api.get(`/auth/refresh`, {
            _isRefresh: true,
            skipAuthRefresh: true,
        })
        const newToken = response.data.AccessToken;
        localStorage.setItem('AccessToken', newToken);
        failedRequest.response.config.headers.Authorization = `Bearer ${newToken}`;
        return response;
    } catch (e) {
        localStorage.removeItem('AccessToken');
        return Promise.reject(e)
    }
};

createAuthRefresh(api, RefreshAuthLogic, {
    pauseInstanceWhileRefreshing: true
});

api.interceptors.response.use(
    (response) => response, (error) => {
        if (error.config?._isRefresh || error.response?.status === 401 && error.config?.url?.includes('/refresh')) {
            localStorage.removeItem('AccessToken');
            delete api.defaults.headers.common.Authorization;
        }
        return Promise.reject(error);
    }
);

export default api;

