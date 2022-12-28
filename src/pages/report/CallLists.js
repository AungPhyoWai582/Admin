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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const CallList = () => {
  const location = useLocation();

  const { callLists } = location.state;
  console.log(callLists);
  const [memberReport, setMemberReport] = useState([]);

  //   useEffect(() => {
  //     Axios.get(`/reports/daily/members?lager=${lager._id}`, {
  //       headers: {
  //         authorization: `Bearer ` + localStorage.getItem("access-token"),
  //       },
  //     }).then((res) => {
  //       console.log(res.data);
  //       setMemberReport(res.data.report);
  //     });
  //   }, []);

  return (
    <Stack>
      <TableContainer component={Paper} sx={{ padding: "1px" }}>
        <Table
          // sx={{ minWidth: "max-content", overflowX: "scroll" }}
          size="small"
          aria-label="a dense table"
          stickyHeader
        >
          <TableHead sx={{ bgcolor: "success.light", fontSize: 12 }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                id
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Bet
              </TableCell>
              {/* <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Bet</TableCell> */}
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                gameX
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Win/Lose
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                detail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {callLists.map((cal) => {
              // const date = new Date(lg._date);
              return (
                <>
                  <TableRow>
                    <TableCell sx={{ overflow: "scroll/" }}>
                      {cal.callId}
                    </TableCell>
                    <TableCell>{cal.totalAmount.toString()}</TableCell>
                    <TableCell>
                    {cal.pout_tee_amount ? cal.pout_tee_amount.toString() : "0"}
                    </TableCell>

                    <TableCell>{cal.win.toString()}</TableCell>
                    <TableCell>
                      <NavLink
                        to={"/reports/daily/members/calls/details"}
                        state={{ call: cal }}
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

export default CallList;
