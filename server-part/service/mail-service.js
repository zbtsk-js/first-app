import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
 class MailService {
     constructor(){
         this.transporter = nodemailer.createTransport({
             host: 'smtp.gmail.com',
             port: process.env.SMTP_PORT,
             secure: false,
             auth: {
                 user: process.env.SMTP_USER,
                 pass: process.env.SMTP_PASSWORD
             }})}

    async SendActivationMail(to, link){
    try{
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            html: `<div><h1>Activate your account on Snuss.com</h1> <a href="${link}">${link}</a> </div>`})
    } catch(e){throw e}

}}
export default new MailService()