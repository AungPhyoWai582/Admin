import { Typography } from "@mui/material";
import React, { Component } from "react";
import Clock from "react-live-clock";
const Clocks = () => {
  return (
    <Typography fontSize={25} fontWeight={900} color={"ThreeDDarkShadow"}>
      <Clock format={`h:mm:ss A`} ticking={true} />
    </Typography>
  );
};

export default Clocks;
