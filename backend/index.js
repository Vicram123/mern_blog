import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "../backend/routes/user.route.js";
import authRoute from "../backend/routes/auth.route.js";

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

//  middleware for parsing JSON request bodies
app.use(express.json());

app.listen(3000, () => {
  console.log("Server  is running on port 3000!");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
