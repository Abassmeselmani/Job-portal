import React, { useState, useEffect, useContext } from "react";
import background from "../page1&navbarPic/backgroundpic.png";
import { collection, query, where, onSnapshot } from "firebase/firestore"; // 🛠️ onSnapshot for real-time
import { db, auth } from "../firebaseConfig"; // 🛠️ Import auth
import "./myjobs.css";
import Notlogged from "./secure";
import Loading from "./loadingpage";

import { AuthContext } from "../context";

function Myjobs() {
  const [applyDetails, setApplyDetails] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch job applications and listen for real-time changes
  useEffect(() => {
    const fetchJobs = () => {
      if (!auth.currentUser) return; // 🛡️ Safety check

      const q = query(
        collection(db, "applyDetails"),
        where("userId", "==", auth.currentUser.uid) // 🛠️ Filter by userId
      );

      // Real-time listener to fetch data and reflect updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const applyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplyDetails(applyList); // Update state with real-time data
      });

      return () => unsubscribe(); // Clean up listener on unmount
    };

    fetchJobs();
  }, []);

  if (!user) {
    return <Notlogged />;
  }

  return (
    <div className="myjobs">
      <img className="gethired-background" src={background} alt="Background" />
      <h1 className="savedjobs-title">My Applications</h1>

      <div className="applyDetails">
        {applyDetails.length === 0 ? (
          <Loading />
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
              <div className="timstamp-status">
                <p className="timestamp">
                  Applied on: {new Date(app.timestamp?.seconds * 1000).toLocaleString()}
                </p>
                <p className="timstamp-status-title">
                  Status: {app.status || "Applied"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Myjobs;
