import React, { useState } from "react";
import { Grid, Paper, Avatar, Snackbar, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "../../App.js";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import Axios from "../../shared/Axios.js";
// import Axios from "../../utils/Axios.js";
const Login = ({ authUser, setAuthUser }) => {
  const paperStyle = {
    padding: 20,
    heigth: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "green" };
  const btnStyle = { margin: "8px" };

  const [user, setUser] = useState({ username: "", password: "" });

  //control
  const [alertCtl, setAlertCtl] = useState({
    status: false,
    msg: "",
  });

  const onChangeHandler = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    console.log(user);
    Axios.post("/auth/login", user)
      .then((response) => {
        console.log(response.data.data.role);
        if (response.data.data.role === "Admin") {
          setAuthUser({
            token: response.data.token,
            authorize: true,
            user_info: response.data.data,
          });
          localStorage.setItem("access-token", response.data.token);
          //   localStorage.setItem("auth", true);
          localStorage.setItem("user-info", JSON.stringify(response.data.data));
        } else {
          setAuthUser({ token: null, authorize: false, user_info: {} });
        }
      })
      .catch((err) => {
        // console.log(err.response.statusText, err.response.status);
        setAlertCtl({
          status: true,
          msg: `${(err.response.status, err.response.statusText)}`,
        });
        console.log(alertCtl);
      });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          {alertCtl.status && (
            <Snackbar
              open={alertCtl.status}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={4000}
              onClose={() => setAlertCtl({ status: false, msg: "" })}
              action={true}
              // vertical={"top"}
            >
              <Alert
                severity="error"
                sx={{ color: "red", backgroungColor: "red" }}
              >
                {alertCtl.msg}
              </Alert>
            </Snackbar>
          )}
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>အကောင့်၀င်ရန်</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter Username"
          fullWidth
          name="username"
          value={user.username}
          onChange={onChangeHandler}
        />
        <TextField
          sx={{ marginTop: 1 }}
          label="Password"
          placeholder="Enter Password"
          fullWidth
          type="password"
          name="password"
          value={user.password}
          onChange={onChangeHandler}
        />
        <FormControlLabel
          control={<Checkbox name="checked" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="success"
          variant="contained"
          sytle={btnStyle}
          fullWidth
          onClick={login}
        >
          ၀င်ရန်
        </Button>
      </Paper>
    </Grid>
  );
};
export default Login;
