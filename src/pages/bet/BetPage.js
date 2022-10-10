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
import { calculateHotTee } from "./BetPage.method";

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

  const [lager, setLager] = useState({});
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
  const hot = hot_tees.split("/");
  const [hotNumbers, setHotNumbers] = useState();
  // console.log(hot);
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
  // in outt
  const [in_out, set_in_out] = useState("Out");
  const [customers, setCustomers] = useState([]);
  const [cusval, setCusval] = useState("");
  const [singleCusCall, setSingleCusCall] = useState({
    Lagnumbers: "",
    Total: [],
  });

  useEffect(() => {
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
            setAutoCompleteValue(masters[0]);
            setCalllistctrl(false);
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
      });
    }

    // setHotNumbers( calculateHotTee(JSON.parse(localStorage.getItem('user-info')),hot_tees,lager.in.numbers,lager.in.totalAmount))
  }, [inOutCtl]);

  useEffect(() => {
    Axios.get(`/lagers/${lotteryId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        const lager = res.data.data;
        if (lager) {
          setLager(lager);
        }
        // setCallList(res.data.data.in.read);
        // setSuccess(false);
      })
      .catch((err) => console.log(err));

    if (in_out === "In") {
      Axios.get(`/call/${lotteryId}`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        setMastercalls(res.data.data);
      });

      Axios.get(
        `/call/${lotteryId}/call-numbers-total/${autoCompleteValue._id}`,
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("access-token"),
          },
        }
      ).then((res) => {
        console.log(res.data);

        setMasterTotalData({
          Data: res.data.numsData,
          Total: res.data.numsTotal,
        });
      });
      console.log(autoCompleteValue);
      // setHotNumbers(
      //   calculateHotTee(
      //     autoCompleteValue,
      //     hot_tees,
      //     masterTotalData.Data,
      //     masterTotalData.Total
      //   )
      // );
      // setAutoCompleteCtrl(false);
    }
    if (in_out === "Out") {
      Axios.get(`/outcall/${lotteryId}`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        setOutCalls(res.data.data);

        setInOutCtl(false);
        // setCalllistctrl(false);
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
    // setInOutCtl(false);
    setCalllistctrl(false);
    setAutoCompleteCtrl(false);
    // setCalllistctrl(false);
  }, [calllistctrl, autocompleteCtrl]);

  console.log(masterTotalData);

  // out Customer select
  const OnSelect = (e) => {
    const { value } = e.target;

    setCusval(value);
    setInOutCtl(true);
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
    console.log(onchange);
  };

  const choice = (e) => {
    e.preventDefault();
    // const hotRemain = calculateHotTee(onchange,hot,autoCompleteValue,masterTotalData);

    if (onchange.number.length === 1 && onchange.amount.length > 2) {
      if (onchange.number[0] === "k" || onchange.number[0] === "K") {
        const R = k(onchange);
        let checkHot;
        R.map((a) => {
          if (hot.includes(a.number)) {
            if (
              !masterTotalData.Data.includes(a.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                }`
              );
              checkHot = true;
            } else if (
              masterTotalData.Data.includes(a.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) -
                  masterTotalData[
                    masterTotalData.Data.findIndex(
                      (obj) => obj.number == a.number
                    )
                  ].amount
                }`
              );
              checkHot = true;
            }
          }
        });

        setCall({
          ...call,
          numbers: [
            ...call.numbers,
            ...(checkHot ? R.filter((a) => !hot.includes(a.number)) : R),
          ],
        });
        // setCall({ ...call, numbers: [...call.numbers, ...R] });

        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[0] === "p" || onchange.number[0] === "P") {
        const P = p(onchange);
        let checkHot;
        P.map((a) => {
          if (hot.includes(a.number)) {
            if (
              !masterTotalData.Data.includes(a.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot  amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                }`
              );
              checkHot = true;
            } else if (
              masterTotalData.Data.includes(a.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) -
                  masterTotalData[
                    masterTotalData.Data.findIndex(
                      (obj) => obj.number == a.number
                    )
                  ].amount
                }`
              );
              checkHot = true;
            }
          }
        });

        setCall({
          ...call,
          numbers: [
            ...call.numbers,
            ...(checkHot ? P.filter((a) => !hot.includes(a.number)) : P),
          ],
        });
        // setCall({ ...call, numbers: [...call.numbers, ...P] });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[0] === "b" || onchange.number[0] === "B") {
        const B = b(onchange);
        let checkHot;
        B.map((a) => {
          if (hot.includes(a.number)) {
            if (
              !masterTotalData.Data.includes(a.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                }`
              );
              checkHot = true;
            } else if (
              masterTotalData.Data.includes(a.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) -
                  masterTotalData[
                    masterTotalData.Data.findIndex(
                      (obj) => obj.number == a.number
                    )
                  ].amount
                }`
              );
              checkHot = true;
            }
          }
        });

        setCall({
          ...call,
          numbers: [
            ...call.numbers,
            ...(checkHot ? B.filter((a) => !hot.includes(a.number)) : B),
          ],
        });
        // setCall({ ...call, numbers: [...call.numbers, ...B] });
        setOnchange({ number: "", amount: onchange.amount });
        setAutoCompleteCtrl(false);
      } else if (onchange.number[0] === "b" || onchange.number[0] === "B") {
        const B = b(onchange);
        let checkHot;
        B.map((a) => {
          if (hot.includes(a.number)) {
            if (
              !masterTotalData.Data.includes(a.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                }`
              );
              checkHot = true;
            } else if (
              masterTotalData.Data.includes(a.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) -
                  masterTotalData[
                    masterTotalData.Data.findIndex(
                      (obj) => obj.number == a.number
                    )
                  ].amount
                }`
              );
              checkHot = true;
            }
          }
        });

        setCall({
          ...call,
          numbers: [
            ...call.numbers,
            ...(checkHot ? B.filter((a) => !hot.includes(a.number)) : B),
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
          let checkHot;
          apu.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? apu.filter((a) => !hot.includes(a.number)) : apu),
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
          let checkHot;
          FPate.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });
          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot
                ? FPate.filter((a) => !hot.includes(a.number))
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
          let checkHot;
          SPU.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });
          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? SPU.filter((a) => !hot.includes(a.number)) : SPU),
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
          let checkHot;
          SS.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });
          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? SS.filter((a) => !hot.includes(a.number)) : SS),
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
          let checkHot;
          SM.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? SM.filter((a) => !hot.includes(a.number)) : SM),
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
          let checkHot;
          MPU.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? MPU.filter((a) => !hot.includes(a.number)) : MPU),
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
          let checkHot;
          MS.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });
          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? MS.filter((a) => !hot.includes(a.number)) : MS),
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
          let checkHot;
          SM.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });
          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? SM.filter((a) => !hot.includes(a.number)) : SM),
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
          let checkHot;
          BPate.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot
                ? BPate.filter((a) => !hot.includes(a.number))
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
          let checkHot;
          AP.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? AP.filter((a) => !hot.includes(a.number)) : AP),
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
          let checkHot;
          BR.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? BR.filter((a) => !hot.includes(a.number)) : BR),
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
          // FPate.map((a) => {
          // if(hot.includes(a.number)){

          if (hot.includes(onchange.number)) {
            if (
              !masterTotalData.Data.includes(onchange.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                }`
              );
              // checkHot = true;
              return;
            } else if (
              masterTotalData.Data.includes(onchange.number) &&
              !(
                masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                onchange.amount
              )
            ) {
              alert(
                `remain hot amount : ${
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) -
                  masterTotalData[
                    masterTotalData.Data.findIndex(
                      (obj) => obj.number == onchange.number
                    )
                  ].amount
                }`
              );
              // checkHot = true;
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
          let checkHot;
          R.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? R.filter((a) => !hot.includes(a.number)) : R),
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
          let checkHot;
          PDT.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? PDT.filter((a) => !hot.includes(a.number)) : PDT),
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
          let checkHot;
          PDT.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? PDT.filter((a) => !hot.includes(a.number)) : PDT),
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
          let checkHot;
          PDT.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? PDT.filter((a) => !hot.includes(a.number)) : PDT),
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
          let checkHot;
          PDT.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? PDT.filter((a) => !hot.includes(a.number)) : PDT),
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
          let checkHot;
          PDT.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? PDT.filter((a) => !hot.includes(a.number)) : PDT),
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
          let checkHot;
          PDT.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? PDT.filter((a) => !hot.includes(a.number)) : PDT),
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
          let checkHot;
          PDT.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? PDT.filter((a) => !hot.includes(a.number)) : PDT),
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
          let checkHot;
          PDT.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? PDT.filter((a) => !hot.includes(a.number)) : PDT),
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
          let checkHot;
          PDT.map((a) => {
            if (hot.includes(a.number)) {
              if (
                !masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total * (autoCompleteValue.hot_limit / 100)
                  }`
                );
                checkHot = true;
              } else if (
                masterTotalData.Data.includes(a.number) &&
                !(
                  masterTotalData.Total * (autoCompleteValue.hot_limit / 100) >=
                  onchange.amount
                )
              ) {
                alert(
                  `remain hot amount : ${
                    masterTotalData.Total *
                      (autoCompleteValue.hot_limit / 100) -
                    masterTotalData[
                      masterTotalData.Data.findIndex(
                        (obj) => obj.number == a.number
                      )
                    ].amount
                  }`
                );
                checkHot = true;
              }
            }
          });

          setCall({
            ...call,
            numbers: [
              ...call.numbers,
              ...(checkHot ? PDT.filter((a) => !hot.includes(a.number)) : PDT),
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

  const handleFiles = (e) => {
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

  const bet = (e, in_out) => {
    e.preventDefault();

    if (call.numbers.length === 0 && loading === false && in_out === "Out") {
      setBeterrorcontrol(true);
      return;
    }

    if (in_out === "In") {
      Axios.post(`/call/${lotteryId}`, call, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
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
          setCalllistctrl(true);
          setCalltotalCtrl(true);
          setAutoCompleteCtrl(true);
        })
        .then((res) => {
          setSuccess(false);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  //crud delete
  const mscallcrud = (cal, key) => {
    const afterDelete = call.numbers.filter((arr, key1) => key1 !== key);
    setCall({ ...call, numbers: afterDelete });
    // setAutoCompleteCtrl(false);
  };

  const editHandle = (cal, key) => {
    // console.log(key);
    setEditCtlBtn(true);
    setOnchange({
      number: cal.number,
      amount: cal.amount,
    });
  };

  //editReading
  const updateCall = () => {
    // console.log(onchange);
    // console.log(mastercallcrud);
    const numbers = [...mastercallcrud.numbers];
    const index = numbers.findIndex((obj) => obj.number == onchange.number);

    numbers[index] = onchange;

    setMasterCallCrud({ ...mastercallcrud, numbers: numbers });
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
      setMasterCallCrud({ id: "", numbers: [] });
      setEditCtlBtn(false);
    });
  };

  const setBreak = () => {
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
    setCallDemo(extraArray);
    // setDemolager(callDemo);
    setLagerOpen(false);
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
        <Stack direction={"row"} spacing={1}>
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
                // setCalllistctrl(true);
                setAutoCompleteCtrl(true);
                // setCall({ master: value._id, numbers: [] });
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
                labelPlacement="start"
                sx={{ marginX: 1 }}
                control={
                  <Select
                    sx={{
                      padding: 0.8,
                      width: 150,
                      height: 30,
                      backgroundColor: teal[50],
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={cusval}
                    defaultValue={"All"}
                    onChange={(e) => OnSelect(e)}
                  >
                    {customers.map((c) => (
                      <MenuItem sx={{ width: 200 }} value={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                }
              />
            ))}
          {in_out === "In" && (
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
          )}
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
        <Stack alignItems={"center"} alignContent={"center"}>
          {editCtlBtn ? (
            <IconButton onClick={updateCall} size={"small"}>
              <Edit fontSize="8" />
            </IconButton>
          ) : (
            <IconButton
              onClick={(e) => bet(e, in_out)}
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
              {(masterTotalData.Total * autoCompleteValue.superhot_limit) / 100}
            </Typography>
          </Stack>
          <Stack
            width={"100%"}
            flexDirection={"row"}
            flexWrap="wrap"
            alignItems={"center"}
            // borderRadius={1}
            // bgcolor={green[300]}
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
          {in_out === "In" && call.numbers.length // autocompleteCtrl === false
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
            : // autocompleteCtrl &&
              //   autoCompleteValue &&

              mastercalls
                .filter(
                  (ms, key) =>
                    ms.master._id.toString() == call.master.toString()
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
                        setMasterCallCrud({
                          id: cal._id,
                          numbers: cal.numbers,
                        });
                        setCallTotal(cal.totalAmount);
                        setAutoCompleteCtrl(true);
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
          {in_out === "Out" &&
            singleCusCall.Lagnumbers &&
            singleCusCall.Lagnumbers.map((cuscall, key) => {
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
            })}
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
