import "./Navbar.css";
import { useEffect, useState } from "react";
import api from "../api/axios";

const BACKEND_URL = "https://ems-backend-27ez.onrender.com";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/profile")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Profile load error:", err);
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const profileImage =
    user?.profilePhoto
      ? `${BACKEND_URL}${user.profilePhoto}`
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="navbar">
      <h2>EMS System</h2>

      <div className="nav-right">
        <div className="profile-box" onClick={() => setOpen(!open)}>
          <img
            src={profileImage}
            alt="profile"
            className="profile-pic"
          />

          <span>{user?.email || "Loading..."}</span>
        </div>

        {open && (
          <div className="dropdown">
            <p className="drop-name">{user?.name || "Employee"}</p>
            <p className="drop-email">{user?.email || ""}</p>
            <p className="role">Role: {user?.role || "Employee"}</p>

            <hr />

            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}