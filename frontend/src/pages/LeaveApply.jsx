import { useEffect, useState } from "react";
import api from "../api/axios";
import "./LeaveApply.css";

export default function LeaveApply() {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const loadLeaves = async () => {
    const res = await api.get("/leaves");
    setLeaves(res.data.leaves || []);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const applyLeave = async () => {
    if (!form.fromDate || !form.toDate) return alert("Select dates");

    await api.post("/leaves", form);
    alert("Leave applied successfully");

    setForm({ fromDate: "", toDate: "", reason: "" });
    loadLeaves();
  };

  return (
    <div className="leave-container">
      <div className="leave-card">
        <h2>Apply Leave</h2>

        <div className="leave-form">
          <input
            type="date"
            value={form.fromDate}
            onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
          />

          <input
            type="date"
            value={form.toDate}
            onChange={(e) => setForm({ ...form, toDate: e.target.value })}
          />

          <input
            placeholder="Reason"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />
        </div>

        <button className="apply-btn" onClick={applyLeave}>
          Apply Leave
        </button>

        <hr />

        <h3>My Leaves</h3>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((l) => (
                <tr key={l._id}>
                  <td>{l.fromDate}</td>
                  <td>{l.toDate}</td>
                  <td>{l.reason}</td>
                  <td className={`status ${l.status?.toLowerCase()}`}>
                    {l.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
