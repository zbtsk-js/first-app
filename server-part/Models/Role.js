import mongoose,{Schema, model} from "mongoose";
const RoleScheme = new Schema({

    value: {type: String, default: 'user'}
})

export default mongoose.models.Role || mongoose.model("Role", RoleScheme);