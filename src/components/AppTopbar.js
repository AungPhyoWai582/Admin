import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import SideBarCom from "./SideBarCom";

const AppTopbar = ({ name, authUser, setAuthUser }) => {
  console.log(authUser.user_info.username);

  const user = localStorage.getItem("user_info");

  // console.log(user);
  const [handdleopen, setHandleOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="success">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setHandleOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {authUser.user_info.username}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <SideBarCom
        name={authUser.user_info.username}
        setHandleOpen={setHandleOpen}
        handdleopen={handdleopen}
        setAuthUser={setAuthUser}
        // drawerOpen={drawerOpen}
        // drawerClose={drawerClose}
      />
    </>
  );
};

export default AppTopbar;
