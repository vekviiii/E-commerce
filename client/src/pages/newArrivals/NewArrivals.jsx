import React from "react";
import ScrollTriggered from "../scrollanimation/ScrollAnimation";

const NewArrivals = () => {
  return (
    <>
      <div className="text-center" style={{ marginBlockStart: "8rem" }}>
        <div className="display-6">
          New Arrivals!
        </div>
      <ScrollTriggered />
      </div>
    </>
  );
};

export default NewArrivals;
