import { Edit } from "@mui/icons-material";
import { IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useLocation } from "react-router-dom";

const MemberDetail = () => {
  const location = useLocation();
  const { user } = location.state;

  console.log(user);
  return (
    <Stack spacing={1} direction="column" alignItems={"center"} paddingTop={1}>
      <Stack
        direction={"column"}
        width={{ xs: "90%", sm: "90%", md: "75%", xl: "50%" }}
        margin={"auto"}
        // padding={2}
        // borderBottom={0.1}
        boxShadow={1}
        // borderColor={grey[300]}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          // borderBottom={0.1}
          width={"100%"}
          bgcolor={grey[300]}
          // padding={1}
        >
          <Typography variant={"h6"} paddingLeft={1} fontWeight={"bold"}>
            Basic Info
          </Typography>{" "}
          <IconButton size="small" color="success">
            <Edit />
          </IconButton>
        </Stack>
        <Stack
          direction={"row"}
          spacing={5}
          // justifyContent="space-between"
          bgcolor={"white"}
          padding={1}
          width={{ xs: "100%", sm: "100%", md: "75%", xl: "50%" }}
          // margin={"auto"}
        >
          <Stack>
            <Typography fontWeight={"bold"}>username</Typography>
            <Typography fontWeight={"bold"}>name</Typography>
            <Typography fontWeight={"bold"}>phone</Typography>
            <Typography fontWeight={"bold"}>role</Typography>
            <Typography fontWeight={"bold"}>divider</Typography>
          </Stack>
          <Stack>
            <Typography>{user.username}</Typography>
            <Typography>{user.name}</Typography>
            <Typography>{user.phone}</Typography>
            <Typography>{user.role}</Typography>
            <Typography>{user.divider}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"column"}
        width={{ xs: "90%", sm: "90%", md: "75%", xl: "50%" }}
        margin={"auto"}
        // padding={2}
        // borderBottom={0.1}
        boxShadow={1}
        // borderColor={grey[300]}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          // borderBottom={0.1}
          width={"100%"}
          bgcolor={grey[300]}
          // padding={1}
        >
          <Typography variant={"h6"} paddingLeft={1} fontWeight={"bold"}>
            Acc Limitation
          </Typography>{" "}
          <IconButton size="small" color="success">
            <Edit />
          </IconButton>
        </Stack>
        <Stack
          direction={"row"}
          spacing={5}
          // justifyContent="space-between"
          bgcolor={"white"}
          padding={1}
          width={{ xs: "100%", sm: "100%", md: "75%", xl: "50%" }}
          // margin={"auto"}
        >
          <Stack>
            <Typography fontWeight={"bold"}>Acc</Typography>
            <Typography fontWeight={"bold"}>break</Typography>
          </Stack>
          <Stack>
            <Typography>
              {user.acc_created_count ? user.acc_created_count : 0}
            </Typography>
            <Typography>{user.acc_limit_created}</Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* <Stack padding={2}>
        <Stack>
          <Typography variant={"h6"}>Limitations</Typography>
        </Stack>
        <Stack bgcolor={"white"} padding={1} width={"50%"} margin={"auto"}>
          <Stack direction={"row"} justifyContent="space-between" spacing={5}>
            <Typography fontWeight={"bold"}>Acc Limits</Typography>
            <Typography fontWeight={"bold"}>
              Acc : <span style={{ color: "red", fontSize: 18 }}>8</span>
            </Typography>
            <Typography align="center">
              <TextField color="success" value={19} variant="standard" />
              5
              <IconButton size="small" color="success">
                <Edit fontSize="18" />
              </IconButton>
            </Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="flex-start" spacing={1}>
            <Typography fontWeight={"bold"}>HOTS</Typography>
            <Typography></Typography>
          </Stack>
        </Stack>
      </Stack> */}
    </Stack>
  );
};

export default MemberDetail;
