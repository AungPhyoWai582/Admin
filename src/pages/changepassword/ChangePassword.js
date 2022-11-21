import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
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
          <TextField
            color={"success"}
            placeholder="add old password"
            fullWidth
            variant="outlined"
            size="small"
            name="oldPassword"
            label="oldPassword"
            sx={{ bgcolor: teal[50] }}
          />
        </Stack>
        <Stack spacing={4} direction={"row"} padding={1} alignItems={"center"}>
          <Typography textAlign={"center"} width={"30%"}>
            New Password
          </Typography>
          <TextField
            color={"success"}
            placeholder="add new password"
            fullWidth
            variant="outlined"
            size="small"
            name="newPassword"
            label="newPassword"
            sx={{ bgcolor: teal[50] }}
          />
        </Stack>
        <Stack spacing={4} direction={"row"} padding={1} alignItems={"center"}>
          <Typography textAlign={"center"} width={"30%"}>
            Confirm Password
          </Typography>
          <TextField
            color={"success"}
            placeholder="add confirm password"
            fullWidth
            variant="outlined"
            size="small"
            name="confirmPassword"
            label="confirmPassword"
            sx={{ bgcolor: teal[50] }}
          />
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
