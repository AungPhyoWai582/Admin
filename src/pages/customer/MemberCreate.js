import { Close } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import { green, grey, red, teal } from "@mui/material/colors";
import React, { useState } from "react";
import Axios from "../../shared/Axios";

const MemberCreate = ({ userinfo }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [master, setMaster] = useState({
    username: "",
    name: "",
    password: "",
    phone: "",
    divider: "",
    twoDz: "",
    commission: "",
    accLimit: false,
    acc_limit_created: "",
  });
  const selectType = [
    { label: "Cash" },
    { label: 100 },
    // { label: 50 },
    { label: 25 },
  ];

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    // setChecked(event.target.checked);
    setMaster({
      ...master,
      accLimit: event.target.checked,
    });
  };

  const onChangeHandler = (e) => {
    console.log(e.target.name);
    // if (v) {
    //   console.log(v.label);
    // }
    let { name, value } = e.target;
    console.log(name, value);
    // console.log(e.value);
    setMaster({
      ...master,
      [name]: value,
    });
  };

  const onSelectHandler = (e, name, value) => {
    // let { value } = val.label;
    setMaster({
      ...master,
      [name]: value.label,
    });
  };

  const createMaster = () => {
    console.log("Create Master");
    console.log(master);
    Axios.post("masters", master, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((response) => {
        console.log(response.data);
        setSuccess(true);
        setMaster({
          username: "",
          name: "",
          password: "",
          phone: "",
          divider: "",
          twoDz: "",
          commission: "",
          accLimit: false,
          acc_limit_created: "",
        });
      })
      .catch((err) => setError(true));
  };
  return (
    <Stack
      // component={"form"}
      width={{ xs: "70%", md: "90%" }}
      sx={{
        // width: "90%",
        padding: "1",
        // height: "100%",
        // padding: 3,
        margin: "auto",
        // bgcolor: teal[700],
        // position: "fixed",
      }}
    >
      {/* <Stack direction={"row"} style={{ backgroundColor: "green" }}>
        1
      </Stack> */}
      <Stack direction={"column"}>
        <Stack
          // component={"header"}
          fontSize={20}
          fontWeight={"bold"}
          // textAlign={"center"}
          padding={1}
          borderBottom={1}
          borderColor={teal[100]}
          // color="white"
          // bgcolor={teal[500]}
        >
          Master {`Create`}
        </Stack>
        <Stack>
          {success && (
            <Alert
              severity="success"
              sx={{
                color: "green",
                // fontWeight: "bold",
                bgcolor: green[200],
              }}
              action={
                <IconButton
                  aria-label="close"
                  color="success"
                  size="small"
                  onClick={() => {
                    setSuccess(false);
                  }}
                >
                  <Close fontSize="12" />
                </IconButton>
              }
            >
              Master create successfully
            </Alert>
          )}
          {error && (
            <Alert
              severity="error"
              sx={{
                color: "red",
                // fontWeight: "bold",
                bgcolor: red[200],
              }}
              action={
                <IconButton
                  aria-label="close"
                  color="error"
                  size="small"
                  onClick={() => {
                    setError(false);
                  }}
                >
                  <Close fontSize="12" />
                </IconButton>
              }
            >
              Error
            </Alert>
          )}
        </Stack>
        <Grid
          container
          columns={{ xs: 12, md: 12 }}
          // spacing={{ md: 0 }}
          // padding={{ md: 1 }}
        >
          <Grid item xs={12} md={6}>
            <Stack spacing={1.5} padding={1}>
              <Typography variant={"caption"} component={"label"} fontSize={16}>
                UserName <span style={{ color: "red" }}>*</span>
              </Typography>
              <FormControlLabel
                control={
                  <TextField
                    color={"success"}
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="username"
                    sx={{ bgcolor: teal[50] }}
                    value={master.username}
                    // value={userinfo.username}
                    onChange={onChangeHandler}
                  />
                }
              />
            </Stack>
            <Stack spacing={1.5} padding={1}>
              <Typography variant={"caption"} component={"label"} fontSize={16}>
                Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <FormControlLabel
                control={
                  <TextField
                    color={"success"}
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="name"
                    sx={{ bgcolor: teal[50] }}
                    value={master.name}
                    onChange={onChangeHandler}
                  />
                }
              />
            </Stack>
            <Stack spacing={1.5} padding={1}>
              <Typography variant={"caption"} component={"label"} fontSize={16}>
                Password <span style={{ color: "red" }}>*</span>
              </Typography>
              <FormControlLabel
                control={
                  <TextField
                    color={"success"}
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="password"
                    sx={{ bgcolor: teal[50] }}
                    value={master.password.toString()}
                    onChange={onChangeHandler}
                  />
                }
              />
            </Stack>
            <Stack spacing={1.5} padding={1}>
              <Typography variant={"caption"} component={"label"} fontSize={16}>
                Phone Number <span style={{ color: "red" }}>*</span>
              </Typography>
              <FormControlLabel
                control={
                  <TextField
                    color={"success"}
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="phone"
                    sx={{ bgcolor: teal[50] }}
                    value={master.phone}
                    onChange={onChangeHandler}
                  />
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1.5} padding={1}>
              <Typography variant={"caption"} component={"label"} fontSize={16}>
                Commission <span style={{ color: "red" }}>*</span>
              </Typography>
              <FormControlLabel
                control={
                  <TextField
                    color={"success"}
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="commission"
                    sx={{ bgcolor: teal[50] }}
                    value={master.commission.toString()}
                    onChange={onChangeHandler}
                  />
                }
              />
            </Stack>
            <Stack spacing={1.5} padding={1}>
              <Typography variant={"caption"} component={"label"} fontSize={16}>
                za <span style={{ color: "red" }}>*</span>
              </Typography>
              <FormControlLabel
                control={
                  <TextField
                    color={"success"}
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="twoDz"
                    sx={{ bgcolor: teal[50] }}
                    value={master.twoDz.toString()}
                    onChange={onChangeHandler}
                  />
                }
              />
            </Stack>
            <Stack spacing={1.5} padding={1}>
              <Typography variant={"caption"} component={"label"} fontSize={16}>
                Divider
              </Typography>
              <FormControlLabel
                // label="Divider"
                control={
                  <Autocomplete
                    disablePortal
                    size={"small"}
                    fullWidth
                    id="selectType"
                    sx={{ bgcolor: teal[50] }}
                    options={selectType}
                    renderInput={(params) => (
                      <TextField
                        sx={{ bgcolor: teal[50] }}
                        color={"success"}
                        {...params}
                        label="Select Type"
                      />
                    )}
                    name="divider"
                    value={master.divider}
                    onChange={(e, value) =>
                      onSelectHandler(e, "divider", value)
                    }
                  />
                }
              />
            </Stack>
            <Stack
              marginTop={1}
              // spacing={1.5}
              padding={1}
              alignItems="center"
              // bgcolor={"red"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <Typography variant={"caption"} fontSize={16}>
                Acc Limit:
              </Typography>

              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox
                  color="success"
                  checked={master.accLimit}
                  onChange={handleChange}
                  //  inputProps={{ "aria-label": "controlled" }}
                />
                <TextField
                  disabled={master.accLimit ? false : true}
                  size="small"
                  variant="outlined"
                  value={master.acc_limit_created}
                  sx={{ bgcolor: master.accLimit ? teal[50] : grey[300] }}
                  color={"secondary"}
                  name="acc_limit_created"
                  onChange={onChangeHandler}
                />
              </Stack>
            </Stack>
          </Grid>
          {/* <Grid item xs={1} md={12}> */}
            <Stack
              direction={"row"}
              spacing={2}
              // marginTop={6}
              // width={"80%"}
              justifyContent={"flex-end"}
              padding={3}
            >
              <Button
                size="small"
                variant={"none"}
                sx={{ color: teal[500], bgcolor: grey[200] }}
              >
                Cancle
              </Button>
              {master !== "" ? (
                <Button
                  size="small"
                  variant={"contained"}
                  sx={{ bgcolor: teal[500], color: grey[200] }}
                  onClick={createMaster}
                >
                  Create
                </Button>
              ) : (
                <Button
                  size="small"
                  variant={"contained"}
                  sx={{ bgcolor: teal[500], color: grey[200] }}
                  onClick={createMaster}
                >
                  Update
                </Button>
              )}
            </Stack>
          {/* </Grid> */}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default MemberCreate;
