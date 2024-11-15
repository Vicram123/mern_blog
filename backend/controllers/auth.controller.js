import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Please provide all the required fields"));
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: "Username already taken" });
      } else {
        return res.status(400).json({ error: "Email already registered" });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create and save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { username, email },
    });
  } catch (error) {
    next(error); // Pass the custom error to the error handler
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Check if user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(404).json("User not found");
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    // Exclude password from response
    const { password: pass, ...rest } = validUser._doc;

    // Send response with token
    res
      .status(200)
      .cookie("valite_token", token, { httpOnly: true })
      .json({ success: true, message: "Signin successful", user: rest, token });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};
