import React, { useEffect, useState, useContext } from "react";
import background from "../page1&navbarPic/backgroundpic.png";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../context";
import { Link } from "react-router-dom";
import "./posterjob.css"; // Optional if you store styles separately

function Posterjob() {
  const { user } = useContext(AuthContext);
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      if (!user) return;
      const db = getFirestore();
      const jobsRef = collection(db, "jobs");
      const q = query(jobsRef, where("posterId", "==", user.uid));
      const snapshot = await getDocs(q);
      const jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPostedJobs(jobs);
      setLoading(false);
    };

    fetchPostedJobs();
  }, [user]);

  return (
    <div className="postedjobs">
      <img className="gethired-background" src={background} alt="Background" />
      <h2 className="savedjobs-title">My Jobs</h2>

      <div className="finjob-results">
        {loading ? (
          <p style={{ color: "#fff", padding: "20px" }}>Loading...</p>
        ) : postedJobs.length === 0 ? (
          <p style={{ color: "#fff", padding: "20px" }}>You haven’t posted any jobs yet.</p>
        ) : (
          postedJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>

              <Link to={`/moredetails2/${job.id}`}>
                <button className="job-card-btn">More Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Posterjob;
