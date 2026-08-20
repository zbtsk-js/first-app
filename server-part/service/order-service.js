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
    async finalizeOrder(orderId) {
         const Order = await this.getOrder(orderId);
         let UserData = null;

        if(Order.status === 'paid'){
            const productIds = Order.items.map(item => item.productId)
            const ProductData = await this.ProductModule.find({id: {$in: productIds}})
             UserData = await this.UserService.LazyRegister(Order.customerData, Order.items)
            Order.user = UserData.user.id
            await Order.save()
            try {
                await this.MailService.SuccessfullPurchase({to: Order.customerData.email, OrderData: Order, ProductData: ProductData})
            } catch (err) {
                console.error('Failed to send activation email');
                // ✅ ОБОРАЧИВАТЬ — юзер уже создан, письмо не обязано блокировать успех
            }
     }
        return {UserData, Order}
 }}




