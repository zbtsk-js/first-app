class CheckoutController {
    constructor(CheckoutService) {
        this.CheckoutService = CheckoutService;
    }

    createCheckOut = async (req, res, next) => {
        try {
            console.log('info', req.body)
            const result = await this.CheckoutService.createCheckOut(req.body);
            res.json({ checkoutUrl: result._links.checkout.href });
        } catch (error) {
            next(error);
        }
    };

    handlePaidOrder = async (req, res, next) => {
        try {
            const orderId = req.params.orderId;
            const { UserData, Order } = await this.CheckoutService.handlePaidOrder(orderId);
            if (UserData?.RefreshToken) {
                const maxAge = 30 * 24 * 60 * 60 * 1000;
                res.cookie('refreshToken', UserData.RefreshToken, { maxAge: maxAge, httpOnly: true, sameSite: 'lax' });
            }
            return res.json({
                status: Order.status,
                amount: Order.amount,
                items: Order.items,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default CheckoutController;
