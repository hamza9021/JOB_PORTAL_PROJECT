import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
