import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // format YYYY-MM
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Expense", expenseSchema);
