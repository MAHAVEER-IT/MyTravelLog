import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected Successfully !");
        return;
    }catch(e){
        console.log("DB connection Failed !!! : ",e);
    }
}