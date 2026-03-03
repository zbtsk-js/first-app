import PaymentService from "../service/payment-service.js";
export class PaymentController {
    async CreatePayment(req, res, next){
        try {
            const {email, items} = req.body;
            const payment = await PaymentService.createOrder({ email, items })
            res.json({ checkoutUrl: payment._links.checkout.href })
        } catch (e) {
            next(e)
        }
    }
    async Webhook(req, res){
        try {
            const { id } = req.body
            console.log(id)
            await PaymentService.HandleWebhook(id)
            res.sendStatus(200)
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
    async GetOrderInfo(req, res) {
        try {
            const orderId = req.params.orderId;
            const OrderData = await PaymentService.getOrder(orderId);
            if (!OrderData) {
                return res.status(403).json({ message: "Order not found" });
            }
            console.log(OrderData)
            res.json({
                id: OrderData._id,
                status: OrderData.status,
                amount: OrderData.amount,
                items: OrderData.items,
            });

        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Invalid order ID" });
        }
    }
}