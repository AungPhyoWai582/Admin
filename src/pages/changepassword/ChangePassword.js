import { Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import BetButtonCom from "../../components/BetButtonCom";
import BetCom from "../../components/BetCom";

const ChangePassword = () => {
  return (
    <Stack alignItems={"center"} padding={1} marginTop={2}>
      <Stack padding={1} boxShadow={1}>
        <Typography
          variant="h5"
          padding={1}
          fontWeight={700}
          textAlign={"center"}
        >
          Change Password
        </Typography>
        <Stack spacing={4} direction={"row"} padding={1} alignItems={"center"}>
          <Typography textAlign={"center"} width={"30%"}>
            Old Password
          </Typography>
          <BetCom />
        </Stack>
        <Stack spacing={4} direction={"row"} padding={1} alignItems={"center"}>
          <Typography textAlign={"center"} width={"30%"}>
            New Password
          </Typography>
          <BetCom />
        </Stack>
        <Stack spacing={4} direction={"row"} padding={1} alignItems={"center"}>
          <Typography textAlign={"center"} width={"30%"}>
            Confirm Password
          </Typography>
          <BetCom />
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          padding={2}
          justifyContent="center"
        >
          <Button size="medium" color="success" variant={"contained"}>
            Cancle
          </Button>
          <Button size="medium" color="success" variant={"contained"}>
            OK
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChangePassword;
