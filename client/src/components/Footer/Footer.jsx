import { Box } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        className="custom-container"
        sx={{ paddingBlock: 10 }}
        display={"grid"}
        justifyItems={"center"}
      >
        <Box display={"flex"} justifyContent={"space-between"} gap={4}>
          <div>© 2025 E-Commerce, Inc. All rights reserved</div>
          <div>Terms of Sale</div>
          <div>Terms of Use</div>
          <div>E-Commerce Privacy Policy</div>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
