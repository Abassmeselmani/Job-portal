import React, { useState } from "react";
import './postjob.css';
import background from "../page1&navbarPic/backgroundpic.png";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { db } from '../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

function Postjob() {
  const [editorContent, setEditorContent] = useState("");
  const [addCompany, setAddCompany] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyFile, setCompanyFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: jobTitle,
      description: jobDescription,
      location: jobLocation,
      company: companyName,
      content: editorContent,
      timestamp: new Date()
    };

    try {
      await addDoc(collection(db, "jobs"), jobData);
      alert("Job is added");
      // Optional: clear form
      setJobTitle("");
      setJobDescription("");
      setJobLocation("");
      setEditorContent("");
      setCompanyName("");
      setCompanyFile(null);
      setAddCompany(false);
    } catch (error) {
      
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCompanyFile(file);
    if (file) {
      const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
      setCompanyName(nameWithoutExtension); // Display company name from file
    }
  };

  return (
    <div className="postjob">
      <img className="postjob-background" src={background} alt="Background" />

      <div className="postjob-info">
        <h1 className="postjob-title">Post a Job</h1>

        <div className="postjob-search">
          <input
            type="text"
            placeholder="Job Title"
            className="postjob-search-input"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        <div className="postjob-description-section">
          <textarea
            placeholder="Job Description"
            className="postjob-description-input"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="postjob-filter-section">
          <select
            className="postjob-filter-select"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
          >
            <option value="">Job Location</option>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="germany">Germany</option>
            <option value="india">India</option>
            <option value="france">France</option>
            <option value="australia">Australia</option>
          </select>

          <select
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="postjob-filter-select"
          >
            <option value="">Select Company</option>
            {companyName && <option value={companyName}>{companyName}</option>}
          </select>

          {!addCompany ? (
            <button className="postjob-btn" onClick={() => setAddCompany(true)}>
              Add Company
            </button>
          ) : (
            <div className="addCompany">
              <h1>Add New Company</h1>
              <div className="addcompany-materials">
                <input
                  type="text"
                  placeholder="Company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="custom-file-input"
                />
              </div>
              <button className="postjob-btn" onClick={() => setAddCompany(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* 🔽 Editor + Preview Section */}
        <div className="postjob-preview-box">
          <div className="postjob-editor">
            <h3 className="postjob-editor-title">Job Post Editor</h3>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              className="postjob-quill"
              placeholder="Write the job post here..."
            />
          </div>

          <div className="postjob-preview">
            <h3 className="postjob-preview-title">Live Preview</h3>
            <div
              className="postjob-preview-content"
              dangerouslySetInnerHTML={{ __html: editorContent }}
            />
          </div>
        </div>

        <button className="postjob-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Postjob;
