// import { Typography } from "@mui/material";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { Box } from "@mui/system";
import { Typography } from "antd";
import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Print = ({ setPrintCtrl }) => {
  const location = useLocation();
  const { ID, count, name, time, numbers, totalAmount } = location.state;
  const componentRef = useRef();
  // const printReceipt = () => {
  // var printContents = document.getElementById('printArea').innerHTML;
  // var originalContents = document.body.innerHTML;

  // document.body.innerHTML = printContents;

  // window.print();

  // document.body.innerHTML = originalContents;
  // };

  // console.log(window.location.pathname)

  useEffect(() => {
    if (window.location.pathname.toString() === "/print") {
      setPrintCtrl(true);
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // documentTitle: "2d slip",
    // onAfterPrint: () => alert("Print Success"),
  });

  const data = [
    { number: "56", amount: "5000" },
    { number: "87", amount: "5000" },
    { number: "42", amount: "5000" },
    { number: "12", amount: "5000" },
    { number: "53", amount: "5000" },
    { number: "55", amount: "5000" },
    { number: "88", amount: "5000" },
    { number: "66", amount: "5000" },
  ];

  return (
    <>
      {/* <div ref={componentRef} id="printArea"> */}
      {/* <div
        ref={componentRef}
        className="print-container"
        style={{ margin: "0 auto", padding: "5px",width:'300px',backgroundColor:'green' }}
      >
        <div>
          <div style={{ display: "flex" }}>
            <div>id : </div>
            <div>{ID}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div>name : </div>
            <div>{name}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div>numbers : </div>
            <div>{count}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div>time : </div>
            <div>{time}</div>
          </div>
        </div>
       <div  style={{backgroundColor:'red'}} /> */}
        {/* <table style={{width:'100%',backgroundColor:'red'}}
        >
          {data.map((num) => (
          <tr
            style={{  
              backgroundColor:"grey !important",
              display: "flex !important",
              justifyContent: "space-around !important",
              width: "100% !important",
            
            }}
          >
            <td  style={{width:'50% !important',textAlign:'right !mportant'}}>{num.number.toString()}</td>
            <td style={{width:'50% !important',textAlign:'left !important'}}>{num.amount.toString()}</td>
          </tr>))}
        </table> */}
        {/* <div style={{border:'1px solid gray'}}>
          {data.map(num=>{
            return (<div >
              <td style={{width:'500px',paddingLeft:'5px',textAlign:'center'}}>{num.number.toString()}</td>
              <td style={{width:'500px',paddingLeft:'5px',textAlign:'center'}}>{num.amount.toString()}</td>
            </div>)
          })}
          <div >
              <td style={{width:'500px',paddingLeft:'5px',textAlign:'center'}}>Total</td>
              <td style={{width:'500px',paddingLeft:'5px',textAlign:'center'}}>{data.reduce((acc,cur)=>acc+Number(cur.amount),0)}</td>
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Thank</h3>
        </div>
      </div> */}
      <Box ref={componentRef} sx={{display: 'none', displayPrint: 'block'}}>
        <Typography>1234567890</Typography>
      </Box>
      <button onClick={handlePrint}>Print</button>
    </>
  );
};

export default Print;
