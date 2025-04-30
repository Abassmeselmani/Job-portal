import React, { useEffect, useState } from "react";
import background from "../page1&navbarPic/backgroundpic.png";
import "./loadingpage.css";

function Loading() {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLoading((prev) => prev + 1);
      i++;
      if (i > 100) {
        clearInterval(interval);
      }
    }, 20); // fast loading

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading">
      <img className="gethired-background" src={background} alt="Background" />
      <div className="loading-content">
        <div className="range-container">
          <div
            className="range-fill"
            style={{ width: `${loading}%` }}
          ></div>
        </div>
        <h1 className="load-data">Data is being loaded... Please wait</h1>
      </div>
    </div>
  );
}

export default Loading;
