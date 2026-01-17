import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constant/api";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(API_URL.FORGOT_PASSWORD, { email });

      alert("Check your email. Password reset link has been sent.");
      navigate("/login");
    } catch (error) {
      alert("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[linear-gradient(135deg,#74ffac_0%,#2bff95_100%)]">
      <form
        className="bg-white p-[35px] rounded-[16px] w-[360px] text-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-[26px] font-[700]">Forgot Password</h2>

        <p className="text-[14px] text-[#6b7280] mb-[20px]">
          Enter your email to receive a password reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db]"
        />

        <button
          type="submit"
          disabled={loading} // ✅ ADDED
          className="w-full p-[12px] bg-[linear-gradient(90deg,#16a34a)] text-white rounded-[12px] cursor-pointer disabled:opacity-60"
        >
          <b>{loading ? "Sending..." : "Send Reset Link"}</b> {/* ✅ ADDED */}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-[15px] bg-none border-none text-[#6b7280] cursor-pointer text-[14px]"
        >
          ← Back to Login
        </button>
      </form>
    </div>
  );
}
