import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TextField,
  Typography,
  TableBody,
  FormLabel,
  RadioGroup,
  Paper,
  TableContainer,
  IconButton,
  CircularProgress,
  Box,
  InputLabel,
  TableFooter,
} from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import React from "react";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { RemoveRedEye, Search } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import Axios from "../../shared/Axios";
import { useEffect } from "react";
import SelectTime from "../../components/SelectTime";
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { Box, fontWeight } from "@mui/system";
// import { DateRangePicker, StaticDateRangePicker } from "@mui/lab";

// import DatePicker from "../../components/DatePicker";
// import { DateRangePicker } from "@mui/lab";

const ShortCup = () => {
  const location = useLocation();

  const [masters, setMasters] = useState([]);
  const [autoCompleteValue, setAutoCompleteValue] = useState();

  const [reportIn, setReportIn] = useState({ me: {}, memberReport: [] });
  const [reportOut, setReportOut] = useState({ totalOut: {}, calls: [] });
  const [reportMain, setReportMain] = useState({ totalMain: {}, main: [] });

  //pdf
  const [open, setOpen] = useState(false);

  const [detailreportopen, setDetailreportopen] = useState(false);

  //in/out autocomplete
  const [InOutControl, setInOutControl] = useState("In");
  const changeInOut = (e) => {
    setSelectChoice(e.target.innerText);
  };
  //date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [customer, setCustomer] = React.useState([]);
  const [time, setTime] = useState(["All", "AM", "PM"]);
  const [timeselect, setTimeSelect] = useState();
  const [selectChoice, setSelectChoice] = useState();
  const [dates, setDates] = useState([]);

  //in out control
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get(`/masters`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      const masters = res.data.data;
      // console.log(agents);

      if (masters) {
        // setMasters([...masters]);
        const ms = masters.map((ms) => {
          return { name: ms.name, value: ms._id };
        });

        setCustomer([{ name: "All", value: "All" }, ...ms]);

        // setAutoCompleteValue('All');
      }
    });
  }, []);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setAutoCompleteValue(event.target.value);
  };

  console.log(customer, autoCompleteValue);

  // get autocomplete option function
  const getAutoChoCus = (cus) => {
    return cus.username;
  };

  // For Search Function
  const searchReport = () => {
    console.log(autoCompleteValue, timeselect);
    setLoading(true);
    if (InOutControl === "In") {
      Axios.get(
        `/reports/members-collections?&start_date=${dates[0]}&end_date=${dates[1]}&customer=${autoCompleteValue}&time=${timeselect}`,
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
          setLoading(false);
        })
        .catch((err) => setReportIn({ me: {}, memberReport: [] }));
    }
    if (InOutControl === "Out") {
      Axios.get(
        `/reports/total-out?start_date=${dates[0]}&end_date=${dates[1]}&time=${timeselect}`,
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("access-token"),
          },
        }
      )
        .then((res) => {
          console.log(res.data.report);
          const { calls, totalOut } = res.data.report;
          setReportOut({ calls: calls, totalOut: totalOut });
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    if (InOutControl === "Main") {
      Axios.get(
        `/reports/main-collections?start_date=${dates[0]}&end_date=${dates[1]}&time=${timeselect}`,
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("access-token"),
          },
        }
      )
        .then((res) => {
          console.log(res.data.report);
          const { main, totalMain } = res.data.report;
          setReportMain({ main: main, totalMain: totalMain });
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(customer);
  console.log(reportIn, reportOut);

  return (
    <Stack padding={2} spacing={1}>
      <Stack
        direction={"row"}
        justifyContent="start"
        flexDirection={"row"}
        flexWrap="wrap"
        // spacing={2}
        padding={1}
        // paddingLeft={3}
        // bgcolor={grey[300]}
        border={1}
        borderColor={grey[300]}
        borderRadius={1}
        alignItems="center"
      >
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Time</InputLabel>
          <Select
            label="Time"
            labelId="demo-select-small"
            id="demo-select-small"
            value={timeselect}
            // label="Age"
            onChange={(e) => setTimeSelect(e.target.value)}
          >
            {time.map((t) => (
              <MenuItem value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction={"row"} paddingLeft={{ xs: 0, sm: 0, md: 2, xl: 2 }}>
          <SelectTime setDates={setDates} />
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        flexWrap="wrap"
        justifyContent={"start"}
        // spacing={2}
        padding={1}
        // paddingLeft={3}
        border={1}
        borderColor={grey[300]}
        // boxShadow={1}
        borderRadius={1}
        alignItems={"center"}
      >
        <FormControl
          sx={{
            width: { xs: "100%", sm: "100%", md: "50%", xl: "50%" },
            alignItems: "left",
          }}
        >
          {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={InOutControl}
            onChange={(e) => setInOutControl(e.target.value)}
          >
            <Stack direction={"row"}>
              <FormControlLabel
                value="In"
                control={<Radio size="small" color="success" />}
                label="In"
                labelPlacement="start"
              />
              <FormControlLabel
                value="Out"
                control={<Radio size="small" color="success" />}
                label="Out"
                labelPlacement="start"
              />
              <FormControlLabel
                value="Main"
                control={<Radio size="small" color="success" />}
                label="Main"
                labelPlacement="start"
              />
            </Stack>
          </RadioGroup>
        </FormControl>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ width: { xs: "60%", sm: "60%", md: "60%", xl: "60%" } }}
        >
          <FormControl
            sx={{ minWidth: 120, height: "30px" }}
            size="small"
            disabled={
              InOutControl === "Out" || InOutControl === "Main" ? true : false
            }
          >
            <InputLabel id="demo-select-small">Members</InputLabel>
            <Select
              // sx={{ width: 150, height: 30 }}
              labelId="demo-select-small"
              id="demo-select-small"
              value={autoCompleteValue}
              size="small"
              // defaultValue={customer[0].value}
              label="Members"
              onChange={handleChange}
            >
              {customer.map((cus) => (
                <MenuItem value={cus.value}>{cus.name}</MenuItem>
              ))}
              {/* <MenuItem value={"AM"}>APW</MenuItem>
                <MenuItem value={"PM"}>NNZ</MenuItem> */}
            </Select>
          </FormControl>

          <Button
            // sx={{ bgcolor: green[300] }}
            size="small"
            variant="contained"
            color={"success"}
            onClick={searchReport}
          >
            <Search sx={{ fontWeight: "bold" }} color={"white"} />
          </Button>
        </Stack>
      </Stack>
      <TableContainer sx={{ padding: "1px" }}>
        <Table
          // sx={{fontWeight:'bold'}}
          // sx={{ minWidth: "max-content" }}
          size="small"
          aria-label="a dense table"
          stickyHeader
        >
          <TableHead sx={{ bgcolor: green[300], fontSize: 12 }}>
            <TableRow>
              {/* <TableCell sx={{ fontWeight: "bold", fontSize: 12 }} align="left">
                Date
              </TableCell> */}
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }} align="left">
                {/* {InOutControl === 'In'?'Name':'ID'} */}
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 12 }}
                align="center"
              >
                Bet
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 12 }}
                align="center"
              >
                GameX
              </TableCell>
              {/* <TableCell
                sx={{ fontWeight: "bold", fontSize: 12 }}
                align="center"
              >
                {InOutControl === "Main" ? "OriginalBreak" : "Commission"}
              </TableCell> */}
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 12 }}
                align="center"
              >
                {InOutControl === "Main" && "OriginalBreak" || InOutControl==="Out"&& "Commission" || InOutControl==="In" && "Rel-Commission"}
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 12 }}
                align="center"
              >
                Win/Lose
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 12 }}
                align="right"
              >
                more
              </TableCell>
            </TableRow>
          </TableHead>
          {loading && (
            <TableRow>
              <TableCell colSpan={7}>
                <Typography
                  padding={1}
                  fontSize={18}
                  fontWeight={500}
                  color={"red"}
                  textAlign="center"
                  gridColumn={3}
                >
                  <CircularProgress color="success" />
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {InOutControl === "In" && (
            <>
              <TableBody>
                {reportIn &&
                  [...reportIn.memberReport].map((rp) => {
                    // const start = new Date(startDate);
                    // const end = new Date(endDate);
                    return (
                      <>
                        <TableRow>
                          {/* <TableCell align="left">{`${start.getDate()}/${start.getMonth()}/${start.getFullYear()} - ${end.getDate()}/${end.getMonth()}/${end.getFullYear()}`}</TableCell> */}
                          <TableCell align="left">
                            {rp.name.toString()}
                          </TableCell>
                          <TableCell align="center">
                            {rp.totalAmount.toString()}
                          </TableCell>
                          <TableCell align="center">
                            {rp.pout_tee_amount
                              ? rp.pout_tee_amount.toString()
                              : "0"}
                          </TableCell>
                          {/* <TableCell align="center" sx={{ color: "red" }}>
                          {rp.totalCommission.toString()}
                        </TableCell> */}
                          <TableCell align="center" sx={{ color: "red" }}>
                            {0}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color:
                                rp.totalWin.toString()[0] === "-"
                                  ? "red"
                                  : "blue",
                            }}
                          >
                            {rp.totalWin.toString()}
                          </TableCell>
                          <TableCell
                            sx={{ fontSize: 16, fontWeight: 500 }}
                            align="right"
                          >
                            {/* {reportIn.me.totalWin} */}
                            <IconButton size="small" color="success">
                              <RemoveRedEye fontSize="12" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow sx={{ bgcolor: grey[300]}}>
                  <TableCell align="left" sx={{fontSize:'14px',fontWeight:'bold',color:'black'}}>Total</TableCell>
                  <TableCell align="center"  sx={{fontSize:'14px',fontWeight:'bold',color:'black'}}>
                    {reportIn.me.totalAmount
                      ? reportIn.me.totalAmount.toString()
                      : "0"}
                  </TableCell>
                  <TableCell align="center"  sx={{fontSize:'14px',fontWeight:'bold',color:'black'}}>
                    {reportIn.me.pout_tee_amount
                      ? reportIn.me.pout_tee_amount.toString()
                      : "0"}
                  </TableCell>
                  <TableCell align="center" sx={{fontSize:'14px',fontWeight:'bold',color:'red'}}>
                    0
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{fontSize:'14px',fontWeight:'bold',color:'black'}}
                  >
                    {reportIn.me.totalWin
                      ? reportIn.me.totalWin.toString()
                      : "0"}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableFooter>
            </>
          )}

          {InOutControl === "Out" && (
            <TableBody>
              {reportOut.calls && reportOut.calls.length ? (
                [...reportOut.calls].map((cal) => {
                  // const start = new Date(startDate);
                  // const end = new Date(endDate);
                  return (
                    <>
                      <TableRow>
                        {/* <TableCell align="left">{`${start.getDate()}/${start.getMonth()}/${start.getFullYear()} - ${end.getDate()}/${end.getMonth()}/${end.getFullYear()}`}</TableCell> */}
                        <TableCell sx={{ overflow: "scroll/" }} align="left">
                          {cal.customer.name.toString()}
                        </TableCell>
                        <TableCell align="center">
                          {cal.totalAmount.toString()}
                        </TableCell>
                        <TableCell align="center">
                          {cal.pout_tee_amount
                            ? cal.pout_tee_amount.toString()
                            : "0"}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "blue" }}>
                          {cal.commission.toString()}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color:
                              cal.win.toString()[0] === "-" ? "red" : "blue",
                          }}
                        >
                          {cal.win.toString()}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: 16, fontWeight: 500 }}
                          align="right"
                        >
                          {/* {reportIn.me.totalWin} */}
                          <IconButton size="small" color="success">
                            <RemoveRedEye fontSize="12" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography
                      padding={1}
                      fontSize={18}
                      fontWeight={500}
                      color={"red"}
                      textAlign="center"
                      gridColumn={3}
                    >
                      Reports Not Found !!!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}

          {InOutControl === "Main" && (
            <TableBody>
              {reportMain.main && reportMain.main.length ? (
                [...reportMain.main].map((cal) => {
                  const start = new Date(startDate);
                  const end = new Date(endDate);
                  return (
                    <>
                      <TableRow>
                        {/* <TableCell align="left">{`${start.getDate()}/${start.getMonth()}/${start.getFullYear()} - ${end.getDate()}/${end.getMonth()}/${end.getFullYear()}`}</TableCell> */}
                        <TableCell sx={{ overflow: "scroll/" }} align="left">
                          {cal.user.username.toString()}
                        </TableCell>
                        <TableCell align="center">
                          {cal.totalAmount.toString()}
                        </TableCell>
                        <TableCell align="center">
                          {cal.pout_tee_amount
                            ? cal.pout_tee_amount.toString()
                            : "0"}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "blue" }}>
                          {cal.originalBreak === null
                            ? 0
                            : cal.originalBreak.toString()}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color:
                              cal.win.toString()[0] === "-" ? "red" : "blue",
                          }}
                        >
                          {cal.win.toString()}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: 16, fontWeight: 500 }}
                          align="right"
                        >
                          {/* {reportIn.me.totalWin} */}
                          <IconButton size="small" color="success">
                            <RemoveRedEye fontSize="12" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography
                      padding={1}
                      fontSize={18}
                      fontWeight={500}
                      color={"red"}
                      textAlign="center"
                      gridColumn={3}
                    >
                      Reports Not Found !!!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {/* </Stack> */}
    </Stack>
  );
};

export default ShortCup;
