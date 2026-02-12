import "./Navbar.css";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    api.get("/profile").then((res) => {
      setUser(res.data);
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navbar">
      <h2>EMS System</h2>

      <div className="nav-right">
        <div className="profile-box" onClick={() => setOpen(!open)}>
          <img
            src={
              user.profilePhoto
                ? `http://localhost:5000${user.profilePhoto}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="profile-pic"
          />

          <span>{user.email}</span>
        </div>

        {open && (
          <div className="dropdown">
            <p className="drop-name">{user.name || "Employee"}</p>
            <p className="drop-email">{user.email}</p>
            <p className="role">Role: {user.role}</p>

            <hr />

            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
