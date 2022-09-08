import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Stack,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  TableBody,
  TableRow,
  IconButton,
  Badge,
} from "@mui/material";
import { red, teal } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Axios from "../../shared/Axios";

const ReportCalls = ({ authUser }) => {
  const [call, setCall] = useState([]);

  let { lotteryId, agentId } = useParams();
  useEffect(() => {
    console.log("Report One Agent Calls");

    Axios.get(`/reports/agent/${agentId}/calls/${lotteryId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        // console.log(res.data.data);
        setCall(res.data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  console.log(call);
  return (
    <>
      <Stack>
        {/* <TableContainer component={Paper} sx={{ padding: "1px" }}> */}
        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
          <TableHead sx={{ bgcolor: "success.light" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Calls</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Bet</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Comission</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflow: "scroll" }}>
            {call.map((cal) => {
              return (
                <TableRow>
                  <TableCell>{cal.callname}</TableCell>
                  <TableCell>{cal.totalAmount}</TableCell>
                  <TableCell>{cal.commission}</TableCell>
                  <TableCell
                    sx={{
                      color: cal.status === "WIN" ? teal[700] : red[700],
                      fontWeight: "bold",
                    }}
                  >
                    {cal.status}
                  </TableCell>
                  <TableCell>
                    <IconButton color="success">
                      <NavLink
                        to={`/reports/agent/${agentId}/calls/${lotteryId}/${cal._id}`}
                      >
                        <VisibilityOutlined />
                      </NavLink>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* </TableContainer> */}
      </Stack>
    </>
  );
};

export default ReportCalls;
