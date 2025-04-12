import React from "react";
import './findjob.css';

import background from "../page1&navbarPic/backgroundpic.png";

function Findjob() {
  return (
    <div className="findjob">
      <img className="gethired-background" src={background} alt="Background" />

      <div className="findjob-search">
        <h1 className="findjob-title">Latest Jobs</h1>

        <div className="search-section">
          <input className="search-section-search" type="text" placeholder="Search Jobs by title" />
          <button className="search-section-btn">Search</button>
        </div>

        <div className="filter-section">
          <select className="filter-select">
            <option value="">Select Country</option>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="germany">Germany</option>
            <option value="india">India</option>
            <option value="france">France</option>
            <option value="australia">Australia</option>
          </select>

          <select className="filter-select">
            <option value="">Select CS Position</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="data-scientist">Data Scientist</option>
            <option value="machine-learning">Machine Learning Engineer</option>
            <option value="cybersecurity">Cybersecurity Analyst</option>
            <option value="cloud">Cloud Engineer</option>
            <option value="qa">QA Tester</option>
            <option value="devops">DevOps Engineer</option>
          </select>

          <button className="clear-filter-btn">Clear Filters</button>
        </div>
      </div>
      <div className="finjob-results">
        

      </div>
    </div>
  );
}

export default Findjob;
