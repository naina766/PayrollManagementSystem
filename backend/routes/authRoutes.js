import express from "express";
import { signup, login, getMe, getAllUsers } from "../controllers/authController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

export default router;
