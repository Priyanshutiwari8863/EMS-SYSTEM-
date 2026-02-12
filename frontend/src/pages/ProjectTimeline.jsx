import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProjectTimeline() {
  const [projects, setProjects] = useState([]);

  const load = async () => {
    const res = await api.get("/projects");
    setProjects(res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  // 🔥 convert to chart data
  const data = projects.map((p) => ({
    name: p.title,
    progress: p.progress,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Project Timeline</h2>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
