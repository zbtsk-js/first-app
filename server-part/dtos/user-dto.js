export default class UserDto {
    email;
    id;
    IsActivated;
    constructor(model){
        this.email = model.email
        this.id = model._id
        this.IsActivated = model.IsActivated
    }
}