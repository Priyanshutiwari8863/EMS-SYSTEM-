import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

          <DashboardCards
            total={stats.totalEmployees}
            active={stats.activeEmployees}
          />

          <EmployeeList />

          {/* Project Assignment Section */}
          <div
            style={{
              marginTop: "30px",
              background: "#ffffff",
              padding: "24px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "2rem",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              📋 Project Assignment
            </h2>

            <p style={{ color: "#6b7280", marginBottom: "20px" }}>
              Open the project management page to assign tasks and track progress.
            </p>

            <Link
              to="/project-analytics"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "#2563eb",
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              Open Project Management
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}