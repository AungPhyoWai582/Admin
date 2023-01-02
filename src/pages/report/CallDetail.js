import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { blue, blueGrey, cyan, teal } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "../../shared/Axios";

const CallDetail = ({ authUser }) => {
  // const [call, setCall] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const location = useLocation();
  const { call } = location.state;
  // console.log(localStorage.getItem("access-token"));

  let { callId, lotteryId, agentId } = useParams();
  console.log(call);
  console.log(numbers);

  return (
    <>
      <Box boxShadow={1} margin={"auto"} padding={1}>
        <Paper
        // sx={{ backgroundColor: "success.light" }}
        >
          {/* <Stack
            // direction={"row"}
            margin={1}
            padding={1}
            // spacing={3}
            justifyContent={{
              xs: "space-between",
              md: "flex-start",
              sm: "space-between",
            }}
            flexDirection={"initial"}
            flexShrink={"unset"}
            flexWrap={"wrap"}
            // flexGrow={2}
          >
            <Stack direction={"row"} spacing={2}>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                {" "}
                BetId - {call.callId}
              </Typography>
            </Stack>

            <Stack direction={"row"} spacing={2}>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                Total - {call.totalAmount}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                Status - {call.status}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                Win - {call.win}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                Time - {call.betTime}
              </Typography>
            </Stack>
          </Stack> */}
          <Stack
            direction={"row"}
            // padding={1}
            fullWidth
            // justifyContent={"flex-end"}
          >
            {/* <TableContainer sx={{ backgroundColor: "white" }}> */}

            <Table sx={{width:75, backgroundColor: "white" }} stickyHeader>
              {/* <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography fontWeight="bold">No</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">Number</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">Amount</Typography>
                  </TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                {call.numbers.map((cal, key) => (
                  <TableRow key={key}>
                    <TableCell align="center">{key + 1}</TableCell>
                    <TableCell align="center">{cal.number}</TableCell>
                    <TableCell align="center">{cal.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* </TableContainer> */}
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default CallDetail;
