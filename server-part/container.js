import { UserService } from './service/user-service.js';
import { MailService } from './service/mail-service.js';
import { TokenService } from './service/token-service.js';
import { OrderService } from './service/order-service.js';
import { MollieService } from './service/mollie-service.js';
import {PaymentService} from "./service/payment-service.js";
import UserModule from './Models/User.js';
import TokenModule from './Models/token-model.js';
import OrderModule from './Models/Order.js';
import ProductModule from './Models/Product.js';
import { CheckoutService } from './service/checkout-service.js';
import CheckoutController from './controllers/CheckOutController.js';
import { OrderController } from './controllers/OrderController.js';
import { UserController } from './controllers/UserController.js';
import { PaymentController } from './controllers/PaymentController.js';
import { AuthController } from './controllers/AuthController.js';
import { EmailController} from "./controllers/EmailController.js";
// 1. Инициализация базовых сервисов
const mailService = new MailService();
const tokenService = new TokenService(TokenModule);
const mollieService = new MollieService();

// 2. Инициализация UserService (зависит от других сервисов)
const userService = new UserService({
    MailService: mailService,
    TokenService: tokenService,
    UserModule: UserModule,
    OrderModule: OrderModule
});
const orderService = new OrderService({
    OrderModule: OrderModule,
    ProductModule: ProductModule,
    UserService: userService,
    MailService: mailService,
});

const paymentService = new PaymentService({Order: OrderModule, MollieService: mollieService,Product: ProductModule, OrderService: orderService});
const checkoutService = new CheckoutService({
    OrderService: orderService,
    ProductModule: ProductModule,
    MollieService: mollieService,
    UserService: userService,
    MailService: mailService,
});

// 3. Инициализация контроллеров
const authController = new AuthController(userService);
const checkoutController = new CheckoutController(checkoutService);
const orderController = new OrderController({
    OrderService: orderService,
});
const userController = new UserController(userService, UserModule);
const emailController = new EmailController(userServicee);
const paymentController = new PaymentController(paymentService);
export {
    userService,
    mailService,
    tokenService,
    checkoutService,
    orderService,
    mollieService,
    paymentService,
    authController,
    orderController,
    userController,
    emailController,
    paymentController,
    checkoutController,
};
