import MollieService from "./mollie-service.js";
import Order from "../Models/Order.js";
import ProductData from "../data/ProductData.js";

class PaymentService{
   async createOrder({email, items}){
       const amount = items.reduce((total, item) => {
           const product = ProductData.find(prod => prod.id == item.productId)
           if (!product) throw new Error('Product not found')
           return total + (product.price * item.quantity)
       }, 0)
       const order = await Order.create({email, amount, items, status: 'pending'})
       const payment = await MollieService.createPayment(order)
       order.mollieId = payment.id;
       await order.save();
       return payment;
   }
   async HandleWebhook(paymentID){
       const payment = await MollieService.getPayment(paymentID)  //это функция которая будет вызываться самим MollieAPI роут для нее мы указывали при создании молли пеймента в WebhookURL, также есть роут для этого вебхука чтоб оно вызывало это функцию
       const OrderId = payment.metadata.orderId;
       const order = await Order.findById(OrderId)
       if(!order){
           return null
       }
       if (payment.isPaid()) {
           order.status = 'paid'
       } else if (payment.isCanceled()) {
           order.status = 'canceled'
       } else if (payment.isFailed()) {
           order.status = 'failed'
       }
       await order.save();
       return order
   }
}
export default new PaymentService()