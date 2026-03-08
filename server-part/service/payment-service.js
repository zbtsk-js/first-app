import MollieService from "./mollie-service.js";
import Order from "../Models/Order.js";
import ProductData from "../data/ProductData.js";
import OrderService from "./order-service.js";

class PaymentService{
   async createOrder({email, items}){
       const amount = items.reduce((total, item) => {
           const product = ProductData.find(prod => prod.id == item.productId)
           if (!product) throw new Error('Product not found')
           return total + (product.price * item.quantity)
       }, 0)
       const order = await OrderService.createOrder({email, amount, items})
       const payment = await MollieService.createPayment(order)
       order.mollieId = payment.id;
       await order.save();
       return payment;
   }
   async getOrder(orderId){
           const order = await Order.findById(orderId);
           return order;
   }
   async HandleWebhook(paymentID){
       const payment = await MollieService.getPayment(paymentID)  //это функция которая будет вызываться самим MollieAPI роут для нее мы указывали при создании молли пеймента в WebhookURL, также есть роут для этого вебхука чтоб оно вызывало это функцию
       const OrderId = payment.metadata.orderId;
       const order = await Order.findById(OrderId)
       if(!order){
           return null
       }
       if (payment.status === 'paid') {
           order.status = 'paid'
       } else if (payment.status === 'canceled') {
           order.status = 'canceled'
       } else if (payment.status === 'failed') {
           order.status = 'failed'
       }
       await order.save();
   }
}
export default new PaymentService()