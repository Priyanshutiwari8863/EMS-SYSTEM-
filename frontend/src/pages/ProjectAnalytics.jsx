import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ProjectAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/project-analytics").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) return <p>Loading...</p>;

  const chartData = [
    { name: "Completed", value: data.completed },
    { name: "In Progress", value: data.inProgress },
    { name: "Pending", value: data.pending },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Project Analytics</h2>

      <p><b>Total Projects:</b> {data.total}</p>
      <p><b>Average Progress:</b> {data.avgProgress}%</p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
