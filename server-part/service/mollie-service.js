import { createMollieClient } from '@mollie/api-client'

export class MollieService {
    constructor() {
        this.client = createMollieClient({apiKey: process.env.MOLLIE_API_KEY})
    }
    async createPayment(order){
         const MolliePayment = await this.client.payments.create({
            amount: { currency: 'NOK', value: order.amount.toFixed(2) },
            description: `Order ${order._id}`,
            redirectUrl: `${process.env.REDIRECT_URL}/success?orderID=${order._id}`,
            webhookUrl: `${process.env.API_URL}/payment/webhook`,
            metadata: { orderId: order._id.toString() }
        })
        return MolliePayment;
    }
    async getPayment(paymentId) {
        return await this.client.payments.get(paymentId);
    }
}