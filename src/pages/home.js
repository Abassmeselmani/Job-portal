import React from 'react';
import './home.css';
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



function Home() {
  const logos = [amazon, atlassion, google, ibm, meta, microsoft, netflix, uber];

  return (
    <div className='gethired'>
      <img className='gethired-background' src={background} alt="Background" />
      
      <div className='get-hired-part1'>
        <h1 className='gethired-title'>
          Find your dream job <span className='gethired-span'>and get</span>  
          <img className='get-hired-logo' src={logo} alt="Logo" />
        </h1>
        <p className='gethired-part1-parag'>Explore thousands of the Job listing or find the perfect Candidate</p>
        <div className='gethired-buttoms'>
          <button className='gethired-btn1'>Find Jobs</button>
          <button className='gethired-btn2'>Post a Job</button>
        </div>
      </div>

      <div className='gethired-companies-slider'>
        <div className='gethired-track'>
          {[...logos, ...logos].map((logo, index) => (
            <img key={index} src={logo} alt={`Company ${index}`} />
          ))}
        </div>
      </div>

      <div className='gethired-part2'>
        <img className='gethired-part2-img' src={banner}/>

      </div>
    </div>
  );
}

export default Home;
