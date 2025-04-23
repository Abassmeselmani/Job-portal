import React, { useEffect, useState } from "react";
import background from "../page1&navbarPic/backgroundpic.png";
import "./savedjobs.css";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig"; // Make sure you're importing your Firebase config
import "./savedjobs.css";
function Savedjobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        // Fetch jobIds from likedJobs collection
        const querySnapshot = await getDocs(collection(db, "likedJobs"));
        const savedJobsList = [];

        // For each saved jobId, fetch the job details (title, description) from jobs collection
        for (let docSnapshot of querySnapshot.docs) {
          const jobId = docSnapshot.data().jobId;
          const jobSnapshot = await getDoc(doc(db, "jobs", jobId));

          if (jobSnapshot.exists()) {
            // Push the full job data to savedJobsList
            savedJobsList.push({
              id: jobSnapshot.id,
              title: jobSnapshot.data().title,
              description: jobSnapshot.data().description,
            });
          }
        }

        setSavedJobs(savedJobsList);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className="finjob-results">
      <img className="gethired-background" src={background} alt="Background" />
      <h1 className="savedjobs-title">Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p>No jobs are saved.</p> // Message when there are no saved jobs
      ) : (
        savedJobs.map((job) => (
          <div className="job-card2" key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>

            {/* Link to the job details page */}
            <Link to={`/moredetails/${job.id}`}>
              <button className="job-card-btn">More Details</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Savedjobs;
