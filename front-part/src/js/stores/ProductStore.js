// store/ProductStore.js
import {makeAutoObservable} from 'mobx'
import api from '../http/index.js'

class ProductStore {
    products = []

    constructor() {
        makeAutoObservable(this)
        this.fetchProducts()
    }

    async fetchProducts() {
        try {
            const res = await api.get('/payment/products')
            this.products = res.data
        } catch (e) {
            console.error("Ошибка при загрузке продуктов:", e)
        }
    }
}

export default new ProductStore()