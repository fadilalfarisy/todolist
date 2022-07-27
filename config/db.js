import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

//create connection to db
const connection = async() => {
    await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true })
    try{
        console.log('connect to db')
    } catch(e) {
        console.log(e.message)
    };
}

export default connection