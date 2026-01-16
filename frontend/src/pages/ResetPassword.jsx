import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post(`/users/ResetPassword/${token}`, {
        password,
      });

      alert("Password updated successfully");
      navigate("/login");
    } catch (error) {
      alert("Invalid or expired reset link");
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>
          Enter your new password below
        </p>

        <input
          type="password"
          placeholder="New Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          style={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button style={styles.button}><b>Update Password</b></button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          style={styles.backButton}
        >
          ← Back to Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #74ffac 0%, #2bff95 100%)",
  },
  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "16px",
    width: "360px",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #16a34a)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
  backButton: {
    marginTop: "15px",
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "14px",
  },
};
