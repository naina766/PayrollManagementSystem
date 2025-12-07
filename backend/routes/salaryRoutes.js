import express from "express";
import { createSalarySlip, updateSalarySlip, getSalarySlips } from "../controllers/salaryController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createSalarySlip);
router.put("/:id", authMiddleware, adminMiddleware, updateSalarySlip);
router.get("/", authMiddleware, getSalarySlips);

export default router;
