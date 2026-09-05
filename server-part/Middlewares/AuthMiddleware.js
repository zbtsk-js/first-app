import {ApiError} from "../exceptions/exceptions.js";
import {TokenService} from "../service/token-service.js"
export default function AuthMiddleware(req, res, next){
    try {
        const BearerToken = req.headers.authorization
        if(!BearerToken){
            throw ApiError.UnauthorizedError()
        }
        const AccessToken = BearerToken.split(' ')[1]
        if(!AccessToken){
            throw ApiError.UnauthorizedError()

        }
        const UserData = TokenService.ValidateAccessToken(AccessToken)
        if(!userData){
            throw ApiError.UnauthorizedError()
        }
        req.UserData = UserData
        next()
    }catch (e){next(ApiError.UnauthorizedError())}


}