import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  RemoveRedEye,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  TextField,
  Typography,
  Checkbox,
  TableContainer,
  Paper,
  Collapse,
  Box,
  Tab,
  Autocomplete,
} from "@mui/material";
import { common, teal } from "@mui/material/colors";
import { width } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";
import ExportPDFModal from "./ExportPDFModal";

const Row = ({ lag, selectCheck, onClick }) => {
  // const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { _id, _date, _time, lottery } = lag;
  // const { totalAmount, commission, win } = lag.in;
  // const date = new Date(_date);

  console.log(lag);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, padding: 0.5 }}>
        <TableCell>TGG</TableCell>
        <TableCell align="left">
          {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/ ${_time}`} */}
          1/1/1 PM
        </TableCell>
        <TableCell align="center">
          {/* {totalAmount} */}
          11111
        </TableCell>
        <TableCell align="center">
          {/* {commission} */}
          7777777
        </TableCell>
        <TableCell align="center">
          {/* {win} */}
          9000000
        </TableCell>

        <TableCell align="center">
          {/* <NavLink
            to={`/report/agent`}
            state={{ lager: lag }}
            style={{ textDecoration: "none", color: "inherit" }}
          > */}
          <IconButton size="small" onClick={onClick}>
            <VisibilityOutlined fontSize="small" />
          </IconButton>
          {/* </NavLink> */}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, padding: 0.5 }}>
        <TableCell>TGG</TableCell>
        <TableCell align="left">
          {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/ ${_time}`} */}
          1/1/1 PM
        </TableCell>
        <TableCell align="center">
          {/* {totalAmount} */}
          11111
        </TableCell>
        <TableCell align="center">
          {/* {commission} */}
          7777777
        </TableCell>
        <TableCell align="center">
          {/* {win} */}
          9000000
        </TableCell>

        <TableCell align="center">
          {/* <NavLink
            to={`/report/agent`}
            state={{ lager: lag }}
            style={{ textDecoration: "none", color: "inherit" }}
          > */}
          <IconButton size="small" onClick={onClick}>
            <VisibilityOutlined fontSize="small" />
          </IconButton>
          {/* </NavLink> */}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, padding: 0.5 }}>
        <TableCell>TGG</TableCell>
        <TableCell align="left">
          {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/ ${_time}`} */}
          1/1/1 PM
        </TableCell>
        <TableCell align="center">
          {/* {totalAmount} */}
          11111
        </TableCell>
        <TableCell align="center">
          {/* {commission} */}
          7777777
        </TableCell>
        <TableCell align="center">
          {/* {win} */}
          9000000
        </TableCell>

        <TableCell align="center">
          {/* <NavLink
            to={`/report/agent`}
            state={{ lager: lag }}
            style={{ textDecoration: "none", color: "inherit" }}
          > */}
          <IconButton size="small" onClick={onClick}>
            <VisibilityOutlined fontSize="small" />
          </IconButton>
          {/* </NavLink> */}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, padding: 0.5 }}>
        <TableCell>TGG</TableCell>
        <TableCell align="left">
          {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/ ${_time}`} */}
          1/1/1 PM
        </TableCell>
        <TableCell align="center">
          {/* {totalAmount} */}
          11111
        </TableCell>
        <TableCell align="center">
          {/* {commission} */}
          7777777
        </TableCell>
        <TableCell align="center">
          {/* {win} */}
          9000000
        </TableCell>

        <TableCell align="center">
          {/* <NavLink
            to={`/report/agent`}
            state={{ lager: lag }}
            style={{ textDecoration: "none", color: "inherit" }}
          > */}
          <IconButton size="small" onClick={onClick}>
            <VisibilityOutlined fontSize="small" />
          </IconButton>
          {/* </NavLink> */}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, padding: 0.5 }}>
        <TableCell>Total</TableCell>
        <TableCell align="left">
          {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/ ${_time}`} */}
          1/1/1 PM
        </TableCell>
        <TableCell align="center">
          {/* {totalAmount} */}
          11111
        </TableCell>
        <TableCell align="center">
          {/* {commission} */}
          7777777
        </TableCell>
        <TableCell align="center">
          {/* {win} */}
          9000000
        </TableCell>

        <TableCell align="center">
          {/* <NavLink
            to={`/report/agent`}
            state={{ lager: lag }}
            style={{ textDecoration: "none", color: "inherit" }}
          > */}
          <IconButton size="small" onClick={onClick}>
            <VisibilityOutlined fontSize="small" />
          </IconButton>
          {/* </NavLink> */}
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, width: "100%" }}>
              <Table size="small" component={"table"}>
                <TableBody>
                  <TableRow>
                    <TableCell width={"25%"}>Date</TableCell>
                    <TableCell width={"25%"}>Total</TableCell>
                    <TableCell width={"25%"}>Commission</TableCell>
                    <TableCell width={"25%"}>Win/Lose</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"25%"}>Date</TableCell>
                    <TableCell width={"25%"}>Total</TableCell>
                    <TableCell width={"25%"}>Commission</TableCell>
                    <TableCell width={"25%"}>Win/Lose</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
};

const View = () => {
  const [lager, setLager] = useState([]);
  const [demo, setDemo] = useState([]);

  useEffect(() => {
    Axios.get(`/lagers`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      const data = [...res.data.data];
      setLager(data);
    });
  }, []);

  console.log(lager);

  // if (demo.length) {
  //   demo.map((d) => {
  //     setLager({ data: d, select: false });
  //   });
  // }

  //Checkbox
  const [check, setCheck] = useState([]);
  const [handleSelect, setHandleSelect] = useState([]);

  console.log(check);

  const selectCheck = (e, key) => {
    setCheck([...check, { key: key, checked: e.target.checked }]);
    console.log(key, e);
    console.log(lager[key]);
    setHandleSelect([...handleSelect, lager[key]]);
  };
  console.log(handleSelect);
  const sentLager = () => {
    let arr = [];
    handleSelect.map((hslt) => {
      let obj = {
        lottery: hslt.lottery,
        user: hslt.user,
        number: hslt.call.length,
        totalAmount: hslt.totalAmount,
        commission: hslt.commission,
        call: hslt.call,
      };
      arr.push(obj);
    });
    Axios.post("/lagers", arr, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }).then((res) => console.log(res.data));
  };

  //pdf
  const [open, setOpen] = useState(false);
  //
  // const a = [{ "A"}, { "B"}, { "C"}];
  const [detailreportopen, setDetailreportopen] = useState(false);

  //in/out autocomplete
  const selectType = [{ label: "In" }, { label: "Out" }];
  const [inLag, setInLag] = useState([]);
  const [outLag, setOutLag] = useState([]);
  const changeInOut = (e) => {
    console.log(e.target.innerText);
  };

  //date picker
  const [value, setValue] = React.useState(null);
  // const [open, setOpen] = useState(false);
  const DiaOpen = () => {
    setOpen(!open);
  };
  return (
    <Stack
      width={{ xs: "100%" }}
      margin={{ md: "auto" }}
      //   component={"table"}
      boxShadow={1}
      spacing={1}
      padding={1}
      // marginX={0}
    >
      <Stack direction={"row"} spacing={2} padding={2} justifyContent={"start"}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size={"small"} sx={{ width: 130 }} />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="End Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size={"small"} sx={{ width: 130 }} />
            )}
          />
        </LocalizationProvider>

        <Autocomplete
          onChange={changeInOut}
          size={"small"}
          id="combo-box-demo"
          options={selectType}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select In/Out"
              size={"small"}
              sx={{ width: 150 }}
            />
          )}
        />
        <Button
          variant={"contained"}
          size={"small"}
          color={"success"}
          onClick={() => setOpen(true)}
        >
          Export Excel
        </Button>
        <Button
          variant="contained"
          size="small"
          color={"success"}
          onClick={sentLager}
        >
          Send Lager
        </Button>
      </Stack>
      <ExportPDFModal open={open} setOpen={setOpen} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Commission</TableCell>
              <TableCell align="center">Win</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {lager &&
              lager.map((lag, key) => (
                <React.Fragment>
                  <Row
                    onClick={() => setDetailreportopen(true)}
                    // check={check}
                    // setCheck={setCheck}
                    lag={lag}
                    // key={key}
                    // selectCheck={(e) => selectCheck(e, key)}
                  />
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default View;
