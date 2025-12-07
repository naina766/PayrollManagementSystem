import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Charts({ salaryData = [], expenseData = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="p-4 border rounded shadow bg-white">
        <h3 className="text-lg font-semibold mb-2">Salary Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="salary" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border rounded shadow bg-white">
        <h3 className="text-lg font-semibold mb-2">Expenses Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={expenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
