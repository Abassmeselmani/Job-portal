import React, { useContext, useState } from "react";
import logo from "../page1&navbarPic/logo-dark.png";
import './navbar.css';
import { useNavigate } from "react-router-dom";
import Login from "../pages/login";
import { AuthContext } from "../context";
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showsignupModal, setshowsignupModal] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setshowsignupModal(false);
  };

  const handleLoginClick = () => {
    if (user) {
      setShowLinks(!showLinks); // Toggle the visibility of user info links
    } else {
      setShowLoginModal(true);
      setshowsignupModal(true); // Show the login modal if not logged in
    }
  };

  return (
    <>
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />

        {/* Login button that becomes rounded when user is logged in */}
        <button 
          onClick={handleLoginClick} 
          className={`navbar-login ${user ? 'rounded' : ''}`}
        >
          {user ? "Account" : "Login"}
        </button>

        {/* User Info Links (only visible if user is logged in and clicked the button) */}
        {user && showLinks && (
          <div className="user-links">
            <Link to="/myjobs">My Jobs</Link>
            <Link to="/savedjobs">Saved Jobs</Link>
            <button onClick={logout}>Sign out</button>
          </div>
        )}
      </div>

      {/* Render the Login modal */}
      {showLoginModal && (
        <Login isModal={true} onClose={closeLoginModal} />
      )}
    </>
  );
}

export default Navbar;
