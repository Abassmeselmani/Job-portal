import React, { useContext, useState } from "react";
import logo from "../page1&navbarPic/logo-dark.png";
import './navbar.css';
import { useNavigate, Link } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import { AuthContext } from "../context";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const closeLoginModal = () => setShowLoginModal(false);
  const closeSignupModal = () => setShowSignupModal(false);

  const handleLoginClick = () => {
    if (user) {
      setShowLinks(!showLinks);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleSignupClick = () => {
    if (!user) {
      setShowSignupModal(true);
    }
  };

  return (
    <>
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />

        {!user && (
          <div className="navbar-buttons">
            <button onClick={handleLoginClick} className="navbar-login">Login</button>
          </div>
        )}

        {user && (
          <button 
            onClick={handleLoginClick} 
            className="navbar-login rounded"
          >
            Account
          </button>
        )}

        {user && showLinks && (
          <div className="user-links">
             {user && (
    <div className="user-email" style={{ position: "absolute", top: 10, right: 120, color: "white" , fontWeight: "bold" }}>
      {user.email}
    </div>
  )}
            <Link to="/myjobs">My Jobs</Link>
            <Link to="/savedjobs">Saved Jobs</Link>
            <button onClick={logout}>Sign out</button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showLoginModal && (
        <Login 
          isModal={true} 
          onClose={closeLoginModal} 
          onSwitchToSignup={() => {
            closeLoginModal();
            setShowSignupModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <Signup 
          isModal={true} 
          onClose={closeSignupModal} 
          onSwitchToLogin={() => {
            closeSignupModal();
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
}

export default Navbar;
