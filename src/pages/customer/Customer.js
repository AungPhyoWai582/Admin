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

const Customer = ({
  customer,
  createCustomer,
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
        Customer {`Create`}
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
            customer create successfully
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
                  placeholder="add name"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="name"
                  label="name"
                  sx={{ bgcolor: teal[50] }}
                  value={customer.name}
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
                  value={customer.phone}
                  onChange={onChangeHandler}
                />
             
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1.5} padding={1}>
           
                <TextField
                  color={"success"}
                  placeholder="add pay commission"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="commission"
                  label='commission'
                  sx={{ bgcolor: teal[50] }}
                  value={customer.commission.toString()}
                  onChange={onChangeHandler}
                />
             
          </Stack>
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
                  value={customer.twoDz.toString()}
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
                  // value={master.divider}
                  // onChange={(e, value) => onSelectHandler(e, "divider", value)}
                />
              }
            />
          </Stack> */}
        </Grid>
        {/* <Grid item xs={1} md={12}> */}
        <Stack
          direction={"row"}
          width={'100%'}
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

          <Button
            size="small"
            variant={"contained"}
            sx={{ bgcolor: teal[500], color: grey[200] }}
            onClick={createCustomer}
          >
            Create
          </Button>
        </Stack>
        {/* </Grid> */}
      </Grid>
    </React.Fragment>
  );
};

export default Customer;
