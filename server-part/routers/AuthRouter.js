import {Router} from 'express';
import {authController, userController} from '../container.js';
import {body} from 'express-validator';

const AuthRouter = Router();

AuthRouter.post('/registration',
    [
        body('email').isEmail().withMessage('почта указана в неверном формате'),
        body('password').isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }).withMessage('пароль не соответсвует требованиям ')
    ],
    authController.registration
);
AuthRouter.post('/login', authController.login);
AuthRouter.post('/logout', authController.logout);
AuthRouter.get('/refresh', authController.refresh);
AuthRouter.get('/activate/:link', authController.activate);
AuthRouter.post('/lazyActivation', authController.lazyActivation);
AuthRouter.get('/getUserData', userController.getUserData);
AuthRouter.post('/google-login', authController.googleLogin);
AuthRouter.get('/users', userController.userstatus);

export default AuthRouter;
