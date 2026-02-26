import { createMollieClient } from '@mollie/api-client'
const MollieClient = createMollieClient({apiKey: process.env.MOLLIE_API_KEY})

class MollieService {
    async createPayment(order){
         const MolliePayment = await MollieClient.payments.create({
            amount: { currency: 'NOK', value: order.amount.toFixed(2) },
            description: `Order ${order._id}`,
            redirectUrl: `${process.env.API_URL}`,
            webhookUrl: `${process.env.API_URL}webhook`,
            metadata: { orderId: order._id.toString() }
        })
        return MolliePayment;

    }
    async getPayment(paymentId) {
        return await MollieClient.payments.get(paymentId);
    }}
export default new MollieService()