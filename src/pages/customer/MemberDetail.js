import {
  Cancel,
  Edit,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { green, grey, teal } from "@mui/material/colors";
import { Box } from "@mui/system";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ModalBox from "../../components/modal/ModalBox";
import Axios from "../../shared/Axios";
import Tabbar from "../../components/Tabbar";

const MemberDetail = () => {
  const { masterId } = useParams();
  const [user, setUser] = useState({});
  const [memberView, setmemberView] = useState({
    inTotal: 0,
    outTotal:0,
    inData: [],
    outData:[],
  });
  const [open, setOpen] = useState(false);
  const [openCommission, setOpenCommission] = useState(false);
  const [openAccLimit, setOpenAccLimit] = useState(false);
  const [openHotLimit, setOpenHotLimit] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({});

  const [controlEff, setControlEff] = useState(false);

  useEffect(() => {
    Axios.get(`/masters/${masterId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      // const { name, phone,createdAt } = res.data.data;
      // console.log(res.data.data.createdAt.toString())
      setUser(res.data.data);
      setControlEff(false);
    });

    // Axios.get(`customers`, {
    //   headers: {
    //     authorization: `Bearer ` + localStorage.getItem("access-token"),
    //   },
    // }).then((res) => {
    //   // setCustomers(res.data);
    //   // setCusval(res.data[0]);
    // });

    Axios.get(`/admin/member-view/${masterId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data);
      const { inTotal, inData,outTotal,outData } = res.data.transcation;
      setmemberView({ inTotal: inTotal, inData: inData,outTotal:outTotal,outData:outData });
    });
  }, [controlEff]);

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

  const editAccLimit = (e, limit) => {
    e.preventDefault();
    setOpenAccLimit(true);
    setUpdateInfo({ acc_limit_created: limit });
  };

  const editCommission = (e, commission) => {
    e.preventDefault();
    setOpenCommission(true);
    setUpdateInfo({ commission: commission });
  };

  const editHotLimit = (e, hot_limit, superhot_limit) => {
    e.preventDefault();
    setOpenHotLimit(true);
    setUpdateInfo({ hot_limit: hot_limit, superhot_limit: superhot_limit });
  };

  const usercreateAt = new Date(user.createAt);
  console.log(user.createAt,usercreateAt.getDay(),usercreateAt.getMonth(),usercreateAt.getFullYear())


  const saveUpdate = () => {
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
      setOpenCommission(false);
      setOpenHotLimit(false);
      setUpdateInfo({});
    });
  };

  console.log(updateInfo);

  const memberDetail = (
    <>
      <Stack
        direction={"column"}
        width={{ xs: "90%", sm: "90%", md: "75%", xl: "50%" }}
        margin={"auto"}
        padding={1}
        // border={0.1}
        boxShadow={1}
        bgcolor={grey[100]}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          width={"100%"}
          //  bgcolor ={teal[300]}
        >
          <Button
            size="small"
            // color="success"
            variant="text"
            onClick={(e) => editInfo(e, user.name, user.phone, user.twoDZ)}
          >
            <Typography
              paddingLeft={1}
              fontWeight={"bold"}
              textAlign="center"
              color={"black"}
              paddingRight={1}
              textTransform="none"
            >
              Basic Info
            </Typography>
            <Edit sx={{ color: "black" }} fontSize="14" />
          </Button>
        </Stack>
        <Stack
          direction={"column"}
          spacing={3}
          // justifyContent="space-around"
          borderRadius={1}
          padding={1}
          width={{ xs: "90%", sm: "90%", md: "75%", xl: "50%" }}
          margin={"auto"}
        >
          <Stack padding={1} bgcolor="white">
            <Typography>Username - {user.username}</Typography>
            <Typography>Name - {user.name}</Typography>
            <Typography>Phone - {user.phone}</Typography>
            <Typography>Za - {user.twoDZ}</Typography>
            <Typography>Role - {user.role}</Typography>
            <Typography>Divider - {user.divider}</Typography>
            <Typography>Created Date - {usercreateAt.getDate()}/{usercreateAt.getMonth()+1}/{usercreateAt.getFullYear()}</Typography>
          </Stack>
          <Stack
            direction={useMediaQuery("(max-width:450px)") ? "column" : "row"}
            spacing={1}
          >
            <Button
              size="small"
              variant="contained"
              color={"info"}
              fullWidth={useMediaQuery("(max-width:450px)") ? true : false}
            >
              <Typography textTransform={"none"} fontSize={12}>
                Reset Password
              </Typography>
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              fullWidth={useMediaQuery("(max-width:450px)") ? true : false}
            >
              <Typography textTransform={"none"} fontSize={12}>
                Suspend
              </Typography>
            </Button>
          </Stack>
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
            {/* <IconButton
        size="small"
        color="error"
        onClick={() => {
          setOpen(false);
          setUpdateInfo({});
        }}
      >
        <Cancel />
      </IconButton> */}
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
            {/* <LoadingButton></LoadingButton> */}
            <LoadingButton
              loadingPosition="start"
              loading={false}
              size="small"
              color={"error"}
              variant="contained"
              onClick={() => {
                setOpen(false);
                setUpdateInfo({});
              }}
            >
              <Typography textTransform={"none"} fontSize={12}>
                Cancel
              </Typography>
            </LoadingButton>
            <LoadingButton
              loading={false}
              loadingPosition="start"
              size="small"
              color={"success"}
              variant="contained"
              onClick={saveUpdate}
            >
              <Typography textTransform={"none"} fontSize={12}>
                Save
              </Typography>
            </LoadingButton>
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
        bgcolor={grey[100]}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          width={"100%"}
          //  bgcolor ={teal[300]}
        >
          <Button
            size="small"
            // color="success"
            variant="text"
            onClick={(e) => editCommission(e, user.commission)}
          >
            <Typography
              paddingLeft={1}
              fontWeight={"bold"}
              textAlign="center"
              color={"black"}
              paddingRight={1}
              textTransform="none"
            >
              Commissions
            </Typography>
            <Edit sx={{ color: "black" }} fontSize="14" />
          </Button>
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
            <Typography>2D</Typography>
            <Typography>3D</Typography>
          </Stack>
          <Stack>
            <Typography fontWeight={"bold"} color={"#00c853"}>
              {user.commission}
            </Typography>
            <Typography fontWeight={"bold"} color="error">
              0
            </Typography>
          </Stack>
        </Stack>
        <ModalBox open={openCommission} setOpen={setOpenCommission}>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            borderBottom={0.1}
            width={"100%"}
            borderColor={grey[300]}
            // padding={1}
          >
            <Typography variant={"h6"} paddingLeft={1} fontWeight={"bold"}>
              Update Commissions
            </Typography>{" "}
            {/* <IconButton
        size="small"
        color="error"
        onClick={() => {
          setOpenCommission(false);
        }}
      >
        <Cancel />
      </IconButton> */}
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
              label="commission"
              name="commission"
              value={updateInfo.commission}
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
              onClick={() => {
                setOpenCommission(false);
                setUpdateInfo({});
              }}
            >
              <Typography textTransform={"none"} fontSize={12}>
                Cancel
              </Typography>
            </Button>
            <Button
              size="small"
              color={"success"}
              variant="contained"
              onClick={saveUpdate}
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
        bgcolor={grey[100]}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          width={"100%"}
          //  bgcolor ={teal[300]}
        >
          <Button
            size="small"
            // color="success"
            variant="text"
            onClick={(e) => editAccLimit(e, user.acc_limit_created)}
          >
            <Typography
              paddingLeft={1}
              fontWeight={"bold"}
              textAlign="center"
              color={"black"}
              paddingRight={1}
              textTransform="none"
            >
              Acc Limitation
            </Typography>
            <Edit sx={{ color: "black" }} fontSize="14" />
          </Button>
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
            <Typography>Opened</Typography>
            <Typography>Limit</Typography>
          </Stack>
          <Stack>
            <Typography fontWeight={"bold"} color={"#00c853"}>
              {user.acc_created_count ? user.acc_created_count : 0}
            </Typography>
            <Typography fontWeight={"bold"} color="error">
              {user.acc_limit_created}
            </Typography>
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
              onClick={() => {
                setOpenAccLimit(false);
              }}
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
              onClick={() => {
                setOpenAccLimit(false);
                setUpdateInfo({});
              }}
            >
              <Typography textTransform={"none"} fontSize={12}>
                Cancel
              </Typography>
            </Button>
            <Button
              size="small"
              color={"success"}
              variant="contained"
              onClick={saveUpdate}
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
        bgcolor={grey[100]}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          width={"100%"}
          //  bgcolor ={teal[300]}
        >
          <Button
            size="small"
            // color="success"
            variant="text"
            onClick={(e) =>
              editHotLimit(e, user.hot_limit, user.superhot_limit)
            }
          >
            <Typography
              paddingLeft={1}
              fontWeight={"bold"}
              textAlign="center"
              color={"black"}
              paddingRight={1}
              textTransform="none"
            >
              Hot Limitation
            </Typography>
            <Edit sx={{ color: "black" }} fontSize="14" />
          </Button>
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
            <Typography>hot Limit :</Typography>
            <Typography>super hot Limit :</Typography>
          </Stack>
          <Stack>
            <Typography fontWeight={"bold"} color={"error"}>
              {user.hot_limit ? user.hot_limit : 0}
            </Typography>
            <Typography fontWeight={"bold"} color="error">
              {user.superhot_limit ? user.superhot_limit : 0}
            </Typography>
          </Stack>
        </Stack>
        <ModalBox open={openHotLimit} setOpen={setOpenHotLimit}>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            borderBottom={0.1}
            width={"100%"}
            borderColor={grey[300]}
            // padding={1}
          >
            <Typography variant={"h6"} paddingLeft={1} fontWeight={"bold"}>
              Update Hot Limit
            </Typography>{" "}
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setOpenHotLimit(false);
              }}
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
              label="hot limit"
              name="hot_limit"
              value={updateInfo.hot_limit}
              onChange={onChangeHandler}
            />
            <TextField
              size="small"
              color="secondary"
              label="super hot limit"
              name="superhot_limit"
              value={updateInfo.superhot_limit}
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
              onClick={() => {
                setOpenHotLimit(false);
                setUpdateInfo({});
              }}
            >
              <Typography textTransform={"none"} fontSize={12}>
                Cancel
              </Typography>
            </Button>
            <Button
              size="small"
              color={"success"}
              variant="contained"
              onClick={saveUpdate}
            >
              <Typography textTransform={"none"} fontSize={12}>
                Save
              </Typography>
            </Button>
          </Stack>
        </ModalBox>
      </Stack>
    </>
  );
  const transcation = (
    <Stack
      direction={"column"}
      height={"100vh"}
      boxShadow="1"
      spacing={2}
      borderColor={grey[300]}
      padding={1}
    >
      <Stack direction={"column"} width="100%">
        <Typography variant="div">
          In{" "}
          <span style={{ color: "blue", fontWeight: "bold" }}>
            {memberView.inTotal}
          </span>
        </Typography>
        <Typography variant="div">
          Out <span style={{ color: "blue", fontWeight: "bold" }}>{memberView.outTotal}</span>
        </Typography>
        {/* <Typography variant="div">
          Commission{" "}
          <span style={{ color: "blue", fontWeight: "bold" }}>-</span>
        </Typography> */}
      </Stack>
      <Stack direction={"column"} spacing={1}>
        <Typography>
          MemberOpened{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>
            {user.acc_created_count ? user.acc_created_count : 0}
          </span>
        </Typography>
        <Stack
          direction={"column"}
          maxHeight="200px"
          overflow="scroll"
          // spacing={1}
          border={1}
          borderColor={grey[300]}
          padding={1}
        >
          {[...memberView.inData].map((x) => {
            return (
              <Stack
                direction={"row"}
                padding={0.5}
                justifyContent="space-between"
                borderBottom={1}
                borderColor={grey[300]}
              >
                <Typography fontSize={14} fontWeight="bold">
                  {x.username}
                </Typography>
                {/* <Typography fontSize={14} fontWeight="bold" color={"green"}>
                  In
                </Typography> */}
                <Typography fontSize={14} fontWeight="bold" color="blue">
                  {x.totalIn}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      <Stack direction={"column"} spacing={1}>
        <Typography>
          Customers{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>{memberView.outData.length}</span>
        </Typography>
        <Stack
          direction={"column"}
          maxHeight="200px"
          overflow="scroll"
          border={1}
          borderColor={grey[300]}
          padding={1}
        >
          {[...memberView.outData].map((x) => {
            return (
              <Stack
                direction={"row"}
                padding={0.5}
                justifyContent="space-between"
                borderBottom={1}
                borderColor={grey[300]}
              >
                <Typography fontSize={14} fontWeight="bold">
                  {x.name}
                </Typography>
                {/* <Typography fontSize={14} fontWeight="bold" color={"green"}>
                  In
                </Typography> */}
                <Typography fontSize={14} fontWeight="bold" color="blue">
                  {x.totalOut}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      {/* </Stack> */}
    </Stack>
  );
  return (
    <>
      <Stack
        spacing={1}
        direction="column"
        alignItems={"center"}
        padding={1}
        // bgcolor={teal[100]}
        // height='500px'
      >
        <Tabbar memberDetail={memberDetail} transcation={transcation} />
      </Stack>
    </>
  );
};

export default MemberDetail;
