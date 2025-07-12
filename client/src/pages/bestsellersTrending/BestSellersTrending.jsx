import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

const BestSellersTrending = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "djealhsp2" } });

  const img = cld
    .image("black-cart_srtcc2")
    .format("auto") // Use optimal image format
    .quality("auto:best") // Highest visual quality with smart compression
    .delivery("dpr:auto") // Device pixel ratio awareness (e.g., Retina screens)

  const imgUrl = img.toURL();

  return (
    <>
      <div className="text-center mt-3 text-white">
        <div
          style={{
            height: "800px",
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            marginBlockStart: "10rem",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
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
