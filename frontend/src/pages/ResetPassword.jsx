import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const submit = async () => {
    await api.post(`/auth/reset-password/${token}`, { password });
    alert("Password reset successful");
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>Reset</button>
    </div>
  );
}
