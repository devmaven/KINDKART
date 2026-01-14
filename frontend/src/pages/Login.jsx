import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to continue helping</p>
        </div>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button}>Login</button>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>Create Account</Link>
        </p>
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
    background: "linear-gradient(135deg, #2563eb, #16a34a)",
  },
  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "16px",
    width: "360px",
  },
  header: { textAlign: "center", marginBottom: "20px" },
  title: { fontSize: "26px", fontWeight: "700" },
  subtitle: { fontSize: "14px", color: "#6b7280" },
  label: { fontSize: "14px", fontWeight: "600" },
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
    background: "linear-gradient(90deg, #2563eb, #16a34a)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
  },
  footerText: { textAlign: "center", marginTop: "15px" },
  link: { color: "#2563eb", fontWeight: "600" },
};
