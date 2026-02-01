import mongoose,{Schema, model} from "mongoose";
import Role from "./Role.js";

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    activationLink: {type: String},
    IsActivated: {type: Boolean, default: false},
    role: {type: String, ref: Role}
})

export default mongoose.models.User || mongoose.model("User", UserSchema);