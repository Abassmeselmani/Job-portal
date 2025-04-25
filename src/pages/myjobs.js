import React, { useState, useEffect } from "react";
import background from "../page1&navbarPic/backgroundpic.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./myjobs.css"; // Optional: add this if you want to style the page

function Myjobs() {
  const [applyDetails, setApplyDetails] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "applyDetails"));
        const applyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplyDetails(applyList);
      } catch (error) {
        console.error("Error fetching apply details:", error);
      }
    };

    fetchJobs();
  }, []);
  return (
    <div className="myjobs">
      <img className="gethired-background" src={background} alt="Background" />
      <h1 className="savedjobs-title">My Applications</h1>
  
      <div className="applyDetails">
        {applyDetails.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          applyDetails.map((app) => (
            <div key={app.id} className="application-card">
              <h3>{app.title}</h3>
  
              
              <div className="application-meta">
                <p><strong>Experience:</strong> {app.experience} yrs</p>
                <p><strong>Level:</strong> {app.level}</p>
                <p><strong>Skills:</strong> {app.skills}</p>
              </div>
  
              
              <hr className="divider" />
  
              
              <p className="timestamp">
                Applied on: {new Date(app.timestamp?.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}

export default Myjobs;
