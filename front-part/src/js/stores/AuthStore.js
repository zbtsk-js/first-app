import api from '../http/index.js'
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService.js";

class AuthStore {
    isAuth = false;
    user = {};
    AccessToken = null
    orders = []
    isAuthInProgress = false

    constructor() {
        makeAutoObservable(this);
    }
    setOrders(orders) {
        this.orders = orders;
    }
    setUser(user ) {
        this.user = user;}
    setAccessToken(AccessToken) {
        this.AccessToken = AccessToken;
        localStorage.setItem('AccessToken', AccessToken)
    }
    setAuth(isAuth) {
        this.isAuth = isAuth;
    }
    async SetAuthData(authResponse) {
        this.setAccessToken(authResponse.AccessToken)
        this.setAuth(true)
        this.setUser(authResponse.user)
        await this.fetchUserData()

    }

    async login(email, password) {
        this.isAuthInProgress = true
        try {
            const response = await AuthService.login(email, password)
           await this.SetAuthData(response)
        } finally {
            this.isAuthInProgress = false
        }
    }

    async registration(email, password) {
        this.isAuthInProgress = true
        try {
            const response = await AuthService.registration(email, password)
           await this.SetAuthData(response)
        } finally {
            this.isAuthInProgress = false
        }
    }

    async logout() {
        localStorage.removeItem('AccessToken')
        await AuthService.logout()
        this.setAuth(false)
        this.setUser({})
    }

    async googleLogin(credential) {
        this.isAuthInProgress = true
        try {
            const response = await api.post('/auth/google-login', { credential })
            await this.SetAuthData(response)
        } catch (e) {
            console.log('Google login store error:', e)
            throw e
        } finally {
            this.isAuthInProgress = false
        }
    }

    async fetchUserData() {
        const response = await AuthService.getUserData()
        this.setUser(response.User)
        this.setOrders(response.Orders)
    }

    async checkAuth(){
        if (this.isAuthInProgress) return
        this.isAuthInProgress = true
        try{
            const response = await api.get(`/auth/refresh`, {skipAuthRefresh:true })
            this.setAuth(true)
            this.setAccessToken(response.data.AccessToken)
            await this.fetchUserData()
        }catch(e){
            this.setAuth(false)
            this.setUser({})
        } finally {
            this.isAuthInProgress = false
        }
    }
}

export default new AuthStore()