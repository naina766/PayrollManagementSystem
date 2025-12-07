import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://payrollmanagementsystem-ten.vercel.app", "https://payrollmanagementsystem-6m93va28z-nainas-projects-4a4fd980.vercel.app"],
  credentials: true,
}));
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/salary-slip", salaryRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
