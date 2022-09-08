import { Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { Children, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "../shared/Axios";

const LagerCom = ({ addField }) => {
  const { lotteryId } = useParams();
  // const location = useLocation();
  // const { _date } = location.state;
  // const date = new Date(_date);

  const [LagerIn, setLagerIn] = useState();
  const [inData, setInData] = useState([]);
  useEffect(() => {
    Axios.get(`/lagers/${lotteryId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      setLagerIn(res.data.data);
    });
  }, []);

  //LagerBreak
  const [lagerBreak, setLagerBreak] = useState();
  console.log(inData);
  return (
    <Stack width={"100%"}>
      {addField && (
        <Stack direction={"row"} padding={1}>
          <TextField
            color={"success"}
            variant={"outlined"}
            size={"small"}
            label={"Break"}
            sx={{ width: 100 }}
            onChange={(e) => setLagerBreak(e.target.value)}
          />
        </Stack>
      )}
      {/* <LagerCom lagerin={LagerIn ? LagerIn.in : []} /> */}
      {LagerIn && (
        <table
          style={{
            tableLayout: "auto",
            paddingInline: 2,
            // display: "-ms-grid",
            border: "5px solid black",
            padding: 1,
          }}
        >
          <tbody style={{ padding: 1, margin: "auto" }}>
            {Array.from(Array(10), (_, x) => x).map((row, r) => {
              return (
                <tr>
                  {Array.from(Array(10), (_, x) => x).map((col, c) => {
                    // console.log(())
                    let amount;
                    console.log(
                      LagerIn.in.numbers
                        .map((l) => l.number)
                        .indexOf(`${row}${col}`)
                    );

                    LagerIn.in.numbers.some(
                      (ln) => ln.number === `${col}${row}`
                    )
                      ? (amount =
                          LagerIn.in.numbers[
                            LagerIn.in.numbers
                              .map((l) => l.number)
                              .indexOf(`${col}${row}`)
                          ].amount)
                      : (amount = 0);

                    return (
                      <>
                        <td>
                          <Stack
                            display={"flex"}
                            flexDirection={"row"}
                            margin={1}
                          >
                            <Typography
                              width={20}
                              fontWeight={600}
                              textAlign={"center"}
                            >
                              {col}
                              {row}
                            </Typography>

                            <Typography
                              fontSize={14}
                              color={"InfoText"}
                              display={"flex-end"}
                              flexWrap={"wrap"}
                              textAlign={"right"}
                              margin={"auto"}
                              width={{ md: 70, sm: 30 }}
                            >
                              {amount}
                            </Typography>
                          </Stack>
                        </td>
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Stack>
  );
};

export default LagerCom;
