import React, { useContext, useState, useEffect } from "react";
import logo from "../page1&navbarPic/logo-dark.png";
import './navbar.css';
import { useNavigate, Link } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import { AuthContext } from "../context";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [isPoster, setIsPoster] = useState(false); // ✅ Add this state

  const closeLoginModal = () => setShowLoginModal(false);
  const closeSignupModal = () => setShowSignupModal(false);

  const handleLoginClick = () => {
    if (user) {
      setShowLinks(!showLinks);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleSignupClick = () => {
    if (!user) {
      setShowSignupModal(true);
    }
  };

  // ✅ Call this only when user changes
  useEffect(() => {
    const checkIfUserIsPoster = async () => {
      if (user) {
        const db = getFirestore();
        const jobsRef = collection(db, "jobs");
        const q = query(jobsRef, where("posterId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setIsPoster(!querySnapshot.empty);
      } else {
        setIsPoster(false);
      }
    };

    checkIfUserIsPoster();
  }, [user]);

  return (
    <>
      <div className="navbar">
        <img onClick={() => navigate("/")} src={logo} alt="Logo" className="navbar-logo" />

        {!user && (
          <div className="navbar-buttons">
            <button onClick={handleLoginClick} className="navbar-login">Login</button>
          </div>
        )}

        {user && (
          <button 
            onClick={handleLoginClick} 
            className="navbar-login rounded"
          >
            Account
          </button>
        )}

        {user && showLinks && (
          <div className="user-links">
            {user && (
              <div className="user-email" style={{ position: "absolute", top: 10, right: 120, color: "white", fontWeight: "bold" }}>
                {user.email}
              </div>
            )}
            {isPoster ? (
              <Link to="/posterjob">My Posted Jobs</Link>
            ) : (
              <Link to="/myjobs">My Jobs</Link>
            )}
            <Link to="/savedjobs">Saved Jobs</Link>
            <button onClick={logout}>Sign out</button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showLoginModal && (
        <Login 
          isModal={true} 
          onClose={closeLoginModal} 
          onSwitchToSignup={() => {
            closeLoginModal();
            setShowSignupModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <Signup 
          isModal={true} 
          onClose={closeSignupModal} 
          onSwitchToLogin={() => {
            closeSignupModal();
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
}

export default Navbar;
