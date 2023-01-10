import { Typography } from "@mui/material";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Print = () => {
  const location = useLocation();
  const { ID, count, name, time, numbers, totalAmount } = location.state;
  const componentRef = useRef();
  // const printReceipt = () => {
  //   var printContents = document.getElementById('printArea').innerHTML;
  // 		var originalContents = document.body.innerHTML;

  // 		document.body.innerHTML = printContents;

  // 		window.print();

  // 		document.body.innerHTML = originalContents;
  // };

  // console.log(window.location.pathname)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "2d slip",
    onAfterPrint: () => alert("Print Success"),
  });

  return (
    <>
      <div ref={componentRef} id="printArea">
        <div style={{ padding: "20px" }}>
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
        {/* <div>&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;&diams;</div> */}
        <div>
          {numbers.map((num) => (
            <tr
              style={{
                display: "flex",
                flex: "wrap",
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <td style={{ width: "50%" }}>
                <p>{num.number}</p>
              </td>
              <td style={{ width: "50%" }}>{num.amount}</td>
            </tr>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <div style={{ width: "50%" }}> Total</div>
            <div style={{ width: "50%" }}>{totalAmount}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Thank</h3>
        </div>
      </div>
      <button onClick={handlePrint}>Print</button>
    </>
  );
};

export default Print;
