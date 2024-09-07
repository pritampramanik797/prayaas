import React from "react";
import { useNavigate } from "react-router-dom";

function HeroPage({ user }) {
  const navigate = useNavigate();

  const handleStart = () => {
    if (user) {
      navigate("/profile"); // If user is logged in, go to profile
    } else {
      navigate("/register"); // If user is not logged in, go to register page
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, black, #6a0dad)",
        backgroundSize: "200% 200%", // Required for gradient movement
        animation: "gradientAnimation 6s ease infinite", // Animation for background gradient
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          background: "linear-gradient(to right, white, #6a0dad)",
          backgroundSize: "200% 200%",
          animation: "gradientAnimation 6s ease infinite", // Animation for text gradient
          WebkitBackgroundClip: "text", // Clip text to show background gradient
          WebkitTextFillColor: "transparent", // Make the text fill transparent to show the gradient
        }}
      >
        Welcome to PRAYAAS
      </h1>
      <h3
        style={{
          fontSize: "1.2rem",
          color: "#ddd", // Lighter color for paragraph text
          textAlign: "center",
          maxWidth: "600px",
          marginTop: "20px",
        }}
      >
        Ends violence against women in all forms.
      </h3>
      <button
        className="btn btn-primary"
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "1.5rem",
          background: "linear-gradient(135deg, #4b0082, #6a0dad)",
          backgroundSize: "200% 200%",
          animation: "gradientAnimation 6s ease infinite", // Animation for button gradient
          border: "none",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
          transition: "background 0.8s ease-in-out",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, #6a0dad, #4b0082)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "linear-gradient(135deg, #4b0082, #6a0dad)";
        }}
        onClick={handleStart}
      >
        Let's Start!
      </button>
    </div>
  );
}

// Keyframes for the gradient animation
const styles = document.createElement('style');
styles.innerHTML = `
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(styles);

export default HeroPage;
