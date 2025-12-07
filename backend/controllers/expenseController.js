import Expense from "../models/Expense.js";

export const submitExpense = async (req, res) => {
  const { month, amount, description } = req.body;

  if (!month || !amount) {
    return res.status(400).json({ message: "Month and amount are required" });
  }

  try {
    const expense = await Expense.create({
      month,
      amount,
      description,
      employee: req.user._id
    });

    res.status(201).json({
      ...expense._doc,
      message: "Expense submitted and pending approval!"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    let expenses;
    if (req.user.role === "admin") {
      expenses = await Expense.find()
        .populate("employee", "name")
        .sort({ month: -1 });
    } else {
      expenses = await Expense.find({ employee: req.user._id })
        .sort({ month: -1 });
    }
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateExpenseStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const expense = await Expense.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("employee", "name");
    res.json({ ...expense._doc, message: `Expense ${status}!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
