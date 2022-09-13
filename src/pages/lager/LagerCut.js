import {
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Box,
  Table,
  TableBody,
} from "@mui/material";
import { green, grey, teal } from "@mui/material/colors";
import { tab } from "@testing-library/user-event/dist/tab";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../shared/Axios";

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
        setLager(res.data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  let lagNumbers;
  if (lager.in) {
    lagNumbers = [...lager.in.numbers];
  }
  console.log(lagNumbers);

  console.log(lagerData);

  const lagNumsComponent = (
    <Stack>
      <table style={tableStyles}>
        {/* <tablebody style={{width:'100%'}}> */}
        {Array.from(Array(10), (_, x) => x).map((col) => (
          <tr style={tableStyles}>
            {Array.from(Array(10), (_, x) => x).map((row) => (
              <td style={tableStyles}>
                <Stack direction={"row"} spacing={1} justifyContent={"space-around"}>
                  <Typography fontSize={14} fontWeight='bold'>55</Typography>
                  <Typography fontSize={14} fontWeight='bold'>100000</Typography>
                </Stack>
              </td>
            ))}
          </tr>
        ))}
        {/* </tablebody> */}
      </table>
      {/* {Array.from(Array(10), (_, x) => x).map((col) => (
        <Stack direction={"column"} bgcolor='blue'>
          <Stack
            direction={"row"}
            // spacing={1}
            // width={'100%'}
            bgcolor='yellow'
          >
            {Array.from(Array(10), (_, x) => x).map((row) => (
            
            <Stack width={500} direction={"row"} spacing={1} padding={1} border={0.1} borderColor={teal[300]} bgcolor='red'>
                <div fontSize={12}>89</div>
                <div fontSize={12}>{row+col}</div>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))} */}
    </Stack>
  );

  //   const lagNumsComponent = (
  //       <Stack flexDirection={"row"} flexWrap="wrap">
  //         <Stack
  //           overflow={"scroll"}
  //           flex={1}
  //           flexDirection="column"
  //           flexWrap={"wrap"}
  //           height={{ xs: 550, sm: 550, md: 550, xl: "100%" }}
  //           justifyContent={"space-between"}
  //         >
  //           {lagerData.map((lag) => (
  //             <TableRow sx={{ borderBottom: "0.5px solid black" }}>
  //               <TableCell
  //                 sx={{
  //                   borderLeft: "0.5px solid black",
  //                   borderRight: "0.5px solid black",
  //                 }}
  //               >
  //                 {<span style={{ textAlign: "left" }}>{lag.number}</span>}
  //               </TableCell>
  //               <TableCell>{lag.amount}</TableCell>
  //             </TableRow>
  //           ))}
  //         </Stack>
  //       </Stack>
  //   );
  return (
    <Stack padding={1} direction="row" bgcolor={teal[300]}>
      <Stack width={"70%"}>
        <Stack direction={"row"}>
          <Button>view</Button>
          <Button>view</Button>
        </Stack>
        <Stack bgcolor={"white"} overflow="scroll">
          {lagNumsComponent}
        </Stack>
      </Stack>
      <Stack width={"30%"}>For Right Side</Stack>
    </Stack>
  );
};

export default LagerCut;
