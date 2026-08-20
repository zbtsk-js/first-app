import api  from "../http/index.js"; // твой axios экземпляр

class PaymentService {
    async checkOrder(orderId) {
        const response = await api.get(`/order/${orderId}`);
        return response.data;
    }
    async createPayment(orderData) {
        const response = await api.post('/payment/createPayment', orderData);
        return response
    }

}

export default new PaymentService();