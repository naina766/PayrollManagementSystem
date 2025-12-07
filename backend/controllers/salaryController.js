import SalarySlip from "../models/SalarySlip.js";
import User from "../models/User.js";

export const createSalarySlip = async (req, res) => {
  try {
    const { employee, month, salary } = req.body;
    if (!employee || !month || !salary) return res.status(400).json({ message: "All fields are required" });

    const emp = await User.findById(employee);
    if (!emp || emp.role !== "employee") return res.status(404).json({ message: "Employee not found" });

    const slip = await SalarySlip.create({ employee, month, salary });
    res.status(201).json(await slip.populate("employee", "name email"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSalarySlip = async (req, res) => {
  try {
    const slip = await SalarySlip.findById(req.params.id);
    if (!slip) return res.status(404).json({ message: "Salary slip not found" });

    const { month, salary } = req.body;
    if (month) slip.month = month;
    if (salary) slip.salary = salary;

    await slip.save();
    res.json(await slip.populate("employee", "name email"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSalarySlips = async (req, res) => {
  try {
    let slips;
    if (req.user.role === "admin") {
      slips = await SalarySlip.find().populate("employee", "name email");
    } else {
      slips = await SalarySlip.find({ employee: req.user._id });
    }
    res.json(slips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
