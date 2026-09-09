import api  from "../http/index.js"; // твой axios экземпляр

class PaymentService {
    async checkOrder(orderId) {
        const response = await api.get(`/checkout/${orderId}`);
        return response.data;
    }

}

export default new PaymentService();