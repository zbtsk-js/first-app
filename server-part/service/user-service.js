import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from "uuid";
import UserDto from '../dtos/user-dto.js'
import {ApiError} from "../exceptions/exceptions.js";
import { OAuth2Client } from 'google-auth-library';

export class UserService {
    constructor({MailService, TokenService, UserModule, OrderModule}) {
        this.MailService = MailService
        this.TokenService = TokenService
        this.UserModule = UserModule
        this.OrderModule = OrderModule
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    async Registration(email, password){
        const candidate = await this.UserModule.findOne({ email})
        if(candidate){
            throw ApiError.BadRequestError(`user with email ${email} already exists`)
        }
        const hashedPassword = await bcrypt.hash(password, 6);
        const activationLink = uuidv4()
        const user = await this.UserModule.create({email, password: hashedPassword, activationLink})
        const userDto = new UserDto(user)
        const tokens = await this.TokenService.generateToken({...userDto})
        await this.TokenService.SaveToken(userDto.id, tokens.RefreshToken)
        await this.MailService.SendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

        return  {
            ...tokens, user: userDto
        }
    }
    async LazyRegister(UserInfo, items = []) {
        const candidate = await this.UserModule.findOne({email: UserInfo.email})
        if(candidate){
            const userDto = new UserDto(candidate)
            const tokens = await this.TokenService.generateToken({...userDto})
            await this.TokenService.SaveToken(userDto.id, tokens.RefreshToken)
            return { ...tokens, user: userDto }
        }

        const registrationLink = uuidv4()
        const  Lazyuser = await this.UserModule.create({...UserInfo, registrationToken: registrationLink})
        const timeMinutes = 60
        Lazyuser.registrationTokenExpires = Date.now() + (timeMinutes * 60 * 1000)
        await Lazyuser.save()
        const userDto = new UserDto(Lazyuser)
        const tokens = await this.TokenService.generateToken({...userDto})
        await this.TokenService.SaveToken(userDto.id, tokens.RefreshToken)
        return { ...tokens, user: userDto }
    }
    async LazyActivation(token, password){
        const user = await this.UserModule.findOne({registrationToken: token})
        if(!user){
            throw ApiError.BadRequestError('invalid link')
        }
        const now = Date.now()
        if(!user.registrationTokenExpires){
            throw ApiError.BadRequestError('invalid tokendate')
        }

        const expirationTime = new Date(user.registrationTokenExpires)

        if ( expirationTime < now) {
            throw ApiError.BadRequestError('Срок действия ссылки истёк')
        }
        user.IsActivated = true
        const hashedPassword = await bcrypt.hash(password, 6);
        user.password = hashedPassword
        user.registrationToken = null
        user.registrationTokenExpires = null
        await user.save()
        const userDto = new UserDto(user)
        const tokens = await this.TokenService.generateToken({...userDto})
        await this.TokenService.SaveToken(userDto.id, tokens.RefreshToken)
        return { ...tokens, user: userDto }
    }
    async LinkActivation(link){
        const user = await this.UserModule.findOne({activationLink: link})
        if(!user){
            throw ApiError.BadRequestError('invalid link')
        }
        user.IsActivated = true
        await user.save()
    }
    async Login(email, password){
        const user = await this.UserModule.findOne({email})
        if(!user){
            throw ApiError.BadRequestError('such user doesnt exist')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw ApiError.BadRequestError('invalid password')
        }
        const userDto = new UserDto(user)
        const tokens = await this.TokenService.generateToken({...userDto})
        await this.TokenService.SaveToken(userDto.id, tokens.RefreshToken)
        return  {
            ...tokens, user: userDto
        }
    }
    async logout(refreshToken){
        const token = await this.TokenService.DeleteToken(refreshToken)
        return token
    }
    async refresh(refreshToken){
        if(!refreshToken){
            console.log('refreshToken is not defined')
            throw ApiError.UnauthorizedError()
        }

        const UserData = await this.TokenService.ValidateRefreshToken(refreshToken)
        const tokenFromDB = await this.TokenService.SearchToken(refreshToken)

        if (!UserData) {
            throw ApiError.UnauthorizedError()
        }

        if (!tokenFromDB) {
            const userExists = await this.UserModule.findById(UserData.id)
            if (!userExists) {
                throw ApiError.UnauthorizedError()
            }
        }

        const user = await this.UserModule.findById(UserData.id)
        if (!user) {
            throw ApiError.UnauthorizedError()
        }
        const userDto = new UserDto(user)
        const tokens = await this.TokenService.generateToken({...userDto})
        await this.TokenService.SaveToken(userDto.id, tokens.RefreshToken)
        return {
            ...tokens, user: userDto
        }
    }
    async checkifEmailexists(email){
        const user = await this.UserModule.findOne({email})
        if(!user){
            return {exists: false}
        }
        return {exists: true}
    }
    async getEmailbyTheLink(registrationToken){
        const user = await this.UserModule.findOne({registrationToken})
        if (!user) {
            throw ApiError.BadRequestError('invalid link')
        }
        return user.email
    }
    async getUserData(AccessToken){
        const UserData =  await this.TokenService.ValidateAccessToken(AccessToken)
        if (!UserData) {
            throw ApiError.UnauthorizedError()
        }
        const user = await this.UserModule.findById(UserData.id)
        const Orders = await this.OrderModule.find({ user: user._id })
        return {User: user, Orders}
    }
    async GoogleLogin(credential){
        const ticket = await this.googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { email } = payload;

        let user = await this.UserModule.findOne({email})
        if(!user){
            throw ApiError.BadRequestError('Пользователь не найден. Пожалуйста, оформите заказ для регистрации.')
        }

        const userDto = new UserDto(user)
        const tokens = await this.TokenService.generateToken({...userDto})
        await this.TokenService.SaveToken(userDto.id, tokens.RefreshToken)
        return { ...tokens, user: userDto }
    }
}
