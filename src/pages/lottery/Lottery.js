import {
  Add,
  AddSharp,
  Cancel,
  Delete,
  DeleteOutline,
  Edit,
  List,
  MenuBook,
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

const Lottery = () => {
  const [lottery, setLottery] = useState([]);

  const [lotCreate, setLotCreate] = useState({});

  const [play, setPlay] = useState(true);
  const [effCtrl, setEffCtrl] = useState(false);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("add");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPlay(true);
    Axios.get("/lotterys")
      .then((res) => {
        console.log(res.data.lotteries);
        setLottery(res.data.lotteries);
        setEffCtrl(false);
      })
      .catch((err) => console.log(err));
  }, [effCtrl]);

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
    setLotCreate({
      id: l._id,
      pout_tee: l.pout_tee,
      hot_tee: l.hot_tee,
      _time: l._time,
      play: l.play,
    });
    setOpen(true);
    setType("edit");
  };

  const AddLottery = () => {
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
          time: null,
          play: false,
        });
        setEffCtrl(true);
        setOpen(false);
        setLoading(false);
      })
      .catch((err) => Alert(err));
  };

  const updateLottery = () => {
    setLoading(true);
    console.log(lotCreate);
    Axios.put(`/lotterys/${lotCreate.id}`, lotCreate)
      .then((res) => {
        setLotCreate({
          pout_tee: null,
          hot_tee: [],
          _time: null,
          play: false,
        });
        setEffCtrl(true);
        setOpen(false);
        setType("add");
        setLoading(false);
      })
      .catch((err) => Alert(err));
  };

  const deleteLottery = (e, id) => {
    Axios.delete(`/lotterys/${id}`)
      .then((res) => {
        setLotCreate({
          pout_tee: null,
          hot_tee: [],
          _time: null,
          play: false,
        });
        console.log(res.data);
        setEffCtrl(true);
      })
      .catch((err) => Alert(err));
  };

  // const showLotterys = lottery.filter(lot=>lot.play === play);
  // console.log(showLotterys)
  return (
    <>
      <Stack spacing={1} padding={1}>
        <Stack padding={1} justifyContent="space-around" direction={"row"}>
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

          <FormControlLabel
            control={
              <Switch
                checked={play}
                onChange={(e) => setPlay(!play)}
                color="secondary"
              />
            }
            label="Play"
            labelPlacement="start"
          />
        </Stack>
        {lottery.length &&
          lottery
            .filter((lot) => lot.play === play)
            .map((l) => {
              console.log(l._date);
              const date = new Date(l._date);
              console.log(l.getDate);
              // if (l.play === true) {
              return (
                <Stack
                  direction={"row"}
                  // display="flex"
                  justifyContent={"space-between"}
                  sx={{ borderRadius: 2 }}
                  boxShadow={1}
                  padding={1}
                >
                  {/* { lottery.length && lottery.map(l=>)} */}
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Avatar
                      sizes={"small"}
                      sx={{
                        border: 3,
                        borderColor: l.play ? "green" : "red",
                        backgroundColor: red[100],
                        color: "black",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      {l.pout_tee !== null ? l.pout_tee : "-"}
                    </Avatar>
                    <Typography>
                      {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} */}{" "}
                      {`${date.getDate()}/${
                        date.getMonth() + 1
                      }/${date.getFullYear()} `}
                    </Typography>
                    <Typography fontWeight={"bold"}>{l._time}</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    padding={1}
                    spacing={1}
                  >
                    {/* <NavLink
                  to={`/reports/agent/${l._id}`}
                  state={{ lotteryId: l._id }}
                >
                  <IconButton size="small" sx={{ color: "black" }}>
                    <MenuBook fontSize="small" />
                  </IconButton>
                </NavLink> */}
                    {/* <NavLink
                      to={`/lottery/lager/${l._id}`}
                      state={{ _date: date }}
                    >
                      <IconButton size="small" sx={{ color: "black" }}>
                        <Star fontSize="small" />
                      </IconButton>
                    </NavLink> */}
                    {/* <NavLink to={`/lottery/calls/${l._id}`}>
                    <IconButton size="small" sx={{ color: "black" }}>
                      <List fontSize="small" />
                    </IconButton>
                  </NavLink> */}
                    <IconButton
                      size="small"
                      sx={{ color: "black" }}
                      onClick={(e) => editLottery(e, l)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    {l.play === true ? (
                      <NavLink
                      
                        to={`/lottery/bet/${l._id}`}
                        state={{
                          lotteryId: l._id,
                          hot_tees: l.hot_tee.toString(),
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ color: "black" }}
                          // disabled={l.play === true ? true : false}
                        >
                          <AddSharp fontSize="small" />
                        </IconButton>
                      </NavLink>
                    ) : (
                      <IconButton
                        size="small"
                        sx={{ color: "black" }}
                        onClick={(e) => deleteLottery(e, l._id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
                </Stack>
              );
              // }
            })
            .reverse()}
      </Stack>
      <LotteryCRUD
        loading={loading}
        type={type}
        open={open}
        lotCreate={lotCreate}
        setLotCreate={setLotCreate}
        setOpen={setOpen}
        createLottery={createLottery}
        switchControll={switchControll}
        editLottery={editLottery}
        updateLottery={updateLottery}
        AddLottery={AddLottery}
      />
    </>
  );
};

export default Lottery;
