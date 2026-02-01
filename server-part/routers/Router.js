import {Router } from "express";
import {AuthController} from "../controllers/AuthController.js";
import  {body} from "express-validator";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

const router = Router();
const AuthService = new AuthController();



router.post('/login',  AuthService.login )
router.post('/register',[body('email').isEmail().withMessage('почта указана в неверном формате'),
    body('password').isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }).withMessage('пароль не соответсвует требованиям ')
    ], AuthService.registration)
 router.post('/logout', AuthService.logout )
 router.get('/refresh', AuthService.refresh)
 router.get('/activate/:link', AuthService.activate)
router.get('/users', AuthService.userstatus)

export default router;