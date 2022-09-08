import { TextField, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LagerCom from "../../components/LagerCom";
import LagerTable from "../../components/LagerTable";
import Axios from "../../shared/Axios";

function createObj(row, col) {
  return { number: row.toString() + col.toString(), amount: "0" };
}

const lagerData = Array.prototype.concat.apply(
  [],
  Array.from(Array(10), (_, x) => x).map((row) => {
    return Array.from(Array(10), (_, x) => x).map((col) => {
      return createObj(row, col);
    });
  })
);

const Lager = () => {
  const { lotteryId } = useParams();
  const [demoLager, setDemolager] = useState(lagerData);
  //CutLagerFunction
  const sentLagerBreak = (e) => {
    console.log(e.target.value);
  };

  //getLager
  Axios.get(`/lagers/${lotteryId}/out`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  })
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((err) => console.log(err));
  return (
    <Stack padding={1}>
      <Stack margin={1} flexDirection={"row"} flexWrap={"wrap"}>
        <TextField
          size="small"
          variant={"outlined"}
          label={"Break"}
          onChange={(e) => sentLagerBreak(e)}
        />
      </Stack>
      <Stack margin={1}>
        <Typography textalign={"center"} margin={0.5}>
          In Lager
        </Typography>
        {/* <LagerCom addField={false} /> */}
        <LagerTable />
      </Stack>
    </Stack>
  );
};

export default Lager;
