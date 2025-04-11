import React from "react";
import logo from "../page1&navbarPic/logo-dark.png";
import './navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <button className="navbar-login">Login</button>
     
    </div>
  );
}

export default Navbar;
