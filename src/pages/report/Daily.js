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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { useLocation, NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SelectTime from "../../components/SelectTime";
import SelectBox from "../../components/SelectBox";

const Daily = () => {
  const location = useLocation();
  // const { lotteryId } = location.state;
  // console.log(lotteryId);
  const [dates, setDates] = useState([]);
  const [lager, setLager] = useState([]);
  // const [time, setTime] = useState(["AM", "PM"]);
  const [timeselect, setTimeSelect] = useState("AM");

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
    console.log(timeselect);
    Axios.get(
      `/reports/daily?start_date=${startDate}&end_date=${endDate}&_time=${timeselect}`,
      {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }
    ).then((res) => {
      // console.log(JSON.stringify(res.data.report));
      setLager(res.data.report);
    });
  };

  console.log(lager);

  return (
    <Stack>
      <Stack
        direction={"row"}
        // spacing={4}
        padding={2}
        justifyContent={"start"}
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
      >
        <FormControl
          sx={{ minWidth: 120, paddingRight: 2, height: "30px" }}
          size="small"
        >
          {/* <InputLabel id="demo-select-small">Time</InputLabel> */}
          {/* <select
            autoWidth={true}
            sx={{ height: "30px" }}
            // size="small"
            label="Time"
            labelId="demo-select-small"
            id="demo-select-small"
            value={timeselect}
            // label="Age"
            onChange={(e) => setTimeSelect(e)}
          >
            {[
              { value: "AM", label: "AM" },
              { value: "PM", label: "PM" },
            ].map((t) => (
              <option value={t}>{t}</option>
            )}
          </select> */}
          {/* <select
            defaultValue={timeselect}
            style={{ width: 150 }}
            onChange={(e) => setTimeSelect(e)}
            options={[
              // { value: "All", label: "All" },
              { value: "AM", label: "AM" },
              { value: "PM", label: "PM" },
            ]}
          /> */}
          <SelectBox select={timeselect} setSelect={setTimeSelect} options={["AM","PM"]} />
        </FormControl>
        <Stack direction={"row"} height={"30px"} spacing={1}>
          <SelectTime setStartDate={setStartDate} setEndDate={setEndDate} />
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
            lager.map((lg, key) => {
              // const date = new Date(lg.date);
              return (
                <TableRow key={key}>
                  <TableCell sx={{ overflow: "scroll/" }}>{lg.date}</TableCell>
                  {/* <TableCell>{lg.master.name}</TableCell> */}
                  <TableCell>{lg.totalAmount.toString()}</TableCell>
                  <TableCell>
                    {lg.pout_tee_amount ? lg.pout_tee_amount.toString() : "0"}
                  </TableCell>

                  <TableCell>{lg.totalWin}</TableCell>
                  <TableCell>
                    <NavLink
                      to={"/reports/daily/members"}
                      state={{ date: lg.date }}
                    >
                      <IconButton size="small" color="success">
                        <RemoveRedEye fontSize="12" />
                      </IconButton>
                    </NavLink>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              {/* <TableCell colSpan={3}>
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
              </TableCell> */}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default Daily;
