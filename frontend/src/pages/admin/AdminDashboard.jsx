import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DashboardCards from "../../components/DashboardCards";
import EmployeeList from "../EmployeeList";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/employees");

        const employees = Array.isArray(res.data)
          ? res.data
          : res.data.records ||
            res.data.employees ||
            res.data.data ||
            [];

        const active = employees.filter(
          (e) => (e.status || "active") === "active"
        ).length;

        setStats({
          totalEmployees: employees.length,
          activeEmployees: active,
        });
      } catch (err) {
        console.error("Admin dashboard error:", err);
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
          <h1>Admin Dashboard</h1>

          <DashboardCards
            total={stats.totalEmployees}
            active={stats.activeEmployees}
          />

          {/* Employee List */}
          <EmployeeList />
        </div>
      </div>
    </>
  );
}