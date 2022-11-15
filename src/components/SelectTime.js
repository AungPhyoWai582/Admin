import "antd/dist/antd.css";
import { DatePicker } from "antd";
// import { useState } from "react";
import moment from "moment";
import { Box } from "@mui/material";

const { RangePicker } = DatePicker;

const SelectTime = ({setDates}) => {
  
  return (
      <RangePicker
        onChange={(value) => {
          setDates(value.map(item=>moment(item).format('YYYY-MM-DD')));
        }}
      />
  );
};

export default SelectTime;
