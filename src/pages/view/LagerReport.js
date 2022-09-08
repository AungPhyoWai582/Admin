import { ExpandMore, VisibilityOutlined } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  Box,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "../../shared/Axios";
import CallComponent from "../calls/CallComponent";
import CallListComponent from "../calls/CallListComponent";

const LagerReport = () => {
  const { lotteryId } = useParams();
  const location = useLocation();
  const { lager } = location.state;
  console.log(lotteryId);

  const { _id, _date, _time, totalAmount, call } = lager;

  const date = new Date(_date);

  const [lagerCall, setLagerCall] = useState([]);

  useEffect(() => {
    Axios.get(`/call/${lotteryId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      setLagerCall(res.data.data);
    });
  }, []);

  console.log(lagerCall);

  return (
    <Stack
      width={{ xs: "100%" }}
      margin={{ md: "auto" }}
      //   component={"table"}
      boxShadow={1}
      direction="row"
      justifyContent={"space-between"}
    >
      <Stack
        width={"30%"}
        height={"100%"}
        direction={"column"}
        overflow="scroll"
      >
        <Stack direction={"row"} justifyContent={"space-between"} padding={2}>
          <Typography fontWeight={"bold"}>
            {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}{" "}
            {_time}
          </Typography>

          <Typography fontWeight={"bold"}>{totalAmount}</Typography>
        </Stack>
        <Stack direction={"column"}>
          {call &&
            call
              .sort((a, b) => b.amount - a.amount)
              .map((c) => (
                <Stack
                  direction={"row"}
                  padding={1}
                  justifyContent="space-between"
                  borderBottom={1}
                  borderColor={grey[400]}
                >
                  <Typography fontWeight={500} fontSize={14}>
                    {c.number}
                  </Typography>
                  <Typography
                    fontWeight={700}
                    color={"green"}
                    fontSize={14}
                    align={"left"}
                  >
                    {c.amount}
                  </Typography>
                </Stack>
              ))}
        </Stack>
      </Stack>
      <Stack
        width={"70%"}
        direction={"column"}
        height={"100vh"}
        spacing={1}
        overflow={"scroll"}
        padding={2}
      >
        <TextField
          size="small"
          variant="standard"
          placeholder="search call or id"
          sx={{ width: "50%", marginBottom: 2 }}
        />
        {lagerCall.map((lcal, key) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <CallComponent cal={lcal} key={key} />
            </AccordionSummary>
            <AccordionDetails>
              {lcal.numbers &&
                lcal.numbers.map((nums, key) => (
                  <CallListComponent nums={nums} key={key} />
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  );
};

export default LagerReport;
