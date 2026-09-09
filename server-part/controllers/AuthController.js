import {validationResult} from "express-validator";
import {setAuthCookie} from "../utils/cookie.js";
import dotenv from 'dotenv'
import {ApiError} from "../exceptions/exceptions.js";
dotenv.config()


export class AuthController{
    constructor(UserService) {
        this.UserService = UserService;
    }
    registration = async (req, res, next) => {
        try {
            const {email, password} = req.body
            const errors = validationResult(req)
            const FormattedErrors = errors.array().map(err => {
                return {
                    field: err.path,
                    message: err.msg
                }
            })
            if(!errors.isEmpty()){
                throw ApiError.BadRequestError('Validation error', FormattedErrors)
            }
            const UserData = await this.UserService.Registration(email, password)
            setAuthCookie(res, UserData.RefreshToken,)

            return res.json(UserData)
        } catch (error) {
            next(error)
        }
    }
    activate = async (req, res, next) => {
try{
    const ActivationLink = req.params.link
    await this.UserService.LinkActivation(ActivationLink)
    return res.redirect(process.env.CLIENT_URL)
}catch(e){next(e)}
    }
    login = async (req, res, next) => {
        try {
            const {email, password} = req.body
            const UserData = await this.UserService.Login(email, password)
            setAuthCookie(res, UserData.RefreshToken,)
            return res.json(UserData)
        } catch (error) {
            next(error)
        }
    }
    logout = async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies
            res.clearCookie('refreshToken')
            const token = await this.UserService.logout(refreshToken)
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
    refresh = async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies;
            const UserData = await this.UserService.refresh(refreshToken);
            setAuthCookie(res, UserData.RefreshToken)
            return res.json(UserData);
        } catch (e) {
            next(e)
        }
    }
    lazyActivation = async (req, res, next) => {
        try {
            const {registrationToken, password} = req.body
            const UserData = await this.UserService.LazyActivation(registrationToken, password)
            setAuthCookie(res, UserData.RefreshToken,)
            return res.json(UserData)
        }catch(e){
next(e)        }
    }
    googleLogin = async (req, res, next) => {
        try {
            const {credential} = req.body
            const UserData = await this.UserService.GoogleLogin(credential)
            setAuthCookie(res, UserData.RefreshToken,)

            return res.json(UserData)
        }catch(e){
            next(e)
        }
    }
}

