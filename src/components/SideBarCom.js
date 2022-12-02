import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
  KeyboardArrowDown,
  KeyboardArrowRight,
  KeyboardArrowUp,
  ListAlt,
  StarBorder,
} from "@mui/icons-material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import LockResetIcon from "@mui/icons-material/LockReset";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { green, grey, teal } from "@mui/material/colors";

const SideBarCom = ({ setHandleOpen, handdleopen, name, setAuthUser }) => {
  // console.log(name);
  const logout = () => {
    console.log("LOGOUT");
    localStorage.removeItem("access-token");
    localStorage.removeItem("user-info");
    setAuthUser({
      token: null,
      authorize: false,
      user_info: {},
    });
  };
  //menu sub-menu

  const [subopen, setSubopen] = useState(true);
  const [reportOpen, setReportOpen] = useState(true);
  const subMember = () => {
    setSubopen(!subopen);
  };
  return (
    <Drawer
      open={handdleopen}
      anchor={"left"}
      onClose={() => setHandleOpen(false)}
    >
      <Box
        display={"flex"}
        sx={{ marginTop: "10" }}
        width={{ xs: 250, md: 400 }}
      >
        <Stack width={"100%"}>
          <Stack width={"100%"} height={80} bgcolor={grey[300]}>
            <Avatar
              sx={{
                margin: "auto",
                width: 56,
                height: 56,
                fontWeight: "bold",
                border: 3,
                color: "green",
                borderColor: "green",
              }}
            >
              {name}
            </Avatar>
          </Stack>
          <Divider />
          <List>
            <NavLink
              style={{ textDecoration: "none",color:grey[700]}}
              to="/lotery"
              onClick={() => setHandleOpen(false)}
            >
              <ListItem components={'div'}>
                <ListItemIcon>
                  <ReceiptLongIcon />
                </ListItemIcon>
                <ListItemText primary="Lotery" />
              </ListItem>
            </NavLink>

            {/* <NavLink
              style={{ textDecoration: "none" }}
              to="/customer"
              onClick={() => setHandleOpen(false)}
            >
              <ListItem sx={{ ":hover": { bgcolor: teal[100] } }}>
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Agent" />
              </ListItem>
            </NavLink> */}

            <ListItemButton
              sx={{ ":hover": { bgcolor: teal[100] },color:grey[700] }}
              onClick={subMember}
            >
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Masters" />
              {subopen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </ListItemButton>
            <Collapse in={!subopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/masters/master_create"
                  onClick={() => setHandleOpen(false)}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {/* <SaveAsIcon /> */}
                    </ListItemIcon>

                    <ListItemText primary="Create" />
                  </ListItemButton>
                </NavLink>
                <NavLink
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/masters/master_list"
                  onClick={() => setHandleOpen(false)}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {/* <FormatListNumberedIcon /> */}
                    </ListItemIcon>

                    <ListItemText primary="List" />
                  </ListItemButton>
                </NavLink>
              </List>
            </Collapse>
            <ListItemButton
              sx={{ ":hover": { bgcolor: teal[100] },color:grey[700] }}
              onClick={() => setReportOpen(!reportOpen)}
            >
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="Reports" />
              {reportOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
              
            </ListItemButton>
            <Collapse in={!reportOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/reports/daily"
                  onClick={() => setHandleOpen(false)}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {/* <SaveAsIcon /> */}
                    </ListItemIcon>

                    <ListItemText primary="Daily" />
                  </ListItemButton>
                </NavLink>
                <NavLink
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/reports/total"
                  onClick={() => setHandleOpen(false)}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {/* <StarBorder /> */}
                    </ListItemIcon>

                    <ListItemText primary="Total" />
                  </ListItemButton>
                </NavLink>
              </List>
            </Collapse>

            <NavLink
              style={{ textDecoration: "none" }}
              to="/change_password"
              onClick={() => setHandleOpen(false)}
            >
              <ListItem sx={{ ":hover": { bgcolor: teal[100] },color:grey[700] }}>
                <ListItemIcon>
                  <LockResetIcon />
                </ListItemIcon>
                <ListItemText primary="Change Password"></ListItemText>
              </ListItem>
            </NavLink>
            {/* <NavLink
              style={{ textDecoration: "none" }}
                to={"/login"}
              onClick={logout}
            > */}
            <NavLink
              style={{ textDecoration: "none" }}
              to="/account_info"
              onClick={() => setHandleOpen(false)}
            >
              <ListItem sx={{ ":hover": { bgcolor: teal[100] },color:grey[700] }}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
            </NavLink>
            <ListItem
              sx={{ ":hover": { bgcolor: teal[100] }, cursor: "pointer" ,color:grey[700]}}
              onClick={logout}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
            {/* </NavLink> */}
          </List>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SideBarCom;
