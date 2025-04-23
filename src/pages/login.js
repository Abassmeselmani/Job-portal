import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import Google from "../page1&navbarPic/googlelogo.png";
import "./login.css";

function Login({ isModal = false, onClose, onSwitchToSignup }) {
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (isModal && onClose) onClose();
      else navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("No user found with this email.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={isModal ? "modal-overlay" : "background-wrapper"}>
      <div className={isModal ? "modal-content" : "login-container"}>
        <div className="login">
          {isModal && (
            <button className="close-btn" onClick={onClose}>✕</button>
          )}
          <h1 className="login-title">Login</h1>
          <h1 className="login-descript">Welcome Back sign in to continue</h1>
          <button className="google-btn" onClick={signInWithGoogle}>
            <img src={Google} alt="Google logo" className="google-icon" />
            Sign in with Google
          </button>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="login-btn">Login</button>
            <p className="login-ask">
              Don't have an account?{" "}
              <a onClick={onSwitchToSignup} className="link" href="#">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
