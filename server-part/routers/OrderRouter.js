import {Router} from "express";
import {orderController} from "../container.js";

const OrderRouter = Router();

OrderRouter.get('/:orderId', orderController.CheckOrder)

export default OrderRouter;
