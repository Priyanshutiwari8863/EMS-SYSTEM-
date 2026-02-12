import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import EmployeeList from "./EmployeeList";
import "../styles/dashboard.css";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/employees");

        // handle both response formats
        const employees = Array.isArray(res.data)
          ? res.data
          : res.data.employees || [];

        // count active employees
        const active = employees.filter(
          (e) => (e.status || "active") === "active"
        ).length;

        setStats({
          totalEmployees: employees.length,
          activeEmployees: active,
        });
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };

    loadStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="content">
          <h1>Dashboard</h1>

          {/* ✅ Dashboard cards */}
          <DashboardCards
            total={stats.totalEmployees}
            active={stats.activeEmployees}
          />

          {/* ✅ Employee table */}
          <EmployeeList />
        </div>
      </div>
    </>
  );
}
