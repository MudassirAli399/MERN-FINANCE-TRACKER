import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    Password: {
        type: String,
        required: true
    }
}, { timestamps: true });


// hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("Password")) return;
    try {
    this.Password = await bcrypt.hash(this.Password, 10);
    
}
    catch(error){
       throw error
        
    }
    
});
userSchema.methods.getId = ()=>{
    return this._id
}
userSchema.methods.generateaccesstoken = function (){
    console.log(this._id)
    return jwt.sign({
        id : this._id,
        email : this.Email,
        name : this.Name
    },process.env.JWT_SECRET,{expiresIn : "1d"})
}
userSchema.methods.generaterefreshtoken = function (){
    return jwt.sign({
        id : this._id,
        email : this.Email,
    },process.env.JWT_SECRET,{expiresIn : "7d"})
}
const User = mongoose.model("User", userSchema);

export default User;