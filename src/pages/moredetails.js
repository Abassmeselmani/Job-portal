import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { getDoc, doc, addDoc, collection, Timestamp } from "firebase/firestore";
import background from "../page1&navbarPic/backgroundpic.png";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./moredetails.css";

function Moredetails() {
  const [job, setJob] = useState(null);
  const { id } = useParams(); // Get job ID from URL params

  const [formVisible, setFormVisible] = useState(false);
  const [applied, setApplied] = useState(false);

  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [resume, setResume] = useState(null);

  // Fetch job data from Firestore using job ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobRef = doc(db, "jobs", id);
        const jobSnap = await getDoc(jobRef);
        if (jobSnap.exists()) {
          setJob({ id: jobSnap.id, ...jobSnap.data() });
        } else {
          console.log("No such job!");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return null;

  // Handle final application submission
  const handleFinalApply = async () => {
    try {
      const applyData = {
        title: job.title,
        experience,
        skills,
        level,
        timestamp: Timestamp.now(),
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,  // Save the user ID of the applicant
        savedAt: new Date(),
        jobId: job.id            // Save when the user applied
      };

      await addDoc(collection(db, "applyDetails"), applyData);  // Save to Firestore

      alert("Applied successfully!");

      setApplied(true);  // Mark as applied
      setFormVisible(false);  // Hide form after applying
    } catch (error) {
      console.error("Error applying:", error);
    }
  };

  return (
    <div className="Moredetails">
      <img className="gethired-background" src={background} alt="Background" />
      <div className="jobsfetched">
        <div className="fetchedjobs-part1">
          <h2 className="fetchedjobs-part1-title">{job.title}</h2>

          <div className="location-info">
            <FaMapMarkerAlt
              style={{
                marginRight: "8px",
                color: "rgb(60, 60, 245)",
                fontSize: "20px",
              }}
            />
            <p className="location-info-title">{job.location}</p>
          </div>

          <h1>About the Job</h1>
          <p>{job.description}</p>

          <h1>What we are looking for</h1>
          <p>{job.editor}</p>

          <div
            className="moredetails-editor-content"
            dangerouslySetInnerHTML={{ __html: job.content }}
          />

          {/* Apply Button */}
          <button
            className={`apply-btn ${applied ? "applied" : ""}`}
            onClick={() => {
              if (!applied) setFormVisible(true);
            }}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>

          {/* Application Form */}
          {formVisible && !applied && (
            <div className="application-form">
              <h2>Apply for the Job</h2>

              <input
                type="text"
                placeholder="Years of Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />

              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <input
                type="file"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button className="final-apply-btn" onClick={handleFinalApply}>
                Submit Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Moredetails;
