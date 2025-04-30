import React, { useContext, useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

import logo from "../page1&navbarPic/logo-dark.png";
import background from "../page1&navbarPic/backgroundpic.png";
import amazon from "../page1&navbarPic/amazon.png";
import atlassion from "../page1&navbarPic/attlasion.png";
import google from "../page1&navbarPic/google.webp";
import ibm from "../page1&navbarPic/ibm.png";
import meta from "../page1&navbarPic/meta.png";
import microsoft from "../page1&navbarPic/microsoft.webp";
import netflix from "../page1&navbarPic/netflix.png";
import uber from "../page1&navbarPic/uber.png";
import banner from "../page1&navbarPic/banner.jpeg";
import { AuthContext } from '../context';

function Home() {
  const logos = [amazon, atlassion, google, ibm, meta, microsoft, netflix, uber];
  const [activeParagraph, setActiveParagraph] = useState(null);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user } = useContext(AuthContext);

  const handleEnterLogin = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    } else {
      navigate("/section");
    }
  }

  const faqData = [
    { id: 0, question: "What is Hirred?", answer: "Hirred is a job portal that connects job seekers with employers." },
    { id: 1, question: "How do I post a job?", answer: "Click on the 'Post a Job' button, create an account or log in, then submit the job details." },
    { id: 2, question: "How do I search for a job?", answer: "Use the 'Find Jobs' button to browse available jobs." },
    { id: 3, question: "How do I apply for a job?", answer: "Click on a job listing, hit 'Apply' and follow the instructions." },
    { id: 4, question: "Can I save jobs to apply later?", answer: "Yes! Just click 'Save Job' to keep it in your favorites." },
    { id: 5, question: "How do I track my job applications?", answer: "Go to your dashboard after logging in to see your application status." }
  ];

  return (
    <div className='gethired'>
      {/* Background Image */}
      <img className='gethired-background' src={background} alt="Background" />

      {/* Part 1 */}
      <div className='get-hired-part1'>
        <h1 className='gethired-title'>
          Find your dream job <span className='gethired-span'>and get</span>
          <img onClick={() => navigate("/")} className='get-hired-logo' src={logo} alt="Logo" />
        </h1>
        <p className='gethired-part1-parag'>
          Explore thousands of job listings or find the perfect candidate
        </p>

        <div className='gethired-buttoms'>
          <button onClick={handleEnterLogin} className='gethired-btn1'>Find Jobs</button>
          <button onClick={handleEnterLogin} className='gethired-btn2'>Post a Job</button>
        </div>
      </div>

      {/* Companies Slider */}
      <div className='gethired-companies-slider'>
        <div className='gethired-track'>
          {[...logos, ...logos].map((logo, index) => (
            <img key={index} src={logo} alt={`Company ${index}`} />
          ))}
        </div>
      </div>

      {/* Part 2 with Banner and Job Seeker / Employer Info */}
      <div className='gethired-part2'>
        <img className='gethired-part2-img' src={banner} alt="Banner" />
        <div className="get-hired-option">
          <div className="option-box">
            <h1>For Job Seekers</h1>
            <p>Search and apply for jobs, track applications, and more.</p>
          </div>
          <div className="option-box">
            <h1>For Employers</h1>
            <p>Post jobs, manage applications, and find the best candidates.</p>
          </div>
        </div>

        <div className='get-hired-faq'>
          {faqData.map(({ id, question, answer }) => (
            <div key={id}>
              <h1 onClick={() => setActiveParagraph(activeParagraph === id ? null : id)} className={activeParagraph === id ? "active" : ""}>
                {question}
              </h1>
              <p className={activeParagraph === id ? "active" : "hidden"}>{answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Please Log In</h2>
            <button onClick={() => setShowLoginModal(false)} className="modal-close">Close</button>
            <p>You need to be logged in to continue. Please log in or sign up.</p>
            {/* Add your login form here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
