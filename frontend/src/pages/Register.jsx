import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    role: "donor",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", {
        fullname: {
          firstname: form.firstname,
          lastname: form.lastname,
        },
        email: form.email,
        password: form.password,
        address: form.address,
        role: form.role,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Join Our Cause</h2>
          <p style={styles.subtitle}>Create an account to start helping</p>
        </div>

        <label style={styles.label}>First Name</label>
        <input
          name="firstname"
          style={styles.input}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Last Name</label>
        <input
          name="lastname"
          style={styles.input}
          onChange={handleChange}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          style={styles.input}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          style={styles.input}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Address</label>
        <input
          name="address"
          style={styles.input}
          onChange={handleChange}
        />

        <label style={styles.label}>Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="donor">Donor</option>
          <option value="ngo">NGO</option>
          <option value="receiver">Receiver</option>
          <option value="volunteer">Volunteer</option>
        </select>

        <button style={styles.button}><b>Create Account</b></button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>

          <button
            type="button"
                   onClick={() => navigate("/")}
             style={styles.homeButton}
            >
             ← Back to Home
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
  },

  header: {
    textAlign: "center",
    marginBottom: "20px",
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
  },

  label: {
    fontSize: "14px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
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

  footerText: {
    textAlign: "center",
    marginTop: "15px",
  },

  link: {
    color: "#2563eb",
    fontWeight: "600",
  },

  homeButton: {
  marginTop: "14px",
  width: "100%",
  background: "none",
  border: "none",
  padding: "0",
  color: "#6b7280", // gray
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  textAlign: "center",
  outline: "none",
},


};
