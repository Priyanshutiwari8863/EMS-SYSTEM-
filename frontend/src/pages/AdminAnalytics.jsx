// Replace your entire AdminAnalytics.jsx with this complete working code

import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

export default function AdminAnalytics() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

 // Replace your current loadData() function with this fully fixed version

// Helper function (put this ABOVE loadData())
const extractArray = (data) => {
  // If response itself is already an array
  if (Array.isArray(data)) return data;

  // Search all properties for the first array
  for (const key in data) {
    if (Array.isArray(data[key])) {
      return data[key];
    }

    // Search nested objects
    if (
      typeof data[key] === "object" &&
      data[key] !== null
    ) {
      for (const subKey in data[key]) {
        if (Array.isArray(data[key][subKey])) {
          return data[key][subKey];
        }
      }
    }
  }

  // If no array found
  return [];
};

// Load all dashboard data
const loadData = async () => {
  console.log("loadData started");

  try {
    // ==========================
    // 1. Load Employees
    // ==========================
    let employeeData = [];

    try {
      const empRes = await api.get("/employees");
      console.log("Employees Response:", empRes.data);

      employeeData = extractArray(empRes.data);

      console.log(
        "Employees Count:",
        employeeData.length
      );
    } catch (err) {
      console.error("Employees API Error:", err);
    }

    // ==========================
    // 2. Load Projects
    // ==========================
    let projectData = [];

    try {
      const projectRes = await api.get("/projects");
      console.log("Projects Response:", projectRes.data);

      projectData = extractArray(projectRes.data);

      console.log(
        "Projects Count:",
        projectData.length
      );
    } catch (err) {
      console.error("Projects API Error:", err);
    }

    // ==========================
    // 3. Load Tasks
    // ==========================
    let taskData = [];

    try {
      const taskRes = await api.get("/tasks");
      console.log("Tasks Response:", taskRes.data);

      taskData = extractArray(taskRes.data);

      console.log("Tasks Count:", taskData.length);
    } catch (err) {
      console.error("Tasks API Error:", err);
    }

    // ==========================
    // 4. Update State
    // ==========================
    setEmployees(employeeData);
    setProjects(projectData);
    setTasks(taskData);
  } catch (error) {
    console.error(
      "Admin Analytics General Error:",
      error
    );

    // Reset state on unexpected error
    setEmployees([]);
    setProjects([]);
    setTasks([]);
  } finally {
    // Stop loading spinner
    setLoading(false);
  }
};

// Load data when component mounts
useEffect(() => {
  console.log("AdminAnalytics mounted");
  loadData();
}, []);
// ==========================
  const totalEmployees = employees.length;
  const totalProjects = projects.length;
  const totalTasks = tasks.length;

  const completedProjects = projects.filter(
    (p) => (p.progress ?? 0) >= 100
  ).length;

  const activeProjects = totalProjects - completedProjects;

  const averageSalary =
    totalEmployees > 0
      ? Math.round(
          employees.reduce(
            (sum, emp) =>
              sum +
              (emp.salary ||
                emp.baseSalary ||
                emp.basicSalary ||
                0),
            0
          ) / totalEmployees
        )
      : 0;

  const averageProgress =
    totalProjects > 0
      ? Math.round(
          projects.reduce(
            (sum, p) => sum + (p.progress ?? 0),
            0
          ) / totalProjects
        )
      : 0;

  // Department-wise employee count
  const departmentMap = {};

  employees.forEach((emp) => {
    const dept = emp.department || "Unknown";
    departmentMap[dept] = (departmentMap[dept] || 0) + 1;
  });

  const departmentData = Object.keys(departmentMap).map(
    (dept) => ({
      department: dept,
      count: departmentMap[dept],
    })
  );

  // Salary chart data
  const salaryData = employees.map((emp) => ({
    name:
      emp.name?.length > 10
        ? emp.name.slice(0, 10) + "..."
        : emp.name || "Employee",
    salary:
      emp.salary ||
      emp.baseSalary ||
      emp.basicSalary ||
      0,
  }));

  // Project progress chart data
  const projectChartData = projects.map((project) => ({
    name:
      project.title?.length > 12
        ? project.title.slice(0, 12) + "..."
        : project.title || "Project",
    progress: project.progress ?? 0,
  }));

  // Pie chart data
  const projectStatusData = [
    {
      name: "Completed",
      value: completedProjects,
      color: "#10b981",
    },
    {
      name: "Active",
      value: activeProjects,
      color: "#3b82f6",
    },
  ];

  // Colors
  const colors = [
    "#4f46e5",
    "#7c3aed",
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#14b8a6",
    "#8b5cf6",
  ];

  const getProgressColor = (progress) => {
    if (progress >= 100) return "#10b981";
    if (progress >= 70) return "#3b82f6";
    if (progress >= 40) return "#f59e0b";
    return "#ef4444";
  };

  // Card style
  const cardStyle = {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow:
      "0 12px 35px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e5e7eb",
  };

  // Loading UI
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "32px",
          background:
            "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
        }}
      >
        <h1>Loading Admin Analytics...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
      }}
    >
      {/* Header */}
      <div
        style={{
          ...cardStyle,
          marginBottom: "24px",
          background:
            "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          color: "#ffffff",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "2.7rem",
            fontWeight: "800",
          }}
        >
          📊 Admin Analytics Dashboard
        </h1>

        <p
          style={{
            marginTop: "10px",
            marginBottom: 0,
            opacity: 0.95,
            lineHeight: "1.7",
          }}
        >
          Monitor employees, salaries, projects, and tasks in real time.
        </p>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "18px",
          marginBottom: "24px",
        }}
      >
        {[
          {
            icon: "👥",
            label: "Total Employees",
            value: totalEmployees,
            color: "#2563eb",
          },
          {
            icon: "📁",
            label: "Total Projects",
            value: totalProjects,
            color: "#111827",
          },
          {
            icon: "📋",
            label: "Assigned Tasks",
            value: totalTasks,
            color: "#f59e0b",
          },
          {
            icon: "💰",
            label: "Average Salary",
            value: `₹${averageSalary.toLocaleString()}`,
            color: "#10b981",
          },
          {
            icon: "📈",
            label: "Avg Progress",
            value: `${averageProgress}%`,
            color: "#7c3aed",
          },
        ].map((item, index) => (
          <div key={index} style={cardStyle}>
            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontWeight: "600",
              }}
            >
              {item.icon} {item.label}
            </p>
            <h3
              style={{
                margin: "12px 0 0",
                fontSize: "2rem",
                fontWeight: "800",
                color: item.color,
              }}
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Department-wise Employees */}
        <div style={cardStyle}>
          <h3>🏢 Department-wise Employees</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#4f46e5"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Salary Distribution */}
        <div style={cardStyle}>
          <h3>💸 Salary Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={salaryData}
              margin={{ bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="salary"
                radius={[8, 8, 0, 0]}
              >
                {salaryData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Timeline */}
        <div style={cardStyle}>
          <h3>📅 Project Timeline</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={projectChartData}
              margin={{ bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar
                dataKey="progress"
                radius={[8, 8, 0, 0]}
              >
                {projectChartData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={getProgressColor(
                        entry.progress
                      )}
                    />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status Pie */}
        <div style={cardStyle}>
          <h3>🥧 Project Status Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={projectStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {projectStatusData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* All Employees Table */}
      <div
        style={{
          ...cardStyle,
          marginTop: "24px",
        }}
      >
        <h3>👥 All Employees</h3>

        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "900px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    color: "#ffffff",
                  }}
                >
                  {[
                    "Name",
                    "Department",
                    "Position",
                    "Salary",
                    "Email",
                    "Phone",
                  ].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {employees.map((emp, index) => {
                  const salary =
                    emp.salary ||
                    emp.baseSalary ||
                    emp.basicSalary ||
                    0;

                  return (
                    <tr
                      key={emp._id || index}
                      style={{
                        background:
                          index % 2 === 0
                            ? "#ffffff"
                            : "#f8fafc",
                        borderBottom:
                          "1px solid #e5e7eb",
                      }}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        {emp.name || "N/A"}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        {emp.department || "N/A"}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        {emp.position || "N/A"}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#10b981",
                        }}
                      >
                        ₹{salary.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        {emp.email || "N/A"}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        {emp.phone || "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}