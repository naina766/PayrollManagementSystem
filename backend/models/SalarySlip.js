import mongoose from "mongoose";

const salarySlipSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: String, required: true },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SalarySlip", salarySlipSchema);
