import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGODB_URL;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server  is running on port 3000!");
});
