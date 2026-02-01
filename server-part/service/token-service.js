import jwt from "jsonwebtoken";
import TokenModule from '../Models/token-model.js'

  class TokenService {
    async generateToken(payload){
            const Acesstoken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '10s'})
        const RefreshToken = jwt.sign(payload, process.env.JWT_RefreshSECRET, {expiresIn: '14d'})
        return {Acesstoken, RefreshToken}
    }
    async SaveToken(userId, refreshToken){
const UserExists = await TokenModule.findOne({user: userId})
        if(UserExists){
            UserExists.refreshToken = refreshToken
            return await UserExists.save();
        }
        const token = await TokenModule.create({user: userId,refreshToken })
        return token
    }
    async DeleteToken(refreshToken){
     const TokenData = TokenModule.deleteOne({refreshToken})
        return TokenData
    }
    async ValidateRefreshToken(token){
        try{
            const checkedRefreshToken= jwt.verify(token, process.env.JWT_RefreshSECRET)
            return checkedRefreshToken
        }catch (e){throw Error('invalid token')}

    }

    async ValidateAccessToken(token){
        try{
            const checkedAcessToken = jwt.verify(token, process.env.JWT_SECRET)
            return checkedAcessToken
        }catch{return null}
    }
    async SearchToken(refreshToken){
        try{
            const SearchResult = await TokenModule.findOne({refreshToken})
            return SearchResult
        }catch{return null}

    }
}
export default new TokenService()