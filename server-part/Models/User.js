import mongoose,{Schema, model} from "mongoose";
import Role from "./Role.js";
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    activationLink: { type: String },
    IsActivated: { type: Boolean, default: false },
    role: { type: Schema.Types.ObjectId , ref: Role },
    registrationToken: { type: String },
    registrationTokenExpires: { type: Date },
    firstName: String,
    lastName: String,
    country: String,
    phone: String,
    address: String,
    city: String,
    postcode: String,
}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", UserSchema);