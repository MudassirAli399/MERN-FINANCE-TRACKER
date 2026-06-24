import mongoose from "mongoose";

const budgetSchema = mongoose.Schema({
    UserId:{
        type : String,
        required : true
    },
    Items:{
        type : Array,
        required : true
    },
    expirydate:{
        type : Date,
        required : true
    },
    show:{
        type : Boolean,
        required : true
    }

},{timestamps : true})

const budget = mongoose.model("Budget",budgetSchema)

export default budget