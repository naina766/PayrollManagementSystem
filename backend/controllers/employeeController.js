import User from "../models/User.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
