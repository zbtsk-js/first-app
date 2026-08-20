import {Router } from "express";
import {AuthController} from "../controllers/AuthController.js";
import {PaymentController} from "../controllers/PaymentController.js";
import  {body} from "express-validator";
import Product from "../Models/Product.js";
import {OrderController} from "../controllers/OrderController.js";
const router = Router();

const AuthService = new AuthController();
const PaymentService = new PaymentController();
const OrderService = new OrderController();

router.post('/login',  AuthService.login )
router.post('/register',[body('email').isEmail().withMessage('почта указана в неверном формате'),
    body('password').isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }).withMessage('пароль не соответсвует требованиям ')
    ], AuthService.registration)
router.get('/checkEmail', AuthService.checkifEmailexists)
 router.post('/logout', AuthService.logout )
 router.get('/refresh', AuthService.refresh)
 router.get('/activate/:link', AuthService.activate)
router.get('/users', AuthService.userstatus)
router.post("/createPayment", PaymentService.CreatePayment)
router.post("/webhook", PaymentService.Webhook)
router.get ('/order/:orderId', OrderService.CheckOrder )
router.get ('/getEmailbyTheLink', AuthService.getEmailbyTheLink)
router.post ('/lazyActivation', AuthService.lazyActivation)
router.get ('/getUserData', AuthService.getUserData)
router.post('/google-login', AuthService.googleLogin)
router.get('/products', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (e) {
        next(e)
    }
})
export  default router;