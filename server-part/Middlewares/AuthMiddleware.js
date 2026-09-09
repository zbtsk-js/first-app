import {ApiError} from "../exceptions/exceptions.js";
import {tokenService} from "../container.js";

export default async function AuthMiddleware(req, res, next){
    try {
        const BearerToken = req.headers.authorization
        if(!BearerToken){
            throw ApiError.UnauthorizedError()
        }
        const AccessToken = BearerToken.split(' ')[1]
        if(!AccessToken){
            throw ApiError.UnauthorizedError()

        }
        const UserData = await tokenService.ValidateAccessToken(AccessToken)
        if(!UserData){
            throw ApiError.UnauthorizedError()
        }
        req.UserData = UserData
        next()
    }catch (e){next(ApiError.UnauthorizedError())}


}