"use client";
import React, { useEffect, useState } from "react";

const UnauthorizedPage = () => {
  // Smooth fade-in effect for Next.js hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const func = () => {
      setMounted(true);
    };
    func();
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#0a0a0a", // Premium deep black
    fontFamily: "system-ui, -apple-system, sans-serif",
    color: "#ededed",
    textAlign: "center",
    padding: "20px",
    opacity: mounted ? 1 : 0,
    transition: "opacity 0.6s ease-in-out",
  };

  const eyeStyle = {
    fontSize: "80px",
    marginBottom: "15px",
    filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.1))", // Subtle glow
  };

  return (
    <div style={containerStyle}>
      {/* Sad puppy face */}
      <div style={eyeStyle}>🥺</div>

      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#fff",
          marginBottom: "12px",
          letterSpacing: "-0.05em",
        }}
      >
        Aww... Access Denied
      </h1>

      <p
        style={{
          fontSize: "1.05rem",
          maxWidth: "420px",
          lineHeight: "1.6",
          color: "#a0a0a0", // Soft grey for dark mode readability
          marginBottom: "10px",
        }}
      >
        {`We're really sorry, but you don't have permission to view this page.
        Maybe you need to log in, or perhaps you just wandered into the wrong
        neighborhood?`}
      </p>

      <button
        onClick={() => window.history.back()}
        style={{
          marginTop: "30px",
          padding: "12px 28px",
          fontSize: "0.95rem",
          fontWeight: "600",
          background: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)",
          border: "1px solid #3a3a3a",
          borderRadius: "8px",
          cursor: "pointer",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.background =
            "linear-gradient(135deg, #3a3a3a 0%, #252525 100%)";
          e.target.style.borderColor = "#555";
          e.target.style.transform = "translateY(-1px)";
        }}
        onMouseOut={(e) => {
          e.target.style.background =
            "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)";
          e.target.style.borderColor = "#3a3a3a";
          e.target.style.transform = "translateY(0)";
        }}
      >
        Take me back safely
      </button>
    </div>
  );
};

export default UnauthorizedPage;
