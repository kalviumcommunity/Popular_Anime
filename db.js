const mongoose = require('mongoose')
require('dotenv').config()


const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
    }catch(err){
        console.error(err)
    }
}
const disconnectDB = async()=>{
    mongoose.disconnect()
    console.log("mongoose disconnected")
}

const checkconnected = () => {
    const dbStatus = mongoose.connection.readyState;
    return dbStatus === 1; 
  };
module.exports={
    connectDb,
    disconnectDB,
    checkconnected
}