export class PaymentService{
    constructor({Order, OrderService, Product, MollieService}) {
        this.Order = Order;
        this.OrderService = OrderService;
        this.Product = Product;
        this.MollieService = MollieService;
    }
   async createCheckOut(orderData){
       const products = await this.Product.find()
       const amount = orderData.items.reduce((total, item) => {
           const product = products.find(prod => prod.id === item.productId)
           if (!product)   throw new Error('Product not found')
           return total + (product.price * item.quantity)
       }, 0)
       const order = await this.OrderService.createOrder({
           customerData: {
               email:     orderData.email,
               firstName: orderData.firstName,  // ← отдельно
               lastName:  orderData.lastName,   // ← отдельно
               phone:     orderData.phone,
               address:   orderData.address,
               city:      orderData.city,
               postcode:  orderData.postcode,
               country:   orderData.country,
           },
           amount,
           items: orderData.items,
       })
       const payment = await this.MollieService.createPayment(order) // создаем платежку по  дата ордера который пришел с фронта, в Mollie в метадату потом запишеться айди этого заказа
       order.mollieId = payment.id;
       await order.save();
       return payment;
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
