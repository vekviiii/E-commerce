import React from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonProductCard = () => {
  return (
    <Box
      sx={{
        width: 220,
        height: '100%',
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={160}
        animation="wave"
        sx={{ borderRadius: 1 }}
      />
      <Box sx={{ p: 1 }}>
        <Skeleton width="90%" />
        <Skeleton width="100%" sx={{ mb: 2 }} />
        <Skeleton width="40%" />
        <Box mt={2}>
          <Skeleton variant="rectangular" height={36} width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonProductCard;
