import {
  Add,
  AddSharp,
  Cancel,
  Delete,
  DeleteOutline,
  Edit,
  List,
  MenuBook,
  PlayArrow,
  RemoveRedEye,
  Search,
  Settings,
  Star,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  ListItemText,
  Stack,
  Switch,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { grey, red, teal } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Axios from "../../shared/Axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LotteryCRUD from "./LotteryCRUD";
import moment from "moment";
import SelectTime from "../../components/SelectTime";

const Lottery = () => {
  const [snackAlert, setSnackAlert] = useState(false);
  const [lottery, setLottery] = useState({ on: [], off: [] });
  const [dates, setDates] = useState([]);

  const [lotCreate, setLotCreate] = useState({});

  const [play, setPlay] = useState(true);
  const [effCtrl, setEffCtrl] = useState(false);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("add");
  const [loading, setLoading] = useState(false);
  const [TimerCtrl, setTimerCtrl] = useState(false);
  const [lotPermission, setLotPermission] = useState({
    create: false,
    checked: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    setPlay(true);
    if (JSON.parse(localStorage.getItem("user-info")).role === "Admin") {
      setLotPermission({
        ...lotPermission,
        create: true,
        checked: true,
        edit: true,
        delete: true,
      });
    } else {
      setLotPermission({
        ...lotPermission,
        create: false,
        checked: false,
        edit: false,
        delete: false,
      });
    }

    Axios.get("/lotterys")
      .then((res) => {
        console.log(res.data.lotteries);
        setLottery({
          ...lottery,
          on: [...res.data.lotteries].filter((lot, key) => lot.play == true),
          off: [...res.data.lotteries].filter((lot, key) => lot.play == false),
        });

        setEffCtrl(false);
      })
      .catch((err) => console.log(err));
  }, [effCtrl]);
  console.log(lottery);
  const createLottery = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLotCreate({ ...lotCreate, [name]: value });
  };

  const switchControll = (e) => {
    const { name, checked } = e.target;
    setLotCreate({ ...lotCreate, [name]: checked });
  };

  const editLottery = (e, l) => {
    e.preventDefault();
    if (lotPermission.edit === true) {
      setTimerCtrl(true);
      setLotCreate({
        id: l._id,
        pout_tee: l.pout_tee,
        hot_tee: l.hot_tee,
        superhot_tee: l.superhot_tee,
        _time: l._time,
        play: l.play,
        Timer: l.Timer,
      });
      setOpen(true);
      setType("edit");
    }
  };

  const AddLottery = () => {
    if (lotPermission.create === true) {
      setLoading(true);
      console.log(lotCreate);
      let obj = {};

      for (const key in lotCreate) {
        console.log(lotCreate[key]);
      }
      Axios.post(`/lotterys`, lotCreate)
        .then((res) => {
          setLotCreate({
            pout_tee: null,
            hot_tee: [],
            superhot_tee: [],
            time: null,
            play: false,
          });
          setEffCtrl(true);
          setOpen(false);
          setLoading(false);
        })
        .catch((err) => Alert(err));
    }
  };

  const updateLottery = () => {
    if (lotPermission.edit === true) {
      setLoading(true);

      // if(lotCreate.Timer != 0){
      //   console.log('Timer')
      //   const endTime = timerFunc(lotCreate.Timer);
      //   localStorage.setItem('Timer',endTime);
      // }
      // if(lotCreate.pout_tee){
      //   setLotCreate({...lotCreate,play:false})
      // }
      // console.log(lotCreate);

      Axios.put(`/lotterys/${lotCreate.id}`, lotCreate)
        .then((res) => {
          setLotCreate({
            // ...lotCreate,
            pout_tee: null,
            hot_tee: [],
            superhot_tee: [],
            _time: null,
            play: false,
          });
          setEffCtrl(true);
          setOpen(false);
          setTimerCtrl(false);
          setType("add");
          setLoading(false);
        })
        .catch((err) => Alert(err));
    }
  };

  const deleteLottery = (e, id) => {
    if (lotPermission.delete === true) {
      Axios.delete(`/lotterys/${id}`)
        .then((res) => {
          setLotCreate({
            pout_tee: null,
            hot_tee: [],
            superhot_tee: [],
            _time: null,
            play: false,
          });
          console.log(res.data);
          setEffCtrl(true);
        })
        .catch((err) => Alert(err));
    }
  };

  const snackhandleOpen = () => {
    setSnackAlert(true);
  };

  const snackhandleClose = () => {
    setSnackAlert(false);
  };

  // setTimeout(()=>{

  // },timerFunc(lotCreate.Timer))

  const timerFunc = (Timer) => {
    const start = 60 * 1000 * Number(Timer);
    // const minuteReminder = start.minute() % Number(Timer);
    // console.log(minuteReminder)
    // const end = start.add(Number(Timer), "minutes").seconds()

    console.log(start);
    return Number(start);
  };

  // const showLotterys = lottery.filter(lot=>lot.play === play);
  // console.log(showLotterys)
  return (
    <>
      <Stack spacing={1} padding={1}>
        <Stack padding={1} direction={"row"}>
<<<<<<< HEAD
          <IconButton
            size="small"
            color="secondary"
            sx={{ fontWeight: "bold" }}
            onClick={() => {
              setType("add");
              setOpen(true);
            }}
          >
            <ListItemText primary={"Lottery Create"} />
            <Add />
          </IconButton>
          {lottery.on.length &&
            lottery.on.map((l) => {
              console.log(l._date);
              const date = new Date(l._date);
              console.log(l.getDate);
              return (
                <Stack
                  width={"100%"}
                  direction={"row"}
                  justifyContent="space-between"
                  boxShadow={1}
                  padding={1}
                  borderRadius={1}
                  alignItems="center"
                >
                  <Typography>
                    {`${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()} `}
                    {l._time}
                  </Typography>
                  <Stack direction="row">
                    <IconButton
                      size="small"
                      sx={{ color: "blue" }}
                      onClick={(e) => editLottery(e, l)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <NavLink
                      to={`/lottery/bet/${l._id}`}
                      state={{
                        lotteryId: l._id,
                        hot_tees: l.hot_tee.toString(),
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{ color: "green", ":hover": { color: "red" } }}
                        // disabled={l.play === true ? true : false}
                      >
                        <PlayArrow sx={{ fontSize: 30 }} />
                      </IconButton>
                    </NavLink>
=======
          {lotPermission.create === true && (
            <IconButton
              size="small"
              color="secondary"
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                setType("add");
                setOpen(true);
              }}
            >
              <ListItemText primary={"Lottery Create"} />
              <Add />
            </IconButton>
          )}
          {lottery.length &&
            lottery
              .filter((lot) => lot.play === true)
              .map((l) => {
                console.log(l._date);
                const date = new Date(l._date);
                console.log(l.getDate);
                return (
                  <Stack
                    width={"100%"}
                    direction={"row"}
                    justifyContent="space-between"
                    boxShadow={1}
                    padding={1}
                    borderRadius={1}
                    alignItems="center"
                  >
                    <Typography>
                      {`${date.getDate()}/${
                        date.getMonth() + 1
                      }/${date.getFullYear()} `}
                      {l._time}
                    </Typography>
                    <Stack direction="row">
                      {lotPermission.edit === true && (
                        <IconButton
                          size="small"
                          sx={{ color: "blue" }}
                          onClick={(e) => editLottery(e, l)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      )}
                      <NavLink
                        to={`/lottery/bet/${l._id}`}
                        state={{
                          lotteryId: l._id,
                          hot_tees: l.hot_tee.toString(),
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ color: "green", ":hover": { color: "red" } }}
                          // disabled={l.play === true ? true : false}
                        >
                          <PlayArrow sx={{ fontSize: 30 }} />
                        </IconButton>
                      </NavLink>
                    </Stack>
>>>>>>> 20c517cbbfd6ba6896fa4af0e6e2ac427c6c94f2
                  </Stack>
                </Stack>
              );
            })}
        </Stack>
        <Table
          // sx={{ minWidth: "max-content" }}
          size="small"
          aria-label="a dense table"
          stickyHeader
          border={1}
          borderColor={grey[300]}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" width={20}>
                {lotPermission.checked === true && <Checkbox size="small" />}
              </TableCell>
              <TableCell colSpan={3}>
                <Stack direction={"row"} justifyContent="space-between">
                  <Stack direction={"row"} height={"30px"} spacing={1}>
<<<<<<< HEAD
                    <IconButton
                      size="small"
                      sx={{ color: "red" }}
                      // onClick={(e) => deleteLottery(e, l._id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
=======
                    {lotPermission.delete === true && (
                      <IconButton
                        size="small"
                        sx={{ color: "red" }}
                        // onClick={(e) => deleteLottery(e, l._id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
>>>>>>> 20c517cbbfd6ba6896fa4af0e6e2ac427c6c94f2
                  </Stack>
                  <Stack direction={"row"} height={"30px"} spacing={1}>
                    <SelectTime setDates={setDates} />
                    <Button
                      // sx={{ bgcolor: green[300] }}

                      size="small"
                      variant="contained"
                      color={"success"}
                      // onClick={searchReport}
                    >
                      <Search sx={{ fontWeight: "bold" }} color={"white"} />
                    </Button>
                  </Stack>
                </Stack>
              </TableCell>
              {/* <TableCell align="left">Date</TableCell>
              <TableCell align="center">PoutTee</TableCell>
              <TableCell align="center">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {lottery.off.length &&
              lottery.off
                .map((l) => {
                  console.log(l._date);
                  const date = new Date(l._date);
                  console.log(l.getDate);
                  // if (l.play === true) {
                  return (
                    <TableRow
                    // direction={"row"}
                    // display="flex"
                    // justifyContent={"space-between"}
                    // sx={{ borderRadius: 2 }}
                    // boxShadow={1}
                    // padding={1}
                    >
                      {/* { lottery.length && lottery.map(l=>)} */}
                      <TableCell width={20} align="center">
                        {lotPermission.checked === true && (
                          <Checkbox size="small" />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <Typography>
                          {`${date.getDate()}/${
                            date.getMonth() + 1
                          }/${date.getFullYear()} `}
                          {l._time}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>
                          {l.pout_tee !== null ? l.pout_tee : "-"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        // direction={"row"}
                        align={"right"}
                        // padding={1}
                        // spacing={1}
                      >
                        <Stack
                          direction={"row"}
                          justifyContent={"space-around"}
                        >
                          {lotPermission.delete === true && (
                            <IconButton
                              size="small"
                              sx={{ color: "red" }}
                              onClick={(e) => deleteLottery(e, l._id)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          )}
                          <NavLink
                            to={`/lottery/bet/${l._id}`}
                            state={{
                              lotteryId: l._id,
                              hot_tees: l.hot_tee.toString(),
                            }}
                          >
                            <IconButton
                              size="small"
                              sx={{ color: "green" }}
                              // disabled={l.play === true ? true : false}
                            >
                              <RemoveRedEye fontSize="small" />
                            </IconButton>
                          </NavLink>
                        </Stack>
                        {/* )} */}
                      </TableCell>
                    </TableRow>
                  );
                  // }
                })
                .reverse()}
          </TableBody>
        </Table>
      </Stack>
      <LotteryCRUD
        setLoading={setLoading}
        loading={loading}
        type={type}
        open={open}
        lotCreate={lotCreate}
        setLotCreate={setLotCreate}
        setOpen={setOpen}
        TimerCtrl={TimerCtrl}
        createLottery={createLottery}
        switchControll={switchControll}
        editLottery={editLottery}
        updateLottery={updateLottery}
        AddLottery={AddLottery}
        snackAlert={snackAlert}
        setSnackAlert={setSnackAlert}
        snackhandleClose={snackhandleClose}
        snackhandleOpen={snackhandleOpen}
      />
    </>
  );
};

export default Lottery;
