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
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={{ textAlign: "center" }}>Join Our Cause</h2>

        <input name="firstname" placeholder="First Name" onChange={handleChange} style={styles.input} required />
        <input name="lastname" placeholder="Last Name" onChange={handleChange} style={styles.input} />
        <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} style={styles.input} required />
        <input name="address" placeholder="Address" onChange={handleChange} style={styles.input} />

        <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
          <option value="donor">Donor</option>
          <option value="ngo">NGO</option>
          <option value="receiver">Receiver</option>
          <option value="volunteer">Volunteer</option>
        </select>

        <button style={styles.button}>Create Account</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #2563eb, #16a34a)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "400px",
    borderRadius: "12px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
  },
};
