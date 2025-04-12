import React, { useState } from "react";
import './postjob.css';
import background from "../page1&navbarPic/backgroundpic.png";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Postjob() {
  const [editorContent, setEditorContent] = useState("");

  return (
    <div className="postjob">
      <img className="postjob-background" src={background} alt="Background" />

      <div className="postjob-info">
        <h1 className="postjob-title">Latest Jobs</h1>

        <div className="postjob-search">
          <input
            type="text"
            placeholder="Job Title"
            className="postjob-search-input"
          />
        </div>

        <div className="postjob-description-section">
          <textarea
            placeholder="Job Description"
            className="postjob-description-input"
          />
        </div>

        <div className="postjob-filter-section">
          <select className="postjob-filter-select">
            <option value="">Job Location</option>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="germany">Germany</option>
            <option value="india">India</option>
            <option value="france">France</option>
            <option value="australia">Australia</option>
          </select>

          <select className="postjob-filter-select">
            <option value="">Select Company</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="data-scientist">Data Scientist</option>
            <option value="machine-learning">Machine Learning Engineer</option>
            <option value="cybersecurity">Cybersecurity Analyst</option>
            <option value="cloud">Cloud Engineer</option>
            <option value="qa">QA Tester</option>
            <option value="devops">DevOps Engineer</option>
          </select>

          <button className="postjob-btn">Add Company</button>
        </div>

        {/* 🔽 New Section: Editor + Preview in One Box */}
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
        <button className="postjob-submit">Submit</button>
      </div>
    </div>
  );
}

export default Postjob;
