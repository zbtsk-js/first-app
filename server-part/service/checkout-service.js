export class CheckoutService {
    constructor({ OrderService, ProductModule, MollieService, UserService, MailService }) {
        this.OrderService = OrderService;
        this.ProductModule = ProductModule;
        this.MollieService = MollieService;
        this.UserService = UserService;
        this.MailService = MailService;
    }

    async createCheckOut(orderData) {
        const productIds = orderData.items.map(item => item.productId)
        const products = await this.ProductModule.find({ id: { $in: productIds } })
        const amount = products.reduce((sum, item) => {
            const product = orderData.items.find(p => p.productId === item.id);
            return sum + item.price * product.quantity;
        }, 0);
        const order = await this.OrderService.createOrder({
            customerData: {
                email: orderData.email,
                firstName: orderData.firstName,
                lastName: orderData.lastName,
                phone: orderData.phone,
                address: orderData.address,
                city: orderData.city,
                postcode: orderData.postcode,
                country: orderData.country,
            },
            amount,
            items: orderData.items,
        })
        const payment = await this.MollieService.createPayment(order) //создаем платежку по  дата ордера который пришел с фронта, в Mollie в метадату потом запишеться айди этого заказа
        await this.OrderService.attachPayment(order._id, payment.id)
        return payment;
    }

    async handlePaidOrder(orderId) {
        const Order = await this.OrderService.getOrder(orderId);
        let UserData = null;

        if (Order.status === 'paid') {
            const productIds = Order.items.map(item => item.productId)
            const ProductData = await this.ProductModule.find({ id: { $in: productIds } })
            UserData = await this.UserService.LazyRegister(Order.customerData, Order.items)
            Order.user = UserData.user.id
            await Order.save()
            try {
                await this.MailService.SuccessfullPurchase({
                    to: Order.customerData.email,
                    OrderData: Order,
                    ProductData: ProductData
                })
            } catch (err) {
                console.error('Failed to send success email', err);
            }
        }
        if (!UserData) {
            throw new Error('Order is not paid or user already exists')
        }
        return { UserData, Order }
    }
}