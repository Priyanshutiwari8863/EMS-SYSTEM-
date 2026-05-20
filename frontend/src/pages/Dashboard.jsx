// Replace your current Dashboard.jsx with this updated version.
// This adds the Project Assignment page directly below EmployeeList.

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import EmployeeList from "./EmployeeList";
import ProjectTasks from "./ProjectTasks"; // ✅ Add this import
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

        // Handle all possible response formats
        const employees =
          Array.isArray(res.data)
            ? res.data
            : res.data.records ||
              res.data.employees ||
              res.data.data ||
              [];

        // Count active employees
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
      {/* Top Navbar */}
      <Navbar />

      <div className="layout">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="content">
          <h1>Dashboard</h1>

          {/* Dashboard Summary Cards */}
          <DashboardCards
            total={stats.totalEmployees}
            active={stats.activeEmployees}
          />

          {/* Employee Management Section */}
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

            {/* 
              If ProjectTasks requires a route parameter (useParams),
              it won't work directly here.
              In that case, use your dedicated Project Assignment page
              or refactor ProjectTasks to accept a projectId prop.
            */}
            <ProjectTasks />
          </div>
        </div>
      </div>
    </>
  );
}