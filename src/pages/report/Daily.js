import React, { useEffect, useState } from "react";
import {
  RemoveRedEye,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SelectTime from "../../components/SelectTime";

const Daily = () => {
  const location = useLocation();
  // const { lotteryId } = location.state;
  // console.log(lotteryId);
  const [dates, setDates] = useState([]);
  const [lager, setLager] = useState([]);
  const [reportOut, setReportOut] = useState({ totalOut: {}, calls: [] });

  //pdf
  const [open, setOpen] = useState(false);

  //in/out autocomplete
  const selectType = [{ label: "In" }, { label: "Out" }];

  const [selectChoice, setSelectChoice] = useState();
  const changeInOut = (e) => {
    setSelectChoice(e.target.innerText);
  };

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
    Axios.get(`/reports/daily?start_date=${dates[0]}&end_date=${dates[1]}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data);
      setLager(res.data.report);
    });
  };

  return (
    <Stack>
      <Stack direction={"row"} spacing={2} padding={2} justifyContent={"start"}>
        {/* <Autocomplete
          onChange={changeInOut}
          size="small"
          id="combo-box-demo"
          // sx={{ width: 50 }}
          options={selectType}
          renderInput={(params) => (
            <TextField
              {...params}
              label="In/Out"
              size={"small"}
              sx={{ width: 100 }}
            />
          )}
        /> */}
        <SelectTime setDates={setDates} />
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
      <Table
        // sx={{ minWidth: "max-content" }}
        size="small"
        aria-label="a dense table"
        stickyHeader
      >
        <TableHead sx={{ bgcolor: "success.light", fontSize: 12 }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
              Date
            </TableCell>
            {/* <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Name</TableCell> */}
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Bet</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
              GameX
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
              Win/Lose
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
              more
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lager.length ? (
            lager.map((lg) => {
              // const date = new Date(lg.date);
              return (
                <>
                  <TableRow>
                    <TableCell sx={{ overflow: "scroll/" }}>
                      {lg.date}
                    </TableCell>
                    {/* <TableCell>{lg.master.name}</TableCell> */}
                    <TableCell>{lg.totalAmount.toString()}</TableCell>
                    <TableCell>
                      {lg.pout_tee_amount ? lg.pout_tee_amount.toString() : "0"}
                    </TableCell>

                    <TableCell>{lg.totalWin}</TableCell>
                    <TableCell>
                      <NavLink
                        to={"/reports/daily/members"}
                        state={{ date:lg.date }}
                      >
                        <IconButton size="small" color="success">
                          <RemoveRedEye fontSize="12" />
                        </IconButton>
                      </NavLink>
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
        </TableBody>
      </Table>
    </Stack>
  );
};

export default Daily;
