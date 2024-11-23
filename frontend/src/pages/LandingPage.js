import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (token) {
    navigate("/");
  }

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Welcome to Book Review App</h1>
      <p>Please register or log in to continue</p>
      <div>
        <button onClick={handleRegister} style={{ marginRight: "10px" }}>
          Register
        </button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LandingPage;
