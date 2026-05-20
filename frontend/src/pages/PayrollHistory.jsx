import { useEffect, useState } from "react";
import api from "../api/axios";
import "./PayrollHistory.css";

export default function PayrollHistory() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      // Fetch all employees
      const empRes = await api.get("/employees");
      const employees =
        empRes.data.records ||
        empRes.data.employees ||
        empRes.data.data ||
        empRes.data ||
        [];

      // Fetch all payrolls
      const payRes = await api.get("/payroll");
      const payrolls =
        payRes.data.records ||
        payRes.data.payrolls ||
        payRes.data.data ||
        payRes.data ||
        [];

      // Merge employee + payroll data
      const merged = employees.map((emp) => {
        const payroll = payrolls.find(
          (p) => p.employee?._id === emp._id
        );

        return {
          _id: emp._id,
          name: emp.name,
          department: emp.department,
          month: payroll?.month || "Not Generated",
          baseSalary:
            payroll?.baseSalary ??
            emp.salary ??
            emp.baseSalary ??
            0,
          deduction: payroll?.deduction ?? 0,
          finalSalary:
            payroll?.finalSalary ??
            emp.salary ??
            emp.baseSalary ??
            0,
        };
      });

      setRows(merged);
    } catch (error) {
      console.error("Payroll History Error:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="history-page">
        <h2 className="title">Payroll History</h2>
        <p>Loading...</p>
      </div>
    );
  }

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
            {rows.map((row) => (
              <tr key={row._id}>
                <td>{row.name || "N/A"}</td>
                <td>{row.department || "N/A"}</td>
                <td>{row.month}</td>
                <td>₹ {row.baseSalary}</td>
                <td className="deduction">₹ {row.deduction}</td>
                <td className="final">₹ {row.finalSalary}</td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan="6" className="empty">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}