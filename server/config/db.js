import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI
if(!MONGO_URI){
    throw new Error("URI IS NOT DEFINED")
}

const connectDB = async ()=>{

    try{

        await mongoose.connect(MONGO_URI)
        .then(()=>{
            console.log("DB CONNECTED SUCCESSFULLY")
        })
    }catch(error){
        console.log("error in connecting to DB" , error);
        process.exit(1);
    }
}


export default connectDB;
