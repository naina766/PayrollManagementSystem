import { useState, useEffect } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import Charts from "./Charts";

function aggregateByMonth(items, monthKey, valueKey) {
  const map = new Map();
  for (const it of items) {
    const m = it[monthKey];
    if (!m) continue; // ✅ skip if month is undefined
    const val = Number(it[valueKey] || 0);
    map.set(m, (map.get(m) || 0) + val);
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] || "").localeCompare(b[0] || "")) // ✅ safe
    .map(([month, total]) => ({ month, [valueKey]: total }));
}


export default function EmployeeDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [salarySlips, setSalarySlips] = useState([]);
  const [form, setForm] = useState({ month: "", amount: "", description: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resExpenses, resSlips] = await Promise.all([
          API.get("/expense", { headers: { Authorization: `Bearer ${token}` } }),
          API.get("/salary-slip", { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setExpenses(resExpenses.data);
        setSalarySlips(resSlips.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.month || !form.amount) {
      toast.error("Month and amount are required");
      return;
    }
    try {
      const res = await API.post("/expense", form, { headers: { Authorization: `Bearer ${token}` } });
      setExpenses([res.data, ...expenses]);
      setForm({ month: "", amount: "", description: "" });
      toast.success(res.data.message || "Expense submitted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit expense");
    }
  };

  const expenseChartData = aggregateByMonth(expenses, "month", "amount");
  const salaryChartData = aggregateByMonth(salarySlips, "month", "salary");

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-semibold mb-2">Submit Monthly Expense</h2>
        <input type="month" name="month" value={form.month} onChange={handleChange} className="border p-2 mb-2 w-full rounded" required />
        <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Expense Amount" className="border p-2 mb-2 w-full rounded" required />
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description (optional)" className="border p-2 mb-2 w-full rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Submit</button>
      </form>

      <Charts salaryData={salaryChartData} expenseData={expenseChartData} />

      <div className="bg-white p-4 border rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-2">Expense History</h2>
        <table className="w-full border-collapse mb-6">
          <thead><tr><th className="border p-2">Month</th><th className="border p-2">Amount</th><th className="border p-2">Description</th></tr></thead>
          <tbody>
            {expenses.length === 0 ? <tr><td colSpan={3} className="border p-2 text-center">No expenses submitted yet</td></tr> :
              expenses.map((exp) => (
                <tr key={exp._id}>
                  <td className="border p-2">{exp.month}</td>
                  <td className="border p-2">{exp.amount}</td>
                  <td className="border p-2">{exp.description || "-"}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <h2 className="text-xl font-semibold mb-2">Salary Slips</h2>
        <table className="w-full border-collapse">
          <thead><tr><th className="border p-2">Month</th><th className="border p-2">Salary</th></tr></thead>
          <tbody>
            {salarySlips.map((slip) => (
              <tr key={slip._id}>
                <td className="border p-2">{slip.month}</td>
                <td className="border p-2">{slip.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
