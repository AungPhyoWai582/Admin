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
} from "./Betsign";
import LagerTable from "../../components/LagerTable";
import {
  calculateHotTee,
  catchHotLimit,
  catchHotLimitFromFunc,
  SortingAmount,
} from "./BetPage.method";
import ModalBox from "../../components/modal/ModalBox";
import { ClassNames } from "@emotion/react";
import LagerCut from "../lager/LagerCut";
import Clock from "../../components/Clocks";
import { winNumberCount } from "../../shared/ExportTxt";

const BetPage = () => {
  // For input refs
  const textFieldForNumber = useRef(null);
  const textFieldForAmount = useRef(null);

  const [inOutCtl, setInOutCtl] = useState(false);
  const [play, setPlay] = useState(false);

  //masterapi ctl
  const [mastercallAPIctl, setMastercallAPI] = useState(false);
  const [extraCtl, setExtraCtl] = useState(false);
  const [callTotal, setCallTotal] = useState(0);
  const [callCount, setCallCount] = useState(0);
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
  });
  const [outCalls, setOutCalls] = useState({
    customer: "",
    hotLimit: 0,
    superHotLimit: 0,
    numbers: [],
  });
  // const [callList, setCallList] = useState([]);

  const [masters, setMasters] = useState([]);

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
  // in outt
  const [in_out, set_in_out] = useState("In");
  const [customers, setCustomers] = useState([]);
  const [cusval, setCusval] = useState();
  const [singleCusCall, setSingleCusCall] = useState({
    Lagnumbers: "",
    Total: [],
  });

  useEffect(() => {
    Axios.get(`/lotterys/${lotteryId}`)
      .then((res) => {
        console.log(res.data.lottery);
        const { hot_tee, play } = res.data.lottery;
        setHot(hot_tee.toString().split("/"));
        setPlay(play);
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
      Axios.get(`/masters`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      })

        .then((res) => {
          if (masters) {
            const masters = res.data.data;
            setMasters([...masters]);
            console.log(masters);
            // setCalllistctrl(false);
            if (masters) {
              setAutoCompleteValue(masters[0]);
            }
            console.log(autoCompleteValue);
          }
        })
        .catch((err) => console.log(err));
    }
    if (in_out === "Out") {
      Axios.get(`customers`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        setCustomers(res.data);
        setCusval(res.data[0]);
      });

      setInOutCtl(false);
    }
    // setHotNumbers( calculateHotTee(JSON.parse(localStorage.getItem('user-info')),hot_tees,lager.in.numbers,lager.in.totalAmount))
  }, [inOutCtl === true]);
  console.log(demoLager.extraNumb);
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

  console.log(mastercalls);

  console.log(autoCompleteValue);

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

    if (onchange.number.length === 1 && onchange.amount.length > 2) {
      if (onchange.number[0] === "k" || onchange.number[0] === "K") {
        const R = k(onchange);
        let hotLimit;
        let hotTotal;
        let remainHotNumbers = [];
        R.map((a) => {
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
                remain: hotLimitCalculate.remain,
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

        setCall({
          ...call,
          numbers: [
            ...call.numbers,
            ...(remainHotNumbers.length
              ? R.filter(
                  (a) =>
                    !remainHotNumbers
                      .map((rhn) => rhn.number.toString())
                      .includes(a.number.toString())
                )
              : R),
          ],
        });

        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[0] === "p" || onchange.number[0] === "P") {
        const P = p(onchange);
        let hotLimit;
        let hotTotal;
        let remainHotNumbers = [];
        P.map((a) => {
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
        });
        if (remainHotNumbers.length !== 0) {
          alert(
            ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
              (h) => `${h.number}:${h.remain}`
            )}`
          );
        }

        setCall({
          ...call,
          numbers: [
            ...call.numbers,
            ...(remainHotNumbers.length
              ? P.filter(
                  (a) =>
                    !remainHotNumbers
                      .map((rhn) => rhn.number.toString())
                      .includes(a.number.toString())
                )
              : P),
          ],
        });
        // setCall({ ...call, numbers: [...call.numbers, ...P] });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[0] === "b" || onchange.number[0] === "B") {
        const B = b(onchange);
        let hotLimit;
        let hotTotal;
        let remainHotNumbers = [];
        B.map((a) => {
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
        });
        if (remainHotNumbers.length !== 0) {
          alert(
            ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
              (h) => `${h.number}:${h.remain}`
            )}`
          );
        }

        setCall({
          ...call,
          numbers: [
            ...call.numbers,
            ...(remainHotNumbers.length
              ? B.filter(
                  (a) =>
                    !remainHotNumbers
                      .map((rhn) => rhn.number.toString())
                      .includes(a.number.toString())
                )
              : B),
          ],
        });
        // setCall({ ...call, numbers: [...call.numbers, ...B] });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[0] === "b" || onchange.number[0] === "B") {
        const B = b(onchange);
        let hotLimit;
        let hotTotal;
        let remainHotNumbers = [];
        B.map((a) => {
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
        });
        if (remainHotNumbers.length !== 0) {
          alert(
            ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
              (h) => `${h.number}:${h.remain}`
            )}`
          );
        }

        setCall({
          ...call,
          numbers: [
            ...call.numbers,
            ...(remainHotNumbers.length
              ? B.filter(
                  (a) =>
                    !remainHotNumbers
                      .map((rhn) => rhn.number.toString())
                      .includes(a.number.toString())
                )
              : B),
          ],
        });
        // setCall({ ...call, numbers: [...call.numbers, ...B] });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else {
        setBeterrorcontrol(true);
      }
    } else if (onchange.number.length === 2) {
      if (onchange.number.startsWith("*")) {
        if (onchange.number.endsWith("*") && onchange.amount.length > 2) {
          const apu = startStar(onchange);
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? apu.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : apu),
            ],
          });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          FPate.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? FPate.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : FPate),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...FPate] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          SPU.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? SPU.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : SPU),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...SPU] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          (onchange.number.endsWith("S") || onchange.number.endsWith("s")) &&
          onchange.amount.length > 2
        ) {
          const SS = ss(onchange);
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          SS.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? SS.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : SS),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...SS] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          (onchange.number.endsWith("M") || onchange.number.endsWith("m")) &&
          onchange.amount.length > 2
        ) {
          const SM = sonema(onchange);
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          SM.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? SM.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : SM),
            ],
          });
          // console.log(MS);
          // setCall({ ...call, numbers: [...call.numbers, ...SM] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          MPU.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? MPU.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : MPU),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...MPU] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          (onchange.number.endsWith("S") || onchange.number.endsWith("s")) &&
          onchange.amount.length > 2
        ) {
          const MS = masone(onchange);
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          MS.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? MS.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : MS),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...MS] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          (onchange.number.endsWith("M") || onchange.number.endsWith("m")) &&
          onchange.amount.length > 2
        ) {
          const SM = sonema(onchange);
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          SM.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? SM.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : SM),
            ],
          });
          // console.log(MS);
          // setCall({ ...call, numbers: [...call.numbers, ...SM] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          BPate.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? BPate.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : BPate),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...BPate] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("-") &&
          onchange.amount.length > 2
        ) {
          const AP = aper(onchange);
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          AP.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? AP.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : AP),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...AP] });
          setOnchange({ number: "", amount: onchange.amount });
          setAutoCompleteCtrl(false);
        } else if (
          onchange.number.endsWith("/") &&
          onchange.amount.length > 2
        ) {
          const BR = Breaks(onchange);
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          BR.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? BR.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : BR),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...BR] });
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
          // talone-chin
          // FPate.map((a) => {
          // if(hot.includes(a.number)){

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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          R.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? R.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : R),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...R] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          PDT.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? PDT.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : PDT),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...PDT] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          PDT.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? PDT.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : PDT),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...PDT] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          PDT.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? PDT.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : PDT),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...PDT] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          PDT.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? PDT.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : PDT),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...PDT] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          PDT.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? PDT.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : PDT),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...PDT] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          PDT.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? PDT.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : PDT),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...PDT] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          PDT.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? PDT.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : PDT),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...PDT] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          PDT.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? PDT.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : PDT),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...PDT] });
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
          let hotLimit;
          let hotTotal;
          let remainHotNumbers = [];
          PDT.map((a) => {
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
          });
          if (remainHotNumbers.length !== 0) {
            alert(
              ` LIMIT OVER! \n hot limit : ${hotLimit}\n hot total : ${hotTotal} \n remain bet : ${remainHotNumbers.map(
                (h) => `${h.number}:${h.remain}`
              )}`
            );
          }

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(remainHotNumbers.length
                ? PDT.filter(
                    (a) =>
                      !remainHotNumbers
                        .map((rhn) => rhn.number.toString())
                        .includes(a.number.toString())
                  )
                : PDT),
            ],
          });
          // setCall({ ...call, numbers: [...call.numbers, ...PDT] });
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
      Axios.post(
        `/call/${lotteryId}`,
        { master: autoCompleteValue._id, numbers: call.numbers },
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

  const [value, setValue] = React.useState(masters);
  const [inputValue, setInputValue] = React.useState("");
  //DoubleClick
  const doubleClick = (e, cal, key) => {
    console.log(e.detail, cal, key);
    switch (e.detail) {
      case 1:
        {
          console.log(cal);
          setCallTotal(cal.totalAmount);
          setCallCount(cal.numbers.length);
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
        justifyContent={"center"}
        boxShadow={1}
      >
        <Stack direction={"row"}>
          {/* <Stack
            // justifyContent={"start"}
            alignItems={"start"}
            display={{ xs: "none", md: "block", sm: "block" }}
            paddingX={{ xs: 1, sm: 1, md: 2 }}
          >
            <Clock />
          </Stack> */}
          <Stack>
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
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          {(in_out === "In" && (
            <Autocomplete
              size="small"
              options={masters}
              sx={{ width: 150 }}
              getOptionLabel={(cus) => `${cus.username}`}
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
                  label={`${
                    autoCompleteValue ? autoCompleteValue.username : "Agent"
                  }`}
                  size="small"
                  color={"success"}
                  // defaultValue={autoCompleteValue}
                />
              )}
            />
          )) ||
            (in_out === "Out" && (
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Customers</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  // value={cusval}
                  label={"Customers"}
                  onChange={(e) => OnSelect(e)}
                >
                  {customers.map((c) => (
                    <MenuItem sx={{ width: 200 }} value={c}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            spacing={1}
            flexDirection={"column"}
            flexWrap={"wrap"}
            padding={1}
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
                fontSize={13}
                align="center"
                fontWeight={600}
                textAlign={"center"}
                alignItems="center"
              >
                Hot Limit :
              </Typography>
              <Typography
                // width="100%"
                textAlign={"center"}
                alignItems="center"
                fontSize={12}
                fontWeight={"bold"}
                color={"blue"}
              >
                {(masterTotalData.Total * autoCompleteValue.hot_limit) / 100}
              </Typography>
            </Stack>
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
                fontSize={13}
                align="center"
                fontWeight={600}
                textAlign={"center"}
                alignItems="center"
              >
                Super Hot :
              </Typography>
              <Typography
                // width="100%"
                textAlign={"center"}
                alignItems="center"
                fontSize={12}
                fontWeight={"bold"}
                color={"blue"}
              >
                {masterTotalData.Total *
                  (autoCompleteValue.superhot_limit / 100)}
              </Typography>
            </Stack>
            <Stack
              width={"100%"}
              flexDirection={"row"}
              flexWrap="wrap"
              alignItems={"center"}
              borderRadius={1}
              bgcolor={green[300]}
            >
              {hot &&
                hot.map((h, key) => {
                  console.log(h);
                  return (
                    // <Stack
                    //   width={"100%"}
                    //   flexDirection={"row"}
                    //   flexWrap="wrap"
                    //   alignItems={"center"}
                    //   borderRadius={1}
                    //   bgcolor={green[300]}
                    //   paddingLeft={0.5}
                    // >
                    <>
                      <Typography
                        color={"red"}
                        fontSize={14}
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
                      {/* <Typography
                    // width="100%"
                    textAlign={"center"}
                    alignItems="center"
                    fontSize={10}
                    fontWeight={"bold"}
                    color={h.amount == 0 ? "red" : 'blue'}
                  >
                    +
                    {h.amount}
                  </Typography> */}
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
                ? call.numbers

                    .map((cal, key) => (
                      // <Stack
                      //   width={"100%"}
                      //   alignItems={"center"}
                      //   bgcolor={"ActiveBorder"}
                      // >

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
                    ))
                    .reverse()
                : // autocompleteCtrl &&
                  //   autoCompleteValue &&

                  mastercalls
                    .filter(
                      (ms, key) =>
                        ms.master._id.toString() ==
                        autoCompleteValue._id.toString()
                    )
                    .map((cal, key) => {
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

            {in_out === "Out" && call.numbers.length
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
                          setCallTotal(cal.totalAmount);
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
                  })}
          </Stack>
          <Stack
            direction="column"
            // width={"30%"}

            // borderBottom={1}
            // padding={1}
            // justifyContent={"space-between"}
          >
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
            <Stack
              direction={"row"}
              justifyContent="center"
              bottom={0}
              // color={"red"}
              margin={0.5}
              fontSize={16}
              fontWeight={700}
              // border={0.5}
            >
              <span style={{ color: "red", paddingLeft: 0.4 }}>
                {demoLager.extraNumb.length}
                {" / "}
                {demoLager.extraNumb
                  .map((n) => n.amount)
                  .reduce((n, p) => n + p, 0)}
              </span>{" "}
            </Stack>
          </Stack>
        </Stack>
      )}
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
          <span style={{ color: "red" }}>Call Total</span> : {callTotal}
        </Typography>
        <Typography fontWeight={900} fontSize={14}>
          <span style={{ color: "red" }}>Count</span> : {callCount}
        </Typography>
        <Typography fontWeight={900} fontSize={14}>
          <span style={{ color: "red" }}>Net Total</span> :{" "}
          {masterTotalData !== null ? masterTotalData.Total.toString() : "0"}
        </Typography>
      </Stack>

      <ModalBox open={crudOpen} setOpen={setCrudOpen} setOnchange={setOnchange}>
        <Stack direction={"row"} justifyContent="space-around">
          <Typography fontWeight={"bold"} color={"blue"}>
            Total : {callTotal}{" "}
          </Typography>
          <Typography fontWeight={"bold"} color={"blue"}>
            Count : {callCount}
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
            Total : {callTotal}{" "}
          </Typography>
          <Typography fontWeight={"bold"} color={"blue"}>
            Count : {callCount}
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
    </Stack>
  );
};

export default BetPage;
