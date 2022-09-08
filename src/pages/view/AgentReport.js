import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const AgentReport = () => {
  return (
    <Stack>
      {/* <TableContainer component={Paper} sx={{ padding: "1px" }}> */}
      <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
        <TableHead sx={{ bgcolor: "success.light" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Comission</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Win/Lose</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: "scroll" }}>
          {/* {call.map((cal) => {
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
          })} */}
        </TableBody>
      </Table>
      {/* </TableContainer> */}
    </Stack>
  );
};

export default AgentReport;
