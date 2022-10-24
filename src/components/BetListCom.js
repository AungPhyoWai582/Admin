import { Delete, Edit, Key } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import React from "react";

const BetListCom = ({ call, key, onClick, children }) => {
  console.log(call);
  console.log(children);
  return (
    <Stack direction={"row"}>
      <Stack
        marginX={0.5}
        direction={"row"}
        width={{ xs: 150, sm: 230, md: 300 }}
        spacing={{ xs: 3, sm: 3, md: 1 }}
        // boxShadow={1}
        alignItems={"center"}
      >
        <Typography marginX={0.3} width={"20%"} textAlign={"right"}>
          {call.number}
        </Typography>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography marginX={0.3} width={"30%"} textAlign={"center"}>
            {call.amount}
          </Typography>

          {children}
        </Stack>
      </Stack>
    </Stack>
    // <TableContainer></TableContainer>
  );
};

export default BetListCom;
