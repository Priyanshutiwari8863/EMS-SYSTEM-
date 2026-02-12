import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Payroll.css";

export default function Payroll() {
  const [records, setRecords] = useState([]);
  const role = (localStorage.getItem("role") || "").toLowerCase();

  const load = async () => {
    try {
      const res = await api.get("/payroll");
      setRecords(res.data.records || []);
    } catch (err) {
      console.error("Payroll load error:", err);
      setRecords([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="payroll-page">
      <h2>Payroll</h2>

      <div className="payroll-table-wrapper">
        <table className="payroll-table">
          <thead>
            <tr>
              {role === "admin" && <th>Employee</th>}
              <th>Month</th>
              <th>Base Salary</th>
              <th>Deductions</th>
              <th>Final Salary</th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((r) => (
                <tr key={r._id}>
                  {role === "admin" && <td>{r.employee?.name}</td>}
                  <td>{r.month}</td>
                  <td>₹{r.baseSalary}</td>
                  <td>₹{r.baseSalary - r.finalSalary}</td>
                  <td className="net-salary">₹{r.finalSalary}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4} className="no-data">
                  No payroll records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
