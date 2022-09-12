import { Cancel, Edit, EditOutlined } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { green, grey, teal } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ModalBox from "../../components/modal/ModalBox";
import Axios from "../../shared/Axios";

const MemberDetail = () => {
  const { masterId } = useParams();
  const [user,setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openAccLimit, setOpenAccLimit] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({});

  const [controlEff,setControlEff] = useState(false)

  useEffect(() => {
    Axios.get(`/masters/${masterId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      const {name,phone} = res.data.data;
      setUser(res.data.data);
      setControlEff(false)
    });
  },[controlEff]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdateInfo({
      ...updateInfo,
      [name]: value,
    });
  };

  const editInfo = (e, name, phone, twoDZ) => {
    e.preventDefault();
    setOpen(true);
    console.log(name, phone, twoDZ);
    setUpdateInfo({ name: name, phone: phone, twoDZ: twoDZ });
  };

  const editAccLimit = (e,limit)=>{
    e.preventDefault();
    setOpenAccLimit(true);
    setUpdateInfo({acc_limit_created:limit});
  }

  const saveInfoUpdate = () => {
    console.log(updateInfo);
    Axios.put(`/masters/${user._id}`, updateInfo, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data);
      setControlEff(true);
      setOpen(false);
      setOpenAccLimit(false);
      setUpdateInfo({})
    });
  };

  const saveAccLimitUpdate = () =>{
    console.log(updateInfo)
    Axios.put(`/masters/${user._id}`, updateInfo, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data);
      setControlEff(true);
      setOpen(false);
      setOpenAccLimit(false);
      setUpdateInfo({})
    });
  }

  console.log(updateInfo);
  return (
    <>
      <Stack
        spacing={1}
        direction="column"
        alignItems={"center"}
        paddingTop={1}
        // bgcolor={teal[100]}
      >
        <Stack
          direction={"column"}
          width={{ xs: "90%", sm: "90%", md: "75%", xl: "50%" }}
          margin={"auto"}
          padding={1}
          // border={0.1}
          boxShadow={1}
          bgcolor ={grey[100]}
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            width={"100%"}
          //  bgcolor ={teal[300]}
          >
            <Typography  paddingLeft={1} fontWeight={"bold"}>
              Basic Info
            </Typography>{" "}
            <IconButton
              size="small"
              // color="success"
              onClick={(e) => editInfo(e, user.name, user.phone, user.twoDZ)}
            >
              <EditOutlined />
            </IconButton>
          </Stack>
          <Stack
            direction={"row"}
            spacing={3}
            // justifyContent="space-around"
            borderRadius={1}
            bgcolor={"white"}
            padding={1}
            width={{ xs: "90%", sm: "90%", md: "75%", xl: "50%" }}
            margin={"auto"}
          >
            <Stack>
              <Typography>Username - {user.username}</Typography>
              <Typography>Name - {user.name}</Typography>
              <Typography>Phone - {user.phone}</Typography>
              <Typography>Za - {user.twoDZ}</Typography>
              <Typography>Role - {user.role}</Typography>
              <Typography>Divider - {user.divider}</Typography>
            </Stack>
            {/* <Stack>
              <Typography color={'#33eb91'} fontSize={16}>{user.username}</Typography>
              <Typography color={'#33eb91'} fontSize={16}>{user.name}</Typography>
              <Typography color={'#33eb91'} fontSize={16}>{user.phone}</Typography>
              <Typography color={'#33eb91'} fontSize={16}>{user.twoDZ}</Typography>
              <Typography color={'#33eb91'} fontSize={16}>{user.role}</Typography>
              <Typography color={'#33eb91'} fontSize={16}>{user.divider}</Typography>
            </Stack> */}
          </Stack>
          <ModalBox open={open} setOpen={setOpen}>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              borderBottom={0.1}
              width={"100%"}
              borderColor={grey[300]}
              // padding={1}
            >
              <Typography variant={"h6"} paddingLeft={1} fontWeight={"bold"}>
                Update Info
              </Typography>{" "}
              <IconButton
                size="small"
                color="error"
                onClick={() => {setOpen(false);setUpdateInfo({})}}
              >
                <Cancel />
              </IconButton>
            </Stack>
            <Stack
              padding={1}
              paddingY={3}
              spacing={1}
              borderBottom={0.1}
              borderColor={grey[300]}
            >
              <TextField
                size="small"
                color="secondary"
                label="name"
                name="name"
                value={updateInfo.name}
                onChange={onChangeHandler}
              />
              <TextField
                size="small"
                color="secondary"
                label="phone"
                name="phone"
                value={updateInfo.phone}
                onChange={onChangeHandler}
              />
              <TextField
                size="small"
                color="secondary"
                label="Za"
                name="twoDZ"
                value={updateInfo.twoDZ}
                onChange={onChangeHandler}
              />

              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small" color="secondary">
                  Divider
                </InputLabel>
                <Select
                  color="secondary"
                  labelId="demo-select-small"
                  id="demo-select-small"
                  size="small"
                  value={updateInfo.divider}
                  label="Divider"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Cash</MenuItem>
                  <MenuItem value={20}>25</MenuItem>
                  <MenuItem value={30}>100</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent="flex-end"
              padding={1}
              spacing={1}
            >
              <Button
                size="small"
                color={"error"}
                variant="contained"
                onClick={() => {setOpen(false);setUpdateInfo({})}}
              >
                <Typography textTransform={"none"} fontSize={12}>
                  Cancel
                </Typography>
              </Button>
              <Button
                size="small"
                color={"success"}
                variant="contained"
                onClick={saveInfoUpdate}
              >
                <Typography textTransform={"none"} fontSize={12}>
                  Save
                </Typography>
              </Button>
            </Stack>
          </ModalBox>
        </Stack>
        <Stack
          direction={"column"}
          width={{ xs: "90%", sm: "90%", md: "75%", xl: "50%" }}
          margin={"auto"}
          padding={1}
          // border={0.1}
          boxShadow={1}
          bgcolor ={grey[100]}
        >
         <Stack
            direction={"row"}
            justifyContent="space-between"
            width={"100%"}
          //  bgcolor ={teal[300]}
          >
            <Typography paddingLeft={1} fontWeight={"bold"}>
              Acc Limitation
            </Typography>{" "}
            <IconButton
              size="small"
              // color="success"
              onClick={(e) => editAccLimit(e,user.acc_limit_created)}
            >
              <EditOutlined />
            </IconButton>
          </Stack>
          <Stack
            direction={"row"}
            spacing={3}
            // justifyContent="space-around"
            borderRadius={1}
            bgcolor={"white"}
            padding={1}
            width={{ xs: "90%", sm: "90%", md: "75%", xl: "50%" }}
            margin={"auto"}
          >
            <Stack>
              <Typography>Acc</Typography>
              <Typography>break</Typography>
            </Stack>
            <Stack>
              <Typography fontWeight={'bold'} color={'#00c853'}>
                {user.acc_created_count ? user.acc_created_count : 0}
              </Typography>
              <Typography fontWeight={'bold'} color='error'>{user.acc_limit_created}</Typography>
            </Stack>
          </Stack>
          <ModalBox open={openAccLimit} setOpen={setOpenAccLimit}>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              borderBottom={0.1}
              width={"100%"}
              borderColor={grey[300]}
              // padding={1}
            >
              <Typography variant={"h6"} paddingLeft={1} fontWeight={"bold"}>
                Update Acc Limit
              </Typography>{" "}
              <IconButton
                size="small"
                color="error"
                onClick={() => {setOpenAccLimit(false)}}
              >
                <Cancel />
              </IconButton>
            </Stack>
            <Stack
              padding={1}
              paddingY={3}
              spacing={1}
              borderBottom={0.1}
              borderColor={grey[300]}
            >
              <TextField
                size="small"
                color="secondary"
                label="break"
                name="acc_limit_created"
                value={updateInfo.acc_limit_created}
                onChange={onChangeHandler}
              />
            </Stack>
            <Stack
              direction={"row"}
              justifyContent="flex-end"
              padding={1}
              spacing={1}
            >
              <Button
                size="small"
                color={"error"}
                variant="contained"
                onClick={() => {setOpenAccLimit(false);setUpdateInfo({})}}
              >
                <Typography textTransform={"none"} fontSize={12}>
                  Cancel
                </Typography>
              </Button>
              <Button size="small" color={"success"} variant="contained" onClick={saveAccLimitUpdate}>
                <Typography textTransform={"none"} fontSize={12}>
                  Save
                </Typography>
              </Button>
            </Stack>
          </ModalBox>
        </Stack>
      </Stack>
    </>
  );
};

export default MemberDetail;
