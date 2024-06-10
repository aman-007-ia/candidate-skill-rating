// routes/userRoutes.js

import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

// public routes
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

export default router;
