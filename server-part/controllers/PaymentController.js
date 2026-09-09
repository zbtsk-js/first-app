
export class PaymentController {
    constructor(PaymentService) {
        this.PaymentService = PaymentService;
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