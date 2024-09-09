import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"
dotenv.config({});
const app = express();

const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}

//MIDDLEWARE

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors(corsOptions));



const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server Listining at PORT ${PORT}`);
    connectDB();
});


