 import {ApiError} from "../exceptions/exceptions.js";

 export class OrderService {
     constructor({OrderModule, ProductModule, UserService, MailService}) {
         this.OrderModule = OrderModule;
         this.ProductModule = ProductModule;
         this.UserService = UserService;
         this.MailService = MailService;
     }
     async createOrder(data) {
         const order = await this.OrderModule.create({
             customerData: data.customerData,
             amount: data.amount,
             items: data.items
         })
         return order;
     }
     async getOrder(orderId) {
         const order = await this.OrderModule.findById(orderId)
         if (!order) {
             throw ApiError.NotFoundError('Order not found')
         }
         return order;
     }
     async attachPayment(orderId, paymentId) {
         const order = await this.OrderModule.findById(orderId);

         order.mollieId = paymentId;

         return order.save();
     }}




