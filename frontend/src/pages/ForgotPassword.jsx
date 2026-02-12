import { useState } from "react";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async () => {
    await api.post("/auth/forgot-password", { email });
    alert("Reset link sent to email");
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={submit}>Send Reset Link</button>
    </div>
  );
}
