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
} from "@mui/material";
import { blue, green, grey, red, teal } from "@mui/material/colors";
import { tab } from "@testing-library/user-event/dist/tab";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../shared/Axios";
import { useMediaQuery } from "@mui/material";

function createObj(row, col) {
  return { number: col.toString() + row.toString(), amount: "0" };
}

const lagerData = Array.prototype.concat.apply(
  [],
  Array.from(Array(10), (_, x) => x).map((row) => {
    return Array.from(Array(10), (_, x) => x).map((col) => {
      return createObj(row, col);
    });
  })
);

const LagerCut = () => {
  const { lotteryId } = useParams();
  const [lager, setLager] = useState({});
  const [viewLager, setViewLager] = useState([]);
  const [breakPercent, setBreakPercent] = useState(0);

  const tableStyles = {
    border: "1px solid black",
    borderColor: grey[300],
    borderCollapse: "collapse",
  };

  useEffect(() => {
    Axios.get(`/lagers/${lotteryId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        const lag = res.data.data;
        if (lag) {
          setLager(lag);
          setViewLager(lag.in.numbers);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  // const onChangeHandler = (e) => console.log(e.target.value);

  const setBreak = () => {
    console.log(breakPercent);
    const lagers = [...viewLager];
    lagers.map(
      (lag) => (lag.amount = Number(breakPercent * (lag.amount / 100)))
    );
    setViewLager(lagers);
  };

  console.log(viewLager);

  const lagNumsComponent = (
    <Table sx={{ border: 2, borderColor: grey[300] }} size="small">
      {viewLager &&
        Array.from(Array(10), (_, x) => x).map((col) => {
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
                        {viewLager
                          .map((lag) => lag.number)
                          .includes(row.toString() + col.toString())
                          ? viewLager[
                              viewLager.findIndex(
                                (obj) =>
                                  obj.number == row.toString() + col.toString()
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
                      <Typography width={100}>
                        {viewLager
                          .map((lag) => lag.number)
                          .includes(row.toString() + col.toString())
                          ? viewLager[
                              viewLager.findIndex(
                                (obj) =>
                                  obj.number == row.toString() + col.toString()
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
  );
  return (
    <Stack
      padding={1}
      direction={"column"}
      // sx={{ xs: { direction: "column", sm: { direction: "column" } } }}
      // bgcolor={grey[300]}
    >
      {/* {useMediaQuery("(max-width:500px)") && <Typography>Heeo</Typography>} */}
      <Stack
        // width={"30%"}
        padding={1}
        alignItems="center"
        // border={1}
        margin="auto"
        spacing={1}
        direction={"row"}
      >
        <TextField
          label="Break %"
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
          variant="outlined"
          onClick={setBreak}
        >
          Set
        </Button>
        <Button size="small" color="primary" variant="outlined">
          Copy
        </Button>
        <Button size="small" color="success" variant="outlined">
          Save
        </Button>
      </Stack>
      <Stack>
        <Stack direction={"row"}>
          <Button>Main</Button>
          <Button>Out</Button>
        </Stack>
        <Stack
          border={0.5}
          borderColor={grey[500]}
          boxShadow={1}
          direction={"column"}
          bgcolor={"white"}
          overflow="scroll"
        >
          {lagNumsComponent}
        </Stack>
        <Stack
          padding={1}
          alignItems="center"
          direction={"row"}
          justifyContent="space-between"
        >
          <Typography fontWeight={"bold"} color={red[500]} textAlign={"center"}>
            Total Cash : 100000
          </Typography>
          <Typography fontWeight={"bold"} color={red[500]} textAlign={"center"}>
            Total Units: 1000
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LagerCut;
