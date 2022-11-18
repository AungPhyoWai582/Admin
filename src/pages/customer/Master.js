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
  RadioGroup,
  Radio,
} from "@mui/material";
import { green, grey, red, teal } from "@mui/material/colors";
import React, { useState } from "react";

const Master = ({
  master,
  success,
  setSuccess,
  error,
  setError,
  onChangeHandler,
  selectType,
  onSelectHandler,
  handleChange,
  createMaster,
}) => {
  return (
    <React.Fragment>
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
           
                <TextField
                  color={"success"}
                  placeholder="add username"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="username"
                  sx={{ bgcolor: teal[50] }}
                  value={master.username}
                  label="username"
                  // value={userinfo.username}
                  onChange={onChangeHandler}
                />
            
          </Stack>
          <Stack spacing={1.5} padding={1}>
            
                <TextField
                  color={"success"}
                  placeholder="add name"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="name"
                  label="name"
                  sx={{ bgcolor: teal[50] }}
                  value={master.name}
                  onChange={onChangeHandler}
                />
             
          </Stack>
          <Stack spacing={1.5} padding={1}>
              
                <TextField
                  color={"success"}
                  placeholder="add password"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="password"
                  label={"password"}
                  sx={{ bgcolor: teal[50] }}
                  value={master.password.toString()}
                  onChange={onChangeHandler}
                />
              
          </Stack>
          <Stack spacing={1.5} padding={1}>
            
                <TextField
                  color={"success"}
                  placeholder="add phone no."
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="phone"
                  label="phone"
                  sx={{ bgcolor: teal[50] }}
                  value={master.phone}
                  onChange={onChangeHandler}
                />
             
          </Stack>
          <Stack spacing={1.5} padding={1}>
           
                <TextField
                  color={"success"}
                  placeholder="add pay commission"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="commission"
                  label="commission"
                  sx={{ bgcolor: teal[50] }}
                  value={master.commission.toString()}
                  onChange={onChangeHandler}
                />
             
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1.5} padding={1}>
            
                <TextField
                  color={"success"}
                  placeholder="add za"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="twoDz"
                  label="twoDz"
                  sx={{ bgcolor: teal[50] }}
                  value={master.twoDz.toString()}
                  onChange={onChangeHandler}
                />
              
          </Stack>
          <Stack spacing={1.5} padding={1}>
            
                <TextField
                  color={"success"}
                  placeholder="add numbers count"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="lager_break"
                  label="lager_break"
                  sx={{ bgcolor: teal[50] }}
                  value={master.lager_break.toString()}
                  onChange={onChangeHandler}
                />
             
          </Stack>

          <Stack spacing={1.5} padding={1}>
           
                <TextField
                  color={"success"}
                  placeholder="add limit for hot numbers"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="hot_limit"
                  label="hot_limit"
                  sx={{ bgcolor: teal[50] }}
                  value={master.hot_limit.toString()}
                  onChange={onChangeHandler}
                />
             
          </Stack>

          <Stack spacing={1.5} padding={1}>
           
                <TextField
                  color={"success"}
                  placeholder="add limit for super hot numbers"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="superhot_limit"
                  label="superhot_limit"
                  sx={{ bgcolor: teal[50] }}
                  value={master.superhot_limit.toString()}
                  onChange={onChangeHandler}
                />
             
          </Stack>

          {/* <Stack spacing={1.5} padding={1}>
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
                  onChange={(e, value) => onSelectHandler(e, "divider", value)}
                />
              }
            />
          </Stack> */}

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
        width={'100%'}
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
    </React.Fragment>
  );
};

export default Master;
