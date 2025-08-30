import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name : {
        type : String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true
    },
    clerkId:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const User = mongoose.model("User", userSchema);

export default User;