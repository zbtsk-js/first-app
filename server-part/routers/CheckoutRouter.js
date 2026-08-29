import {Router} from "express";
import {checkoutController} from "../container.js";

const checkoutRouter = new Router();

checkoutRouter.post('/', checkoutController.createCheckOut)
checkoutRouter.get('/:orderId', checkoutController.handlePaidOrder)

export default checkoutRouter;