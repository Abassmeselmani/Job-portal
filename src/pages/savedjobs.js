import React, { useContext, useEffect, useState } from "react";
import background from "../page1&navbarPic/backgroundpic.png";
import "./savedjobs.css";
import { collection, getDocs, getDoc, doc, query, where, LoadBundleTask } from "firebase/firestore"; 
import { Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig"; // Make sure you're importing auth too!
import { AuthContext } from "../context";
import Notlogged from "./secure";
import Loading from "./loadingpage";
function Savedjobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const {user} = useContext(AuthContext);


  

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        if (!auth.currentUser) return; // 🛡️ Prevent fetching if not logged in

        // Fetch only liked jobs where userId == current user id
        const q = query(
          collection(db, "likedJobs"),
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        const savedJobsList = [];

        // For each liked job, get full job details
        for (let docSnapshot of querySnapshot.docs) {
          const jobId = docSnapshot.data().jobId;
          const jobSnapshot = await getDoc(doc(db, "jobs", jobId));

          if (jobSnapshot.exists()) {
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

  if (!user) {
    return <Notlogged />;
  }
  

  return (
    <div className="finjob-results">
      <img className="gethired-background" src={background} alt="Background" />
      <h1 className="savedjobs-title">Saved Jobs</h1>
      
      {savedJobs.length === 0 ? (
        <Loading /> 
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
