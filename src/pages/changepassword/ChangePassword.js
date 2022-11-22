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
import { green, teal } from "@mui/material/colors";
import React, { useState } from "react";
import BetButtonCom from "../../components/BetButtonCom";
import BetCom from "../../components/BetCom";
import Axios from "../../shared/Axios";

const ChangePassword = ({ authUser, setAuthUser }) => {
  //success alert Control
  const [successAlt, setSuccessAlt] = useState({
    status: false,
    msg: "",
  });

  //error alert Control
  const [errorAlt, setErrorAlt] = useState({
    status: false,
    msg: "",
  });

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
      setErrorAlt({
        status: true,
        msg: "new password is minimum 8 characters",
      });
      return;
    } else {
      console.log(changePass);
      Axios.put(`/auth/changepassword`, changePass, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          setSuccessAlt({status:true,msg:'Successfully Password Changed'})
          console.log(res.data);
          setAuthUser({
            token: null,
            authorize: false,
            user_info: {},
          });
          localStorage.removeItem("access-token");
          //   localStorage.setItem("auth", true);
          localStorage.removeItem("user-info");
        })
        .catch((err) => {
          if (err) {
            const { error, success } = err.response.data;
            console.log(error,success)
            setErrorAlt({ status: true, msg: error });
          }
        });
    }
  };
  return (
    <Stack alignItems={"center"} padding={1} marginTop={2}>
{/* Error Alert */}

      {errorAlt.status && (
        <Snackbar
          open={errorAlt.status}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={() => setErrorAlt({ status: false, msg: "" })}
          // message="Error Bet"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                // aria-label="close"
                // color="inherit"
                onClick={() => setErrorAlt({ status: false, msg: "" })}
              >
                <Close fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert severity={"warning"} color={"warning"}>
            {errorAlt.msg.toString()}
          </Alert>
        </Snackbar>
      )}
{/* Success Alert */}
{successAlt.status && (
        <Snackbar
          open={successAlt.status}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={() => setSuccessAlt({ status: false, msg: "" })}
          // message="Error Bet"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                // aria-label="close"
                // color="inherit"
                onClick={() => setSuccessAlt({ status: false, msg: "" })}
              >
                <Close fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert severity={"warning"} color={"warning"}>
            {successAlt.msg.toString()}
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
            color={"primary"}
            // border='none'
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
            color={"primary"}
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
            color={"primary"}
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
        <Stack direction={"row"} spacing={1} padding={2} justifyContent="end">
          {/* <Button size="medium" color="success" variant={"contained"}>
            Cancle
          </Button> */}
          <Button
            size="medium"
            sx={{
              bgcolor: green[500],
              boxShadow: "none",
              textTransform: "none",
            }}
            variant={"contained"}
            onClick={() => updatePassword(changePass)}
          >
            Change
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChangePassword;
