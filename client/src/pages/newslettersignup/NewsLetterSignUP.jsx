import { Input } from "@mui/material";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import "./style.css";

const NewsLetterSignUP = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <div
        className="newletter-container newletter-container-animated"
        style={{
          width: "100%",
          height: "400px",
          marginBlock: "6rem",
        }}
      >
        <div className="custom-container" ref={ref}>
          <div>
            <motion.div
              className="gasoek-one-regular display-5"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Be first to know
            </motion.div>
            <motion.div
              style={{ marginBlockStart: "0.2rem" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Receive curated inspirations, priority access to exclusive
              releases, and bespoke offers — delivered directly to your inbox.
            </motion.div>
            <motion.div
              className="d-flex justify-content-start mt-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Input placeholder="Email" className="newsletter-placeholder" />
              <button className="shrink">I'm in</button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetterSignUP;
