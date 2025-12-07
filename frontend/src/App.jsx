import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (storedUser && token) setUser(storedUser);
      else setUser(null);

      setLoading(false);
    };

    setTimeout(initializeUser, 0); 
  }, []);

  if (loading)
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to={user.role === "admin" ? "/admin" : "/employee"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={user.role === "admin" ? "/admin" : "/employee"} />}
        />

        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/employee"
          element={user?.role === "employee" ? <EmployeeDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to={user ? (user.role === "admin" ? "/admin" : "/employee") : "/login"} />}
        />
      </Routes>
    </Router>
  );
}
