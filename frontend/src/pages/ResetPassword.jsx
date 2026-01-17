import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../constant/api";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ ADDED

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true); // ✅ ADDED

      await axios.post(
        API_URL.RESET_PASSWORD(token),
        { password }
      );

      alert("Password updated successfully");
      navigate("/login");
    } catch (error) {
      alert("Invalid or expired reset link");
    } finally {
      setLoading(false); // ✅ ADDED
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[linear-gradient(135deg,#74ffac_0%,#2bff95_100%)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-[35px] rounded-[16px] w-[360px] text-center"
      >
        <h2 className="text-[26px] font-[700]">Reset Password</h2>

        <p className="text-[14px] text-[#6b7280] mb-[20px]">
          Enter your new password below
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db]"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db]"
        />

        <button
          type="submit"
          disabled={loading} // ✅ ADDED
          className="w-full p-[12px] bg-[linear-gradient(90deg,#16a34a)] text-white rounded-[12px] cursor-pointer disabled:opacity-60"
        >
          <b>{loading ? "Updating..." : "Update Password"}</b> {/* ✅ ADDED */}
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
