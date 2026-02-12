import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const role = (localStorage.getItem("role") || "")
    .trim()
    .toLowerCase();

  return (
    <div className="sidebar">
      <h2>EMS</h2>

      <Link to="/">Dashboard</Link>

      {(role === "admin" || role === "manager") && (
        <Link to="/">Employees</Link>
      )}

      <Link to="/attendance">Attendance</Link>

      <Link to="/payroll-history">Payroll History</Link>

      {/* ✅ Salary Slip (Admin + Employee both) */}
      <Link to="/salary-slip">Salary Slip</Link>
      <Link to="/leaves">Apply Leave</Link>

      {role === "admin" && (
        <>
          <Link to="/payroll">Payroll</Link>
          <Link to="/admin-attendance">Admin Attendance</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/admin-leaves">Leave Approval</Link>
          <Link to="/company">Company Settings</Link>
          <Link to="/timeline">Project Timeline</Link>

        </>
      )}
    </div>
  );
}
