import {
  Drawer,
  FormControlLabel,
  Stack,
  TextField,
  lotCreate,
  Typography,
  Box,
  Switch,
  Button,
  Radio,
  RadioGroup,
} from "@mui/material";
import { green, red, teal } from "@mui/material/colors";
import React from "react";

const LotteryCRUD = ({
  setLotCreate,
  lotCreate,
  type,
  open,
  setOpen,
  createLottery,
  switchControll,
  updateLottery,
  AddLottery,
}) => {
  console.log(lotCreate);
  return (
    <Drawer
      anchor="top"
      open={open}
    
      onClose={() => setOpen(false)}
    >
      <Box
        justifyContent={"center"}
        alignSelf={"center"}
        padding={1}
        overflow="auto"
        width={{ xs: "90%", sm: "90%", md: "50%", xl: "50%" }}
      >
        <Typography variant="h6" fontWeight={700} textAlign="center" color={teal[500]}>
          Create Lottery
        </Typography>
        <Stack boxShadow={1}>

        <Stack
            spacing={2}
            padding={1.5}
            direction="row"
            justifyContent={"space-between"}
          >
            <RadioGroup
              row
              name="_time"
              value={lotCreate._time}
              onChange={createLottery}
            >
              <FormControlLabel
                control={<Radio size="small" color="success" />}
                label="AM"
                labelPlacement="start"
                value={"AM"}
              />
              <FormControlLabel
                control={<Radio size="small" color="success" />}
                label="PM"
                labelPlacement="start"
                value={"PM"}
              />
            </RadioGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={lotCreate.play}
                  name="play"
                  size="small"
                  color="success"
                  onChange={switchControll}
                />
              }
              label="Play"
              labelPlacement="start"
            />
          </Stack>

          <Stack spacing={1.5} padding={1}>
            <Typography variant="caption" fontSize={16}>
              hot_tee
            </Typography>
            <FormControlLabel
              control={
                <TextField
                  color="success"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="hot_tee"
                  sx={{ bgcolor: teal[50] }}
                  value={lotCreate.hot_tee}
                  onChange={createLottery}
                />
              }
            />
          </Stack>

          <Stack spacing={1.5} padding={1}>
            <Typography variant="caption" fontSize={16}>
              pout_tee
            </Typography>
            <FormControlLabel
              control={
                <TextField
                  color="success"
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="pout_tee"
                  sx={{ bgcolor: teal[50] }}
                  value={lotCreate.pout_tee}
                  onChange={createLottery}
                />
              }
            />
          </Stack>

         

          <Stack
            spacing={1.5}
            direction="row"
            justifyContent={"flex-end"}
            padding={1}
          >
            <Button
              onClick={() => {
                setOpen(false);
                setLotCreate({
                  pout_tee: null,
                  hot_tee: [],
                  time: null,
                  play: false,
                });
              }}
              variant="outlined"
              color="error"
            //   sx={{ backgroundColor:green[500], color: red[500] }}
            >
              Cancel
            </Button>

            {type === "add" && (
              <Button
                variant="outlined"
                color="success"
                // sx={{ backgroundColor:green[500], color: red[500] }}
                onClick={AddLottery}
              >
                Create
              </Button>
            )}
            {type === "edit" && (
              <Button
                variant="outlined"
                // sx={{ backgroundColor:green[500], color: red[500] }}
                color="secondary"
                onClick={updateLottery}
              >
                Update
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default LotteryCRUD;
