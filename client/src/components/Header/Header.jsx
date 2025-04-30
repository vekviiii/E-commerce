import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Javascript, Logout, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { clearSession } from "../../features/session/sessionSlice";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../../assets/images/Logo.png";

import "./styles.css";
import NavLinks from "./NavLinks";

const Header = () => {
  const { token, user } = useSelector((state) => state.session);
  let [userName, setUserName] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && user) {
      setUserName(user.name);
    }
  }, [token, user]);

  const LogoHeight = 90;

  return (
    <>
      <Box
        sx={{ bgcolor: "#fff" }}
        display={"flex"}
        justifyContent={"space-between"}
        boxShadow={1}
      >
        <Link to={"/"} className="link-style">
          <img src={Logo} height={LogoHeight} width={LogoHeight} alt="Logo" />
        </Link>
        <NavLinks />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginInline={2}
        >
          <Link to={"/login"} className="link-style">
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
    </>
  );
};

export default Header;
