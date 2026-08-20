import mongoose,{Schema, model} from "mongoose";
const RoleScheme = new Schema({

    value: {type: String, default: 'user'}
})
export default mongoose.model("Role", RoleScheme);