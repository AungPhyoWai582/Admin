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
import { blue, blueGrey, cyan, grey, teal } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Button } from "antd";
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
      {/* <Box boxShadow={1} margin={"auto"} padding={1}> */}
      <Paper sx={{ backgroundColor: grey[100] }}>
        <Stack direction={'row'} overflow="hidden">
          <Stack
            direction={"column"}
            margin={1}
            padding={1}
            // // spacing={3}
            // justifyContent={{
            //   xs: "space-between",
            //   md: "flex-start",
            //   sm: "space-between",
            // }}
            // flexDirection={"initial"}
            // flexShrink={"unset"}
            // flexWrap={"wrap"}
            // flexGrow={2}
          >
            <Stack padding={1}>
              <Button>Print</Button>
            </Stack>
            <Stack direction={"row"} justifyContent="space-between">
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 16 }}
                fontWeight="bold"
              >
                BetId.
              </Typography>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                {call.callId}
              </Typography>
            </Stack>

            <Stack direction={"row"} justifyContent="space-between">
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 16 }}
                fontWeight="bold"
              >
                Total.
              </Typography>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                {call.totalAmount}
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent="space-between">
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 16 }}
                fontWeight="bold"
              >
                Status.
              </Typography>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }} color="red">
                {call.status}
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent="space-between">
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 16 }}
                fontWeight="bold"
              >
                Win.
              </Typography>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                {call.win}
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent="space-between">
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 16 }}
                fontWeight="bold"
              >
                Time.
              </Typography>
              <Typography fontSize={{ xs: 12, sm: 14, md: 16 }}>
                {call.betTime}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            flexDirection={"row"}
            margin={1}
            padding={1}
            // spacing={3}
            // justifyContent={"flex-start"}
            // flexDirection={"initial"}
            // flexShrink={"unset"}
            flexWrap={"wrap"}
            // height={'none'}
            // flexGrow={1}
            // overflowY='scroll'
            bgcolor={"white"}
          >
            {/* <Stack bgcolor={'green'} height={30}><Typography display={'inline'}>Hello</Typography></Stack> */}
            {call.numbers.map((cal, key) => (
              <Stack
                direction={"row"}
                justifyContent="space-between"
                borderBottom={1}
                borderColor={grey[300]}
                key={key}
                height={30}
                sx={{ width: 130 }}
                alignItems='center'
                marginRight={1}
              >
                <Typography sx={{ textAlign: "left"}} fontWeight='bold'>
                  {cal.number}
                </Typography>
                <Typography sx={{ textAlign: "right" }} color='blue'>
                  {cal.amount}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Paper>
      {/* </Box> */}
    </>
  );
};

export default CallDetail;
