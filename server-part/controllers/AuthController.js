 import UserService from "../service/user-service.js";
import User from "../Models/User.js"
import {validationResult} from "express-validator";
import dotenv from 'dotenv'
import {ApiError} from "../exceptions/exceptions.js";
import {json} from "express";
dotenv.config()

export class AuthController{
    async registration(req, res,next)  {
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
            const UserData = await UserService.Registration(email, password)
res.cookie('refreshToken', UserData.RefreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 // 30 дней

})
            return res.json(UserData)
        } catch (error) {
            next(error)
        }
    }
    async activate(req, res, next){
try{
    const ActivationLink = req.params.link
    await UserService.LinkActivation(ActivationLink)
    return res.redirect(process.env.CLIENT_URL)
}catch(e){next(e)}
    }
    async login(req, res, next){
        try {
            const {email, password} = req.body
            const UserData = await UserService.Login(email, password)
            res.cookie('refreshToken', UserData.RefreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000}) // 30 дней
            return res.json(UserData)
        } catch (error) {
            next(error)
        }
    }
    async userstatus(req, res){
        try {
        const users = await User.find()
        return res.json(users)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'failed to fetch users'})
        }
    }
    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies
            res.clearCookie('refreshToken')
            const token = await UserService.logout(refreshToken)
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.RefreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }


}

