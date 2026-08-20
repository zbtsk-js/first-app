import api from '../http/index'
export default class AuthService {
    static async login(email, password) {
        const response = await api.post('/auth/login', {email, password})
        return response.data
    }

    static async registration(email, password) {
        const response = await api.post('/auth/registration', {email, password})
        return response.data}

    static async logout() {
        const response = await api.post('/auth/logout')
        return response.data
    }
    static  async checkifEmailexists(email) {
        const response = await api.get(`/emails/checkEmail`, { params: { email } });
        console.log(response.data)
        return response.data;
    }
    static async getEmailbyTheLink(registrationToken) {
        const response = await api.get(`/emails/getEmailbyTheLink`, { params: { registrationToken } });
        console.log(response.data)
        return response.data;
    }
    static async LazyActivation(password, registrationToken) {
        const response = await api.post(`/auth/lazyActivation`, { password, registrationToken});
        console.log(response.data)
        return response.data;
    }
    static async getUserData() {
        const response = await api.get(`/auth/getUserData`);
        return response.data;
    }
}