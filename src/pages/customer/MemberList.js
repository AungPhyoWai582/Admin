import { VisibilityOutlined } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";

const MemberList = () => {
  // const UserContent = useContext(Context);

  const [users, setUsers] = useState({
    count: null,
    data: null,
  });

  // const [page, setPage] = useState(1);
  // const [rowperpage, setRowPerPage] = useState(5);
  const [ctrlEffect, setCtrlEffect] = useState(true);

  useEffect(() => {
    console.log("Start");
    Axios.get(`masters`, {
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
  }, [ctrlEffect]);
  console.log(users);
  const getUser = (e) => {
    e.preventDefault();
    console.log("API REQUEST");
  };
  // console.log(page);
  // console.log(rowperpage);
  const [inputsearch, setInputsearch] = useState("");
  return (
    <Paper sx={{ padding: "1", height: "100%" }}>
      <Stack direction={"row"} padding={1}>
        <TextField
          size={"small"}
          label={"Search"}
          color={"success"}
          sx={{ width: "40%" }}
          onChange={(e) => setInputsearch(e.target.value)}
        />
      </Stack>
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
                      // user.divider.includes(inputsearch)
                    );
                  })
                  // .slice(page * rowperpage, page * rowperpage + rowperpage)
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
                        <IconButton
                          size="small"
                          color="success"
                          // onClick={() => UserContent.setDetailUser(user._id)}
                        >
                          <NavLink to={`/masters/detail/${user._id}`} state={{user:user}}>
                            <VisibilityOutlined />
                          </NavLink>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
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
