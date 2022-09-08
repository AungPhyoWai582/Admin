import { Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  Stack,
  Typography,
  useScrollTrigger,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../shared/Axios";
import CallComponent from "./CallComponent";
import CallListComponent from "./CallListComponent";

const CallsList = () => {
  const { lotteryId } = useParams();

  const [call, setCall] = useState([]);

  useEffect(() => {
    Axios.get(`/call/${lotteryId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data);
      setCall(res.data.data);
    });
  }, []);

  // const [subopen, setSubopen] = useState({
  //   key: null,
  //   checked: null,
  // });
  // const subMember = (e, key) => {
  //   setSubopen({ key: key, checked: !subopen.checked });
  // };
  // console.log(subopen);
  return (
    <Stack
      width={{ xs: "100%", md: "50%" }}
      margin={{ md: "auto" }}
      //   component={"table"}
      //   boxShadow={1}
      //   padding={1}
      spacing={1}
      //   height={"100vh"}
      //   overflow={"scroll"}
    >
      <TextField
        size="small"
        variant="standard"
        placeholder="search call or id"
        sx={{ width: "50%", marginBottom: 1 }}
      />
      {call &&
        call.map((cal, key) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <CallComponent cal={cal} key={key} />
            </AccordionSummary>
            <AccordionDetails sx={{ maxHeight: 200, overflowY: "scroll" }}>
              {cal.numbers &&
                cal.numbers.map((nums, key) => (
                  <CallListComponent nums={nums} key={key} />
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
    </Stack>
  );
};
export default CallsList;
