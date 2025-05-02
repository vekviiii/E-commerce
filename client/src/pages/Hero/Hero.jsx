import React from "react";
// import HeroVideo from '../../assets/videos/Hero video.mp4'

const Hero = () => {
  return (
    // <video className='mt-2' loop src={HeroVideo} width="100%" height="100%" autoPlay="true"/>
    <div style={{ height: "600px" }}>
      <div className="row g-0 h-100 p-1">
        <div className="col-md bg-dark me-md-1 mb-1 mb-md-0"></div>
        <div className="col-md">
          <div className="row g-0 h-100">
            <div className="bg-success mb-1"></div>
            <div className="bg-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
