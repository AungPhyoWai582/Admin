import { Typography } from "@mui/material";
import React, { Component } from "react";
import Clock from "react-live-clock";
const Clocks = () => {
  return (
    <Typography>
      <Clock format={` h:mm A | dddd`} ticking={true} />
    </Typography>
  );
};

export default Clocks;
