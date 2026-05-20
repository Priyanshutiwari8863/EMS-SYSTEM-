import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // Save token to localStorage
      localStorage.setItem("token", token);

      // Small delay to ensure token is stored before dashboard loads
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } else {
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Logging you in with Google...</h2>
      <p>Please wait...</p>
    </div>
  );
}