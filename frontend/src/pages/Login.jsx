import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {API_URL} from "../constant/api";
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL.LOGIN, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/");
    } catch{
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[linear-gradient(135deg,#74ffac_0%,#2bff95_100%)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-[35px] rounded-[16px] w-[360px]"
      >
        <div className="text-center mb-[20px]">
          <h2 className="text-[26px] font-[700]">Welcome Back</h2>
          <p className="text-[14px] text-[#6b7280]">
            Login to continue helping
          </p>
        </div>

        <label className="text-[14px] font-[600]">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db]"
        />

        <label className="text-[14px] font-[600]">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db]"
        />

        <p className="text-right mt-[5px] mb-[20px]">
          <Link
            to="/ForgotPassword"
            className="text-[#2563eb] text-[13px]"
          >
            Forgot password?
          </Link>
        </p>

        <button
          type="submit"
          className="w-full p-[12px] bg-[linear-gradient(90deg,#16a34a)] text-white rounded-[12px] cursor-pointer"
        >
          <b>Login</b>
        </button>

        <p className="text-center mt-[15px]">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#2563eb] font-[600]">
            Create Account
          </Link>
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-[14px] w-full bg-none border-none p-0 text-[#6b7280] cursor-pointer text-[14px] font-[500] text-center outline-none"
        >
          ← Back to Home
        </button>
      </form>
    </div>
  );
}
