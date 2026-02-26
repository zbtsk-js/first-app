import PaymentService from "../service/payment-service.js";
export class PaymentController {
    async CreatePayment(req, res, next){
        try {
            const {email, items} = req.body;
            const checkoutUrl = await PaymentService.createOrder({ email, items })
            res.json({ checkoutUrl })
        } catch (e) {
            next(e)
        }
    }
    async Webhook(req, res){
        try {
            const { id } = req.body
            await PaymentService.HandleWebhook(id)
            res.sendStatus(200)
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
}
