// pages/Unauthorized.jsx (Enhanced Version)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    setIsVisible(true);

    // Auto redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoBack = () => navigate(-1);
  const handleGoHome = () => navigate("/");
  const handleLogin = () => navigate("/login");

  return (
    <div
      className="relative min-h-screen font-serif overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
      }}
    >
      {/* Floating Background Elements */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            background: `radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)`,
            animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite ${
              Math.random() * 2
            }s`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div
          className="max-w-2xl w-full mx-auto text-center bg-white/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease-out",
          }}
        >
          {/* Animated Lock Icon */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-emerald-100/50 animate-ping" />
            </div>
            <svg
              className="w-28 h-28 mx-auto relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#059669" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* 403 Number with Animation */}
          <div className="relative mb-4">
            <div
              className="text-[200px] md:text-[250px] font-extrabold leading-none select-none"
              style={{
                background:
                  "linear-gradient(135deg, #065f46 0%, #10b981 50%, #34d399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              403
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center text-[200px] md:text-[250px] font-extrabold select-none"
              style={{
                color: "rgba(16,185,129,0.05)",
                transform: "translateY(10px)",
              }}
            >
              403
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Access Denied
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-emerald-400" />
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="h-[2px] w-12 bg-emerald-400" />
          </div>

          {/* Message */}
          <p className="text-lg mb-2 text-gray-700">
            You don't have permission to view this page.
          </p>
          <p className="text-gray-500 mb-8">
            Please log in with an account that has the necessary permissions.
          </p>

          {/* Role Suggestions */}
          <div className="bg-white/50 rounded-xl p-4 mb-8">
            <p
              className="text-sm font-semibold mb-2"
              style={{ color: "#047857" }}
            >
              Required Access Levels:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                Admin
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                Donor
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                Volunteer
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handleLogin}
              className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-2px) scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login to Access
            </button>

            <button
              onClick={handleGoBack}
              className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
              style={{
                background: "white",
                color: "#059669",
                border: "2px solid #10b981",
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Previous Page
            </button>

            <button
              onClick={handleGoHome}
              className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
              style={{
                background: "white",
                color: "#059669",
                border: "2px solid #e5e7eb",
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </button>
          </div>

          {/* Auto Redirect Countdown */}
          <div className="text-sm text-gray-500">
            Redirecting to homepage in {countdown} seconds...
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${(countdown / 5) * 100}%`,
                  background: "linear-gradient(90deg, #10b981, #059669)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes ping {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Unauthorized;
