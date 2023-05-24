import React, { useEffect, useState } from "react";
import {
  RemoveRedEye,
  Search,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  TableBody,
  TableRow,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { useLocation, NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";

const DailyMembers = () => {
  const location = useLocation();
  const {date} = location.state;

  // const { lager, read } = location.state;
  // console.log(lager);
  const [memberReport, setMemberReport] = useState([]);

  useEffect(() => {
    Axios.get(`/reports/daily/members?date=${date}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data);
      setMemberReport(res.data.report);
    });
  }, []);

  return (
    <Stack>
      <Typography paddingLeft={1} fontWeight='bold' >{date}</Typography>
      <TableContainer component={Paper} sx={{ padding: "1px" }}>
        {/* {selectChoice === "In" && ( */}
        <Table
          // sx={{ minWidth: "700px", overflowX: "scroll" }}
          size="small"
          aria-label="a dense table"
          stickyHeader
        >
          <TableHead sx={{ bgcolor: "success.light", fontSize: 12 }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Member Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Bet
              </TableCell>
              {/* <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Bet</TableCell> */}
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                GameX
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Win/Lose
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                more
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memberReport.map((mem) => {
              // const date = new Date(lg._date);
              return (
                <>
                  <TableRow>
                    <TableCell sx={{ overflow: "scroll/" }}>
                      {mem.member.name}
                    </TableCell>
                    <TableCell>{mem.totalAmount.toString()}</TableCell>
                    <TableCell>
                    {mem.pout_tee_amount ? mem.pout_tee_amount.toString() : "0"}
                    </TableCell>

                    <TableCell>{mem.totalWin}</TableCell>
                    <TableCell>
                      <NavLink
                        to={"/reports/daily/members/calls"}
                        state={{ callLists: mem.callLists }}
                      >
                        <IconButton size="small" color="success">
                          <RemoveRedEye fontSize="12" />
                        </IconButton>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default DailyMembers;
