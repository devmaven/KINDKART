import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  return (
    <div
      className="relative min-h-screen font-serif overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
      }}
    >
      {/* Floating Background Circles */}
      <div className="absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div className="absolute bottom-[15%] right-[10%] w-[150px] h-[150px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite 1s",
        }}
      />

      {/* NAVBAR */}
      <header
        className={`flex items-center justify-between px-8 py-5 relative z-10 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-7"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 text-lg font-bold">
          <span
            className="text-[32px] font-extrabold tracking-[0.5px]"
            style={{
              background:
                "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 10px rgba(16,185,129,0.2)",
            }}
          >
            KindKart
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="absolute top-[17px] right-[100px] z-[100] px-[35px] py-[15px] rounded-[12px] font-bold text-white transition-all duration-300 shadow-[0_4px_20px_rgba(5,150,105,0.4)]"
          style={{
            background:
              "linear-gradient(135deg, #059669 0%, #047857 100%)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px) scale(1.05)";
            e.target.style.boxShadow = "0 6px 25px rgba(5,150,105,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.boxShadow = "0 4px 20px rgba(5,150,105,0.4)";
          }}
        >
          Login
        </button>
      </header>

      {/* LEFT CONTENT */}
      <div
        className="ml-[100px] mt-[60px] max-w-[500px] transition-all duration-1000 ease-out delay-300"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-50px)",
        }}
      >
        <h1
          className="mb-[20px] font-extrabold leading-[1.1]"
          style={{
            fontSize: "3.5rem",
            background:
              "linear-gradient(135deg, #065f46 0%, #10b981 50%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your <br />
          Support <br />
          Matters.
        </h1>

        <p
          className="mb-[15px] text-[1.9rem] italic"
          style={{
            color: "#047857",
            animation: "fadeIn 1s ease-out 1.2s backwards",
          }}
        >
          Be a helping hand.
        </p>

        <div
          className="flex items-center gap-[12px] mb-[35px]"
          style={{
            animation: "fadeIn 1s ease-out 1.5s backwards",
          }}
        >
          <div className="h-[2px] w-[45px]" style={{ background: "#10b981" }} />
          <p className="text-[1.25rem]" style={{ color: "#059669" }}>
            Every contribution creates impact.
          </p>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="px-[38px] py-[18px] rounded-[12px] font-bold text-white shadow-[0_8px_30px_rgba(16,185,129,0.4)] relative overflow-hidden transition-all duration-400"
          style={{
            background:
              "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            animation: "fadeIn 1s ease-out 1.8s backwards",
          }}
        >
          Join our mission →
        </button>

        {/* Floating Badge */}
        <div
          className="mt-[35px] p-[15px_25px] rounded-[12px] max-w-[240px]"
          style={{
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            backdropFilter: "blur(10px)",
            animation: "float 3s ease-in-out infinite, fadeIn 1s ease-out 2s backwards",
          }}
        >
          <div className="text-[0.75rem] mb-[4px]" style={{ color: "#059669" }}>
            Making a difference
          </div>
          <div className="text-[1.1rem] font-bold" style={{ color: "#065f46" }}>
            Together We Can
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        className="absolute top-[80px] right-[120px] w-[550px] h-[650px] rounded-[25px] overflow-hidden shadow-[0_20px_60px_rgba(16,185,129,0.3)] transition-all duration-100 ease-out"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? `translateX(0) translateY(${scrollY * 0.1}px)`
            : "translateX(50px)",
        }}
      >
        <img
          src="img2.jpg"
          alt="Impact"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;
