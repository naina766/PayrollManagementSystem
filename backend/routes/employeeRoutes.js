import express from "express";
import { getEmployees } from "../controllers/employeeController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getEmployees);

export default router;
