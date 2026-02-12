import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);

  const load = async () => {
    const res = await api.get("/leaves");
    setLeaves(res.data.leaves || []);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/leaves/${id}`, { status });
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Leave Requests</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Employee</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map(l => (
            <tr key={l._id}>
              <td>{l.employee?.name}</td>
              <td>{l.fromDate}</td>
              <td>{l.toDate}</td>
              <td>{l.reason}</td>
              <td>{l.status}</td>

              <td>
                <button
                  onClick={() =>
                    updateStatus(l._id, "approved")
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(l._id, "rejected")
                  }
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
