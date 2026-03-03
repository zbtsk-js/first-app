import api  from "../http/index.js"; // твой axios экземпляр

class PaymentService {
    async getOrderStatus(orderId) {
        const response = await api.get(`/auth/order/${orderId}`);
        return response.data;
    }
}

export default new PaymentService();