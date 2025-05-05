import React from "react";
import LandingPage from "../landingPage/landingPage";
import Hero from "../Hero/Hero.jsx";
import Featured from "../Featured/Featured.jsx";
import BestSellersTrending from "../bestsellersTrending/BestSellersTrending.jsx";
import NewArrivals from "../newArrivals/NewArrivals.jsx";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Featured />
      <BestSellersTrending />
      <NewArrivals />
      {/* <LandingPage /> */}
    </>
  );
};

export default HomePage;
