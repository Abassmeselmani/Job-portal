import React from "react";
import background from "../page1&navbarPic/backgroundpic.png";
import { useNavigate } from "react-router-dom";

import './section.css';





function Section(){

    const navigate = useNavigate();
    return(
        <div className="section">
            <img className='gethired-background'src={background}/>
            <h1 className="section-title">I am a...</h1>
            <div className="section-btn">
                <button onClick={() => navigate("/findjob")} className="section-btn1">Candidate</button>
                <button onClick={() => navigate("/postjob")} className="section-btn2">Recruiter</button>

            </div>

        </div>
    )
}


export default Section;