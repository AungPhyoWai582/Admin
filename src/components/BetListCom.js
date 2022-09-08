import { Delete, Edit, Key } from "@mui/icons-material";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import React from "react";

const BetListCom = ({ call, key, onClick, children }) => {
  // console.log(setEdtiNum);
  // console.log(call);
  return (
    <>
      <Stack
        marginX={0.5}
        direction={"row"}
        width={{ xs: 150, sm: 230, md: 300 }}
        spacing={{ xs: 5, sm: 3, md: 1 }}
        boxShadow={1}
        alignItems={"center"}
      >
        <Typography marginX={0.3} width={"20%"} textAlign={"right"}>
          {call.number}
        </Typography>
        <Typography marginX={0.3} width={"40%"} textAlign={"end"}>
          {call.amount}
        </Typography>
        {children}
      </Stack>
    </>
  );
};

export default BetListCom;
