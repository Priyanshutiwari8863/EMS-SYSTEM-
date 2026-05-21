import "./Navbar.css";

export default function Navbar() {
  const role = localStorage.getItem("role") || "Employee";
  const email = localStorage.getItem("email") || "";

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <h2>EMS System</h2>

      <div>
        <span>{role}</span>

        <span style={{ marginLeft: "15px" }}>
          {email}
        </span>

        <button
          onClick={logout}
          style={{ marginLeft: "15px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}