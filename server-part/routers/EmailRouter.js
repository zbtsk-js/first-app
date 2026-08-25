import {emailController} from "../container.js";
import {Router} from "express";
const EmailRouter = Router();

EmailRouter.get('/checkEmail', emailController.checkifEmailexists)
EmailRouter.get ('/getEmailbyTheLink', emailController.getEmailbyTheLink)
export default EmailRouter;
