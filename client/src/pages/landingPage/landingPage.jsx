import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import { getProducts } from "../../features/products/productSlice";
const ProductCard = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("../../components/productCard")), 2000)
    )
);
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import SkeletonProductCard from "../../components/SkeletonProductCard";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component={"h1"} gutterBottom textAlign="center">
        Our Products
      </Typography>

      {loading ? (
        <Box display={"flex"} justifyContent={"center"} sx={{ my: 4 }}>
          <CircularProgress />
        </Box>
      ) : products.length > 0 ? (
        <Suspense
          fallback={
            <Box sx={{ mt: 4 }}>
              <Slider {...sliderSettings}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Box key={index} px={1}>
                    <SkeletonProductCard />
                  </Box>
                ))}
              </Slider>
            </Box>
          }
        >
          <Box sx={{ mt: 4 }}>
            <Slider {...sliderSettings}>
              {products.map((product) => (
                <Box key={product._id} px={1}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Suspense>
      ) : (
        <Typography textAlign={"center"} sx={{ mt: 4 }}>
          Nothing here
        </Typography>
      )}
    </Container>
  );
};

export default LandingPage;
