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
} from "@mui/material";
import React from "react";

import { blue, green, grey, red, teal } from "@mui/material/colors";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Axios from "../../shared/Axios";
import { SaveAlt } from "@mui/icons-material";
import ModalBox from "../../components/modal/ModalBox";
import BetListCom from "../../components/BetListCom";

const LagerCut = () => {
  //lager Cut Mod CTL
  const [lagModCtl, setLagModCtl] = useState(false);

  const { lotteryId } = useParams();
  const [lager, setLager] = useState({});
  const [cutLag, setCutLag] = useState({
    customer: "",
    breakPercent: 0,
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
  const [useEffCtrl, setUseEffCtrl] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");

  // const [customerValue, setCustomerValue] = useState(customers[0]._id);

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
      console.log(res.data);
      setCustomers(res.data);
      setCustomer(res.data[0]._id)
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
          setViewLager({
            ...viewLager,
            numbers: lag.in.numbers,
            totalAmount: lag.in.totalAmount,
          });
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


  console.log(customer);
  const setBreak = () => {
    setLagModCtl(true);
    console.log(breakPercent);
    const numbers = [...lager.in.numbers];
    const Tamount = lager.in.totalAmount;
    console.log(numbers, Tamount);
    const data = numbers.map((num) => {
      return {
        number: num.number,
        amount: (num.amount - breakPercent).toString(),
      };
    });
    const breakData = numbers.map((na, key) => {
      if (Number(na.amount) >= Number(breakPercent)) {
        return {
          number: na.number,
          amount: breakPercent,
        };
      }
      if (Number(na.amount) < Number(breakPercent)) {
        return {
          number: na.number,
          amount: na.amount,
        };
      }
    });
    console.log(breakData);
    const total = breakData
      .map((num) => Number(num.amount))
      .reduce((pre, next) => pre + next, 0);
    console.log(numbers);
    console.log(data, total);
    // setViewLager({ ...viewLager, numbers: breakData, totalAmount: total });
    setCutLag({
      ...cutLag,
      numbers: breakData,
      breakPercent: breakPercent,
      cutAmount: total,
      mainAmount: lager.in.totalAmount,
    });
  };


  const saveCut = () => {
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
        setBreakPercent(0);
        setUseEffCtrl(true);
      })
      .catch((err) => console.log(err));
  };
  console.log(customers);

  return (
    <>
      <Stack
        padding={1}
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
          spacing={1}
          direction={"row"}
        >
          <TextField
            label="Break"
            color={"success"}
            variant="outlined"
            size="small"
            name="break"
            sx={{ bgcolor: teal[50] }}
            value={breakPercent}
            onChange={(e) => setBreakPercent(e.target.value)}
          />

          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={setBreak}
          >
            Set
          </Button>
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
                                // width: "10px",
                                border: 0.1,
                                borderColor: grey[300],
                                borderCollapse: "collapse",
                              }}
                            >
                              <Typography width={20}>
                                {num.toString().length === 1 ? "0" + num : num}
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
                                border: 0.1,
                                color: blue[500],
                                borderColor: grey[300],
                                borderCollapse: "collapse",
                              }}
                            >
                              <Typography width={{ xs: 40, sm: 60, md: 80 }}>
                                {viewLager.numbers
                                  .map((lag) => lag.number)
                                  .includes(
                                    num.toString().length === 1
                                      ? "0" + num.toString()
                                      : num.toString()
                                  )
                                  ? viewLager.numbers[
                                      viewLager.numbers.findIndex((obj) =>
                                        (obj.number ==
                                          num.toString().length) ===
                                        1
                                          ? "0" + num.toString()
                                          : num.toString()
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
              onChange={
                (e) => setCustomer(e.target.value)
                // setCutLag(...cutLag, { bra })
              }
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
            <Typography>{cutLag ? cutLag.breakPercent : "0"}</Typography>
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
            direction="row"
            alignItems={"center"}
          >
            <Typography>Count :</Typography>
            <Typography>
              {cutLag ? cutLag.numbers.length.toString() : "0"}
            </Typography>
          </Stack>

          <Stack
            spacing={1.5}
            padding={1}
            direction="column"
            alignItems={"right"}
            minWidth="50%"
            maxWidth={"70%"}
          >
            <Typography>Numbers :</Typography>
            <Stack
              bgcolor="white"
              justifyContent={{
                sx: "space-between",
                sm: "space-around",
                md: "space-around",
              }}
              height={"50vh"}
              overflow="scroll"
            >
              {cutLag.numbers.map((ca, key) => (
                <BetListCom call={ca} key={key} />
              ))}
            </Stack>
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
            <Button variant="contained" size="small" color="primary" onClick={saveCut}>
              save
            </Button>
          </Stack>
        </Stack>
      </ModalBox>
    </>
  );
};

export default LagerCut;
