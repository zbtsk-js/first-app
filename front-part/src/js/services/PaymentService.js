import api  from "../http/index.js"; // твой axios экземпляр

class PaymentService {
    async getOrderStatus(orderId) {
        const response = await api.get(`/auth/order/${orderId}`);
        return response.data;
    }
    async createPayment(orderData) {
        const response = await api.post('/auth/createPayment', orderData);
        return response
    }
}

export default new PaymentService();