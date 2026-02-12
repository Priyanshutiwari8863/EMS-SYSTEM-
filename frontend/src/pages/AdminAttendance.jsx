import { useEffect, useState } from "react";
import api from "../api/axios";
import "./AdminAttendance.css";

export default function AdminAttendance() {
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/attendance/admin?date=${date}`);
      setRecords(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const mark = async (employeeId, status) => {
    await api.post("/attendance", {
      employeeId,
      date,
      status,
    });
    load();
  };

  useEffect(() => {
    load();
  }, [date]);

  return (
    <div className="admin-attendance-page">
      {/* HEADER */}
      <div className="attendance-header">
        <h2>Admin Attendance</h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* CARD */}
      <div className="attendance-card">
        {loading ? (
          <p className="loading">Loading attendance...</p>
        ) : (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
                  <td>{r.employee?.name}</td>
                  <td>{r.employee?.department}</td>
                  <td>{r.employee?.position}</td>

                  <td>
                    <span
                      className={`status ${
                        r.status === "present"
                          ? "present"
                          : "absent"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td>
                    {r.status === "present" ? (
                      <button
                        className="btn absent-btn"
                        onClick={() =>
                          mark(r.employee._id, "absent")
                        }
                      >
                        Mark Absent
                      </button>
                    ) : (
                      <button
                        className="btn present-btn"
                        onClick={() =>
                          mark(r.employee._id, "present")
                        }
                      >
                        Mark Present
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
