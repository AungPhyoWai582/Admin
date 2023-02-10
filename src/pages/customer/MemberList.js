import { Edit, VisibilityOutlined } from "@mui/icons-material";
import {
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";
import PaginateComponent from "../../components/PaginateComponent";

const MemberList = () => {
  // const UserContent = useContext(Context);
  // in/out state and useEff control state
  const [in_out, set_in_out] = useState("In");
  const [ctrlEffect, setCtrlEffect] = useState(true);

  const [users, setUsers] = useState({
    count: null,
    data: null,
  });

  const [customers, setCustomers] = useState({
    count: null,
    data: null,
  });

  // For pagination
  const [inPage, setInPage] = useState(1);
  const [inLimit, setInLimit] = useState(5);
  const [outPage, setOutPage] = useState(1);
  const [outLimit, setOutLimit] = useState(5);

  useEffect(() => {
    console.log("Start");
    if (in_out === "In") {
      Axios.get(`users?page=${inPage}&limit=${inLimit}`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        let resData = res.data;
        console.log(resData);
        setUsers({
          count: resData.counts,
          data: resData.data,
        });
        setCtrlEffect(false);
      });
    }

    if (in_out === "Out") {
      Axios.get(`customers?page=${outPage}&limit=${outLimit}`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }).then((res) => {
        console.log(res.data);
        setCustomers({
          count: res.data.data.length,
          data: res.data.data,
        });

        setCtrlEffect(false);
      });
    }
  }, [ctrlEffect]);

  // console.log(rowperpage);
  const [inputsearch, setInputsearch] = useState("");

  // In users pagination
  const handleInChangePage = (event, value) => {
    console.log(value);
    setInPage(value);
    setCtrlEffect(true);
  };

  const handleInChangeRowsPerPage = (event) => {
    setInLimit(parseInt(event));
    setInPage(1);
    setCtrlEffect(true);
  };

  /****************************************************************** */
  // Out customers pagination
  const handleOutChangePage = (event, value) => {
    console.log(value);
    setOutPage(value);
    setCtrlEffect(true);
  };

  const handleOutChangeRowsPerPage = (event) => {
    setOutLimit(parseInt(event));
    setOutPage(1);
    setCtrlEffect(true);
  };

  console.log(customers);

  /************************************************** */

  return (
    <Paper sx={{ padding: "1", height: "100%" }}>
      <Stack direction={"row"} justifyContent='space-between' alignItems={'center'} padding={1}>
        <TextField
          size={"small"}
          variant="standard"
          label={"Search"}
          color={"success"}
          sx={{ width: "40%" }}
          onChange={(e) => setInputsearch(e.target.value)}
        />

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={in_out}
          onChange={(e) => {
            set_in_out(e.target.value);
            setCtrlEffect(true);
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
      {/* <Stack direction={"row"} padding={1}>
        
      </Stack> */}
      {in_out === "In" && (
        <Stack padding={1}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">UserName</TableCell>
                <TableCell>Phone No</TableCell>
                <TableCell align="center">Divider</TableCell>
                <TableCell align="right">Za</TableCell>
                <TableCell align="right">Detail</TableCell>
              </TableHead>
              <TableBody>
                {users.data &&
                  users.data
                    .filter((user, keey) => {
                      if (inputsearch === "") {
                        return user;
                      }
                      return (
                        user.username
                          .toLowerCase()
                          .includes(inputsearch.toLowerCase()) ||
                        user.name
                          .toLowerCase()
                          .includes(inputsearch.toLowerCase())
                      );
                    })
                    .map((user, key) => (
                      <TableRow sx={{ height: "5px" }}>
                        <TableCell>
                          <span>{key + 1}</span>
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell align="center">{user.divider}</TableCell>
                        <TableCell align="right">{user.twoDZ}</TableCell>
                        <TableCell align="right">
                          <NavLink
                            to={`/users/detail/${user._id}`}
                            state={{ user: user }}
                          >
                            <IconButton
                              size="small"
                              color="success"
                              // onClick={() => UserContent.setDetailUser(user._id)}
                            >
                              <VisibilityOutlined fontSize="sm" />
                            </IconButton>
                          </NavLink>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
          <PaginateComponent
            color="success"
            page={inPage}
            count={users.count}
            handleChangePage={handleInChangePage}
            handleChangeRowsPerPage={handleInChangeRowsPerPage}
            rowsPerPage={inLimit}
          />
        </Stack>
      )}

      {in_out === "Out" && (
        <Stack padding={1}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Commission</TableCell>
                <TableCell>Divider</TableCell>
                <TableCell>Za</TableCell>
                <TableCell>bet limit</TableCell>
                <TableCell>Action</TableCell>
              </TableHead>
              <TableBody>
                {customers.data &&
                  customers.data
                    .filter((cus, key) => {
                      if (inputsearch === "") {
                        return cus;
                      }
                      return cus.name
                        .toLowerCase()
                        .includes(inputsearch.toLowerCase());
                      // user.divider.includes(inputsearch)
                    })
                    // .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((cus, key) => (
                      <TableRow sx={{ height: "5px" }}>
                        <TableCell>
                          <span>{key + 1}</span>
                        </TableCell>
                        <TableCell>{cus.name}</TableCell>
                        <TableCell>{cus.phone}</TableCell>
                        <TableCell>{cus.commission}</TableCell>
                        <TableCell>{cus.divider}</TableCell>
                        <TableCell>{cus.twoDZ}</TableCell>
                        <TableCell>
                          {cus.betLimit ? cus.betLimit : "--"}
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" color="success">
                            <Edit fontSize="sm" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PaginateComponent
            color="success"
            page={outPage}
            count={customers.count}
            handleChangePage={handleOutChangePage}
            handleChangeRowsPerPage={handleOutChangeRowsPerPage}
            rowsPerPage={outLimit}
          />
        </Stack>
      )}
      {/* <Stack direction={"row"} justifyContent={"end"} padding={1}>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10]}
          count={users.count}
          rowsPerPage={rowperpage}
          page={page}
          component={"div"}
          onPageChange={hangleChangepage}
          // onRowsPerPageChange={hangleChangPerepage}
          onRowsPerPageChange
        />
      </Stack> */}
    </Paper>
  );
};

export default MemberList;
