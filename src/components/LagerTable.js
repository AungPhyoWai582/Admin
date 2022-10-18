import { Height } from "@mui/icons-material";
import { Stack, Table, TableCell, TableRow, Typography } from "@mui/material";
import { grey, red, blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useState } from "react";

// function createObj(row, col) {
//   return { number: col.toString() + row.toString(), amount: "0" };
// }
// const lagerData = Array.prototype.concat.apply(
//   [],
//   Array.from(Array(10), (_, x) => x).map((row) => {
//     return Array.from(Array(10), (_, x) => x).map((col) => {
//       return createObj(row, col);
//     });
//   })
// );
const LagerTable = ({ demo, hot }) => {
  console.log(hot, demo);

  return (
    <Stack margin={1}>
      <Stack
        padding={1}
        alignItems="center"
        direction={"row"}
        justifyContent="space-between"
      >
        <Typography fontWeight={"bold"} color={red[500]} textAlign={"center"}>
          Total Cash : {demo ? demo.totalAmount : "0"}
        </Typography>

        <>
          {" "}
          <Typography fontWeight={"bold"} color={red[500]} textAlign={"center"}>
            Count : {demo.numbers ? demo.numbers.length.toString() : "0"}
          </Typography>
          <Typography
            fontWeight={"bold"}
            color={`${demo.average > 27 ? "black" : "red"}`}
            textAlign={"center"}
          >
            Average : {demo.average ? demo.average : "0"} %
          </Typography>
        </>
      </Stack>
      <Stack direction={"column"} bgcolor={"white"}>
        <Table
          sx={{
            border: 2,
            borderColor: grey[300],
            // height: "500vh",
            overflow: "scroll",
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
                        <Typography
                          width={20}
                          color={`${
                            hot.map((h) => h).includes(num.toString())
                              ? "red"
                              : "black"
                          }`}
                        >
                          {num.toString().length === 1 ? "0" + num : num}
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
                        <Typography
                          width={{ xs: 40, sm: 60, md: 80 }}
                          color={`${
                            demo.numbers.map(
                              (d) =>
                                Number(d.amount) >= Number(demo.originalBreak)
                            )
                              ? "red"
                              : "black"
                          }`}
                        >
                          {demo.numbers
                            .map((lag) => lag.number)
                            .includes(
                              num.toString().length === 1
                                ? "0" + num.toString()
                                : num.toString()
                            )
                            ? demo.numbers[
                                demo.numbers.findIndex((obj) =>
                                  (obj.number == num.toString().length) === 1
                                    ? "0" + num.toString()
                                    : num.toString()
                                )
                              ].amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
      </Stack>
    </Stack>
  );
};

export default LagerTable;
