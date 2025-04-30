import React from "react";
import background from "../page1&navbarPic/backgroundpic.png";
import { FaSadTear } from "react-icons/fa";
import "./secure.css"; // New CSS file

function Notlogged() {
  return (
    <div className="notlogged-container">
      <img className="notlogged-background" src={background} alt="Background" />
      <div className="notlogged-content">
        <FaSadTear className="sad-icon" />
        <h1>You're not logged in</h1>
        <p>Please log in to view this page.</p>
        
      </div>
    </div>
  );
}

export default Notlogged;
