import {
  Add,
  AddSharp,
  ArrowBack,
  ArrowForward,
  Cancel,
  Close,
  Delete,
  Edit,
  Star,
} from "@mui/icons-material";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  getStepLabelUtilityClass,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Stack,
  Switch,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  blue,
  cyan,
  deepOrange,
  green,
  grey,
  lightBlue,
  lightGreen,
  orange,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactFileReader from "react-file-reader";
import { NavLink, useLocation, useParams } from "react-router-dom";
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
  checkPDT,
} from "./Betsign";
import LagerTable from "../../components/LagerTable";
import {
  calculateHotTee,
  catchHotLimit,
  catchHotLimitFromFunc,
  SortingAmount,
} from "./BetPage.method";
import ModalBox from "../../components/modal/ModalBox";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import Print from "../../components/Print";
import MaxAdd from "../../components/modal/MaxAdd";
import { exportTextFile } from "../../shared/ExportTxt";

const BetPage = () => {
  // For input refs
  let member;
  if (JSON.parse(localStorage.getItem("user-info")).role === "Admin") {
    member = "master";
  }
  if (JSON.parse(localStorage.getItem("user-info")).role === "Master") {
    member = "agent";
  }
  if (JSON.parse(localStorage.getItem("user-info")).role === "Agent") {
    member = "customer";
  }
  const textFieldForNumber = useRef(null);
  const textFieldForAmount = useRef(null);

  const [inOutCtl, setInOutCtl] = useState(false);
  const [play, setPlay] = useState(false);

  //masterapi ctl
  const [mastercallAPIctl, setMastercallAPI] = useState(false);
  const [extraCtl, setExtraCtl] = useState(false);
  const [callDetail, setCallDetail] = useState({
    ID: "",
    name: "",
    time: "",
    numbers: [],
    callTotal: 0,
    callCount: 0,
  });
  // const [callTotal, setCallTotal] = useState(0);
  // const [callCount, setCallCount] = useState(0);
  const [calltotalCtrl, setCalltotalCtrl] = useState(false);

  // delButton control
  const [delButtCtl, setDelButtCtl] = useState(false);
  const [confirmCtl, setComfirmCtl] = useState(false);
  const [crudOpen, setCrudOpen] = useState(false);
  const [crudOutOpen, setCrudOutOpen] = useState(false);

  //loading
  const [loading, setLoading] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  // autocompleter ctrl
  const [autocompleteCtrl, setAutoCompleteCtrl] = useState(false);

  const [selectChoice, setSelectChoice] = useState();
  // const [enternumtol, setEnternumtol] = useState({ number: "", total: "" });

  const [beterrorcontrol, setBeterrorcontrol] = useState(false);
  const [callandBetlistctleff, setCallandBetlistctleff] = useState(true);

  const [mastercalls, setMastercalls] = useState([]);
  const [masterOutCalls, setMasterOutCall] = useState([]);

  const [lager, setLager] = useState({});
  const [call, setCall] = useState({
    master: "",
    hotLimit: 0,
    superHotLimit: 0,
    numbers: [],
    remark: [],
  });
  const [outCalls, setOutCalls] = useState({
    customer: "",
    hotLimit: 0,
    superHotLimit: 0,
    numbers: [],
  });

  const [maxAddhandle, setMaxAddhandle] = useState(false);
  // const [callList, setCallList] = useState([]);

  const [users, setUsers] = useState([]);

  // const showCalls = [];

  const { lotteryId } = useParams();
  // const location = useLocation();
  // const { hot_tees } = location.state;
  const [hotNumbers, setHotNumbers] = useState();
  // console.log(hot);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //callList crud
  const [editCtlBtn, setEditCtlBtn] = useState(false);
  const [mastercallcrud, setMasterCallCrud] = useState({ id: "", numbers: [] });
  const [masteroutcallcrud, setMasterOutCallCrud] = useState({
    id: "",
    numbers: [],
  });

  const [keydemo, setKeyDemo] = useState();
  //For twoD sign state
  const [autoCompleteValue, setAutoCompleteValue] = useState();

  const [onchange, setOnchange] = useState({
    number: "",
    amount: "",
  });

  const [onChangeHistory, setOnchangeHistory] = useState("");

  //lager open
  const [lagerOpen, setLagerOpen] = useState(false);

  //Lager Break
  const [lagerBreak, setLagerBreak] = useState("0");
  const [demoLager, setDemolager] = useState({
    originalBreak: lager && lager.originalBreak ? lager.originalBreak : 0,
    average: 0,
    totalAmount: 0,
    extraNumb: [],
    numbers: [],
  });
  const [confirmBeterr, setConfirmBeterr] = useState(false);
  //calllist control state
  const [calllistctrl, setCalllistctrl] = useState(false);

  const [masterTotalData, setMasterTotalData] = useState({
    Data: [],
    Total: 0,
  });
  // let hot = [];
  const [hot, setHot] = useState([]);
  const [superhot, setSuperHot] = useState([]);
  // in outt
  const [in_out, set_in_out] = useState("In");
  const [customers, setCustomers] = useState([]);
  const [cusval, setCusval] = useState(null);
  const [Timer, setTimer] = useState("");
  const [singleCusCall, setSingleCusCall] = useState({
    Lagnumbers: "",
    Total: [],
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "2d slip",
    onAfterPrint: () => alert("Print Success"),
  });

  useEffect(() => {
    Axios.get(`/lotterys/${lotteryId}`)
      .then((res) => {
        console.log(res.data.lottery);
        const { hot_tee, superhot_tee, play, Timer } = res.data.lottery;
        console.log(Timer);
        setHot(hot_tee.toString().split("/"));
        setSuperHot(superhot_tee.toString().split("/"));
        setPlay(play);
        setTimer(Timer);
        // const hots = hot_tee.split("/");
        // console.log(hot_tee.toString())
      })
      .catch((err) => console.log(err));
    Axios.get(`/lagers/${lotteryId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        const lager = res.data.data;
        if (lager) {
          setLager(lager);
          const ext = setBreak(lager);
          console.log(ext);
          setDemolager({ ...demoLager, extraNumb: ext });
        }
        // setCallList(res.data.data.in.read);
        // setSuccess(false);
      })
      .catch((err) => console.log(err));
    // setBreak();

    if (in_out === "In") {
      Axios.get(`/users`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      })

        .then((res) => {
          // if (masters) {
          const data = res.data.data;
          setUsers([...data]);
          console.log(data);
          // setCalllistctrl(false);
          if (data) {
            setAutoCompleteValue(data[0]);
          }
          console.log(autoCompleteValue);
          // }
        })
        .catch((err) => console.log(err));
    }
    if (in_out === "Out") {
      console.log("Out Customers");
      Axios.get(`customers`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        console.log(res);
        console.log(res.data.data);
        // const customers = JSON.parse(...res.data.data)
        // console.log(customers)
        // alert(res.data)
        // if (res.data) {
        setCustomers([...res.data.data]);
        setCusval(res.data.data[0]);
        // }
      });

      setInOutCtl(false);
    }
    // setHotNumbers( calculateHotTee(JSON.parse(localStorage.getItem('user-info')),hot_tees,lager.in.numbers,lager.in.totalAmount))
  }, [inOutCtl === true]);
  console.log(onChangeHistory);
  useEffect(() => {
    if (in_out === "In") {
      Axios.get(`/call/${lotteryId}`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        console.log(res.data.data);
        setMastercalls(res.data.data);
        // setBreak();
      });

      if (autoCompleteValue) {
        Axios.get(
          `/call/${lotteryId}/call-numbers-total/${autoCompleteValue._id}`,
          {
            headers: {
              authorization: `Bearer ` + localStorage.getItem("access-token"),
            },
          }
        ).then((res) => {
          // console.log(res.data);
          // setBreak();
          setMasterTotalData({
            Data: res.data.numsData,
            Total: res.data.numsTotal,
          });
        });
      }
    }
    if (in_out === "Out") {
      Axios.get(`/outcall/${lotteryId}`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        console.log(res.data.data);
        setMasterOutCall(res.data.data);
        // setBreak();
        // setInOutCtl(false);
        // setCalllistctrl(false);
        // setMastercalls(res.data.data);
      });

      // if(cusval){
      //   console.log(cusval)
      // }
    }
    // if (lager && lager.numbers.length !== 0) {
    //   const lagerExt = setBreak();
    //   console.log(lagerExt);
    // }
    setAutoCompleteCtrl(false);
    setMastercallAPI(false);
    setCalllistctrl(false);
  }, [inOutCtl, autocompleteCtrl, mastercallAPIctl]);

  // console.log(Timer);

  // console.log(autoCompleteValue);

  // out Customer select
  const OnSelect = (e) => {
    const { value } = e.target;
    console.log(value);

    setCusval(value);
    setMastercallAPI(true);
  };

  //setTimeout Alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setBeterrorcontrol(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [beterrorcontrol]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name) {
      name === "number"
        ? setOnchange({ ...onchange, number: value })
        : setOnchange({ ...onchange, amount: value });
    }
    // console.log(onchange);
  };

  const choice = (e) => {
    e.preventDefault();
    // const hotRemain = calculateHotTee(onchange,hot,autoCompleteValue,masterTotalData);

    if (
      in_out === "Out" &&
      !lager.numbers
        .map((lg) => lg.number.toString())
        .includes(onchange.number.toString())
    ) {
      alert(`${onchange.number} has not in your lager`);
      return;
    }

    // K (natkat) func:
    if (
      onchange.number.length === 1 &&
      onchange.number.toLocaleLowerCase().toString() === "k"
    ) {
      const K = k(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      K.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? K.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : K),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // ** (apu) func:
    if (
      onchange.number.length === 2 &&
      onchange.number.toLocaleLowerCase().toString() === "**"
    ) {
      const apu = startStar(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      apu.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? apu.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : apu),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // P (power) func:
    if (
      onchange.number.length === 1 &&
      onchange.number.toLocaleLowerCase().toString() === "p"
    ) {
      const power = p(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      power.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? power.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : power),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // B (brother) func:
    if (
      onchange.number.length === 1 &&
      onchange.number.toLocaleLowerCase().toString() === "b"
    ) {
      const brothers = b(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      brothers.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? brothers.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : brothers),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // 0...9/ (breaks) func:
    if (
      onchange.number.length === 2 &&
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        onchange.number[0]
      ) &&
      onchange.number.endsWith("/")
    ) {
      // alert('berak')
      const _Breaks = Breaks(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _Breaks.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _Breaks.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _Breaks),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // 0...9- (aper) func:
    if (
      onchange.number.length === 2 &&
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        onchange.number[0]
      ) &&
      onchange.number.endsWith("-")
    ) {
      const _aper = aper(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _aper.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _aper.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _aper),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // 0...9* (forwardPate) func:
    if (
      onchange.number.length === 2 &&
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        onchange.number[0]
      ) &&
      onchange.number[onchange.number.length - 1].toString() === "*"
    ) {
      const _forwardPate = forwardPate(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _forwardPate.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _forwardPate.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _forwardPate),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // *0...9 (backPate) func:
    if (
      onchange.number.length === 2 &&
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        onchange.number[1]
      ) &&
      onchange.number[0].toString() === "*"
    ) {
      const _backpate = backpate(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _backpate.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _backpate.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _backpate),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // 91+ (r) func:
    if (onchange.number.length === 3 && onchange.number.endsWith("+")) {
      // alert('R')
      const _r = r(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _r.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _r.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _r),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // ms (masone) func:
    if (
      onchange.number.length === 2 &&
      onchange.number.toLocaleLowerCase().toString() === "ms"
    ) {
      const _masone = masone(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _masone.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _masone.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _masone),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // sm (sonema) func:
    if (
      onchange.number.length === 2 &&
      onchange.number.toLocaleLowerCase().toString() === "sm"
    ) {
      const _sonema = sonema(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _sonema.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _sonema.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _sonema),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // mm (mama) func:
    if (
      onchange.number.length === 2 &&
      onchange.number.toLocaleLowerCase().toString() === "mm"
    ) {
      const _mama = mm(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _mama.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _mama.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _mama),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // ss (sonesone) func:
    if (
      onchange.number.length === 2 &&
      onchange.number.toLocaleLowerCase().toString() === "ss"
    ) {
      const _sonesone = ss(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _sonesone.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _sonesone.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _sonesone),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // s* (sonepu) func:
    if (
      onchange.number.length === 2 &&
      onchange.number.toLocaleLowerCase().toString() === "s*"
    ) {
      const _sonepu = spu(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _sonepu.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _sonepu.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _sonepu),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // m* (mapu) func:
    if (
      onchange.number.length === 2 &&
      onchange.number.toLocaleLowerCase().toString() === "m*"
    ) {
      const _mapu = mpu(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _mapu.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _mapu.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _mapu),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // 123/123* (padayta) func:
    if (
      (onchange.number.length >= 3 &&
        onchange.number.length <= 6 &&
        !isNaN(Number(onchange.number))) || // isNan(x) is return notnumber
      (onchange.number.length >= 3 &&
        onchange.number.length <= 5 &&
        onchange.number.endsWith("*"))
    ) {
      if (checkPDT(onchange.number)) {
        alert("error same number");
        return;
      }
      const _padatha = padatha(onchange);
      let hotLimit;
      let hotTotal;
      let superhotLimit;
      let superhotTotal;
      let remainHotNumbers = [];
      let remainSuperHotNumbers = [];
      _padatha.map((a) => {
        if (hot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            hot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            hotLimit = hotLimitCalculate.hotLimit;
            hotTotal = hotLimitCalculate.hotTotal;
            remainHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
        if (superhot.includes(a.number)) {
          console.log(call.numbers);
          const hotLimitCalculate = catchHotLimit(
            a,
            superhot,
            masterTotalData,
            call.numbers,
            masterTotalData.Total * (autoCompleteValue.superhot_limit / 100)
          );

          if (hotLimitCalculate.remainBet < onchange.amount) {
            superhotLimit = hotLimitCalculate.hotLimit;
            superhotTotal = hotLimitCalculate.hotTotal;
            remainSuperHotNumbers.push({
              number: a.number,
              remain: hotLimitCalculate.remainBet,
            });
            // return;
          }
        }
      });
      if (remainHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }
      if (remainSuperHotNumbers.length !== 0) {
        alert(
          ` LIMIT OVER! \n superhot limit : ${superhotLimit}\n superhot total : ${superhotTotal} \n remain bet : ${remainSuperHotNumbers.map(
            (h) => `${h.number}:${h.remain}`
          )}`
        );
      }

      const filterNumbers = [...remainHotNumbers, ...remainSuperHotNumbers];
      setCall({
        ...call,
        numbers: [
          ...call.numbers,
          ...(filterNumbers.length
            ? _padatha.filter(
                (a) =>
                  !filterNumbers
                    .map((rhn) => rhn.number.toString())
                    .includes(a.number.toString())
              )
            : _padatha),
        ],
        remark: [
          ...call.remark,
          {
            type: onchange.number,
            number: onchange.number,
            amount: onchange.amount,
          },
        ],
      });
      setOnchange({ number: "", amount: onchange.amount });
      setAutoCompleteCtrl(false);
    }

    // talone chin
    if (onchange.number.length === 2 && !isNaN(Number(onchange.number))) {
      if (hot.includes(onchange.number)) {
        console.log(call.numbers);
        const hotLimitCalculate = catchHotLimit(
          onchange,
          hot,
          masterTotalData,
          call.numbers,
          masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
        );
        if (hotLimitCalculate.remainBet < onchange.amount) {
          alert(
            ` LIMIT OVER! \n hot limit : ${hotLimitCalculate.hotLimit}\n hot total : ${hotLimitCalculate.hotTotal} \n remain bet : ${hotLimitCalculate.remainBet}`
          );
          return;
        }
      }

      if (superhot.includes(onchange.number)) {
        console.log(call.numbers);
        const hotLimitCalculate = catchHotLimit(
          onchange,
          superhot,
          masterTotalData,
          call.numbers,
          masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
        );
        if (hotLimitCalculate.remainBet < onchange.amount) {
          alert(
            ` LIMIT OVER! \n superhot limit : ${hotLimitCalculate.hotLimit}\n superhot total : ${hotLimitCalculate.hotTotal} \n remain bet : ${hotLimitCalculate.remainBet}`
          );
          return;
        }
      }

      setCall({
        ...call,
        numbers: [...call.numbers, onchange],
      });

      setOnchangeHistory(onchange.number);

      setOnchange({ number: "", amount: onchange.amount });
      setBeterrorcontrol(false);
      setEditCtlBtn(false);
      setCallandBetlistctleff(false);
      setAutoCompleteCtrl(false);
    }

    if (onchange.number.length === 1 && onchange.number === "+") {
      if (hot.includes(onchange.number)) {
        console.log(call.numbers);
        const hotLimitCalculate = catchHotLimit(
          onchange,
          hot,
          masterTotalData,
          call.numbers,
          masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
        );
        if (hotLimitCalculate.remainBet < onchange.amount) {
          alert(
            ` LIMIT OVER! \n hot limit : ${hotLimitCalculate.hotLimit}\n hot total : ${hotLimitCalculate.hotTotal} \n remain bet : ${hotLimitCalculate.remainBet}`
          );
          return;
        }
      }

      if (superhot.includes(onchange.number)) {
        console.log(call.numbers);
        const hotLimitCalculate = catchHotLimit(
          onchange,
          superhot,
          masterTotalData,
          call.numbers,
          masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
        );
        if (hotLimitCalculate.remainBet < onchange.amount) {
          alert(
            ` LIMIT OVER! \n superhot limit : ${hotLimitCalculate.hotLimit}\n superhot total : ${hotLimitCalculate.hotTotal} \n remain bet : ${hotLimitCalculate.remainBet}`
          );
          return;
        }
      }

      // FOR REVERSE
      let obj = {
        number: onChangeHistory.split("").reverse().join(""),
        amount: onchange.amount,
      };
      console.log(obj);

      setCall({
        ...call,
        numbers: [...call.numbers, obj],
      });

      setOnchange({ number: "", amount: onchange.amount });
      setBeterrorcontrol(false);
      setEditCtlBtn(false);
      setCallandBetlistctleff(false);
      setAutoCompleteCtrl(false);
    }
  };
  // console.log(mastercallcrud);
  const handleFiles = (e) => {
    const reader = new FileReader();

    reader.readAsText(e.target.files[0]);

    reader.onload = (e) => {
      const ReadData = [];

      const text = e.target.result;

      console.log(text);
      const cells = text.split("\n").map((el) => el.split(/\s+/));
      // // console.log(cells);
      const headings = cells.shift();
      console.log(cells);
      // console.log(headings);

      setCall({
        ...call,
        numbers: cells.map((el) => {
          return { number: el[0], amount: el[1] };
        }),
      });

      // console.log(ReadData);
      // if (ReadData.length) {
      //   setCall({ ...call, numbers: ReadData });
      // }
    };

    // setCall({ ...call, numbers: ReadData });
  };

  const bet = (e, in_out) => {
    e.preventDefault();
    setLoading(true);

    if (call.numbers.length === 0 && loading === false && in_out === "Out") {
      setBeterrorcontrol(true);
      setLoading(false);
      return;
    }

    if (in_out === "In") {
      let obj;
      if (JSON.parse(localStorage.getItem("user-info")).role === "Admin") {
        obj = {
          master: autoCompleteValue._id,
          numbers: call.numbers,
          remark: call.remark,
        };
      }
      if (JSON.parse(localStorage.getItem("user-info")).role === "Master") {
        obj = {
          agent: autoCompleteValue._id,
          numbers: call.numbers,
          remark: call.remark,
        };
      }
      if (JSON.parse(localStorage.getItem("user-info")).role === "Agent") {
        obj = {
          customer: autoCompleteValue._id,
          numbers: call.numbers,
          remark: call.remark,
        };
      }

      Axios.post(`/call/${lotteryId}`, obj, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          console.log(res.data.data);
          setCall({
            master: "",
            numbers: [],
            remark: [],
          });
          setOnchange({
            number: "",
            amount: "",
          });
          setSuccess(true);
          // setInOutCtl(true);
          setLoading(false);
          // setCalllistctrl(true);
          // setCalltotalCtrl(true);
          // setAutoCompleteCtrl(true);
          setMastercallAPI(true);
          setInOutCtl(true);
        })
        // .then((res) => {
        //   setSuccess(false);
        //   setLoading(false);
        // })
        .catch((err) => console.log(err));
    }

    if (in_out === "Out") {
      Axios.post(
        `/outcall/${lotteryId}`,
        { customer: cusval._id, numbers: call.numbers },
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("access-token"),
          },
        }
      )
        .then((res) => {
          console.log(res.data.data);
          setCall({
            master: "",
            numbers: [],
          });
          // setCusval();
          setOnchange({
            number: "",
            amount: "",
          });
          setSuccess(true);
          // setInOutCtl(true);
          setLoading(false);
          // setCalllistctrl(true);
          // setCalltotalCtrl(true);
          // setAutoCompleteCtrl(true);
          setMastercallAPI(true);
        })
        // .then((res) => {
        //   setSuccess(false);
        //   setLoading(false);
        // })
        .catch((err) => console.log(err));
    }
  };
  console.log(call);
  //crud delete
  const mscallcrud = (e, cal, key) => {
    switch (e.detail) {
      case 1:
        {
          const afterDelete = call.numbers.filter((arr, key1) => key1 !== key);
          setCall({ ...call, numbers: afterDelete });
        }

        break;
      case 2: {
        const deleteDown = call.numbers.filter((arr, key1) => key1 < key);
        console.log(deleteDown);
        setCall({ ...call, numbers: deleteDown });
      }
      default:
        break;
    }
  };
  const mastercallDelete = (callid) => {
    setLoading(true);

    Axios.delete(`/call/${lotteryId}/${callid}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res);
        // setMastercallAPI(true);
        setLoading(false);
        setMasterCallCrud({ id: "", numbers: [] });
        setComfirmCtl(false);
        setCrudOpen(false);
        setInOutCtl(true);
        setMastercallAPI(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const masteroutcallDelete = (callid) => {
    setLoading(true);

    Axios.delete(`/outcall/${lotteryId}/${callid}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res);
        // setMastercallAPI(true);
        setLoading(false);
        setMasterOutCallCrud({ id: "", numbers: [] });
        setComfirmCtl(false);
        setCrudOpen(false);
        setInOutCtl(true);
        setMastercallAPI(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandle = (cal, key) => {
    // console.log(key);
    // setEditCtlBtn(true);
    setOnchange({
      number: cal.number,
      amount: cal.amount,
    });
  };

  //editReading
  const updateCall = () => {
    setLoading(true);
    // console.log(onchange);
    // console.log(mastercallcrud);
    const numbers = [...mastercallcrud.numbers];
    const index = numbers.findIndex((obj) => obj.number == onchange.number);
    numbers[index] = onchange;

    console.log(numbers);

    // setMasterCallCrud({ ...mastercallcrud, numbers: numbers });
    Axios.put(
      `/call/${lotteryId}/${mastercallcrud.id}`,
      {
        // master:autoCompleteValue._id,
        numbers: numbers,
      },
      {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }
    ).then((res) => {
      setLoading(false);
      setMasterCallCrud({ id: "", numbers: [] });
      // setEditCtlBtn(false);
      setCrudOpen(false);
      setMastercallAPI(true);
      setInOutCtl(true);
    });
  };

  const updateOutCall = () => {
    setLoading(true);
    // console.log(onchange);
    // console.log(mastercallcrud);
    const numbers = [...masteroutcallcrud.numbers];
    const index = numbers.findIndex((obj) => obj.number == onchange.number);
    numbers[index] = onchange;

    console.log(numbers);

    // setMasterCallCrud({ ...mastercallcrud, numbers: numbers });
    Axios.put(
      `/outcall/${lotteryId}/${masteroutcallcrud.id}`,
      {
        // master:autoCompleteValue._id,
        numbers: numbers,
      },
      {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }
    ).then((res) => {
      setLoading(false);
      setMasterOutCallCrud({ id: "", numbers: [] });
      // setEditCtlBtn(false);
      setCrudOpen(false);
      setInOutCtl(true);
      setMastercallAPI(true);
    });
  };

  const setBreak = (lager) => {
    console.log(lager);
    // const avg =
    //   lager.numbers.length !== 0
    //     ? Number(
    //         lager.numbers
    //           .map((num) => Number(num.amount))
    //           .reduce((pre, next) => pre + next, 0)
    //       ) / Number(lager.originalBreak)
    //     : "0";
    const extraArray = [];
    lager.numbers.map((demol, key) => {
      if (Number(demol.amount) > Number(lager.originalBreak)) {
        // console.log(Number(demol.amount) - Number(lagerBreak));
        let obj = {
          number: demol.number,
          amount: Number(demol.amount) - Number(lager.originalBreak),
        };
        extraArray.push(obj);
      }
      console.log(extraArray);
    });
    return extraArray;
    // setCallDemo({...demoLager, extraNumb: extraArray});
    // setDemolager(callDemo);
    // console.log(demoLager);
    // setLagerOpen(false);
  };

  //CallOutLager
  const changeInOut = (e) => {
    setSelectChoice(e.target.value);
  };

  // get autocomplete option function
  const getAutoChoCus = (cus) => {
    return cus.username;
  };

  // console.log(cusval);

  const [value, setValue] = React.useState(users);
  const [inputValue, setInputValue] = React.useState("");
  //DoubleClick
  const doubleClick = (e, cal, key) => {
    console.log(e.detail, cal, key);
    switch (e.detail) {
      case 1:
        {
          console.log(cal);
          setCallDetail({
            ID: cal.callId,
            name: cal.master.name,
            time: moment(cal.betTime).format("YYYY-MM-DD , h:mm:ss a"),
            callTotal: cal.totalAmount,
            callCount: cal.numbers.length,
            numbers: cal.numbers,
          });
          // setCallTotal(cal.totalAmount);
          // setCallCount(cal.numbers.length);
          // set
        }

        break;
      case 2:
        {
          console.log("i am 2");
          setMasterCallCrud({
            id: cal._id,
            numbers: cal.numbers,
          });

          // console.log(cal.totalAmount)
          setAutoCompleteCtrl(true);
          // setDelButtCtl(true);
          setCrudOpen(true);
        }
        break;

      default:
        break;
    }
  };

  // const timerFunc = Timer => {
  //   const start
  // }
  console.log(customers);
  const handleMaxAdd = () => {
    if (customers && demoLager.extraNumb.length) {
      setMaxAddhandle(true);
    }
  };
  const sentMaxAdd = () => {
    Axios.post(
      `/outcall/${lotteryId}`,
      { customer: cusval._id, numbers: demoLager.extraNumb },
      {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }
    ).then((res) => {
      setMaxAddhandle(false);
      exportTextFile({ demoLager });
      setMastercallAPI(true);
      setDemolager({ ...demoLager, extraNumb: [] });
    });
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        // color="inherit"
        onClick={() => setSuccess(false)}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Stack height={"100%"} bgcolor={"white"}>
      {success && (
        <Snackbar
          open={success}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          message="Confirm Bet"
          action={action}
        >
          <Alert severity="info">Confirm Bet</Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={success}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={() => setError(false)}
          message="Error Bet"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                // color="inherit"
                onClick={() => setError(false)}
              >
                <Close fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert severity="error">Error Bet</Alert>
        </Snackbar>
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
        // spacing={1}
        flexDirection={"row"}
        flexWrap="wrap"
        // item={"center"}
        justifyContent={"center"}
        boxShadow={1}
      >
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems="center"
          justifyContent={"center"}
        >
          {Timer ? (
            <Typography
              bgcolor={green[200]}
              color={"red"}
              paddingX={2}
              marginRight={2}
              sx={{ fontWeight: "bold", fontSize: 20, borderRadius: 1 }}
            >
              {moment()
                .add(Number(Timer / 10000), "minutes")
                .format("hh:mm:ss")}
            </Typography>
          ) : (
            ""
          )}
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={in_out}
            onChange={(e) => {
              set_in_out(e.target.value);
              setInOutCtl(true);
              setCalllistctrl(true);
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
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          {(in_out === "In" && (
            <Autocomplete
              // multiple={true}
              size="small"
              // value={users[0]}
              options={users}
              sx={{ width: 150 }}
              getOptionLabel={(cus) => `${cus.username}`}
              // isOptionEqualToValue={(option) =>
              //   option.username === users.username
              // }
              defaultValue={users[0]}
              onChange={(e, value) => {
                console.log(value);
                setAutoCompleteValue(value);
                setCall({ ...call, master: value._id });
                // setCalllistctrl(true);
                setAutoCompleteCtrl(true);
                // setCall({ master: value._id, numbers: [] });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ fontSize: 8 }}
                  label="Members"
                  // label={`${
                  //   autoCompleteValue ? autoCompleteValue.username : "Agent"
                  // }`}
                  size="small"
                  color={"success"}
                  // defaultValue={autoCompleteValue}
                  defaultValue={users && users[0]}
                />
              )}
            />
          )) ||
            (in_out === "Out" && customers.length && (
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Customers</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={cusval}
                  label={"Customers"}
                  onChange={(e) => OnSelect(e)}
                >
                  {[...customers].map((c) => (
                    <MenuItem sx={{ width: 200 }} value={c}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              // <Select
              //   defaultValue={"U Aung"}
              //   style={{ width: 150 }}
              //   onChange={(e) => setCusval(e)}
              //   options={[
              //     {value:'U Aung',name:'U Aung'}
              //   ]}

              // />
            ))}
          {in_out === "In" && play && (
            <Button
              variant="contained"
              component="label"
              color="success"
              // size={"small"}
              // sx={{ fontSize: 14 }}
            >
              <span style={{ fontSize: 10 }}>Read</span>

              <input
                onChange={handleFiles}
                hidden
                accept={"All/*"}
                multiple
                type="file"
              />
            </Button>
          )}
          {/* <Button
            variant={"contained"}
            size={"small"}
            color={"success"}
            onClick={() => {
              setLagerOpen(true);
              setDemolager({
                ...demoLager,
                totalAmount:
                  lager &&
                  lager.map
                    .map((num) => Number(num.amount))
                    .reduce((pre, next) => pre + next, 0),
                numbers: lager.numbers,
              });
            }}
          >
            <Typography
              fontSize={{ xs: 8, sm: 10, md: 12 }}
              variant={"caption"}
              fontWeight={100}
            >
              Lager
            </Typography>
          </Button> */}
          <NavLink
            style={{ textDecoration: "none" }}
            to={`/lottery/bet/${lotteryId}/lager`}
            state={{ extraArray: demoLager.extraNumb }}
          >
            <Button
              variant={"contained"}
              color={"success"}
              // onClick={() => winNumberCount(lager)}
            >
              <span style={{ fontSize: 10 }}>Ledger</span>
            </Button>
          </NavLink>
        </Stack>
      </Stack>
      {play && (
        <Stack
          padding={1}
          spacing={1}
          direction={"row"}
          justifyContent={"center"}
          boxShadow={1}
        >
          <Stack alignItems={"center"} direction={"row"} spacing={0.5}>
            <BetCom
              width={50}
              bgcolor={`${green[100]}`}
              text={"number"}
              name="number"
              autoFocus={true}
              value={onchange.number}
              textColor={hot.includes(onchange.number) ? "red" : "blue"}
              onChange={onChangeHandler}
              inputRef={textFieldForNumber}
              style={{ position: "relative" }}
              // numTotalCheck={
              //   <Chip sx={{ position: "absolute", right: 0 }} label="a" />
              // }
              onKeyDown={(event) => {
                if (
                  event.key.toLowerCase() === "enter" &&
                  onchange.number !== ""
                ) {
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
            {/* {editCtlBtn ? (
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <IconButton onClick={updateCall} size={"small"}>
                <Edit fontSize="8" />
              </IconButton>
              <IconButton size="small" onClick={() => DeleteCall()}>
                <Delete fontSize={"6px"} />
              </IconButton>
            </Stack>
          ) : ( */}
            <IconButton
              onClick={
                call.numbers.length &&
                ((e) => {
                  bet(e, in_out);
                  setBreak();
                })
              }
              size={"small"}
              sx={{ bgcolor: green[500] }}
            >
              <FileUploadIcon fontSize={"medium"} />
            </IconButton>
          </Stack>
        </Stack>
      )}

      <Stack
        position={"relative"}
        display={`${!delButtCtl && "none"}`}
        // justifyContent={"right"}
        width={"100%"}
        direction={"row"}
        padding={1}
        spacing={1}
      >
        {/* <Pagination
          size="small"
          page={call.numbers}
          count={call.numbers}
          boundaryCount={2}
          siblingCount={-1}
          renderItem={(item) => (
            <PaginationItem
              size="small"
              sx={{ alignItems: "center" }}
              components={{ previous: ArrowBack, next: ArrowForward }}
              {...item}
            />
          )}
        /> */}

        <Button
          sx={{
            height: 30,
            textTransform: "none",
            textAlign: "center",
          }}
          variant={"contained"}
          color={"success"}
          onClick={() => {
            setDelButtCtl(false);
            setEditCtlBtn(false);
            setMasterCallCrud({ id: "", numbers: [] });
          }}
        >
          <span style={{ fontSize: 16, paddingInline: 1 }}>Close</span>
        </Button>
        <Button
          sx={{
            height: 30,
            textTransform: "none",
          }}
          variant={"contained"}
          color={"success"}
          onClick={() => setComfirmCtl(true)}
        >
          <span style={{ fontSize: 16, paddingInline: 1 }}>Call Delete</span>
        </Button>
      </Stack>
      <Stack direction={"row"} padding={1} justifyContent={"space-between"}>
        <Stack
          paddingX={1}
          // border={1}
          width="100%"
          flexDirection={"row"}
          flexWrap="wrap"
          justifyContent={{
            xs: "space-between",
            sm: "space-between",
            md: "flex-start",
          }}
          alignItems="center"
          // spacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Typography fontWeight={900} fontSize={10}>
            <span style={{ color: "red" }}>id</span> : {callDetail.ID}
          </Typography>
          <Typography fontWeight={900} fontSize={10}>
            <span style={{ color: "red" }}>Count</span> : {callDetail.callCount}
          </Typography>
          <Typography fontWeight={900} fontSize={10}>
            <span style={{ color: "red" }}>Call Total</span> :{" "}
            {callDetail.callTotal}
          </Typography>
          <Typography fontWeight={900} fontSize={10}>
            <span style={{ color: "red" }}>Net Total</span> :{" "}
            {masterTotalData !== null ? masterTotalData.Total.toString() : "0"}
          </Typography>
          <Typography fontWeight={900} fontSize={10}>
            <span style={{ color: "red" }}>Time</span> : {callDetail.time}
          </Typography>
        </Stack>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`/print`}
          state={{
            ID: callDetail.ID,
            count: callDetail.callCount,
            name: callDetail.name,
            time: callDetail.time,
            numbers: callDetail.numbers,
            totalAmount: callDetail.callTotal,
          }}
        >
          {/* <Button onClick={handlePrint} variant="outlined" size="small"> */}
          print
          {/* </Button> */}
        </NavLink>
        {/* <div style={{ display: "none" }}> */}
        {/* <Print
            componentRef={componentRef}
            ID={callDetail.ID}
            count={callDetail.callCount}
            name={callDetail.name}
            time={callDetail.time}
            numbers={callDetail.numbers}
            totalAmount={callDetail.callTotal}
          /> */}
        {/* </div> */}
      </Stack>
      {/* <Stack
        alignItems={"end"}
        display={{ xs: "block", md: "none", sm: "none" }}
        paddingX={{ xs: 1, sm: 1, md: 2 }}
      >
        <Clock />
      </Stack> */}
      {(autoCompleteValue || cusval) && (
        <Stack
          direction={"row"}
          spacing={{ xs: 0.5, sm: 1, md: 1 }}
          bgcolor={grey[300]}
          height="100%"
          padding={1}
          justifyContent="space-between"
        >
          <Stack
            // display={{ md: "none" }}
            bgcolor={grey[300]}
            spacing={{ xs: 0, sm: 1 }}
            flexDirection={"column"}
            flexWrap={"wrap"}
            padding={{ xs: 0, sm: 1 }}
            overflow="scroll"
            justifyContent={{ xs: "start", sm: "start", md: "start" }}
            width={{ xs: "20%", sm: "20%", md: "25%" }}
          >
            <Stack
              width={"100%"}
              flexDirection={"row"}
              flexWrap="wrap"
              alignItems={"center"}
              // borderRadius={1}
              // bgcolor={green[300]}
              // paddingLeft={0.5}
            >
              <Typography
                color={"black"}
                fontSize={10}
                align="center"
                fontWeight={600}
                textAlign={"center"}
                alignItems="center"
              >
                <span style={{ color: "orange", fontWeight: "bold" }}>HL:</span>
                <span style={{ color: "blue" }}>
                  {(masterTotalData.Total * autoCompleteValue.hot_limit) / 100}
                </span>
              </Typography>
            </Stack>
            <Stack
              width={"100%"}
              flexDirection={"row"}
              flexWrap="wrap"
              alignItems={"center"}
              flexGrow={"initial"}
              // margin={1}
              // borderRadius={1}
              // bgcolor={green[300]}
              // paddingLeft={0.5}
            >
              <Typography
                color={"black"}
                fontSize={10}
                align="center"
                fontWeight={600}
                textAlign={"center"}
                alignItems="center"
              >
                <span style={{ color: "red", fontWeight: "bold" }}>SHL:</span>
                <span style={{ color: "blue" }}>
                  {masterTotalData.Total *
                    (autoCompleteValue.superhot_limit / 100)}
                </span>
              </Typography>
            </Stack>
            <Stack
              width={"100%"}
              flexDirection={"row"}
              flexWrap="wrap"
              alignItems={"center"}
              borderRadius={1}
              // bgcolor={green[300]}
            >
              {superhot &&
                superhot.map((sh, key) => {
                  console.log(sh);
                  return (
                    <>
                      <Typography
                        color={"red"}
                        fontSize={10}
                        align="center"
                        // bgcolor={'green'}
                        fontWeight={600}
                        // width="100%"
                        textAlign={"center"}
                        alignItems="center"
                        // display='flex'
                      >
                        {sh}&nbsp;
                      </Typography>
                    </>
                  );
                })}
              {hot &&
                hot.map((h, key) => {
                  console.log(h);
                  return (
                    <>
                      <Typography
                        color={"orange"}
                        fontSize={10}
                        align="center"
                        // bgcolor={'green'}
                        fontWeight={600}
                        // width="100%"
                        textAlign={"center"}
                        alignItems="center"
                        // display='flex'
                      >
                        {h}&nbsp;
                      </Typography>
                    </>
                  );
                })}
            </Stack>
          </Stack>

          <Stack
            display={"block"}
            // position={"initial"}
            // direction={"column"}
            alignItems={"center"}
            width={"45%"}
            maxHeight={400}
            minHeight={400}
            overflow={"auto"}
            // boxShadow={1}
            // borderBottom={1}
            // padding={1}
            // spacing={1}
            justifyContent={"center"}
          >
            {/* <TableContainer>
              <TableRow className={useStyles.tableRow}>
                <TableCell className={useStyles.tableCell}>67</TableCell>
                <TableCell>10000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>67</TableCell>
                <TableCell>1000000</TableCell>
              </TableRow>
            </TableContainer> */}
            {in_out === "In" &&
              (call.numbers.length // autocompleteCtrl === false
                ? call.numbers.map((cal, key) => {
                    console.log(cal.number);
                    // <Stack
                    //   width={"100%"}
                    //   alignItems={"center"}
                    //   bgcolor={"ActiveBorder"}
                    // >

                    return (
                      <Stack
                        // width={"100%"}
                        alignItems={"center"}
                        bgcolor={"white"}
                      >
                        <Box
                          alignItems={"center"}
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
                              // onDoubleClick={() => console.log("Double")}
                              onClick={(e) => mscallcrud(e, cal, key)}
                            >
                              <Typography
                                fontSize={8}
                                textAlign={"center"}
                                width={20}
                                // color={green[900]}
                              >
                                {key + 1}
                              </Typography>
                              <Delete
                                sx={{ textalign: "center" }}
                                fontSize="small"
                              />
                            </IconButton>
                          </BetListCom>
                        </Box>
                      </Stack>
                    );
                  })
                : // autocompleteCtrl &&
                  //   autoCompleteValue &&

                  mastercalls
                    .filter(
                      (ms, key) =>
                        ms[member]._id.toString() ==
                        autoCompleteValue._id.toString()
                    )
                    .map((cal, key) => {
                      console.log(cal);
                      return (
                        <Stack
                          position={"relative"}
                          bgcolor={`${key % 2 == 0 ? green[200] : "white"}`}
                          borderLeft={0.5}
                          borderRight={0.5}
                          justifyContent={"space-around"}
                          // component={"button"}
                          sx={{ cursor: "pointer" }}
                          // onDoubleClick={() => alert("double click")}
                          // onMouseOver={()=>{

                          // }}
                          onClick={(e) => {
                            doubleClick(e, cal, key);
                            // setMasterCallCrud({
                            //   id: cal._id,
                            //   numbers: cal.numbers,
                            // });
                            // setCallTotal(cal.totalAmount);
                            // setCallCount(cal.numbers.length);
                            // // console.log(cal.totalAmount)
                            // setAutoCompleteCtrl(true);
                            // // setDelButtCtl(true);
                            // setCrudOpen(true);
                          }}
                        >
                          {cal.numbers
                            .sort((a, b) => (b.amount > a.amount ? 1 : -1))
                            .map((ca, key) => {
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
                    .reverse())}

            {in_out === "Out" &&
              (call.numbers.length
                ? call.numbers
                    .sort((a, b) => (b.amount > a.amount ? 1 : -1))
                    .map((cuscall, key) => {
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
                          <BetListCom call={cuscall} key={key}></BetListCom>
                        </Stack>
                      );
                    })
                : masterOutCalls
                    .filter(
                      (mso, key) =>
                        cusval !== null &&
                        mso.customer._id.toString() === cusval._id.toString()
                    )
                    .map((cal, key) => {
                      return (
                        <Stack
                          bgcolor={`${key % 2 == 0 ? green[200] : ""}`}
                          borderLeft={0.5}
                          borderRight={0.5}
                          justifyContent={"space-around"}
                          // component={"button"}
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setMasterOutCallCrud({
                              id: cal._id,
                              numbers: cal.numbers,
                            });
                            setCallDetail({
                              ...callDetail,
                              callTotal: cal.totalAmount,
                            });
                            setAutoCompleteCtrl(true);
                            setCrudOutOpen(true);
                          }}
                        >
                          {cal.numbers
                            .sort((a, b) => (b.amount > a.amount ? 1 : -1))
                            .map((ca, key) => {
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
                            })
                            .sort()}
                        </Stack>
                      );
                    }))}
          </Stack>
          <Stack
            direction="column"
            // width={"30%"}

            // borderBottom={1}
            // padding={1}
            // justifyContent={"space-between"}
          >
            <Stack
              direction={"row"}
              justifyContent="center"
              bottom={0}
              // color={"red"}
              margin={0.5}
              fontSize={16}
              fontWeight={700}
              alignItems={"center"}
              spacing={1}
              // border={0.5}
            >
              <span style={{ color: "red", paddingLeft: 0.4 }}>
                {demoLager.extraNumb.length}
                {" / "}
                {demoLager.extraNumb
                  .map((n) => n.amount)
                  .reduce((n, p) => n + p, 0)}
              </span>
              {in_out == "Out" && customers.length && (
                <IconButton
                  onClick={handleMaxAdd}
                  onMouseOver={false}
                  sx={{
                    borderRadius: 1,
                    fontWeight: "bold",
                    fontSize: 12,
                    color: "white",
                    bgcolor: "red",
                    backgroundColor: "red",
                    "&:hover": { backgroundColor: "black" },
                  }}
                >
                  MaxAdd
                </IconButton>
              )}
            </Stack>
            <Stack
              alignItems={"center"}
              // width={"30%"}
              maxHeight={400}
              minHeight={400}
              overflow={"scroll"}
              boxShadow={1}
              bgcolor="white"
            >
              {demoLager &&
                demoLager.extraNumb
                  .sort((a, b) => (b.amount > a.amount ? 1 : -1))
                  .map((calc, key) => {
                    return (
                      <Stack
                        // component={"button"}
                        borderLeft={0.5}
                        borderRight={0.5}
                        // padding={1}
                        // direction={"row"}
                        // bgcolor="white"
                        justifyContent={"space-around"}
                      >
                        <BetListCom call={calc} key={key} color={"red"} />
                      </Stack>
                    );
                  })}
            </Stack>
          </Stack>
        </Stack>
      )}

      <ModalBox open={crudOpen} setOpen={setCrudOpen} setOnchange={setOnchange}>
        <Stack direction={"row"} justifyContent="space-around">
          <Typography fontWeight={"bold"} color={"blue"}>
            Total : {callDetail.callTotal}{" "}
          </Typography>
          <Typography fontWeight={"bold"} color={"blue"}>
            Count : {callDetail.callCount}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          // bgcolor={grey[300]}
          bgcolor={green[100]}
          padding={2}
          justifyContent={"center"}
        >
          {play && (
            <Stack
              direction={"row"}
              padding={2}
              spacing={1}
              width="80%"
              bgcolor={"white"}
              borderRadius={5}
            >
              <BetCom
                width={50}
                text={"number"}
                name="number"
                autoFocus={true}
                value={onchange.number}
                textColor={hot.includes(onchange.number) ? "red" : "blue"}
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
                {/* {masterTotalData.Data.map((num) => num.number).includes(
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
              )} */}
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
              {/* <IconButton onClick={updateCall} size={"small"}>
              <Edit fontSize="8" />
            </IconButton> */}
              {/* <Stack
            direction={"row"}
            // width="20%"
            bgcolor='red'
            justifyContent={"center"}
            padding={2}
          > */}
              <IconButton
                variant="contained"
                color="warning"
                onClick={updateCall}
                sx={{ borderRadius: "10px" }}
              >
                {onchange.amount.toString() === "0" ? (
                  <Delete fontSize="40px" />
                ) : (
                  <Edit fontSize="40px" />
                )}
              </IconButton>
            </Stack>
          )}
        </Stack>

        <Stack direction={"row"} justifyContent="center" bgcolor={green[100]}>
          <Stack
            border={0.1}
            width="80%"
            bgcolor={"white"}
            borderColor={grey[300]}
            borderRadius={1}
            overflow="scroll"
            maxHeight={"60vh"}
          >
            {mastercallcrud.numbers.map((calcrud, key) => {
              return (
                <BetListCom call={calcrud}>
                  {/* <Stack direction={"row"}> */}
                  {play && (
                    <IconButton
                      // color={'#ffcc80'}
                      size="small"
                      onClick={() => (play ? editHandle(calcrud, key) : null)}
                    >
                      <Edit fontSize={"6px"} />
                    </IconButton>
                  )}
                </BetListCom>
              );
            })}
          </Stack>
        </Stack>
        <Stack
          // bgcolor={grey[300]}
          bgcolor={green[100]}
          direction={"row"}
          justifyContent="space-around"
          spacing={2}
          padding={2}
        >
          <Button
            variant="contained"
            onClick={() => {
              setCrudOpen(false);
              setOnchange({ number: "", amount: "" });
            }}
            color={"info"}
            sx={{ borderRadius: "10px", textTransform: "none" }}
            endIcon={<Cancel />}
          >
            cancel
          </Button>
          {play && (
            <Button
              variant="contained"
              onClick={() => setComfirmCtl(true)}
              color="error"
              sx={{ borderRadius: "10px", textTransform: "none" }}
              endIcon={<Delete />}
            >
              Delete call
            </Button>
          )}
        </Stack>
      </ModalBox>

      <ModalBox
        open={crudOutOpen}
        setOpen={setCrudOutOpen}
        setOnchange={setOnchange}
      >
        <Stack direction={"row"} justifyContent="space-around">
          <Typography fontWeight={"bold"} color={"blue"}>
            Total : {callDetail.callTotal}{" "}
          </Typography>
          <Typography fontWeight={"bold"} color={"blue"}>
            Count : {callDetail.callCount}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          // bgcolor={grey[300]}
          bgcolor={green[100]}
          padding={2}
          justifyContent={"center"}
        >
          {play && (
            <Stack
              direction={"row"}
              padding={2}
              spacing={1}
              width="80%"
              bgcolor={"white"}
              borderRadius={5}
            >
              <BetCom
                width={50}
                text={"number"}
                name="number"
                autoFocus={true}
                value={onchange.number}
                textColor={hot.includes(onchange.number) ? "red" : "blue"}
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
                {/* {masterTotalData.Data.map((num) => num.number).includes(
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
              )} */}
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
              {/* <IconButton onClick={updateCall} size={"small"}>
              <Edit fontSize="8" />
            </IconButton> */}
              {/* <Stack
            direction={"row"}
            // width="20%"
            bgcolor='red'
            justifyContent={"center"}
            padding={2}
          > */}
              <IconButton
                variant="contained"
                color="warning"
                onClick={updateOutCall}
                sx={{ borderRadius: "10px" }}
              >
                {onchange.amount.toString() === "0" ? (
                  <Delete fontSize="40px" />
                ) : (
                  <Edit fontSize="40px" />
                )}
              </IconButton>
            </Stack>
          )}
        </Stack>

        <Stack direction={"row"} justifyContent="center" bgcolor={green[100]}>
          <Stack
            border={0.1}
            width="80%"
            bgcolor={"white"}
            borderColor={grey[300]}
            borderRadius={1}
            overflow="scroll"
            maxHeight={"60vh"}
          >
            {masteroutcallcrud.numbers.map((calcrud, key) => {
              return (
                <BetListCom call={calcrud}>
                  {/* <Stack direction={"row"}> */}
                  {play && (
                    <IconButton
                      // color={'#ffcc80'}
                      size="small"
                      onClick={() => editHandle(calcrud, key)}
                    >
                      <Edit fontSize={"6px"} />
                    </IconButton>
                  )}
                </BetListCom>
              );
            })}
          </Stack>
        </Stack>
        <Stack
          // bgcolor={grey[300]}
          bgcolor={green[100]}
          direction={"row"}
          justifyContent="space-around"
          spacing={2}
          padding={2}
        >
          <Button
            variant="contained"
            onClick={() => {
              setCrudOutOpen(false);
              setOnchange({ number: "", amount: "" });
            }}
            color={"info"}
            sx={{ borderRadius: "10px", textTransform: "none" }}
            endIcon={<Cancel />}
          >
            cancel
          </Button>
          {play && (
            <Button
              variant="contained"
              onClick={() => setComfirmCtl(true)}
              color="error"
              sx={{ borderRadius: "10px", textTransform: "none" }}
              endIcon={<Delete />}
            >
              Delete call
            </Button>
          )}
        </Stack>
      </ModalBox>

      <ModalBox open={confirmCtl} setOpen={setComfirmCtl}>
        <Typography
          padding={1}
          textAlign={"center"}
          fontWeight={700}
          letterSpacing={0.8}
        >
          Do you want to <span style={{ color: "red" }}>DELETE</span> your call
          ?
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          margin={1}
        >
          <Button
            sx={{
              textTransform: "inherit",
              letterSpacing: 0.8,
              fontWeight: 700,
            }}
            variant={"contained"}
            size={"small"}
            onClick={() => setComfirmCtl(false)}
            color={"success"}
          >
            Cancel
          </Button>
          <Button
            variant={"contained"}
            size={"small"}
            color={"error"}
            sx={{
              textTransform: "inherit",
              letterSpacing: 0.8,
              fontWeight: 700,
            }}
            onClick={() => {
              if (mastercallcrud.id) {
                mastercallDelete(mastercallcrud.id);
              }
              if (masteroutcallcrud.id) {
                masteroutcallDelete(masteroutcallcrud.id);
              }
            }}
          >
            Ok
          </Button>
        </Stack>
      </ModalBox>
      <Dialog open={maxAddhandle}>
        <DialogContent>
          <Stack spacing={1}>
            <Typography color={"Red"}>
              Do you want to sent {cusval && cusval.name.toString()}? Export
              Text File
            </Typography>
            <FormControl sx={{ minWidth: 120, maxWidth: 140 }} size="small">
              <InputLabel id="demo-select-small">Customers</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={cusval}
                label={"Customers"}
                onChange={(e) => OnSelect(e)}
              >
                {[...customers].map((c) => (
                  <MenuItem sx={{ width: 200 }} value={c}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            size="small"
            sx={{
              bgcolor: "red",
              "&:hover": { backgroundColor: red[200] },
              fontWeight: "bold",
            }}
            onClick={() => setMaxAddhandle(false)}
          >
            <span style={{ color: "white", textTransform: "none" }}>
              Cancel
            </span>
          </Button>
          <Button
            size="small"
            onClick={sentMaxAdd}
            sx={{
              bgcolor: lightGreen["900"],
              "&:hover": { backgroundColor: lightGreen[300] },
              fontWeight: "bold",
            }}
          >
            <span style={{ color: "white", textTransform: "none" }}>Send</span>
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default BetPage;
