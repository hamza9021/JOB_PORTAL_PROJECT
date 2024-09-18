import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";


dotenv.config({});
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

//MIDDLEWARE

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));


app.use("/api/v1/user",userRouter);
app.use("/api/v1/company",companyRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Listining at PORT ${PORT}`);
  connectDB();
});
