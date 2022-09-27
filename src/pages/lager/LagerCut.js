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
  const { lotteryId } = useParams();
  const [lager, setLager] = useState({});
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
  const [customer, setCustomer] = useState({ id: "", name: "" });

  const [value, setValue] = useState("main");

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

  // const onChangeHandler = (e) => console.log(e.target.value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "main") {
      setCustomer("");
      setViewLager({
        ...viewLager,
        numbers: lager.in.numbers,
        totalAmount: lager.in.totalAmount,
      });
    }
    if (newValue === "out") {
      setViewLager({
        ...viewLager,
        numbers: lager.out.numbers,
        totalAmount: lager.out.totalAmount,
      });
    }
  };

  // const onSelect = (e) => {
  //   const { value } = e.target;
  //   console.log(value);
  //   setCustomer(value);
  //   if (value === "All") {
  //     console.log(lager.out.numbers);
  //     setViewLager({
  //       ...viewLager,
  //       numbers: lager.out.numbers,
  //       totalAmount: lager.out.totalAmount,
  //     });
  //   } else {
  //     const view = outList.find((out) => out.customer === value.toString());
  //     setViewLager({
  //       ...viewLager,
  //       break: view.breakPercent,
  //       mainAmount: view.mainAmount,
  //       numbers: view.numbers,
  //       totalAmount: view.totalAmount,
  //     });
  //   }
  // };

  console.log(customer);
  const setBreak = () => {
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
    const total =
      Number(Tamount) -
      data
        .map((num) => Number(num.amount))
        .reduce((pre, next) => pre + next, 0);
    console.log(numbers);
    console.log(data, total);
    setViewLager({ ...viewLager, numbers: data, totalAmount: total });
  };

  const saveCut = () => {
    let obj = {
      customer: customer.id,
      breakPercent: breakPercent,
      mainAmount: lager.in.totalAmount,
      numbers: viewLager.numbers,
    };
    console.log(obj);
    // Axios.post(`/outcall/${lotteryId}`, obj, {
    //   headers: {
    //     authorization: `Bearer ` + localStorage.getItem("access-token"),
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //     setCustomer("");
    //     setBreakPercent(0);
    //     setUseEffCtrl(true);
    //   })
    //   .catch((err) => console.log(err));
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
          <Stack direction={"row"}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="main" label="Main" />
              <Tab value="out" label="Out Lists" />
            </Tabs>
            {/* <FormControl size="small"> */}

            {/* </FormControl> */}
          </Stack>
          <Stack>
            {value === "main" && (
              <Stack
                // width={"30%"}
                padding={1}
                alignItems="center"
                // border={1}
                // margin="auto"
                spacing={1}
                direction={"row"}
              >
                <FormControlLabel
                  label={"Customer : "}
                  labelPlacement="start"
                  // sx={{ width: "100%" }}
                  control={
                    <Select
                      sx={{ width: 150, height: 30, backgroundColor: teal[50] }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={customer.name}
                      defaultValue={"All"}
                      onChange={(e) =>
                        console.log(e.target.value, e.target.name)
                      }
                    >
                      {customers.map((c) => (
                        <MenuItem value={c._id} name={c.name}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                />
                <Button size="small" color="primary" variant="outlined">
                  Copy
                </Button>
                <Button
                  size="small"
                  color="success"
                  variant="contained"
                  onClick={saveCut}
                >
                  Save <SaveAlt fontSize="10px" />
                </Button>
                <Typography>Numbers : {viewLager.numbers.length}</Typography>
              </Stack>
            )}
            {value === "out" && (
              <Stack
                // width={"30%"}
                // fullWidth
                padding={1}
                alignItems="center"
                // border={1}
                // margin="auto"
                // justifyContent={"space-around"}
                spacing={1}
                direction={"row"}
              >
                <FormControlLabel
                  label={"Customer : "}
                  labelPlacement="start"
                  // sx={{ width: "100%" }}
                  control={
                    <Select
                      sx={{ width: 150, height: 30, backgroundColor: teal[50] }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={customer}
                      defaultValue={"All"}
                      // onChange={onSelect}
                    >
                      {customers.map((c) => (
                        <MenuItem value={c._id}>{c.name}</MenuItem>
                      ))}
                    </Select>
                  }
                />
                <Button size="small" color="primary" variant="outlined">
                  Copy
                </Button>

                <Typography>Numbers : {viewLager.numbers.length}</Typography>
              </Stack>
            )}
          </Stack>
          <Stack
            border={0.5}
            borderColor={grey[500]}
            boxShadow={1}
            direction={"column"}
            bgcolor={"white"}
            overflow="scroll"
          >
            {viewLager.numbers && (
              <Table sx={{ border: 2, borderColor: grey[300] }} size="small">
                {Array.from(Array(10), (_, x) => x).map((col) => {
                  return (
                    <TableRow
                      style={{ height: 10 }}
                      sx={{
                        height: 50,
                        border: 0.1,
                        borderColor: grey[300],
                        borderCollapse: "collapse",
                      }}
                    >
                      {Array.from(Array(10), (_, x) => x).map((row) => {
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
                                {viewLager.numbers
                                  .map((lag) => lag.number)
                                  .includes(row.toString() + col.toString())
                                  ? viewLager.numbers[
                                      viewLager.numbers.findIndex(
                                        (obj) =>
                                          obj.number ==
                                          row.toString() + col.toString()
                                      )
                                    ].number
                                  : row.toString() + col.toString()}
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
                                  .includes(row.toString() + col.toString())
                                  ? viewLager.numbers[
                                      viewLager.numbers.findIndex(
                                        (obj) =>
                                          obj.number ==
                                          row.toString() + col.toString()
                                      )
                                    ].amount
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
            {value === "out" && (
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
            )}
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
      <ModalBox open={false}>
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
              value={customer.name}
              defaultValue={"All"}
              onChange={(e) =>
                setCustomer({ id: e.target.value, name: e.target.name })
              }
            >
              {customers.map((c) => (
                <MenuItem value={c._id} name={c.name}>
                  {c.name}
                </MenuItem>
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
            <Typography>10</Typography>
          </Stack>
          <Stack
            spacing={1.5}
            padding={1}
            direction="row"
            alignItems={"center"}
          >
            <Typography>Total :</Typography>
            <Typography>1000</Typography>
          </Stack>
          <Stack
            spacing={1.5}
            padding={1}
            direction="row"
            alignItems={"center"}
          >
            <Typography>Count :</Typography>
            <Typography>100</Typography>
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
              {viewLager.numbers.map((ca, key) => (
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
            >
              cancel
            </Button>
            <Button variant="contained" size="small" color="primary">
              save
            </Button>
          </Stack>
        </Stack>
      </ModalBox>
    </>
  );
};

export default LagerCut;
