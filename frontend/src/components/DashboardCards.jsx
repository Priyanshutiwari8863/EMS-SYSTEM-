import "./DashboardCards.css";

export default function DashboardCards({
  total = 0,
  active = 0,
}) {
  const role = (localStorage.getItem("role") || "Employee")
    .toLowerCase();

  return (
    <div className="card-grid">
      {/* Total Employees */}
      <div className="card">
        <h3>Total Employees</h3>
        <p>{total}</p>
      </div>

      {/* Active Employees */}
      <div className="card">
        <h3>Active Employees</h3>
        <p>{active}</p>
      </div>

      {/* User Role */}
      <div className="card">
        <h3>Your Role</h3>
        <p style={{ textTransform: "capitalize" }}>{role}</p>
      </div>
    </div>
  );
}
