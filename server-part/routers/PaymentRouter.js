import {Router} from "express";
import {paymentController} from "../container.js";

const PaymentRouter = Router();

PaymentRouter.post("/createPayment", paymentController.CreatePayment)
PaymentRouter.post("/webhook", paymentController.Webhook)
PaymentRouter.get('/products', paymentController.getProducts)

export default PaymentRouter;