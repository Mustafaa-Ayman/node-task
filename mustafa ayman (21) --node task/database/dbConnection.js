import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function dbConnection() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/jwt");

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    console.log("Connected to DB.");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}
