import { Close } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import React, { useState } from "react";
import BetButtonCom from "../../components/BetButtonCom";
import BetCom from "../../components/BetCom";
import Axios from "../../shared/Axios";

const ChangePassword = () => {
  //alert Control
  const [alertCtl, setAlertCtl] = useState(false);
  // password
  const [changePass, setChangePass] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //function
  const changepasswordFunction = (e) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setChangePass({ ...changePass, [name]: value });
  };
  // console.log(changePass);

  //confirm
  const updatePassword = (changePass) => {
    if (changePass.newPassword.length < 7) {
      setAlertCtl(true);
      return;
    } else {
      Axios.put(`/changepassword`, changePass, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };
  return (
    <Stack alignItems={"center"} padding={1} marginTop={2}>
      {alertCtl && (
        <Snackbar
          open={alertCtl}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={() => setAlertCtl(false)}
          // message="Error Bet"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                // aria-label="close"
                // color="inherit"
                onClick={() => setAlertCtl(false)}
              >
                <Close fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert severity={"warning"} color={"warning"}>
            Incorrect Password
          </Alert>
        </Snackbar>
      )}
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
            onChange={(e) => changepasswordFunction(e)}
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
            onChange={(e) => changepasswordFunction(e)}
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
            onChange={(e) => changepasswordFunction(e)}
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
          <Button
            size="medium"
            color="success"
            variant={"contained"}
            onClick={() => updatePassword(changePass)}
          >
            OK
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChangePassword;
