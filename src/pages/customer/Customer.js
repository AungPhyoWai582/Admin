import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Stack,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Axios from "../../shared/Axios";

const Customer = () => {
  //getCus
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    Axios.get(`/customer`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res);
      setCustomer(res.data.customers);
    });
  }, []);
  console.log(customer);
  const [cusName, setCusName] = useState({ name: "" });

  const CustomerCreate = () => {
    console.log(cusName);
    console.log(localStorage.getItem("access-token"));
    Axios.post(`/customer`, cusName, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res);
        setOpen(false);
      })
      .catch((err) => console.log(err.message));
  };
  //date picker
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = useState(false);
  const DiaOpen = () => {
    setOpen(!open);
  };
  return (
    <Stack>
      <Stack
        padding={1}
        // width={"100%"}
        direction={"row"}
        spacing={{ xs: 1, sm: 3, md: 3 }}
        // alignItems={"end"}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} size={"small"} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="End Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} size={"small"} />}
          />
        </LocalizationProvider>
        <IconButton size={"small"} onClick={DiaOpen}>
          <Typography>Create Customer</Typography>
          <Add fontSize={"small"} />
        </IconButton>
        <Dialog open={open}>
          <DialogActions>
            <Stack spacing={2}>
              <Typography>Name</Typography>
              <TextField
                variant={"outlined"}
                size={"small"}
                onChange={(e) => setCusName({ name: e.target.value })}
              />
              <Button
                variant={"contained"}
                size={"small"}
                onClick={CustomerCreate}
              >
                Submit
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </Stack>
      <Stack padding={1}>
        <Table>
          {customer.map((cus, key) => {
            return (
              <TableRow>
                <TableCell>{cus.name}</TableCell>
                <TableCell>Total Bet</TableCell>
                <TableCell>Report</TableCell>
              </TableRow>
            );
          })}
        </Table>
      </Stack>
    </Stack>
  );
};

export default Customer;
