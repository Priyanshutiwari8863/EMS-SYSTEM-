import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Attendance.css";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [today, setToday] = useState(null);

  const load = async () => {
    // IMPORTANT: backend route is /api/attendance/my
    const res = await api.get("/attendance/my");
    const data = res.data || [];

    setRecords(data);

    // Find today's record
    const todayDate = new Date().toISOString().slice(0, 10);
    const t = data.find((r) => r.date === todayDate);
    setToday(t || null);
  };

  const checkIn = async () => {
    await api.post("/attendance/checkin");
    load();
  };

  const checkOut = async () => {
    await api.post("/attendance/checkout");
    load();
  };

  useEffect(() => {
    load();
  }, []);

  const checkedIn = today?.checkIn;
  const checkedOut = today?.checkOut;

  return (
    <div className="attendance-page">
      {/* HEADER */}
      <div className="attendance-header">
        <h2>My Attendance</h2>

        <div className="actions">
          <button
            className="btn checkin"
            onClick={checkIn}
            disabled={checkedIn}
          >
            ✔ Check In
          </button>

          <button
            className="btn checkout"
            onClick={checkOut}
            disabled={!checkedIn || checkedOut}
          >
            ⏱ Check Out
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="attendance-card">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td>{r.date}</td>
                <td>
                  <span
                    className={
                      r.status === "present"
                        ? "badge present"
                        : "badge absent"
                    }
                  >
                    {r.status}
                  </span>
                </td>
                <td>{r.checkIn || "-"}</td>
                <td>{r.checkOut || "-"}</td>
              </tr>
            ))}

            {records.length === 0 && (
              <tr>
                <td colSpan="4" className="empty">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}