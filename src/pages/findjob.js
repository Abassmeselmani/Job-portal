import React, { useState, useEffect } from "react";
import { collection, deleteDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

import background from "../page1&navbarPic/backgroundpic.png";
import "./findjob.css";

function Findjob() {
  const [jobs, setJobs] = useState([]);
  const [likedJobs, setLikedJobs] = useState({});
  const [joblooptitle, setJoblooptitle] = useState(""); // For title search
  const [selectedCountry, setSelectedCountry] = useState(""); // For country filter
  const [selectedPosition, setSelectedPosition] = useState(""); // For position filter
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

  const toggleLike = async (jobId) => {
    const newLikedJobs = {
      ...likedJobs,
      [jobId]: !likedJobs[jobId],
    };

    setLikedJobs(newLikedJobs);

    if (!likedJobs[jobId]) {
      // Save liked job
      try {
        await setDoc(doc(db, "likedJobs", jobId), {
          jobId: jobId,
          timestamp: new Date(),
          userId: auth.currentUser.uid, // ✅ Save the user ID
          savedAt: new Date(),
        });
      } catch (error) {
        console.error("Error saving liked job:", error);
      }
    } else {
      // Remove liked job
      try {
        await deleteDoc(doc(db, "likedJobs", jobId)); // Delete liked job from Firestore
      } catch (error) {
        console.error("Error deleting liked job:", error);
      }
    }
  };

  // Filter jobs based on title, country, and position
  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(joblooptitle.toLowerCase()) &&
      (selectedCountry ? job.country === selectedCountry : true) &&
      (selectedPosition ? job.position === selectedPosition : true)
    );
  });

  return (
    <div className="findjob">
      <img className="gethired-background" src={background} alt="Background" />

      <div className="findjob-search">
        <h1 className="findjob-title">Latest Jobs</h1>

        <div className="search-section">
          <input
            value={joblooptitle}
            onChange={(e) => setJoblooptitle(e.target.value)}
            className="search-section-search"
            type="text"
            placeholder="Search Jobs by title"
          />
          <button className="search-section-btn">Search</button>
        </div>

        <div className="filter-section">
          <select
            className="filter-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="germany">Germany</option>
            <option value="india">India</option>
            <option value="france">France</option>
            <option value="australia">Australia</option>
          </select>

          <select
            className="filter-select"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
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

          <button className="clear-filter-btn" onClick={() => {setSelectedCountry(""); setSelectedPosition(""); setJoblooptitle("");}}>Clear Filters</button>
        </div>
      </div>

      <div className="finjob-results">
        {filteredJobs.length === 0 ? (
          <p style={{ color: "#fff", padding: "20px" }}>No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
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
