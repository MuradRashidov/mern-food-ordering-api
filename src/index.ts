import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(()=>{
    console.log("Connected to database");
    
});
const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env;
cloudinary.config({
    cloud_name:CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET
})
const app = express();
app.use(express.json());
app.use(cors());
app.get("/health",(req:Request,res:Response)=>{
    res.send({message:"Health OK!"});
})
app.use("/api/my/user",myUserRoute);
app.use("/api/my/restaurant",myRestaurantRoute)
app.listen(7000,()=>{
    console.log("App is running localhost:7000");
})