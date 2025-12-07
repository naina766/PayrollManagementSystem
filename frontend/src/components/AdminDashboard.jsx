import { useState, useEffect } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import Charts from "./Charts";
import { exportSalarySlipsPDF } from "./PDFExport";

function aggregateByMonth(items, monthKey, valueKey) {
  const map = new Map();

  for (const it of items) {
    const m = it[monthKey];
    if (!m) continue; 
    const val = Number(it[valueKey] || 0);
    map.set(m, (map.get(m) || 0) + val);
  }

  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, total]) => ({ month, [valueKey]: total }));
}


export default function AdminDashboard() {
  const [salarySlips, setSalarySlips] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ employee: "", month: "", salary: "" });
  const [editing, setEditing] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsers = await API.get("/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(resUsers.data.filter((u) => u.role === "employee"));

        const resSlips = await API.get("/salary-slip", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSalarySlips(resSlips.data);

        const resExpenses = await API.get("/expense", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(resExpenses.data);

      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const res = await API.put(`/salary-slip/${editing._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSalarySlips(salarySlips.map(s => s._id === editing._id ? res.data : s));
        toast.success("Salary slip updated!");
      } else {
        const res = await API.post("/salary-slip", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSalarySlips([...salarySlips, res.data]);
        toast.success("Salary slip created!");
      }
      setForm({ employee: "", month: "", salary: "" });
      setEditing(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving salary slip");
    }
  };

  const handleEdit = (slip) => {
    setEditing(slip);
    setForm({
      employee: slip.employee._id,
      month: slip.month,
      salary: slip.salary,
    });
  };

  const salaryChartData = aggregateByMonth(salarySlips, "month", "salary");
  const expenseChartData = aggregateByMonth(expenses, "month", "amount");

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border rounded bg-white shadow "
      >
        <h2 className="text-xl font-semibold mb-2">
          {editing ? "Update Salary Slip" : "Create Salary Slip"}
        </h2>

        <select
          name="employee"
          value={form.employee}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>

        <input
          type="month"
          name="month"
          value={form.month}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary Amount"
          className="border p-2 mb-2 w-full rounded"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? "Update" : "Create"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({ employee: "", month: "", salary: "" });
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Charts */}
      <Charts salaryData={salaryChartData} expenseData={expenseChartData} />

      {/* Salary Slips Table */}
      <div className="bg-white p-4 border rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-2">All Salary Slips</h2>
        <button
          onClick={() => exportSalarySlipsPDF(salarySlips)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
        >
          Export PDF
        </button>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Employee</th>
              <th className="border p-2">Month</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salarySlips.map((slip) => (
              <tr key={slip._id}>
                <td className="border p-2">{slip.employee.name}</td>
                <td className="border p-2">{slip.month}</td>
                <td className="border p-2">{slip.salary}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(slip)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
