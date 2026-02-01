import UserModule from '../Models/User.js';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from "uuid";
import TokenService from './token-service.js'
import UserDto from '../dtos/user-dto.js'
import MailService from './mail-service.js'
import {ApiError} from "../exceptions/exceptions.js";
 class UserService {
    async Registration(email, password){
const candidate = await UserModule.findOne({ email})
        if(candidate){
            throw ApiError.BadRequestError(`user with email ${email} already exists`)
        }
        const hashedPassword = await bcrypt.hash(password, 6);
        const activationLink = uuidv4()
        const User = await UserModule.create({email, password: hashedPassword, activationLink})
        const userDto = new UserDto(User)
        const tokens = await TokenService.generateToken({...userDto})
        await TokenService.SaveToken(userDto.id, tokens.RefreshToken)
       await MailService.SendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)
return  {
            ...tokens, user: userDto
}
    }
    async LinkActivation(link){
       const User = await UserModule.findOne({activationLink: link})
        if(!User){
            throw ApiError.BadRequestError('invalid link')
        }
        User.IsActivated = true
        await User.save()
    }
    async Login(email, password){
        const User = await UserModule.findOne({email})
        if(!User){
            throw ApiError.BadRequestError('such user doesnt exist')
        }
        const isPasswordValid = await bcrypt.compare(password, User.password)
        if(!isPasswordValid){
            throw ApiError.BadRequestError('invalid password')
        }
        const userDto = new UserDto(User)
        const tokens = await TokenService.generateToken({...userDto})
        await TokenService.SaveToken(userDto.id, tokens.RefreshToken)
        return tokens
    }
    async logout(refreshToken){
       const token = await TokenService.DeleteToken(refreshToken)
        return token
    }
     async refresh(RefreshToken){
        if(!RefreshToken){
       return ApiError.UnauthorizedError()
            }
        const UserData =  await TokenService.ValidateRefreshToken(RefreshToken)
         const tokenFromDB = await TokenService.SearchToken(RefreshToken)
         if(!tokenFromDB||!UserData){
             throw ApiError.UnauthorizedError()

         }
         const User = await UserModule.findById(UserData.id)
         const userDto = new UserDto(User)
         const tokens = await TokenService.generateToken({...userDto})
         await TokenService.SaveToken(userDto.id, tokens.RefreshToken)
         return tokens

     }
}
export default new UserService()