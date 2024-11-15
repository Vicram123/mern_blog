import express from "express";
import { signup } from "../controllers/auth.controller.js";

//authentication route
const router = express.Router();

router.post("/signup", signup);

export default router;
