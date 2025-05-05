import React from "react";
import ScrollTriggered from "../scrollanimation/ScrollAnimation";

const NewArrivals = () => {
  return (
    <>
      <div className="text-center" style={{ marginBlock: "10rem" }}>
        <div className="display-6">
          New Arrivals!
        </div>
      <ScrollTriggered />
      </div>
    </>
  );
};

export default NewArrivals;
