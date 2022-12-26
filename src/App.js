import logo from "./logo.svg";
// import "./App.css";
import "antd/dist/antd.css";
import Dashboard from "./layout/Dashboard";
import { Container, Stack, Button, Grid } from "@mui/material";
import MuiAppBar from "./components/AppTopbar";
import { teal } from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom";
import Print from "./components/Print";
// import { LocalizationProvider } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";

function App() {
  return (
    <BrowserRouter>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
      <Dashboard />
      {/* <Print /> */}
      {/* </LocalizationProvider> */}
    </BrowserRouter>
  );
}

export default App;
