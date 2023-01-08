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
import Clocks from "./Clocks";
import { green } from "@mui/material/colors";

const AppTopbar = ({ name, authUser, setAuthUser }) => {
  console.log(authUser.user_info.username);
  console.log(window.location.pathname)

  const user = localStorage.getItem("user_info");

  // console.log(user);
  const [handdleopen, setHandleOpen] = useState(false);

  return (
    <>
      <Box sx={{display:'flex', flexGrow: 1, marginBottom: { xs: 5, sm: 7 } }}>
        <AppBar position="fixed">
          <Toolbar sx={{ bgcolor: green[800] }}>
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
            <Clocks />
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
