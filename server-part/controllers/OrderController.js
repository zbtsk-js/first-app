

export class OrderController {
    constructor({OrderService}) {
        this.OrderService = OrderService;
    }
    CheckOrder = async (req, res, next) => {
        try {
            const orderId = req.params.orderId;
            const {UserData, Order} = await this.OrderService.finalizeOrder(orderId)
            if (UserData?.RefreshToken){
                const maxAge = 30 * 24 * 60 * 60 * 1000
                res.cookie('refreshToken', UserData.RefreshToken, {maxAge: maxAge, httpOnly: true, sameSite: 'lax'})
            }
            return res.json({
                status:      Order.status,
                amount:      Order.amount,
                items:       Order.items,
            })
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Invalid order ID" });
        }

    }

}