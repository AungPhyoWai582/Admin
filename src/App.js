import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./layout/Dashboard";
import { Container, Stack, Button, Grid } from "@mui/material";
import MuiAppBar from "./components/AppTopbar";
import { teal } from "@mui/material/colors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Print from "./components/Print";
import SelectTime from "./components/SelectTime";
// import { LocalizationProvider } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";

function App() {
  return (
    <>
     <BrowserRouter>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
      <Dashboard />
      {/* <SelectTime /> */}
      {/* </LocalizationProvider> */}
    </BrowserRouter>
    </>
  );
}

export default App;
