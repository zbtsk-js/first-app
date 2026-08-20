
export class UserController {
    constructor(UserService, User) {
        this.UserService = UserService;
        this.User = User;
    }
    userstatus = async (req, res, next) => {
        try {
            const users = await this.User.find()
            return res.json(users)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'failed to fetch users'})
        }
    }
    getUserData = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            const AccessToken = authHeader?.split(' ')[1]
            console.log(AccessToken)
            const userData = await this.UserService.getUserData(AccessToken);
            console.log('UserData after validate:', userData)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

}
