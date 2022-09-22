import {
  Add,
  AddSharp,
  ArrowBack,
  ArrowForward,
  Close,
  Delete,
  Edit,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  blue,
  cyan,
  green,
  grey,
  lightBlue,
  orange,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactFileReader from "react-file-reader";
import { useLocation, useParams } from "react-router-dom";
import BetButtonCom from "../../components/BetButtonCom";
import BetCom from "../../components/BetCom";
import BetListCom from "../../components/BetListCom";
import LagerCom from "../../components/LagerCom";
import TwoDSign from "../../components/TwoDSign";
import Axios from "../../shared/Axios";
import Lager from "../../pages/lager/Lager";
import "./Bet.css";
import {
  startStar,
  k,
  p,
  b,
  Breaks,
  aper,
  padatha,
  r,
  masone,
  sonema,
  mm,
  ss,
  spu,
  mpu,
  backpate,
  forwardPate,
} from "./Betsign";
import LagerTable from "../../components/LagerTable";

const BetPage = () => {
  // For input refs
  const textFieldForNumber = useRef(null);
  const textFieldForAmount = useRef(null);

  const [inOutCtl, setInOutCtl] = useState(false);
  // const [singleBetCleanctlr, setSingleBetCleanctlr] = useState(false);
  const [callTotal, setCallTotal] = useState(0);
  const [calltotalCtrl, setCalltotalCtrl] = useState(false);

  //loading
  const [loading, setLoading] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  // autocompleter ctrl
  const [autocompleteCtrl, setAutoCompleteCtrl] = useState(false);

  const [selectChoice, setSelectChoice] = useState();
  const [enternumtol, setEnternumtol] = useState({ number: "", total: "" });

  const [beterrorcontrol, setBeterrorcontrol] = useState(false);
  const [callandBetlistctleff, setCallandBetlistctleff] = useState(true);

  const [mastercalls, setMastercalls] = useState([]);
  const [masterOutCalls, setMasterOutCall] = useState([]);

  const [lager, setLager] = useState();
  const [call, setCall] = useState({
    master: "",
    numbers: [],
  });
  const [outCalls, setOutCalls] = useState([]);
  // const [callList, setCallList] = useState([]);

  const [masters, setMasters] = useState([]);

  const showCalls = [];

  const { lotteryId } = useParams();
  const location = useLocation();
  const { hot_tees } = location.state;

  console.log(hot_tees);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //callList crud
  const [editCtlBtn, setEditCtlBtn] = useState(false);
  const [mastercallcrud, setMasterCallCrud] = useState({ id: "", numbers: [] });
  const [keydemo, setKeyDemo] = useState();
  //For twoD sign state
  const [autoCompleteValue, setAutoCompleteValue] = useState("");

  const [onchange, setOnchange] = useState({
    number: "",
    amount: "",
  });
  // console.log(agents);
  //lager open
  const [lagerOpen, setLagerOpen] = useState(false);

  //Lager Break
  const [lagerBreak, setLagerBreak] = useState("0");
  const [demoLager, setDemolager] = useState();
  const [callDemo, setCallDemo] = useState([]);
  //calllist control state
  const [calllistctrl, setCalllistctrl] = useState(false);

  const [masterTotalData, setMasterTotalData] = useState({
    Data: [],
    Total: 0,
  });

  const [in_out, set_in_out] = useState("Out");
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    // console.log(hot_tees);
    console.log(lotteryId);
    Axios.get(`/masters`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        // console.log(res.data);
        const masters = res.data.data;
        // console.log(masters);

        if (masters) {
          setMasters([...masters]);
          setAutoCompleteValue(masters[0]);
          // setCalllistctrl(false);
        }
      })
      .catch((err) => console.log(err));

    Axios.get(`/lagers/${lotteryId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setLager(res.data.data);
        // setCallList(res.data.data.in.read);
        // setSuccess(false);
      })
      .catch((err) => console.log(err));
  }, [calllistctrl]);

  useEffect(() => {
    console.log("HELLO");
    console.log(in_out);

    if (in_out === "In") {
      Axios.get(`/call/${lotteryId}`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        console.log(res.data.data);
        setMastercalls(res.data.data);
        setInOutCtl(false);
      });
      if (call.master) {
        console.log(call.master);
        Axios.get(`/call/${lotteryId}/call-numbers-total/${call.master}`, {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("access-token"),
          },
        }).then((res) => {
          console.log(res.data);
          setMasterTotalData({
            Data: res.data.numsData,
            Total: res.data.numsTotal,
          });
        });
      }

      // setAutoCompleteCtrl(false);
    }
    if (in_out === "Out") {
      console.log(in_out);
      Axios.get(`/outcall/${lotteryId}`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        console.log(res.data.data);
        setOutCalls(res.data.data);
        const customers = res.data.data.map((d) => {
          return { name: d.customer, value: d.customer };
        });
        setCustomers([{ name: "All", value: "All" }, ...customers]);
        setInOutCtl(false);
        //  setMastercalls(res.data.data);
      });
      //  if (call.master) {
      //    console.log(call.master);
      //    Axios.get(`/call/${lotteryId}/call-numbers-total/${call.master}`, {
      //      headers: {
      //        authorization: `Bearer ` + localStorage.getItem("access-token"),
      //      },
      //    }).then((res) => {
      //      console.log(res.data);
      //      setMasterTotalData({
      //        Data: res.data.numsData,
      //        Total: res.data.numsTotal,
      //      });
      //    });
      //  }
    }

    // setCalllistctrl(false);
  }, [inOutCtl]);

  //setTimeout Alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setBeterrorcontrol(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [beterrorcontrol]);
  const SignArr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "/",
    "-",
    "*",
    "S",
    "M",
    "m",
    "s",
    "k",
    "K",
    "P",
    "p",
    "B",
    "b",
  ];

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name) {
      name === "number"
        ? setOnchange({ ...onchange, number: value })
        : setOnchange({ ...onchange, amount: value });
    }
    console.log(onchange);
  };

  const choice = (e) => {
    e.preventDefault();
    if (onchange.number.includes(hot_tees)) {
      console.log(onchange.number);
    }
    if (onchange.number.length === 1 && onchange.amount.length > 2) {
      if (onchange.number[0] === "k" || onchange.number[0] === "K") {
        const R = k(onchange);
        setCall({ ...call, numbers: [...call.numbers, ...R] });
        console.log(call);
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[0] === "p" || onchange.number[0] === "P") {
        const P = p(onchange);
        setCall({ ...call, numbers: [...call.numbers, ...P] });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[0] === "b" || onchange.number[0] === "B") {
        const B = b(onchange);
        setCall({ ...call, numbers: [...call.numbers, ...B] });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[0] === "b" || onchange.number[0] === "B") {
        const B = b(onchange);
        setCall({ ...call, numbers: [...call.numbers, ...B] });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else {
        setBeterrorcontrol(true);
      }
    } else if (onchange.number.length === 2) {
      if (onchange.number.startsWith("*")) {
        if (onchange.number.endsWith("*") && onchange.amount.length > 2) {
          const apu = startStar(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...apu] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          (onchange.number.endsWith("0") ||
            onchange.number.endsWith("1") ||
            onchange.number.endsWith("2") ||
            onchange.number.endsWith("3") ||
            onchange.number.endsWith("4") ||
            onchange.number.endsWith("5") ||
            onchange.number.endsWith("6") ||
            onchange.number.endsWith("7") ||
            onchange.number.endsWith("8") ||
            onchange.number.endsWith("9")) &&
          onchange.amount.length > 2
        ) {
          const FPate = forwardPate(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...FPate] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else {
          setBeterrorcontrol(true);
        }
      } else if (
        onchange.number.startsWith("S") ||
        onchange.number.startsWith("s")
      ) {
        if (onchange.number.endsWith("*") && onchange.amount.length > 2) {
          const SPU = spu(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...SPU] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          (onchange.number.endsWith("S") || onchange.number.endsWith("s")) &&
          onchange.amount.length > 2
        ) {
          const SS = ss(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...SS] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          (onchange.number.endsWith("M") || onchange.number.endsWith("m")) &&
          onchange.amount.length > 2
        ) {
          const SM = sonema(onchange);
          // console.log(MS);
          setCall({ ...call, numbers: [...call.numbers, ...SM] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else {
          setBeterrorcontrol(true);
        }
      } else if (
        onchange.number.startsWith("M") ||
        onchange.number.startsWith("m")
      ) {
        if (onchange.number.endsWith("*") && onchange.amount.length > 2) {
          const MPU = mpu(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...MPU] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          (onchange.number.endsWith("S") || onchange.number.endsWith("s")) &&
          onchange.amount.length > 2
        ) {
          const MS = masone(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...MS] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          (onchange.number.endsWith("M") || onchange.number.endsWith("m")) &&
          onchange.amount.length > 2
        ) {
          const SM = sonema(onchange);
          // console.log(MS);
          setCall({ ...call, numbers: [...call.numbers, ...SM] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else {
          setBeterrorcontrol(true);
        }
      } else if (
        onchange.number.startsWith("0") ||
        onchange.number.startsWith("1") ||
        onchange.number.startsWith("2") ||
        onchange.number.startsWith("3") ||
        onchange.number.startsWith("4") ||
        onchange.number.startsWith("5") ||
        onchange.number.startsWith("6") ||
        onchange.number.startsWith("7") ||
        onchange.number.startsWith("8") ||
        onchange.number.startsWith("9")
      ) {
        if (onchange.number.endsWith("*") && onchange.amount.length > 2) {
          const BPate = backpate(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...BPate] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("-") &&
          onchange.amount.length > 2
        ) {
          const AP = aper(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...AP] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("/") &&
          onchange.amount.length > 2
        ) {
          const BR = Breaks(onchange);
          console.log(BR);
          setCall({ ...call, numbers: [...call.numbers, ...BR] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("0") ||
          onchange.number.endsWith("1") ||
          onchange.number.endsWith("2") ||
          onchange.number.endsWith("3") ||
          onchange.number.endsWith("4") ||
          onchange.number.endsWith("5") ||
          onchange.number.endsWith("6") ||
          onchange.number.endsWith("7") ||
          onchange.number.endsWith("8") ||
          onchange.number.endsWith("9")
        ) {
          setCall({
            ...call,
            numbers: [...call.numbers, onchange],
          });
          setOnchange({ number: "", amount: onchange.amount });
          setBeterrorcontrol(false);
          setEditCtlBtn(false);
          setCallandBetlistctleff(false);
          setAutoCompleteCtrl(false);
        } else {
          setBeterrorcontrol(true);
        }
      }
    } else if (onchange.number.length === 3) {
      if (
        (onchange.number[0] === "1" ||
          onchange.number[0] === "2" ||
          onchange.number[0] === "3" ||
          onchange.number[0] === "4" ||
          onchange.number[0] === "5" ||
          onchange.number[0] === "6" ||
          onchange.number[0] === "7" ||
          onchange.number[0] === "8" ||
          onchange.number[0] === "9" ||
          onchange.number[0] === "0") &&
        (onchange.number[1] === "1" ||
          onchange.number[1] === "2" ||
          onchange.number[1] === "3" ||
          onchange.number[1] === "4" ||
          onchange.number[1] === "5" ||
          onchange.number[1] === "6" ||
          onchange.number[1] === "7" ||
          onchange.number[1] === "8" ||
          onchange.number[1] === "9" ||
          onchange.number[1] === "0")
      ) {
        if (onchange.number.endsWith("+")) {
          const R = r(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...R] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("1") ||
          onchange.number.endsWith("2") ||
          onchange.number.endsWith("3") ||
          onchange.number.endsWith("4") ||
          onchange.number.endsWith("5") ||
          onchange.number.endsWith("6") ||
          onchange.number.endsWith("7") ||
          onchange.number.endsWith("8") ||
          onchange.number.endsWith("9") ||
          onchange.number.endsWith("0")
        ) {
          const PDT = padatha(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...PDT] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else {
          setBeterrorcontrol(true);
        }
      }
    } else if (onchange.number.length === 4) {
      if (
        (onchange.number[0] === "1" ||
          onchange.number[0] === "2" ||
          onchange.number[0] === "3" ||
          onchange.number[0] === "4" ||
          onchange.number[0] === "5" ||
          onchange.number[0] === "6" ||
          onchange.number[0] === "7" ||
          onchange.number[0] === "8" ||
          onchange.number[0] === "9" ||
          onchange.number[0] === "0") &&
        (onchange.number[1] === "1" ||
          onchange.number[1] === "2" ||
          onchange.number[1] === "3" ||
          onchange.number[1] === "4" ||
          onchange.number[1] === "5" ||
          onchange.number[1] === "6" ||
          onchange.number[1] === "7" ||
          onchange.number[1] === "8" ||
          onchange.number[1] === "9" ||
          onchange.number[1] === "0") &&
        (onchange.number[2] === "1" ||
          onchange.number[2] === "2" ||
          onchange.number[2] === "3" ||
          onchange.number[2] === "4" ||
          onchange.number[2] === "5" ||
          onchange.number[2] === "6" ||
          onchange.number[2] === "7" ||
          onchange.number[2] === "8" ||
          onchange.number[2] === "9" ||
          onchange.number[2] === "0")
      ) {
        if (onchange.number.endsWith("*") && onchange.amount.length > 2) {
          const PDT = padatha(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...PDT] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("1") ||
          onchange.number.endsWith("2") ||
          onchange.number.endsWith("3") ||
          onchange.number.endsWith("4") ||
          onchange.number.endsWith("5") ||
          onchange.number.endsWith("6") ||
          onchange.number.endsWith("7") ||
          onchange.number.endsWith("8") ||
          onchange.number.endsWith("9") ||
          onchange.number.endsWith("0")
        ) {
          const PDT = padatha(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...PDT] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else {
          setBeterrorcontrol(true);
        }
      }
    } else if (onchange.number.length === 5) {
      if (
        (onchange.number[0] === "1" ||
          onchange.number[0] === "2" ||
          onchange.number[0] === "3" ||
          onchange.number[0] === "4" ||
          onchange.number[0] === "5" ||
          onchange.number[0] === "6" ||
          onchange.number[0] === "7" ||
          onchange.number[0] === "8" ||
          onchange.number[0] === "9" ||
          onchange.number[0] === "0") &&
        (onchange.number[1] === "1" ||
          onchange.number[1] === "2" ||
          onchange.number[1] === "3" ||
          onchange.number[1] === "4" ||
          onchange.number[1] === "5" ||
          onchange.number[1] === "6" ||
          onchange.number[1] === "7" ||
          onchange.number[1] === "8" ||
          onchange.number[1] === "9" ||
          onchange.number[1] === "0") &&
        (onchange.number[2] === "1" ||
          onchange.number[2] === "2" ||
          onchange.number[2] === "3" ||
          onchange.number[2] === "4" ||
          onchange.number[2] === "5" ||
          onchange.number[2] === "6" ||
          onchange.number[2] === "7" ||
          onchange.number[2] === "8" ||
          onchange.number[2] === "9" ||
          onchange.number[2] === "0") &&
        (onchange.number[3] === "1" ||
          onchange.number[3] === "2" ||
          onchange.number[3] === "3" ||
          onchange.number[3] === "4" ||
          onchange.number[3] === "5" ||
          onchange.number[3] === "6" ||
          onchange.number[3] === "7" ||
          onchange.number[3] === "8" ||
          onchange.number[3] === "9" ||
          onchange.number[3] === "0")
      ) {
        if (onchange.number.endsWith("*") && onchange.amount.length > 2) {
          const PDT = padatha(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...PDT] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("1") ||
          onchange.number.endsWith("2") ||
          onchange.number.endsWith("3") ||
          onchange.number.endsWith("4") ||
          onchange.number.endsWith("5") ||
          onchange.number.endsWith("6") ||
          onchange.number.endsWith("7") ||
          onchange.number.endsWith("8") ||
          onchange.number.endsWith("9") ||
          onchange.number.endsWith("0")
        ) {
          const PDT = padatha(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...PDT] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else {
          setBeterrorcontrol(true);
        }
      }
    } else if (onchange.number.length === 6) {
      if (
        (onchange.number[0] === "1" ||
          onchange.number[0] === "2" ||
          onchange.number[0] === "3" ||
          onchange.number[0] === "4" ||
          onchange.number[0] === "5" ||
          onchange.number[0] === "6" ||
          onchange.number[0] === "7" ||
          onchange.number[0] === "8" ||
          onchange.number[0] === "9" ||
          onchange.number[0] === "0") &&
        (onchange.number[1] === "1" ||
          onchange.number[1] === "2" ||
          onchange.number[1] === "3" ||
          onchange.number[1] === "4" ||
          onchange.number[1] === "5" ||
          onchange.number[1] === "6" ||
          onchange.number[1] === "7" ||
          onchange.number[1] === "8" ||
          onchange.number[1] === "9" ||
          onchange.number[1] === "0") &&
        (onchange.number[2] === "1" ||
          onchange.number[2] === "2" ||
          onchange.number[2] === "3" ||
          onchange.number[2] === "4" ||
          onchange.number[2] === "5" ||
          onchange.number[2] === "6" ||
          onchange.number[2] === "7" ||
          onchange.number[2] === "8" ||
          onchange.number[2] === "9" ||
          onchange.number[2] === "0") &&
        (onchange.number[3] === "1" ||
          onchange.number[3] === "2" ||
          onchange.number[3] === "3" ||
          onchange.number[3] === "4" ||
          onchange.number[3] === "5" ||
          onchange.number[3] === "6" ||
          onchange.number[3] === "7" ||
          onchange.number[3] === "8" ||
          onchange.number[3] === "9" ||
          onchange.number[3] === "0") &&
        (onchange.number[4] === "1" ||
          onchange.number[4] === "2" ||
          onchange.number[4] === "3" ||
          onchange.number[4] === "4" ||
          onchange.number[4] === "5" ||
          onchange.number[4] === "6" ||
          onchange.number[4] === "7" ||
          onchange.number[4] === "8" ||
          onchange.number[4] === "9" ||
          onchange.number[4] === "0")
      ) {
        if (onchange.number.endsWith("*") && onchange.amount.length > 2) {
          const PDT = padatha(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...PDT] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("1") ||
          onchange.number.endsWith("2") ||
          onchange.number.endsWith("3") ||
          onchange.number.endsWith("4") ||
          onchange.number.endsWith("5") ||
          onchange.number.endsWith("6") ||
          onchange.number.endsWith("7") ||
          onchange.number.endsWith("8") ||
          onchange.number.endsWith("9") ||
          onchange.number.endsWith("0")
        ) {
          const PDT = padatha(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...PDT] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else {
          setBeterrorcontrol(true);
        }
      }
    } else if (onchange.number.length === 7) {
      if (
        (onchange.number[0] === "1" ||
          onchange.number[0] === "2" ||
          onchange.number[0] === "3" ||
          onchange.number[0] === "4" ||
          onchange.number[0] === "5" ||
          onchange.number[0] === "6" ||
          onchange.number[0] === "7" ||
          onchange.number[0] === "8" ||
          onchange.number[0] === "9" ||
          onchange.number[0] === "0") &&
        (onchange.number[1] === "1" ||
          onchange.number[1] === "2" ||
          onchange.number[1] === "3" ||
          onchange.number[1] === "4" ||
          onchange.number[1] === "5" ||
          onchange.number[1] === "6" ||
          onchange.number[1] === "7" ||
          onchange.number[1] === "8" ||
          onchange.number[1] === "9" ||
          onchange.number[1] === "0") &&
        (onchange.number[2] === "1" ||
          onchange.number[2] === "2" ||
          onchange.number[2] === "3" ||
          onchange.number[2] === "4" ||
          onchange.number[2] === "5" ||
          onchange.number[2] === "6" ||
          onchange.number[2] === "7" ||
          onchange.number[2] === "8" ||
          onchange.number[2] === "9" ||
          onchange.number[2] === "0") &&
        (onchange.number[3] === "1" ||
          onchange.number[3] === "2" ||
          onchange.number[3] === "3" ||
          onchange.number[3] === "4" ||
          onchange.number[3] === "5" ||
          onchange.number[3] === "6" ||
          onchange.number[3] === "7" ||
          onchange.number[3] === "8" ||
          onchange.number[3] === "9" ||
          onchange.number[3] === "0") &&
        (onchange.number[4] === "1" ||
          onchange.number[4] === "2" ||
          onchange.number[4] === "3" ||
          onchange.number[4] === "4" ||
          onchange.number[4] === "5" ||
          onchange.number[4] === "6" ||
          onchange.number[4] === "7" ||
          onchange.number[4] === "8" ||
          onchange.number[4] === "9" ||
          onchange.number[4] === "0") &&
        (onchange.number[4] === "1" ||
          onchange.number[4] === "2" ||
          onchange.number[4] === "3" ||
          onchange.number[4] === "4" ||
          onchange.number[4] === "5" ||
          onchange.number[4] === "6" ||
          onchange.number[4] === "7" ||
          onchange.number[4] === "8" ||
          onchange.number[4] === "9" ||
          onchange.number[4] === "0")
      ) {
        if (onchange.number.endsWith("*") && onchange.amount.length > 2) {
          const PDT = padatha(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...PDT] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("1") ||
          onchange.number.endsWith("2") ||
          onchange.number.endsWith("3") ||
          onchange.number.endsWith("4") ||
          onchange.number.endsWith("5") ||
          onchange.number.endsWith("6") ||
          onchange.number.endsWith("7") ||
          onchange.number.endsWith("8") ||
          onchange.number.endsWith("9") ||
          onchange.number.endsWith("0")
        ) {
          const PDT = padatha(onchange);
          setCall({ ...call, numbers: [...call.numbers, ...PDT] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else {
          setBeterrorcontrol(true);
        }
      }
    } else {
      setBeterrorcontrol(true);
    }
  };

  const handleFiles = (e) => {
    // console.log(file.base64);
    // console.log(file.fileList);

    const reader = new FileReader();
    reader.onload = (e) => {
      const ReadData = [];

      const text = e.target.result;
      console.log(text);
      const cells = text.split("\n").map((el) => el.split(/\s+/));
      // console.log(cells);
      const headings = cells.shift();
      console.log(cells);
      // console.log(headings);

      cells.map((el) => ReadData.push({ number: el[0], amount: el[1] }));

      console.log(ReadData);
      if (ReadData.length) {
        setCall({ ...call, numbers: ReadData });
      }
    };

    // setCall({ ...call, numbers: ReadData });

    reader.readAsText(e.target.files[0]);
  };

  console.log(call);

  const bet = (e) => {
    e.preventDefault();
    console.log(call);
    if (call.numbers.length === 0 && loading === false) {
      setBeterrorcontrol(true);
      return;
    }
    Axios.post(`/call/${lotteryId}`, call, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setCall({
          master: "",
          numbers: [],
        });
        setOnchange({
          number: "",
          amount: "",
        });
        setSuccess(true);
        setLoading(true);
        // setCalllistctrl(false);
        setCalltotalCtrl(true);
        setAutoCompleteCtrl(true);
      })
      .then((res) => {
        setSuccess(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  // console.log(la);
  //crud delete
  const mscallcrud = (cal, key) => {
    const afterDelete = call.numbers.filter((arr, key1) => key1 !== key);
    console.log(afterDelete);
    setCall({ ...call, numbers: afterDelete });
    // setAutoCompleteCtrl(false);
    console.log(call);
  };
  const mastercallDelete = (key, calcrud) => {
    console.log(calcrud);
    // const enumbers = [...calcrud];

    // console.log(index);
  };
  const editHandle = (cal, key) => {
    console.log(key);
    setEditCtlBtn(true);
    setOnchange({
      number: cal.number,
      amount: cal.amount,
    });
  };
  // console.log(callcrud);
  //editReading
  const updateCall = () => {
    console.log(onchange);
    console.log(mastercallcrud);
    const numbers = [...mastercallcrud.numbers];
    const index = numbers.findIndex((obj) => obj.number == onchange.number);
    console.log(numbers[index]);
    numbers[index] = onchange;
    console.log(numbers);
    // setAgentCallCrud({ ...agentcallcrud, numbers: numbers });
    Axios.put(
      `/call/${lotteryId}/${mastercallcrud.id}`,
      {
        numbers: numbers,
      },
      {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }
    ).then((res) => {
      console.log(res.data.data);
      setMasterCallCrud({ id: "", numbers: [] });
      setEditCtlBtn(false);
    });
  };
  console.log(lager);
  const setBreak = () => {
    console.log(demoLager);
    console.log(lagerBreak);
    const extraArray = [];
    demoLager.map((demol, key) => {
      if (Number(demol.amount) > Number(lagerBreak)) {
        // console.log(Number(demol.amount) - Number(lagerBreak));
        let obj = {
          number: demol.number,
          amount: Number(demol.amount) - Number(lagerBreak),
        };
        extraArray.push(obj);
      }
      // console.log(array);
    });
    console.log(extraArray);
    setCallDemo(extraArray);
    // setDemolager(callDemo);
    setLagerOpen(false);
  };

  //CallOutLager
  const changeInOut = (e) => {
    setSelectChoice(e.target.value);
    console.log(selectChoice);
  };

  console.log(masterTotalData.numsData);

  // get autocomplete option function
  const getAutoChoCus = (cus) => {
    return cus.username;
  };

  console.log(in_out);

  return (
    <Stack height={"100%"} bgcolor={"white"}>
      {success && (
        <Alert
          severity="success"
          sx={{
            color: "green",
            // fontWeight: "bold",
            bgcolor: green[200],
          }}
          action={
            <IconButton
              aria-label="close"
              color="success"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <Close fontSize="12" />
            </IconButton>
          }
        >
          Lottery Updated !
        </Alert>
      )}
      {error && (
        <Alert
          severity="error"
          sx={{
            color: "red",
            // fontWeight: "bold",
            bgcolor: red[200],
          }}
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <Close fontSize="12" />
            </IconButton>
          }
        >
          Error
        </Alert>
      )}
      {beterrorcontrol === true && (
        <Alert
          variant="filled"
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                setBeterrorcontrol(false);
              }}
            >
              <Close fontSize="12" />
            </IconButton>
          }
        >
          This is bet error alert — check it out!
        </Alert>
      )}
      <Stack
        padding={1}
        spacing={1}
        flexDirection={"row"}
        flexWrap="wrap"
        justifyContent={"center"}
        boxShadow={1}
      >
        <Stack direction={"row"}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={in_out}
            onChange={(e) => {
              set_in_out(e.target.value);
              setInOutCtl(true);
            }}
          >
            <FormControlLabel
              value="In"
              control={<Radio size="small" color="success" />}
              label="In"
            />
            <FormControlLabel
              value="Out"
              control={<Radio size="small" color="success" />}
              label="Out"
            />
          </RadioGroup>
        </Stack>
        <Stack direction={"row"} spacing={0.1}>
          {(in_out === "In" && (
            <Autocomplete
              size="small"
              // options={selectChoice && selectChoice === "Out" ? agents : "0"}
              options={masters}
              isOptionEqualToValue={(option, value) =>
                option.username === value.username
              }
              sx={{ width: 150 }}
              getOptionLabel={(cus) => getAutoChoCus(cus)}
              onChange={(e, value) => {
                console.log(value);
                setAutoCompleteValue(value);
                setCall({ ...call, master: value._id });
                setCalllistctrl(true);
                setAutoCompleteCtrl(true);
                setCall({ master: value._id, numbers: [] });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ fontSize: 8 }}
                  label="Master"
                  size="small"
                  color={"success"}
                  // defaultValue={masters}
                />
              )}
            />
          )) ||
            (in_out === "Out" && (
              <FormControlLabel
                label={"Customer : "}
                labelPlacement="start"
                // sx={{ width: "100%" }}
                control={
                  <Select
                    sx={{ width: 150, height: 30, backgroundColor: teal[50] }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={customer}
                    defaultValue={"All"}
                    // onChange={onSelect}
                  >
                    {customers.map((c) => (
                      <MenuItem value={c.value}>{c.name}</MenuItem>
                    ))}
                  </Select>
                }
              />
            ))}
          <Button
            onClick={handleFiles}
            variant="contained"
            component="label"
            color="success"
            size={"small"}
            sx={{ fontSize: 14 }}
          >
            <span style={{ fontSize: 8 }}>Read</span>
            <input hidden accept={"All/*"} multiple type="file" />
          </Button>
          <Button
            variant={"contained"}
            size={"small"}
            color={"success"}
            onClick={() => {
              setLagerOpen(true);
              setDemolager(lager.in.numbers);
            }}
          >
            <Typography
              fontSize={{ xs: 8, sm: 10, md: 12 }}
              variant={"caption"}
              fontWeight={100}
            >
              Lager
            </Typography>
          </Button>
        </Stack>
      </Stack>
      <Stack
        padding={1}
        spacing={1}
        direction={"row"}
        justifyContent={"center"}
        boxShadow={1}
      >
        <BetCom
          width={50}
          text={"number"}
          name="number"
          autoFocus={true}
          value={onchange.number}
          onChange={onChangeHandler}
          inputRef={textFieldForNumber}
          style={{ position: "relative" }}
          // numTotalCheck={
          //   <Chip sx={{ position: "absolute", right: 0 }} label="a" />
          // }
          onKeyDown={(event) => {
            if (event.key.toLowerCase() === "enter") {
              console.log(event.target);
              textFieldForAmount.current.focus();
              // event.target.value.select();
              //  const form = event.target.form;
              //  const index = [...form].indexOf(event.target);
              //  form.elements[index + 1].focus();
              event.preventDefault();
            }
          }}
          label={"နံပါတ်"}
        >
          {masterTotalData.Data.map((num) => num.number).includes(
            onchange.number
          ) && (
            <Chip
              label={
                masterTotalData.Data[
                  masterTotalData.Data.findIndex(
                    (obj) => obj.number === onchange.number
                  )
                ].amount
              }
              sx={{
                position: "absolute",
                right: 4,
                top: 4,
                backgroundColor: green[300],
              }}
            />
          )}
        </BetCom>

        {/* <TwoDSign /> */}
        <BetCom
          text={"number"}
          name="amount"
          value={onchange.amount}
          onChange={onChangeHandler}
          inputRef={textFieldForAmount}
          onFocus={(event) => event.target.select()}
          onKeyDown={(event) => {
            console.log(event.key);

            if (
              event.key.toLowerCase() === "enter" ||
              event.key.toLowerCase() === "numpadenter"
            ) {
              choice(event);
              textFieldForNumber.current.focus();
              event.target.value.select();
              event.preventDefault();
            }
          }}
          // onFocus={false}
          label={"ထိုးငွေ"}
        />
        <Stack alignItems={"center"} alignContent={"center"}>
          {editCtlBtn ? (
            <IconButton onClick={updateCall} size={"small"}>
              <Edit fontSize="8" />
            </IconButton>
          ) : (
            <IconButton
              onClick={bet}
              size={"small"}
              sx={{ bgcolor: green[700] }}
            >
              <Add fontSize="8" />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Stack justifyContent={"right"} width={"100%"}>
        <Pagination
          size="small"
          page={call.numbers}
          count={call.numbers}
          boundaryCount={2}
          siblingCount={-1}
          renderItem={(item) => (
            <PaginationItem
              size="small"
              components={{ previous: ArrowBack, next: ArrowForward }}
              {...item}
            />
          )}
        />
      </Stack>

      <Stack direction={"row"} spacing={{ xs: 0.5, sm: 1, md: 1 }}>
        <Stack
          // display={{ md: "none" }}
          bgcolor={grey[300]}
          // spacing={3}
          flexDirection={{ xs: "column", sm: "column", md: "row" }}
          flexWrap={"wrap"}
          justifyContent={{ xs: "start", sm: "start", md: "start" }}
          width={{ xs: 30, sm: "20%", md: "25%" }}
        >
          {hot_tees &&
            hot_tees.map((hot, key) => {
              console.log(hot);
              return (
                <Typography
                  color={"red"}
                  fontSize={18}
                  fontWeight={600}
                  textAlign={"center"}
                >
                  {hot.number}
                </Typography>
              );
            })}
        </Stack>

        <Stack
          // display={"block"}
          // position={"initial"}
          // direction={"column"}
          alignItems={"center"}
          width={"40%"}
          maxHeight={400}
          minHeight={400}
          overflow={"auto"}
          // boxShadow={1}
          // borderBottom={1}
          // padding={1}
          // spacing={1}
        >
          {call.master && call.numbers.length && autocompleteCtrl === false
            ? call.numbers
                .map((cal, key) => (
                  // <Stack
                  //   width={"100%"}
                  //   alignItems={"center"}
                  //   bgcolor={"ActiveBorder"}
                  // >
                  <>
                    <Stack
                      direction={"row"}
                      // width={{ sx: 180 }}
                      marginY={0.3}
                      justifyContent={{
                        sx: "space-between",
                        sm: "space-around",
                        md: "space-around",
                      }}
                    >
                      <BetListCom call={cal} key={key}>
                        <IconButton
                          size="small"
                          onClick={() => mscallcrud(cal, key)}
                        >
                          <Typography
                            fontSize={8}
                            textAlign={"center"}
                            width={20}
                            color={green[900]}
                          >
                            {key + 1}
                          </Typography>
                          <Delete
                            sx={{ textalign: "center" }}
                            fontSize="small"
                          />
                        </IconButton>
                      </BetListCom>
                    </Stack>
                  </>
                ))
                .reverse()
            : autoCompleteValue &&
              autocompleteCtrl &&
              mastercalls
                .filter(
                  (ms, key) =>
                    ms.master._id.toString() == call.master.toString()
                )
                .map((cal, key) => {
                  // console.log(key);
                  // console.log(cal);

                  return (
                    <Stack
                      bgcolor={`${key % 2 == 0 ? green[200] : ""}`}
                      borderLeft={0.5}
                      borderRight={0.5}
                      justifyContent={"space-around"}
                      // component={"button"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setMasterCallCrud({
                          id: cal._id,
                          numbers: cal.numbers,
                        });
                        setCallTotal(cal.totalAmount);
                        // setAutoCompleteCtrl(true);
                      }}
                    >
                      {cal.numbers.map((ca, key) => {
                        return (
                          <Stack
                            direction={"row"}
                            // width={{ sx: 180 }}
                            marginY={0.3}
                            justifyContent={{
                              sx: "space-between",
                              sm: "space-around",
                              md: "space-around",
                            }}
                          >
                            <BetListCom call={ca} key={key}></BetListCom>
                          </Stack>
                        );
                      })}
                    </Stack>
                  );
                })
                .reverse()}
        </Stack>
        <Stack
          alignItems={"center"}
          // width={"30%"}
          maxHeight={400}
          minHeight={400}
          overflow={"scroll"}
          boxShadow={1}
          // borderBottom={1}
          // padding={1}
          // justifyContent={"space-between"}
        >
          {/* <Stack justifyContent="normal" width={"100%"}>
            <Stack width={"30%"}>
              <Button variant="contained" size="small">
                Delete
              </Button>
            </Stack>
          </Stack> */}
          {/* {agentcallcrud && agentcallcrud.length === null */}
          {
            !mastercallcrud.numbers.length &&
              callDemo.map((calc, key) => {
                <Stack
                  borderLeft={0.5}
                  borderRight={0.5}
                  // padding={1}
                  // direction={"row"}
                  justifyContent={"space-around"}
                >
                  <BetListCom call={calc} key={key} />;
                </Stack>;
              })
            // : autocompleteCtrl === true &&
            //   agentcallcrud.numbers.map((calcrud, key) => {
            //     return (
            //       <BetListCom call={calcrud}>
            //         <Stack
            //           direction={"row"}
            //           onClick={() => editHandle(calcrud, key)}
            //         >
            //           <IconButton size="small">
            //             <Edit fontSize="6" />
            //           </IconButton>
            //           <IconButton
            //             size="small"
            //             onClick={() => agentcallDelete(key, calcrud)}
            //           >
            //             <Delete fontSize="6" />
            //           </IconButton>
            //         </Stack>
            //       </BetListCom>
            //     );
            //   })
          }
        </Stack>
      </Stack>
      <Stack
        padding={1}
        border={1}
        direction={"row"}
        justifyContent={{
          xs: "space-between",
          sm: "space-between",
          md: "flex-start",
        }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Typography fontWeight={900} fontSize={14}>
          <span style={{ color: "red" }}>Call Total</span> :{" "}
          {callTotal && calltotalCtrl
            ? callTotal.toString()
            : call.numbers && calltotalCtrl === false
            ? call.numbers
                .reduce((p, n) => Number(p) + Number(n.amount), 0)
                .toString()
            : "0"}
        </Typography>
        <Typography fontWeight={900} fontSize={14}>
          <span style={{ color: "red" }}>Count</span> :{" "}
          {call ? call.numbers.length : "0"}
        </Typography>
        <Typography fontWeight={900} fontSize={14}>
          <span style={{ color: "red" }}>Net Total</span> :{" "}
          {masterTotalData !== null ? masterTotalData.Total.toString() : "0"}
        </Typography>
      </Stack>

      <Dialog fullScreen open={lagerOpen}>
        <Stack alignItems={"end"}>
          <IconButton onClick={() => setLagerOpen(false)}>
            <Close />
          </IconButton>
        </Stack>
        <Stack maxWidth={"100%"} padding={1}>
          <Stack direction={"row"} padding={1}>
            <TextField
              value={lagerBreak}
              label={"Break Amount"}
              size={"small"}
              onChange={(e) => setLagerBreak(e.target.value)}
            />
            <Button
              size="small"
              variant={"contained"}
              color={"success"}
              onClick={setBreak}
            >
              Set
            </Button>
          </Stack>
          <LagerTable lid={lotteryId} />
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default BetPage;
