import {
  Divider,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "../../shared/Axios";

const AccountInfo = ({ authUser }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    Axios.get("auth/me", {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      setUserInfo(res.data.data);
    });
  }, []);
  console.log(authUser.user_info);
  return (
    <Stack
      width={{ xs: "100%", md: "50%" }}
      margin={{ md: "auto" }}
      component={"table"}
      border={0.1}
    >
      <Typography
        padding={1}
        textAlign={"center"}
        fontSize={25}
        fontWeight={700}
      >
        Account Info
      </Typography>
      <Divider />
      {userInfo && (
        <Table>
          <TableRow>
            <TableCell width={"50%"}>Username</TableCell>
            <TableCell>{userInfo.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={"50%"}>Name</TableCell>
            <TableCell>{userInfo.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>{userInfo.role}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Za</TableCell>
            <TableCell>{userInfo.twoDZ}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Commission</TableCell>
            <TableCell>{userInfo.commission}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Divider</TableCell>
            <TableCell>{userInfo.divider}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Account created</TableCell>
            <TableCell>{userInfo.acc_created_count}</TableCell>
          </TableRow>
        </Table>
      )}
    </Stack>
  );
};

export default AccountInfo;
