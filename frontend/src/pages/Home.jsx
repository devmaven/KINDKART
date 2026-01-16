import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate(); // ✅ routing added

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ ONLY routing logic added
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="relative min-h-screen font-serif overflow-hidden"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "150px",
          height: "150px",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite 1s",
        }}
      />

      {/* NAVBAR */}
      <header
        className="flex items-center justify-between px-8 py-5"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-30px)",
          transition: "all 0.8s ease-out",
          position: "relative",
          zIndex: 10,
        }}
      >

        <div className="flex items-center gap-2 text-lg font-bold">
          <span
            style={{
              background:
                "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "32px",
              fontWeight: "900",
              letterSpacing: "0.5px",
              textShadow: "0 2px 10px rgba(16, 185, 129, 0.2)",
            }}
          >
            KindKart 
          </span>
        </div>

        <button
          onClick={handleLogin}
          style={{
            padding: "15px 35px",
            background:
              "linear-gradient(135deg, #059669 0%, #047857 100%)",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 20px rgba(5, 150, 105, 0.4)",
            transition: "all 0.3s ease",
            position: "absolute",
            top: "17px",
            right: "100px",
            zIndex: 100,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px) scale(1.05)";
            e.target.style.boxShadow =
              "0 6px 25px rgba(5, 150, 105, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.boxShadow =
              "0 4px 20px rgba(5, 150, 105, 0.4)";
          }}
        >
          Login
        </button>
      </header>

      {/* LEFT CONTENT */}
      <div
        style={{
          marginLeft: "100px",
          marginTop: "60px",
          maxWidth: "500px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-50px)",
          transition: "all 1s ease-out 0.3s",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            lineHeight: "1.1",
            fontWeight: "800",
            background:
              "linear-gradient(135deg, #065f46 0%, #10b981 50%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "20px",
          }}
        >
          Your <br />
          Support <br />
          Matters.
        </h1>

        <p
          style={{
            fontSize: "1.9rem",
            fontStyle: "italic",
            color: "#047857",
            marginBottom: "15px",
            animation: "fadeIn 1s ease-out 1.2s backwards",
          }}
        >
          Be a helping hand.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "35px",
            animation: "fadeIn 1s ease-out 1.5s backwards",
          }}
        >
          <div style={{ height: "2px", width: "45px", background: "#10b981" }} />
          <p style={{ color: "#059669", fontSize: "1.25rem" }}>
            Every contribution creates impact.
          </p>
        </div>

        <button
          onClick={handleRegister}
          style={{
            padding: "18px 38px",
            background:
              "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 8px 30px rgba(16, 185, 129, 0.4)",
            transition: "all 0.4s ease",
            position: "relative",
            overflow: "hidden",
            animation: "fadeIn 1s ease-out 1.8s backwards",
          }}
        >
          Join our mission →
        </button>

        {/* Floating Badge */}
        <div
          style={{
            marginTop: "35px",
            background: "rgba(255, 255, 255, 0.95)",
            padding: "15px 25px",
            borderRadius: "12px",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
            animation:
              "float 3s ease-in-out infinite, fadeIn 1s ease-out 2s backwards",
            backdropFilter: "blur(10px)",
            maxWidth: "240px",
          }}
        >
          <div
            style={{ fontSize: "0.75rem", color: "#059669", marginBottom: "4px" }}
          >
            Making a difference
          </div>
          <div
            style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#065f46" }}
          >
            Together We Can
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "120px",
          width: "550px",
          height: "650px",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(16, 185, 129, 0.3)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? `translateX(0) translateY(${scrollY * 0.1}px)`
            : "translateX(50px)",
          transition: "opacity 1s ease-out 0.5s, transform 0.1s ease-out",
          background:
            "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        }}
      >
        <img
          src="img2.jpg"
          alt="Impact"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* CSS Animations */}
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
