import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../context";
import './signup.css';
import Google from "../page1&navbarPic/googlelogo.png";

function Signup({ isModal = false, onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordError("");

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully:", res.user);
      if (isModal && onClose) onClose();
      else navigate("/");
    } catch (error) {
      console.log("Error during register:", error);

      if (error.code === "auth/weak-password") {
        setPasswordError("Password should be at least 6 characters long.");
      } else if (error.code === "auth/invalid-email") {
        setPasswordError("The email address is not valid.");
      } else if (error.code === "auth/email-already-in-use") {
        setPasswordError("The email is already associated with an account.");
      } else {
        setPasswordError("An error occurred. Please try again.");
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
          <h1 className="login-title">Register</h1>
          <h1 className="login-descript">Signup to continue</h1>
          <button className="google-btn" onClick={signInWithGoogle}>
            <img src={Google} alt="Google logo" className="google-icon" />
            Sign in with Google
          </button>
          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                className="login-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                className="login-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                className="login-input"
                required
              />
            </div>
            <button type="submit" className="login-btn">Register</button>
            {passwordError && <p className="error-message">{passwordError}</p>}
            <p className="login-ask">
              Do you have an account?{" "}
              <a onClick={onSwitchToLogin} className="link" href="#">Log In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
