import { Button } from "@mui/material";
import React from "react";

const BetButtonCom = ({ btnText, fullWidth, color, onClick }) => {
  return (
    <Button
      size="small"
      //   fullWidth={fullWidth}
      variant={"contained"}
      color={color}
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
};

export default BetButtonCom;
