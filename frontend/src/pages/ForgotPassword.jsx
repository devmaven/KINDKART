import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Later this will call backend API
    alert("Check your email. Password reset link will be sent to your mail.");

    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>
          Enter your email to receive a password reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button style={styles.button}><b>Send Reset Link</b></button>

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
    background: "linear-gradient(135deg,  #74ffac 0%, #2bff95 100%)",
  },
  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "16px",
    width: "360px",
    textAlign: "center",
  },
  title: { fontSize: "26px", fontWeight: "700" },
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
