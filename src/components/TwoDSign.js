import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { createContext, useContext, useState } from "react";
// export { content };
export const TwoDSign = ({ age, setAge }) => {
  const content = createContext(null);
  const handleChange = (e) => {
    setAge(e.target.value);
  };
  console.log(age);

  return (
    // <content.Provider value={age}>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
      <Select
        size="small"
        // labelId="demo-simple-select-autowidth-label"
        // id="demo-simple-select-autowidth"
        value={age}
        onChange={handleChange}
        // autoWidth
        // label="Age"
      >
        <MenuItem value={1}>ဒဲ့</MenuItem>
        <MenuItem value={2}>အာ</MenuItem>
        <MenuItem value={3}>ခွေ</MenuItem>
        <MenuItem value={4}>ထိတ်ပိတ်</MenuItem>
        <MenuItem value={5}>နောက်ပိတ်</MenuItem>
        <MenuItem value={6}>ခွေ</MenuItem>
        <MenuItem value={7}>ခွေ</MenuItem>
        <MenuItem value={8}>ခွေ</MenuItem>
        <MenuItem value={9}>ခွေ</MenuItem>
        <MenuItem value={1}>ခွေ</MenuItem>
        <MenuItem value={11}>ခွေ</MenuItem>
        <MenuItem value={12}>ခွေ</MenuItem>
        <MenuItem value={13}>ခွေ</MenuItem>
        <MenuItem value={14}>ခွေ</MenuItem>
        <MenuItem value={15}>ခွေ</MenuItem>
        <MenuItem value={16}>ခွေ</MenuItem>
      </Select>
    </FormControl>
    // </content.Provider>
  );
};

export default TwoDSign;
