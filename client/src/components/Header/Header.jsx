import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Javascript, Logout, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { clearSession } from "../../features/session/sessionSlice";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../../assets/images/Logo Cropped.png";

import "./styles.css";
import NavLinks from "./NavLinks";

const Header = () => {
  const { token, user } = useSelector((state) => state.session);
  const [scrollY, setScrollY] = useState(0);
  let [userName, setUserName] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && user) {
      setUserName(user.name);
    }
  }, [token, user]);

  const scrollHandler = () => {
    setScrollY(window.scrollY);
  };

  function Throttle(func, limit) {
    let isThrottle = false;

    return function (...args) {
      if (!isThrottle) {
        func.apply(this, args);
        isThrottle = true;
        setTimeout(() => {
          isThrottle = false;
        }, limit);
      }
    };
  }

  const throttledScrollHandler = Throttle(scrollHandler, 400);

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [throttledScrollHandler, scrollHandler]);

  return (
    <>
      <Box sx={{ bgcolor: "#fff" }} boxShadow={1} position={"sticky"} top={0}>
        <Box
          className="custom-container"
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Link to={"/"} className="link-style logo-start">
            <img src={Logo} className="ps-1" height={55} width={48} alt="Logo" />
          </Link>
          <NavLinks />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Link to={"/login"} className="link-style pe-1">
              {userName ? (
                <Box
                  borderRadius={25}
                  border={1}
                  width={50}
                  height={50}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {userName.charAt(0)}
                </Box>
              ) : (
                <Person fontSize="large" />
              )}
            </Link>
            {/* <Link
              to={"/login"}
              onClick={() => dispatch(clearSession())}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
                marginInlineStart: "4px",
              }}
            >
              <Logout fontSize="large" />
            </Link> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
