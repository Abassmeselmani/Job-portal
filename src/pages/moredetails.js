import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import background from "../page1&navbarPic/backgroundpic.png";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa"; // Location Icon
import "./moredetails.css";

function Moredetails() {
  const [job, setJob] = useState(null);
  const { id } = useParams();

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

  return (
    <div className="Moredetails">
      <img className="gethired-background" src={background} alt="Background" />
      <div className="jobsfetched">
        <div className="fetchedjobs-part1">
          <h2 className="fetchedjobs-part1-title">{job.title}</h2>
          
          {/* Location Section with Icon */}
          <div className="location-info">
            <FaMapMarkerAlt style={{ marginRight: "8px", color: "rgb(60, 60, 245)", fontSize: "20px" }} />
            <p className="location-info-title">{job.location}</p>
          </div>
          
          <h1>About the Job</h1>
          <p>{job.description}</p>

          <h1>What we are looking for</h1>
          <p>{job.editor}</p> {/* Assuming 'editor' is part of job data */}

          {/* Render job content here */}
          <div
            className="moredetails-editor-content"
            dangerouslySetInnerHTML={{ __html: job.content }} // Render the HTML content here
          />
        </div>
      </div>
    </div>
  );
}

export default Moredetails;
