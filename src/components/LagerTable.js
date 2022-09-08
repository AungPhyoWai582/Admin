import { Height } from "@mui/icons-material";
import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

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
const LagerTable = () => {
  const [dataLag, setDataLag] = useState(lagerData);
  return (
    <Stack margin={1}>
      <Stack flexDirection={"column"}>
        <Stack flexDirection={"row"} flexBasis={300} margin={1} flexShrink={1}>
          {dataLag &&
            dataLag.map((dlag, key) => {
              return (
                <Stack
                  direction={"row"}
                  spacing={{ xs: 3, sm: 3, md: 5, xl: 5 }}
                >
                  <Typography color={"red"}>{dlag.number}</Typography>
                  <Typography color={"red"}>{dlag.amount}</Typography>
                </Stack>
              );
            })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LagerTable;
