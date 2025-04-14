import React, { useImperativeHandle } from "react";
import logo from "../page1&navbarPic/logo-dark.png";
import './navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <button onClick={() => navigate("/login")} className="navbar-login">Login</button>
     
    </div>
  );
}

export default Navbar;
