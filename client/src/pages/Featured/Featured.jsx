import React from "react";
import { Typography } from "@mui/material";
import Slider from "react-slick";

import "./styles.css";

const Featured = () => {
  const slickSetting = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    pauseOnFocus: true,
    autoplay: false,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="text-center" style={{ marginBlock: "5rem" }}>
        <div className="gasoek-one-regular display-5">
          Style That Speaks—Features That Dazzle!
        </div>
        <div style={{ marginBlockStart: "0.2rem" }}>
          Elevate Your Look, One Chic Detail at a Time!
        </div>
      </div>
      <Slider {...slickSetting} className="Featured-container">
        <div className="Featured-item"></div>
        <div className="Featured-item"></div>
        <div className="Featured-item"></div>
        <div className="Featured-item"></div>
        <div className="Featured-item"></div>
        <div className="Featured-item"></div>
        <div className="Featured-item"></div>
        <div className="Featured-item"></div>
      </Slider>
    </>
  );
};

export default Featured;
