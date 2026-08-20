
import jwt from "jsonwebtoken";

export class TokenService {
    constructor(TokenModule) {
        this.TokenModule = TokenModule
    }
    async generateToken(payload){
        const AccessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '10s'})
        const RefreshToken = jwt.sign(payload, process.env.JWT_RefreshSECRET, {expiresIn: '30d'})
        return {AccessToken, RefreshToken}
    }
    async SaveToken(userId, refreshToken){
        console.log('SaveToken called with userId:', userId, 'refreshToken length:', refreshToken?.length)
        if (!userId) {
            console.log('SaveToken: userId is missing!')
            return null
        }
        const token = await this.TokenModule.findOneAndUpdate(
            { user: userId },
            { refreshToken },
            { upsert: true, new: true }
        )
        console.log('SaveToken result user id:', token?.user)
        return token
    }
    async DeleteToken(refreshToken){
        const TokenData = await this.TokenModule.deleteOne({refreshToken})
        return TokenData
    }
    async ValidateRefreshToken(token){
        try{
            const checkedRefreshToken= jwt.verify(token, process.env.JWT_RefreshSECRET)
            return checkedRefreshToken
        }catch (e){
            return null
        }

    }

    async ValidateAccessToken(token){
        try{
            const checkedAccessToken = jwt.verify(token, process.env.JWT_SECRET)
            return checkedAccessToken
        }catch{return null}
    }
    async SearchToken(refreshToken){
        try{
            const SearchResult = await this.TokenModule.findOne({refreshToken})
            return SearchResult
        }catch{return null}

    }
}
