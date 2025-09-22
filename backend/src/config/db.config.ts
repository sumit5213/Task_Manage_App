import mongoose from "mongoose"
import {config } from "./app.config"

export const connectDB =async()=>{
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("connected to the mongo database")
    } catch (error) {
        console.log(error)
    }
} 