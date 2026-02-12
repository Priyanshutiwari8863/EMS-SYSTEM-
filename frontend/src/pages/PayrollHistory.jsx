import { useEffect, useState } from "react";
import api from "../api/axios";
import "./PayrollHistory.css";

export default function PayrollHistory() {
  const [payrolls, setPayrolls] = useState([]);

  const load = async () => {
    const res = await api.get("/payroll");
    setPayrolls(res.data.payrolls || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="history-page">
      <h2 className="title">Payroll History</h2>

      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Month</th>
              <th>Base Salary</th>
              <th>Deduction</th>
              <th>Final Salary</th>
            </tr>
          </thead>

          <tbody>
            {payrolls.map((p) => (
              <tr key={p._id}>
                <td>{p.employee?.name}</td>
                <td>{p.employee?.department}</td>
                <td>{p.month}</td>
                <td>₹ {p.baseSalary}</td>
                <td className="deduction">₹ {p.deduction}</td>
                <td className="final">₹ {p.finalSalary}</td>
              </tr>
            ))}

            {payrolls.length === 0 && (
              <tr>
                <td colSpan="6" className="empty">
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
