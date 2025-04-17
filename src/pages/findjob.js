import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";

import background from "../page1&navbarPic/backgroundpic.png";
import "./findjob.css";

function Findjob() {
  const [jobs, setJobs] = useState([]);
  const [likedJobs, setLikedJobs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const toggleLike = (jobId) => {
    setLikedJobs(prevLikes => ({
      ...prevLikes,
      [jobId]: !prevLikes[jobId],
    }));
  };

  return (
    <div className="findjob">
      <img className="gethired-background" src={background} alt="Background" />

      <div className="findjob-search">
        <h1 className="findjob-title">Latest Jobs</h1>

        <div className="search-section">
          <input
            className="search-section-search"
            type="text"
            placeholder="Search Jobs by title"
          />
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
        {jobs.length === 0 ? (
          <p style={{ color: "#fff", padding: "20px" }}>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>

              <Link to={`/moredetails/${job.id}`}>
                <button className="job-card-btn">More Details</button>
              </Link>

              <button
                className="heart-btn"
                onClick={() => toggleLike(job.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginLeft: "10px",
                }}
              >
                <FaHeart
                  style={{
                    color: likedJobs[job.id] ? "red" : "gray",
                    fontSize: "20px",
                  }}
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Findjob;
