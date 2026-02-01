import {Schema, model} from "mongoose";


const UserSchema = new Schema({
    user: {type: String, required: true, unique: true},
   refreshToken: {type: String, required: true}
})

export default model('TokenModule', UserSchema);