import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    UserId:{
        type : String,
        required : true
    },
    CurrentMonth:{
        type : String,
        required : true
    },
     AllTransactions:{
        type:Map,
        of:Object,
        default:{}
    }


},{timestamps : true})

const transaction = mongoose.model("Transaction",transactionSchema)

export default transaction