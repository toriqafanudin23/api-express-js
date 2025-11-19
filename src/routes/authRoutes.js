// routes/authRoutes.js (baru, atau tambahkan ke userRoutes.js)
import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const authRoutes = Router();

// Routes auth
authRoutes.post("/register", registerUser); // POST /register
authRoutes.post("/login", loginUser); // POST /login

export default authRoutes;
