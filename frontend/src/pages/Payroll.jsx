import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Payroll.css";

export default function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  // Agar localStorage me role stored hai
  const role = localStorage.getItem("role") || "admin";

  // Load all employees + payroll records
  const loadPayroll = async () => {
    try {
      // Fetch all employees
      const empRes = await api.get("/employees");
      const employees =
        empRes.data.records ||
        empRes.data.employees ||
        empRes.data.data ||
        empRes.data ||
        [];

      // Fetch payroll records
      const payRes = await api.get("/payroll");
      const payrollData =
        payRes.data.records ||
        payRes.data.payrolls ||
        payRes.data.data ||
        payRes.data ||
        [];

      // Merge employees with payroll data
      const merged = employees.map((emp) => {
        const payroll = payrollData.find(
          (p) => p.employee?._id === emp._id
        );

        const salary =
          payroll?.baseSalary ??
          emp.salary ??
          emp.baseSalary ??
          0;

        return {
          _id: emp._id,
          employee: emp,
          month: payroll?.month || "Not Generated",
          baseSalary: salary,
          deduction: payroll?.deduction ?? 0,
          finalSalary: payroll?.finalSalary ?? salary,
        };
      });

      setPayrolls(merged);
    } catch (error) {
      console.error("Payroll Error:", error);
      setPayrolls([]);
    } finally {
      setLoading(false);
    }
  };

  // Run once when page loads
  useEffect(() => {
    loadPayroll();
  }, []);

  if (loading) {
    return (
      <div className="payroll-page">
        <h2>Payroll</h2>
        <p>Loading...</p>
      </div>
    );
  }

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
            {payrolls.length > 0 ? (
              payrolls.map((r) => (
                <tr key={r._id}>
                  {role === "admin" && (
                    <td>{r.employee?.name || "N/A"}</td>
                  )}
                  <td>{r.month}</td>
                  <td>₹{r.baseSalary}</td>
                  <td>₹{r.deduction}</td>
                  <td className="net-salary">₹{r.finalSalary}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={role === "admin" ? 5 : 4}
                  className="no-data"
                >
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