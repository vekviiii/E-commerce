import React from "react";

const BestSellersTrending = () => {
  return (
    <>
      <div className="text-center mt-3 text-white">
        <div
          style={{
            height: "800px",
            backgroundColor: "black",
            marginBlockStart: "10rem",
          }}
        >
          <div className="d-grid h-100" style={{ alignItems: "center" }}>
            <div>
              <div className="gasoek-one-regular display-5">
                Hot Picks, Timeless Trends—Shop the Best!
              </div>
              <div style={{ marginBlockStart: "0.2rem" }}>
                Trending Now, Loved Forever—Get Yours Today
              </div>
              <button className="shrink mt-3">Shop</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellersTrending;
