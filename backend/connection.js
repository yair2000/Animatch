import "colors"
import "dotenv/config";
import mongoose from "mongoose";

export const connectDB = async() =>{
  const connect = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
}