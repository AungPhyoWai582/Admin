import * as React from 'react';

import Box from '@mui/material/Box';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DatePicker, DateRangePicker } from '@mui/lab';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export default function SelectTime({setStartDate,setEndDate}) {
  const [value, setValue] = React.useState({
    start:null,end:null
  });

  const onChangeHandler = e =>{
    const {name,valueAsDate} = e.target;
    console.log(name,valueAsDate)
    name==="start"?setStartDate(valueAsDate):setEndDate(valueAsDate)
  }

  return (
    <div  className='container' style={{display:'flex',padding:'1px',textAlign:'center'}}>
      <input name="start" style={{padding:'1px',maxWidth:'150px',height:'20px'}} type={'date'} onChange={onChangeHandler} />
      <SwapHorizIcon sx={{textAlign:'center',alignSelf:'center'}} />
      <input name="end" style={{padding:'1px',maxWidth:'150px',height:'20px'}} type={'date'} onChange={onChangeHandler} />
    </div>
  );
}
