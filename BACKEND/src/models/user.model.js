import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

const User = mongoose.model("User", userSchema);

export default User;