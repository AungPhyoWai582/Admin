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
} from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import React from "react";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import Axios from "../../shared/Axios";
import { useEffect } from "react";

const ShortCup = () => {
  const location = useLocation();

  const [masters, setMasters] = useState([]);
  const [autoCompleteValue, setAutoCompleteValue] = useState();

  const [reportIn, setReportIn] = useState({ me: {}, memberReport: [] });
  const [reportOut, setReportOut] = useState({ totalOut: {}, calls: [] });

  //pdf
  const [open, setOpen] = useState(false);

  const [detailreportopen, setDetailreportopen] = useState(false);

  //in/out autocomplete
  const [InOutControl, setInOutControl] = useState("In");
  const [inLag, setInLag] = useState([]);
  const [outLag, setOutLag] = useState([]);
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

  //in out control
  const [inoutctl, setInoutctl] = useState(false);

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
    if (InOutControl === "In") {
      Axios.get(
        `/reports/members-collections?&start_date=${startDate}&end_date=${endDate}&customer=${autoCompleteValue}&time=${timeselect}`,
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
    }
    if (InOutControl === "Out") {
      Axios.get(
        `/reports/total-out?start_date=${startDate}&end_date=${endDate}&time=${time}`,
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("access-token"),
          },
        }
      )
        .then((res) => {
          const { calls, totalOut } = res.data.report;
          setReportOut({ calls: calls, totalOut: totalOut });
        })
        .catch((err) => setReportOut({ calls: [], totalOut: {} }));
    }
  };

  console.log(customer);
  console.log(reportIn, reportOut);

  return (
    <Stack padding={2} spacing={1}>
      <Stack
        direction={"row"}
        justifyContent="space-start"
        spacing={2}
        padding={1}
        paddingLeft={3}
        bgcolor={grey[300]}
        borderRadius={1}
      >
        {/* <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={InOutControl}
            onChange={(e) => setInOutControl(e.target.value)}
          >
            <Stack direction={"row"}>
              <FormControlLabel value="In" control={<Radio />} label="In" />
              <FormControlLabel value="Out" control={<Radio />} label="Out" />
            </Stack>
          </RadioGroup>
        </FormControl> */}
        <Button
          variant={"contained"}
          va
          size="small"
          color="success"
          onClick={(e) => {
            setInoutctl(!true);
            console.log(e.target.innerText);
          }}
        >
          {inoutctl ? "In" : "Out"}
        </Button>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
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
          />
        </LocalizationProvider>

        <Button
          // sx={{ bgcolor: green[300] }}
          size="small"
          variant="contained"
          color={"success"}
          onClick={searchReport}
        >
          <Search sx={{ fontWeight: "bold" }} color={"primary"} />
        </Button>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent="space-start"
        spacing={2}
        padding={1}
        paddingLeft={3}
        bgcolor={grey[300]}
        borderRadius={1}
        alignItems={"center"}
      >
        <FormControl size="small">
          <FormControlLabel
            // label={"Time"}
            // labelPlacement="start"
            control={
              <Select
                sx={{ width: 150, height: 30, backgroundColor: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timeselect}
                // label="Age"
                onChange={(e) => setTimeSelect(e.target.value)}
              >
                {time.map((t) => (
                  <MenuItem value={t}>{t}</MenuItem>
                ))}
              </Select>
            }
          />
        </FormControl>

        <FormControl
          size="small"
          disabled={InOutControl === "Out" ? true : false}
        >
          <FormControlLabel
            label={"Customers: "}
            labelPlacement="start"
            control={
              <Select
                sx={{ width: 150, height: 30, backgroundColor: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={autoCompleteValue}
                // defaultValue={customer[0].value}
                // label="Age"
                onChange={handleChange}
              >
                {customer.map((cus) => (
                  <MenuItem value={cus.value}>{cus.name}</MenuItem>
                ))}
                {/* <MenuItem value={"AM"}>APW</MenuItem>
                <MenuItem value={"PM"}>NNZ</MenuItem> */}
              </Select>
            }
          />
        </FormControl>

        <Button
          variant="contained"
          color={"success"}
          sx={{ width: 100, height: 30 }}
        >
          <Typography fontWeight={"bold"} textTransform="none">
            Print
          </Typography>
        </Button>
      </Stack>
      <TableContainer sx={{ padding: "1px" }}>
        <Table
          // sx={{ minWidth: "max-content" }}
          size="small"
          aria-label="a dense table"
          stickyHeader
        >
          <TableHead sx={{ bgcolor: green[300], fontSize: 12 }}>
            <TableRow>
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
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          {InOutControl === "In" && (
            <TableBody>
              {reportIn.memberReport && reportIn.memberReport.length ? (
                [...reportIn.memberReport].map((rp) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell align="left">{rp.name.toString()}</TableCell>
                        <TableCell align="center">
                          {rp.totalAmount.toString()}
                        </TableCell>
                        <TableCell align="center">
                          {rp.pout_tee_amount
                            ? rp.pout_tee_amount.toString()
                            : "0"}
                        </TableCell>

                        <TableCell align="center">
                          {rp.totalWin.toString()}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: 16, fontWeight: 500 }}
                          align="right"
                        >
                          {/* {reportIn.me.totalWin} */}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
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
              {reportIn.memberReport.length !== 0 && (
                <TableRow
                  style={{
                    backgroundColor: grey[300],
                  }}
                >
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 600 }}
                    align={"left"}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 500 }}
                    align="center"
                  >
                    {reportIn.me.totalAmount}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 500 }}
                    align="center"
                  >
                    {reportIn.me.pout_tee_amount !== null
                      ? reportIn.me.pout_tee_amount
                      : "0"}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 500 }}
                    align="center"
                  >
                    {reportIn.me.totalWin}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 500 }}
                    align="right"
                  >
                    {/* {reportIn.me.totalWin} */}
                    27/08/2022 - 02/09/2022
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
          {InOutControl === "Out" && (
            <TableBody>
              {reportOut.calls && reportOut.calls.length ? (
                [...reportOut.calls].map((cal) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell sx={{ overflow: "scroll/" }} align="left">
                          {cal.user.name.toString()}
                        </TableCell>
                        <TableCell align="center">
                          {cal.totalAmount.toString()}
                        </TableCell>
                        <TableCell align="center">
                          {cal.pout_tee_amount
                            ? cal.pout_tee_amount.toString()
                            : "0"}
                        </TableCell>

                        <TableCell align="center">
                          {cal.win.toString()}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: 16, fontWeight: 500 }}
                          align="right"
                        >
                          {/* {reportIn.me.totalWin} */}
                          27/08/2022 - 02/09/2022
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
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
              {reportOut.totalOut.length !== 0 ? (
                <TableRow
                  style={{
                    backgroundColor: grey[300],
                  }}
                >
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 600 }}
                    align="left"
                  >
                    Total
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 500 }}
                    align="center"
                  >
                    {reportOut.totalOut.totalAmount}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 500 }}
                    align="center"
                  >
                    {reportOut.totalOut.pout_tee_amount !== null
                      ? reportOut.totalOut.pout_tee_amount
                      : "0"}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 500 }}
                    align="center"
                  >
                    {reportOut.totalOut.totalWin}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 16, fontWeight: 500 }}
                    align="right"
                  >
                    start-to-end
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
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
