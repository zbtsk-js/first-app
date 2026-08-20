import {authController} from "../container.js";
import {Router} from "express";
const EmailRouter = Router();

EmailRouter.get('/checkEmail', authController.checkifEmailexists)
EmailRouter.get ('/getEmailbyTheLink', authController.getEmailbyTheLink)
export default EmailRouter;
