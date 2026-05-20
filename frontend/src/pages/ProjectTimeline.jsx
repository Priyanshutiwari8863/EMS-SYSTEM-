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
} from "recharts";

export default function ProjectTimeline() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");

      // Handle different API response formats
      const data =
        res.data.records ||
        res.data.projects ||
        res.data.data ||
        res.data ||
        [];

      setProjects(data);
    } catch (error) {
      console.error("Project Timeline Error:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Convert API data to chart format
  const chartData = projects.map((project) => ({
    name:
      project.title?.length > 15
        ? project.title.slice(0, 15) + "..."
        : project.title || "Untitled",
    fullName: project.title || "Untitled",
    progress: project.progress ?? 0,
  }));

  // Dynamic color based on progress
  const getBarColor = (progress) => {
    if (progress >= 80) return "#10b981"; // Green
    if (progress >= 50) return "#3b82f6"; // Blue
    if (progress >= 25) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;

      return (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {item.fullName}
          </p>
          <p
            style={{
              margin: "6px 0 0 0",
              color: "#4f46e5",
              fontWeight: 600,
            }}
          >
            Progress: {item.progress}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "32px",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "24px",
          }}
        >
          Project Timeline
        </h2>
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          Loading project timeline...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "32px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: "800",
            color: "#111827",
            margin: 0,
          }}
        >
          📊 Project Timeline
        </h2>
        <p
          style={{
            marginTop: "8px",
            color: "#6b7280",
            fontSize: "1rem",
          }}
        >
          Monitor the progress of all active projects
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9rem" }}>
            Total Projects
          </p>
          <h3
            style={{
              margin: "8px 0 0 0",
              fontSize: "2rem",
              color: "#111827",
            }}
          >
            {projects.length}
          </h3>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9rem" }}>
            Completed
          </p>
          <h3
            style={{
              margin: "8px 0 0 0",
              fontSize: "2rem",
              color: "#10b981",
            }}
          >
            {projects.filter((p) => (p.progress ?? 0) >= 100).length}
          </h3>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9rem" }}>
            Average Progress
          </p>
          <h3
            style={{
              margin: "8px 0 0 0",
              fontSize: "2rem",
              color: "#4f46e5",
            }}
          >
            {projects.length
              ? Math.round(
                  projects.reduce(
                    (sum, p) => sum + (p.progress ?? 0),
                    0
                  ) / projects.length
                )
              : 0}
            %
          </h3>
        </div>
      </div>

      {/* Chart Card */}
      <div
        style={{
          background: "#ffffff",
          padding: "28px",
          borderRadius: "24px",
          boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        {chartData.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#6b7280",
            }}
          >
            No projects available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 10,
                bottom: 70,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={80}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey="progress"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.progress)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}