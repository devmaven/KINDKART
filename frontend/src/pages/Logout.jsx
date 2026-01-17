import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Logout() {

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-[linear-gradient(135deg,#74ffac_0%,#2bff95_100%)]">
      <div className="bg-white p-[35px] rounded-[16px] w-[360px] text-center">
        <h2 className="text-[26px] font-[700] mb-[10px]">
          Logged Out
        </h2>

        <p className="text-[14px] text-[#6b7280] mb-[25px]">
          You have been successfully logged out
        </p>

        <Link
          to="/Login"
          className="block w-full p-[12px] bg-[linear-gradient(90deg,#16a34a)] text-white rounded-[12px] font-[600]"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
