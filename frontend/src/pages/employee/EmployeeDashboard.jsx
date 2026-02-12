export default function EmployeeDashboard() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  return (
    <>
      <h1>Employee Dashboard</h1>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "400px"
      }}>
        <p><b>Email:</b> {email}</p>
        <p><b>Role:</b> {role}</p>
        <p><b>Status:</b> Active</p>
      </div>
    </>
  );
}
