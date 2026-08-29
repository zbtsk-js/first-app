export class PaymentService{
    constructor({Order, Product, MollieService}) {
        this.Order = Order;
        this.Product = Product;
        this.MollieService = MollieService;
    }
   async HandleWebhook(paymentID){
       const payment = await this.MollieService.getPayment(paymentID)  //это функция которая будет вызываться самим MollieAPI роут для нее мы указывали при создании молли пеймента в WebhookURL, также есть роут для этого вебхука чтоб оно вызывало это функцию
       const OrderId = payment.metadata.orderId; // достаем ордер айди того самого заказа и дальше ищем по ниму заказ в котором лежит вася инфа для создания полноценного юзера
       const order = await this.Order.findById(OrderId)

       if(!order){
           return
       }
       if (payment.status === 'paid') {
           order.status = 'paid'}
       else if (payment.status === 'canceled') {
           order.status = 'canceled'
       } else if (payment.status === 'failed') {
           order.status = 'failed'
       }
       await order.save();
   }
   async getProducts() {
       return await this.Product.find();
   }
}
