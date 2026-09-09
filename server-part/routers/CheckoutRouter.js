import {Router} from "express";
import {checkoutController} from "../container.js";
import FormMiddleware from "../Middlewares/FormMiddleware.js";

const checkoutRouter = new Router();

checkoutRouter.post('/',[FormMiddleware], checkoutController.createCheckOut)
checkoutRouter.get('/:orderId', checkoutController.handlePaidOrder)

export default checkoutRouter;