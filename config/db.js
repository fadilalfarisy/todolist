import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

//create connection to db
const connection = async() => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    try{
        console.log('connect to db')
    } catch(e) {
        console.log(e.message)
    };
}

export default connection