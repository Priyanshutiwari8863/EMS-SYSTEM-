import { useState } from "react";
import api from "../api/axios";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // save auth
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("email", res.data.user.email);

      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>EMS System</h2>
        <p className="subtitle">Employee Management Portal</p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
            type="button"
            className="google-btn"
            onClick={() =>
              window.location.href =
                "http://localhost:5000/api/auth/google"
            }
          >
            Login with Google
          </button>

      </form>
    </div>
  );
}
