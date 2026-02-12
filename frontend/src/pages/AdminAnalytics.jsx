import { useEffect, useState } from "react";
import api from "../api/axios";
import "./AdminAnalytics.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b"];

export default function AdminAnalytics() {
  const [data, setData] = useState({});
  const [month, setMonth] = useState("");

  const load = async () => {
    const res = await api.get(`/analytics?month=${month}`);
    setData(res.data || {});
  };

  useEffect(() => {
    load();
  }, [month]);

  return (
    <div className="analytics-page">
      {/* HEADER */}
      <div className="analytics-header">
        <h2>📊 HRMS Analytics Dashboard</h2>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      {/* CARDS */}
      <div className="analytics-cards">
        <div className="card blue">
          <h3>Total Employees</h3>
          <p>{data.totalEmployees || 0}</p>
        </div>

        <div className="card green">
          <h3>Total Payout</h3>
          <p>₹ {data.totalPayout || 0}</p>
        </div>

        <div className="card purple">
          <h3>Average Salary</h3>
          <p>₹ {data.averageSalary || 0}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        {/* Salary Trend Line Chart */}
        <div className="chart-box">
          <h3>Salary Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.salaryTrend || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="payout"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Pie Chart */}
        <div className="chart-box">
          <h3>Department Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.departmentData || []}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {(data.departmentData || []).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
