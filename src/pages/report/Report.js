import React, { useEffect, useState } from "react";
import {
  Search,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  TableBody,
  TableRow,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { useLocation, NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Report = () => {
  const location = useLocation();
  // const { lotteryId } = location.state;
  // console.log(lotteryId);

  const [reportIn, setReportIn] = useState({ me: {}, memberReport: [] });
  const [reportOut, setReportOut] = useState({ totalOut: {}, calls: [] });

  //pdf
  const [open, setOpen] = useState(false);
  //
  // const a = [{ "A"}, { "B"}, { "C"}];
  const [detailreportopen, setDetailreportopen] = useState(false);

  //in/out autocomplete
  const selectType = [{ label: "In" }, { label: "Out" }];
  const [inLag, setInLag] = useState([]);
  const [outLag, setOutLag] = useState([]);
  // const [selectChoice, setSelectChoice] = useState();
  // const changeInOut = (e) => {
  //   console.log(e.target.value);
  //   setSelectChoice(e.target.innerText);
  // };

  //date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(startDate);
  console.log(endDate);
  // const [open, setOpen] = useState(false);
  const DiaOpen = () => {
    setOpen(!open);
  };

  // console.log(selectChoice);

  const searchReport = () => {
    // if (selectChoice === "In") {
    Axios.get(
      `/reports/members-collections?start_date=${startDate}&end_date=${endDate}`,
      {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }
    )
      .then((res) => {
        console.log(res.data.report);

        const { me, memberReport } = res.data.report;
        console.log(me, memberReport);
        // setReport(res.data.report);
        setReportIn({ me: me, memberReport: memberReport });
      })
      .catch((err) => setReportIn({ me: {}, memberReport: [] }));
    // }
    // if (selectChoice === "Out") {
    // Axios.get(
    //   `/reports/total-out?start_date=${startDate}&end_date=${endDate}`,
    //   {
    //     headers: {
    //       authorization: `Bearer ` + localStorage.getItem("access-token"),
    //     },
    //   }
    // )
    //   .then((res) => {
    //     const { calls, totalOut } = res.data.report;
    //     setReportOut({ calls: calls, totalOut: totalOut });
    //   })
    //   .catch((err) => setReportOut({ calls: [], totalOut: {} }));
    // }
  };
  console.log(reportIn);
  // console.log(selectChoice);
  return (
    <Stack>
      <Stack direction={"row"} spacing={2} padding={2} justifyContent={"start"}>
        {/* <Autocomplete
          onChange={changeInOut}
          size="small"
          id="combo-box-demo"
          // sx={{ width: 50 }}
          options={selectType}
          value={selectChoice}
          renderInput={(params) => (
            <TextField
              {...params}
              label="In/Out"
              size={"small"}
              sx={{ width: 100 }}
            />
          )}
        /> */}
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          {/* <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size={"small"} sx={{ width: 150 }} />
            )}
          />

          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size={"small"} sx={{ width: 150 }} />
            )}
          /> */}
        {/* </LocalizationProvider> */}
        <Button
          sx={{ bgcolor: "ButtonShadow" }}
          size="small"
          color={"success"}
          onClick={searchReport}
        >
          <Search fontSize="10" color={"success"} />
        </Button>
      </Stack>
      {/* <TableContainer component={Paper} sx={{ padding: "1px" }}> */}
      {/* {selectChoice === "In" && ( */}
      <TableContainer sx={{ padding: "1px" }}>
        <Table
          // sx={{ minWidth: "max-content" }}
          size="small"
          aria-label="a dense table"
          stickyHeader
        >
          <TableHead sx={{ bgcolor: "success.light", fontSize: 12 }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Bet
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                GameX
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Win/Lose
              </TableCell>
              {/* <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
              More
            </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {reportIn.memberReport && reportIn.memberReport.length ? (
              [...reportIn.memberReport].map((rp) => {
                return (
                  <>
                    <TableRow>
                      <TableCell sx={{ overflow: "scroll/" }}>
                        {rp.name.toString()}
                      </TableCell>
                      <TableCell>{rp.totalAmount.toString()}</TableCell>
                      <TableCell>
                        {rp.pout_tee_amount
                          ? rp.pout_tee_amount.toString()
                          : "0"}
                      </TableCell>

                      <TableCell>{rp.totalWin.toString()}</TableCell>
                    </TableRow>
                  </>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  {/* <Typography
                      padding={1}
                      fontSize={18}
                      fontWeight={500}
                      color={"red"}
                      textAlign="center"
                      gridColumn={3}
                    >
                      Reports Not Found !!!
                    </Typography> */}
                </TableCell>
              </TableRow>
            )}
            {reportIn.memberReport.length !== 0 && (
              <TableRow
                style={{
                  backgroundColor: grey[300],
                }}
              >
                <TableCell sx={{ fontSize: 16, fontWeight: 600 }}>
                  Total
                </TableCell>
                <TableCell sx={{ fontSize: 16, fontWeight: 500 }}>
                  {reportIn.me.totalAmount}
                </TableCell>
                <TableCell sx={{ fontSize: 16, fontWeight: 500 }}>
                  {reportIn.me.pout_tee_amount !== null
                    ? reportIn.me.pout_tee_amount
                    : "0"}
                </TableCell>
                <TableCell sx={{ fontSize: 16, fontWeight: 500 }}>
                  {reportIn.me.totalWin}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* )} */}
    </Stack>
  );
};

export default Report;
