import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
   email: {type:String,required: true},
   password:{ type: String, required: true },
   cartData:{type: Object,default:{}},
    isVerified:{type:Boolean,default:false},
    verificationCode:{ type: String },
},{minimize:false});

const usermodel =mongoose.model.user || mongoose.model("user", userSchema);   //make the model with name food and if it already exists use that

export default usermodel;
