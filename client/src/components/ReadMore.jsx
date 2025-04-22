import React, { useState } from "react";
import { Typography, Link } from "@mui/material";

const ReadMore = ({ text, maxChars = 120 }) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > maxChars;
  const displayedText = expanded || !isLong ? text : text.slice(0, maxChars) + "...";

  return (
    <Typography variant="body2" color="text.secondary">
      {displayedText}
      {isLong && (
        <>
          {" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => setExpanded(!expanded)}
            underline="none"
            sx={{ ml: 1 }}
          >
            {expanded ? "Show less" : "Read more"}
          </Link>
        </>
      )}
    </Typography>
  );
};

export default ReadMore;