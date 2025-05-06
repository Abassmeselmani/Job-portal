import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebaseConfig";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import background from "../page1&navbarPic/backgroundpic.png";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AuthContext } from "../context";
import "./moredetails2.css";

function Moredetails2() {
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  // Fetch job data
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

  // Fetch applicants who applied for this job
  useEffect(() => {
    const fetchApplicants = async () => {
      if (!job?.id) return;

      try {
        const applicantsQuery = query(
          collection(db, "applyDetails"),
          where("jobId", "==", job.id)
        );
        const querySnapshot = await getDocs(applicantsQuery);
        const applicantsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplicants(applicantsData);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [job?.id]);

  // Handle status change
  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      const applicantRef = doc(db, "applyDetails", applicantId);
      await updateDoc(applicantRef, { status: newStatus });
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.id === applicantId
            ? { ...applicant, status: newStatus }
            : applicant
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!job) return null;

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

          {/* Display applicants */}
          <h2>Applicants</h2>
          {applicants.length > 0 ? (
            <div className="applicants-list">
              {applicants.map((applicant, index) => (
                <div key={index} className="applicant-card">
                  <div className="applicant-info">
                    <div className="applicant-header">
                      <h3>{applicant.userName}</h3>
                    </div>

                    <div className="applicant-details">
                      <div className="detail-row">
                        <div className="detail-item">
                          <strong>Level:</strong> {applicant.level}
                        </div>
                        <div className="detail-item">
                          <strong>Skills:</strong> {applicant.skills}
                        </div>
                        
                      </div>

                      
                      <div className="detail-item">
                        <strong>Applied At:</strong>{" "}
                        {new Date(
                          applicant.timestamp.seconds * 1000
                        ).toLocaleString()}
                      </div>

                      <div className="detail-item">
                        <strong>Status:</strong>{" "}
                        <select
                          value={applicant.status || "Applied"}
                          onChange={(e) =>
                            handleStatusChange(applicant.id, e.target.value)
                          }
                        >
                          <option value="Applied">Applied</option>
                          <option value="Hired">Hired</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Rejecting">Rejecting</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No applicants yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Moredetails2;
