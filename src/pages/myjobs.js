import React, { useState, useEffect, useContext } from "react";
import background from "../page1&navbarPic/backgroundpic.png";
import { collection, getDocs, query, where } from "firebase/firestore"; // 🛠️ Added query, where
import { db, auth } from "../firebaseConfig"; // 🛠️ Also import auth
import "./myjobs.css";
import Notlogged from "./secure";
import Loading from "./loadingpage";


import { AuthContext } from "../context";

function Myjobs() {
  const [applyDetails, setApplyDetails] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!auth.currentUser) return; // 🛡️ Safety check

        const q = query(
          collection(db, "applyDetails"),
          where("userId", "==", auth.currentUser.uid) // 🛠️ Filter by userId
        );

        const querySnapshot = await getDocs(q);
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

  if (!user) {
      return <Notlogged />;
    }
    

  return (
    <div className="myjobs">
      <img className="gethired-background" src={background} alt="Background" />
      <h1 className="savedjobs-title">My Applications</h1>

      <div className="applyDetails">
        {applyDetails.length === 0 ? (
          <Loading/>
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
