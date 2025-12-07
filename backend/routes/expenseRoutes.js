import express from "express";
import { submitExpense, getExpenses, updateExpenseStatus } from "../controllers/expenseController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, submitExpense);
router.get("/", authMiddleware, getExpenses);
router.put("/:id/status", authMiddleware, adminMiddleware, updateExpenseStatus);

export default router;
