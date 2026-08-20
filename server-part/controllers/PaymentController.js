
export class PaymentController {
    constructor(PaymentService) {
        this.PaymentService = PaymentService;
    }
    CreatePayment = async (req, res, next) => {
        try {
            const orderData = req.body;
            console.log(orderData)
            const payment = await this.PaymentService.createCheckOut(orderData)
            res.json({ checkoutUrl: payment._links.checkout.href })
        } catch (e) {
            next(e)
        }
    }
    Webhook = async (req, res) => {
        try {
            const { id } = req.body
            console.log(id)
            await this.PaymentService.HandleWebhook(id)
            res.sendStatus(200)
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
    getProducts = async (req, res, next) => {
        try {
            const products = await this.PaymentService.getProducts();
            res.json(products);
        } catch (e) {
            next(e);
        }
    }
}