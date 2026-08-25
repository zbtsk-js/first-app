export class EmailController {
    constructor(UserService) {
        this.UserService = UserService;
    }
    async checkifEmailexists(req, res, next){
        try {
            const email = req.query.email
            const EmailExists = await this.UserService.checkifEmailexists(email)
            return res.json(EmailExists)
        }catch(e){
            next(e)        }

    }
    async getEmailbyTheLink (req, res, next){
        try {
            const registrationToken = req.query.registrationToken
            const Userdata = await this.UserService.getEmailbyTheLink(registrationToken)
            return res.json(Userdata)
        }catch(e){
            next(e)
        }

    }
}