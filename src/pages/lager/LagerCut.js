import {
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Box,
  Table,
  TableBody,
  Autocomplete,
  TextField,
  FormControlLabel,
  Tabs,
  Tab,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  FormGroup,
  Checkbox,
  IconButton,
} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { blue, green, grey, red, teal } from "@mui/material/colors";

import { useState, useEffect } from "react";
import { Navigate, NavLink, useLocation, useParams } from "react-router-dom";

import Axios from "../../shared/Axios";
// import { CheckBox, SaveAlt } from "@mui/icons-material";
import ModalBox from "../../components/modal/ModalBox";
import BetListCom from "../../components/BetListCom";
import { LoadingButton } from "@mui/lab";
import { exportTextFile } from "../../shared/ExportTxt";
import { FileUpload, Star } from "@mui/icons-material";

const LagerCut = () => {
  //
  const location = useLocation();
  const extraTotal = location.state.extraArray
    .map((am, key) => Number(am.amount))
    .reduce((n, p) => n + p, 0);

  // % and cash control
  const [perandcashCtl, setPerandcashCtl] = useState(false);
  //lager Cut Mod CTL
  const [lagModCtl, setLagModCtl] = useState(false);

  const { lotteryId } = useParams();
  const [lager, setLager] = useState({});
  const [cutLag, setCutLag] = useState({
    customer: "",
    breakPercent: 0,
    breakAmount: 0,
    mainAmount: 0,
    cutAmount: 0,
    numbers: [],
  });
  const [viewLager, setViewLager] = useState({
    numbers: [],
    totalAmount: 0,
    mainAmount: null,
    break: null,
  });
  const [outList, setOutList] = useState([]);
  const [breakPercent, setBreakPercent] = useState(0);
  const [lagerID, setLagerID] = useState();
  const [useEffCtrl, setUseEffCtrl] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(false);

  // const [customerValue, setCustomerValue] = useState(customers[0]._id);
  const userinfocom = JSON.parse(localStorage.getItem(`user-info`));
  //win lose condition function
  const winLoseCondition = (lager, userinfocom) => {
    const comm = userinfocom.commission;
    const za = userinfocom.twoDZ;
    const lagNum = lager.numbers;
    const total = lager.totalAmount - (comm / 100) * lager.totalAmount;
    // console.log(lager, comm, lagNum, total);
    var count = 0;
    lagNum &&
      lagNum.map((num, key) => {
        // console.log(num);
        let Numamount = num.amount;
        if (Number(Numamount) > Number(total - Numamount * za)) {
          // console.log("om");
          count++;
        }
      });
    // console.log(count);
    return count;
  };
  // console.log(extra);
  const tableStyles = {
    border: "1px solid black",
    borderColor: grey[300],
    borderCollapse: "collapse",
  };

  useEffect(() => {
    Axios.get(`/customers`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      setCustomers(res.data.data);
      setCustomer(res.data.data[0]._id);
    });
    Axios.get(`/lagers/${lotteryId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        const lag = res.data.data;
        console.log(lag);
        if (lag) {
          setLager(lag);
          setLagerID(lag._id);

          setViewLager({
            ...viewLager,
            numbers: lag.numbers,

            totalAmount: lag.totalAmount,
          });
          if (perandcashCtl) {
            setBreakPercent(lag.originalBreak);
          }
          setUseEffCtrl(false);
        }
      })
      .catch((err) => console.log(err.message));

    Axios.get(`/outcall/${lotteryId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      setOutList(res.data.data);
      // const customers = res.data.data.map((d) => {
      //   return { name: d.customer.name, value: d.customer._id };
      // });
      // setCustomers([{ name: "All", value: "All" }, ...customers]);
    });
  }, [useEffCtrl]);
  console.log(outList);
  console.log(lagerID);

  console.log(customer);
  const setBreak = () => {
    if (perandcashCtl) {
      console.log("Origin");
      console.log(
        breakPercent,
        lager._id,
        localStorage.getItem("access-token")
      );
      Axios.put(
        `/lagers/${lager._id}`,
        { originalBreak: breakPercent },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access-token"),
          },
        }
      )
        .then((res) => {
          console.log(res.data);
          setUseEffCtrl(true);
          // setInOutCtl(true);
        })
        .catch((err) => console.log(err.message));
      // setInOutCtl(true);
      // Axios.put(
      //   `/lagers/${lagerID}`,
      //   {
      //     headers: {
      //       authorization: "Bearer " + localStorage.getItem("access-token"),
      //     },
      //   },
      //   { originalBreak: breakPercent }
      // )
      //   .then((res) => console.log(res.data))
      //   .catch((err) => console.log(err));
      // const data = numbers.map((num) => {
      //   return {
      //     number: num.number,
      //     amount: (num.amount - breakPercent).toString(),
      //   };
      // });
      // const breakData = numbers.map((na, key) => {
      //   if (Number(na.amount) >= Number(breakPercent)) {
      //     return {
      //       number: na.number,
      //       amount: breakPercent,
      //     };
      //   }
      //   if (Number(na.amount) < Number(breakPercent)) {
      //     return {
      //       number: na.number,
      //       amount: na.amount,
      //     };
      //   }
      // });
      // console.log(breakData);
      // const total = breakData
      //   .map((num) => Number(num.amount))
      //   .reduce((pre, next) => pre + next, 0);
      // console.log(numbers);
      // // console.log(data, total);
      // // setViewLager({ ...viewLager, numbers: breakData, totalAmount: total });
      // setCutLag({
      //   ...cutLag,
      //   numbers: breakData.filter((bd) => bd.amount !== "0"),
      //   breakPercent: breakPercent,
      //   cutAmount: total,
      //   mainAmount: lager.totalAmount,
      // });
    } else if (!perandcashCtl) {
      console.log("%");
      setLagModCtl(true);
      console.log(breakPercent);
      const breakPer = Math.round(
        (Number(breakPercent) / Number(lager.originalBreak)) * 100
      );

      const numbers = [...lager.numbers];
      const Tamount = lager.totalAmount;
      console.log(numbers, Tamount, breakPer);
      const data = numbers
        // .sort((a, b) => (b.amount > a.amount ? 1 : -1))
        // .filter((n) => n.amount > lager.originalBreak)
        .map((num) => {
          return {
            number: num.number,
            amount:
              Math.round((Number(num.amount) * Number(breakPer / 100)) / 100) *
              100,
            // amount: Math.round(7549 / 100) * 100,
          };
        });
      const total = data
        .map((num) => Number(num.amount))
        .reduce((pre, next) => pre + next, 0);
      setCutLag({
        ...cutLag,
        numbers: data.filter((bd) => bd.amount !== "0"),
        breakPercent: breakPer.toString(),
        breakAmount: breakPercent,
        cutAmount: total,
        mainAmount: lager.totalAmount,
      });
    }
  };

  const saveCut = () => {
    setLoading(true);
    let obj = {
      customer: customer,
      breakPercent: cutLag.breakPercent,
      mainAmount: cutLag.mainAmount,
      numbers: cutLag.numbers,
    };
    console.log(obj);
    Axios.post(`/outcall/${lotteryId}`, obj, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setCustomer("");
        // setBreakPercent(0);
        setUseEffCtrl(true);
        setLoading(false);
        setLagModCtl(false);
      })
      .catch((err) => console.log(err));
    Axios.put(
      `/lagers/${lager._id}`,
      { originalBreak: lager.originalBreak - cutLag.breakAmount },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setUseEffCtrl(true);
        // setInOutCtl(true);
      })
      .catch((err) => console.log(err.message));
  };
  console.log(cutLag);

  return (
    <>
      <Stack
        padding={1}
        // margin={1}
        direction={"column"}
        // sx={{ xs: { direction: "column", sm: { direction: "column" } } }}
        // bgcolor={grey[300]}
      >
        {/* {useMediaQuery("(max-width:500px)") && <Typography>Heeo</Typography>} */}

        <Stack
          // width={"30%"}
          // padding={1}
          // alignItems="center"
          // border={1}
          // margin="auto"
          // margin={1}
          spacing={1}
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"}>
            <Checkbox
              size="small"
              color="success"
              onChange={() => {
                setPerandcashCtl(!perandcashCtl);
                perandcashCtl
                  ? setBreakPercent("0")
                  : setBreakPercent(lager.originalBreak);
              }}
            />
            <TextField
              label={`${perandcashCtl ? "Origin" : "Break"}`}
              color={"success"}
              variant="outlined"
              size="small"
              name="break"
              sx={{ bgcolor: teal[50], width: 100 }}
              value={breakPercent}
              onChange={(e) => setBreakPercent(e.target.value)}
            />
            <Stack alignItems={"center"} direction={"row"} marginX={0.5}>
              <IconButton
                size="small"
                onClick={setBreak}
                color={"success"}
                sx={{ bgcolor: green[400], borderRadius: 4 }}
                // disabled={`${
                //   lager &&
                //   lager.numbers.map(
                //     (am) => Number(am.amount) >= Number(lager.originalBreak)
                //   ) &&
                //   perandcashCtl
                //     ? true
                //     : false
                // }`}
              >
                <FileUpload fontSize="small" />
              </IconButton>
            </Stack>

            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography
                fontSize={14}
                color={"royalblue"}
                textAlign={"center"}
              >
                ORG {lager.originalBreak ? lager.originalBreak.toString() : "0"}
              </Typography>
              <Typography
                fontSize={14}
                color={"royalblue"}
                textAlign={"center"}
              >
                AVG{" "}
                {lager.originalBreak && extraTotal
                  ? Math.round(
                      (lager.totalAmount - extraTotal) / lager.originalBreak
                    ) + "%"
                  : "0"}
              </Typography>
              <Typography
                fontSize={14}
                color={"royalblue"}
                textAlign={"center"}
              >
                <span style={{ color: "green" }}>
                  {100 - winLoseCondition(lager, userinfocom)}
                </span>
                <br />
                <span style={{ color: "red" }}>
                  {winLoseCondition(lager, userinfocom)}
                </span>
              </Typography>
            </Stack>
          </Stack>

          <Stack
            right={"100%"}
            alignItems={"end"}
            paddingRight={1}
            justifyContent={"flex-end"}
          >
            <NavLink
              to={`/lottery/bet/${lotteryId}`}
              state={{
                lotteryId: lotteryId,
                // hot_tees: h.toString(),
              }}
            >
              <IconButton
                size="small"
                sx={{ color: "black" }}
                // disabled={l.play === true ? true : false}
              >
                <ArrowForwardIcon fontSize={"large"} />
              </IconButton>
            </NavLink>
          </Stack>
        </Stack>
        <Stack>
          <Stack
            border={0.5}
            borderRadius={1}
            borderColor={grey[500]}
            boxShadow={1}
            direction={"column"}
            bgcolor={"white"}
            overflow={"scroll"}
          >
            {viewLager.numbers && (
              <Table
                sx={{
                  border: 2,
                  borderColor: grey[300],
                  // height: "500vh",
                }}
                size="small"
              >
                {Array.from(Array(25), (_, x) => x).map((col, upperkey) => {
                  return (
                    <TableRow
                      style={{ height: 10 }}
                      sx={{
                        direction: "column",
                        height: 50,
                        border: 0.1,
                        borderColor: grey[300],
                        borderCollapse: "collapse",
                      }}
                    >
                      {Array.from(Array(4), (_, x) => x).map((row, key) => {
                        let num = row * 25 + col;

                        return (
                          <>
                            <TableCell
                              align="left"
                              sx={{
                                // width: "8px",
                                border: 0.3,
                                borderColor: "black",
                                borderCollapse: "collapse",
                              }}
                            >
                              <Typography>
                                {num.toString().length === 1
                                  ? "0" + num
                                  : num.toString()}
                                {/* {num} */}
                                {/* {viewLager.numbers
                                  .map((lag) => lag.number)
                                  .includes(col.toString() + row.toString())
                                  ? viewLager.numbers[
                                      viewLager.numbers.findIndex(
                                        (obj) =>
                                          obj.number ==
                                          row.toString() + col.toString()
                                      )
                                    ].number
                                  : col.toString() + row.toString()} */}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                // width: "500px",
                                border: 0.3,
                                color: blue[500],
                                borderColor: "black",
                                borderCollapse: "collapse",
                              }}
                            >
                              <Typography
                                width={{ xs: 40, sm: 60, md: 80 }}
                                sx={{
                                  color:
                                    Number(
                                      viewLager.numbers
                                        .map((lag) => lag.number)
                                        .includes(
                                          num.toString().length === 1
                                            ? "0" + num
                                            : num.toString()
                                        )
                                        ? viewLager.numbers[
                                            viewLager.numbers.findIndex(
                                              (obj) =>
                                                obj.number.toString() ===
                                                (num.toString().length == 1
                                                  ? "0" + num
                                                  : num.toString()
                                                ).toString()
                                            )
                                          ].amount
                                        : "0"
                                    ) > lager.originalBreak
                                      ? "red"
                                      : "blue",
                                }}
                              >
                                {viewLager.numbers
                                  .map((lag) => lag.number)
                                  .includes(
                                    num.toString().length === 1
                                      ? "0" + num
                                      : num.toString()
                                  )
                                  ? viewLager.numbers[
                                      viewLager.numbers.findIndex(
                                        (obj) =>
                                          obj.number.toString() ===
                                          (num.toString().length == 1
                                            ? "0" + num
                                            : num.toString()
                                          ).toString()
                                      )
                                    ].amount.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )
                                  : "0"}
                              </Typography>
                            </TableCell>
                          </>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </Table>
            )}
          </Stack>
          <Stack
            padding={1}
            alignItems="center"
            direction={"row"}
            justifyContent="space-between"
          >
            <Typography
              fontWeight={"bold"}
              color={red[500]}
              textAlign={"center"}
            >
              Total Cash : {viewLager.totalAmount}
            </Typography>
            {/* {value === "out" && (
              <>
                {" "}
                <Typography
                  fontWeight={"bold"}
                  color={red[500]}
                  textAlign={"center"}
                >
                  Break % : {viewLager.break ? viewLager.break : 0}
                </Typography>
                <Typography
                  fontWeight={"bold"}
                  color={red[500]}
                  textAlign={"center"}
                >
                  Main Cash : {viewLager.mainAmount ? viewLager.mainAmount : 0}
                </Typography>
              </>
            )} */}
            <Typography
              fontWeight={"bold"}
              color={red[500]}
              textAlign={"center"}
            >
              Total Units: soon
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ModalBox open={lagModCtl}>
        <Stack bgcolor={teal[100]} padding={1}>
          <Stack
            spacing={1.5}
            padding={1}
            direction="row"
            alignItems={"center"}
          >
            <Typography>customer :</Typography>
            {/* <FormControlLabel
              label={"Customer : "}
              labelPlacement="start"
              sx={{ width: "100%" }}
              control={ */}
            <Select
              sx={{ width: 100, height: 30, backgroundColor: teal[50] }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name={customer.name}
              value={customer.name}
              defaultValue={"All"}
              onChange={(e) => {
                // setCustomer(e.target.value);
                setCutLag({ ...cutLag, customer: e.target.value });
              }}
            >
              {customers.map((c) => (
                <MenuItem value={c._id}>{c.name}</MenuItem>
              ))}
            </Select>
            {/* } */}
            {/* /> */}
          </Stack>
          <Stack
            spacing={1.5}
            padding={1}
            direction="row"
            alignItems={"center"}
          >
            <Typography>Break :</Typography>
            <Typography>{cutLag ? cutLag.breakPercent + "%" : "0"}</Typography>
          </Stack>
          <Stack
            spacing={1.5}
            padding={1}
            direction="row"
            alignItems={"center"}
          >
            <Typography>Total :</Typography>
            <Typography>{cutLag ? cutLag.cutAmount : "0"}</Typography>
          </Stack>

          <Stack
            spacing={1.5}
            padding={1}
            direction="column"
            alignItems={"right"}
            minWidth="50%"
            maxWidth={"70%"}
          >
            <Typography>
              Numbers : {cutLag ? cutLag.numbers.length.toString() : "0"}
            </Typography>
            <Box
              bgcolor="white"
              // paddingTop={1}
              justifyContent={{
                sx: "space-between",
                sm: "space-around",
                md: "space-around",
              }}
              height={"50vh"}
              overflow="scroll"
            >
              {cutLag.numbers
                .sort((a, b) => (b.amount > a.amount ? 1 : -1))
                .map((ca, key) => (
                  <BetListCom call={ca} key={key} />
                ))}
            </Box>
          </Stack>
          <Stack
            spacing={1.5}
            padding={1}
            direction="row"
            justifyContent={"end"}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{ bgcolor: "white" }}
              color="success"
              onClick={() => setLagModCtl(false)}
            >
              cancel
            </Button>
            <Button
              variant={"contained"}
              size="small"
              // sx={{ bgcolor: "white" }}
              color={"primary"}
              onClick={() => exportTextFile(cutLag)}
            >
              PDF
            </Button>
            <LoadingButton
              variant="contained"
              size="small"
              loading={loading}
              color="success"
              onClick={saveCut}
            >
              save
            </LoadingButton>
            {/* <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={saveCut}
              startIcon={<CircularProgress sx={{fontSize:'small'}} color="success" />}
            >
              save
            </Button> */}
          </Stack>
        </Stack>
      </ModalBox>
    </>
  );
};

export default LagerCut;
