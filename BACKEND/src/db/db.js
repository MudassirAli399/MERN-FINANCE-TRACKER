import mongoose from "mongoose"


const ConnectDb = async ()=>{
   
    try {
        await mongoose.connect(String(process.env.MONGODB_URL))
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

export default ConnectDb