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
import Axios from "../../shared/Axios";
import Customer from "./Customer";
import User from "./User";

const MemberCreate = ({ userinfo }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
    phone: "",
    divider: "Cash",
    twoDz: "",
    commission: "",
    lager_break: "",
    hot_limit: "",
    superhot_limit: "",
    accLimit: false,
    acc_limit_created: "",
    userRelation:{},
  });
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    twoDz: "",
    commission: "",
  });
  const selectType = [
    { label: "Cash" },
    { label: 100 },
    { label: 50 },
    { label: 25 },
  ];

  const [in_out, set_in_out] = useState("In");

  const handleChange = (event) => {
    // setChecked(event.target.checked);
    setUser({
      ...user,
      accLimit: event.target.checked,
    });
  };

  const masterOnChange = (e) => {
    console.log(e.target.name);
    // if (v) {
    //   console.log(v.label);
    // }
    let { name, value } = e.target;
    console.log(name, value);
    // console.log(e.value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const customerOnChange = (e) => {
    console.log(e.target.name);
    // if (v) {
    //   console.log(v.label);
    // }
    let { name, value } = e.target;
    console.log(name, value);
    // console.log(e.value);
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const onSelectHandler = (e, name, value) => {
    // let { value } = val.label;
    setUser({
      ...user,
      [name]: value.label,
    });
  };

  const createMaster = () => {
    console.log("Create Master");
    console.log(user);
    Axios.post("users", user, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((response) => {
        console.log(response.data);
        setSuccess(true);
        setUser({
          username: "",
          name: "",
          password: "",
          phone: "",
          divider: "",
          twoDz: "",
          commission: "",
          lager_break: "",
          hot_limit: "",
          superhot_limit: "",
          accLimit: false,
          acc_limit_created: "",
        });
      })
      .catch((err) => setError(true));
  };

  const createCustomer = () => {
    console.log(customer);

    Axios.post(`/customers`, customer, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data);
      setSuccess(true);
      setCustomer({
        name: "",
        phone: "",
        twoDz: "",
        commission: "",
      });
    });
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
      <Stack direction={"column"}>
        <Stack direction={"row"}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={in_out}
            onChange={(e) => {
              set_in_out(e.target.value);
              // setInOutCtl(true);
            }}
          >
            <FormControlLabel
              value="In"
              control={<Radio size="small" color="success" />}
              label="In"
            />
            <FormControlLabel
              value="Out"
              control={<Radio size="small" color="success" />}
              label="Out"
            />
          </RadioGroup>
        </Stack>
        {in_out === "In" && (
          <User
            user={user}
            success={success}
            setSuccess={setSuccess}
            error={error}
            setError={setError}
            onChangeHandler={masterOnChange}
            selectType={selectType}
            onSelectHandler={onSelectHandler}
            handleChange={handleChange}
            createMaster={createMaster}
          />
        )}
        {in_out === "Out" && (
          <Customer
            success={success}
            setSuccess={setSuccess}
            error={error}
            setError={setError}
            customer={customer}
            onChangeHandler={customerOnChange}
            createCustomer={createCustomer}
            // selectType={selectType}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default MemberCreate;
