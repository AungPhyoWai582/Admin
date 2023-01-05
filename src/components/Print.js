import { Typography } from "@mui/material";
import React from "react";

const Print = ({
  componentRef,
  ID,
  count,
  name,
  time,
  numbers,
  totalAmount,
}) => {
  return (
    <div ref={componentRef} style={{ fontFamily: "sans-serif", fontSize: 20 }}>
      {/* <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ width: "100%" }}>
            <th style={{ textAlign: "left" }}>id : </th>
            <th style={{ textAlign: "left" }}>{1234455}</th>
          </tr>
          <tr style={{ width: "100%" }}>
            <th style={{ textAlign: "left" }}>name : </th>
            <th style={{ textAlign: "left" }}>{'yya'}</th>
          </tr>
          <tr style={{ width: "100%" }}>
            <th style={{ textAlign: "left" }}>numbers : </th>
            <th style={{ textAlign: "left" }}>25</th>
          </tr>
          <tr style={{ width: "100%" }}>
            <th style={{ textAlign: "left" }}>time : </th>
            <th style={{ textAlign: "left" }}>12:pm</th>
          </tr>
          <tr style={{ width: "100%" }}>
            <th style={{ textAlign: "left" }}>Number</th>
            <th style={{ textAlign: "left" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ width: "100%" }}>
            <td>57</td>
            <td>1000</td>
          </tr>
        </tbody>
        <tfoot>
          <tr style={{ width: "100%" }}>
            <td>Thanks</td>
          </tr>
        </tfoot>
      </table> */}
      {/* <div style={{margin:'5px',padding:"5px"}}>
      
        <div style={{ marginTop: "5px", padding: "1px" }}>
          <table
            style={{
              border: "1px solid black",
              borderCollapse: "collapse",
              // marginLeft: "auto",
              // marginRight: "auto",
            }}
          >
            <thead>
              <tr style={{ fontSize: 18 }}>
                <th style={{ fontWeight:'bold',textAlign: "left" }}>id : </th>
                <th style={{ textAlign: "left" }}>{ID.toString()}</th>
              </tr>
              <tr style={{ fontSize: 18 }}>
                <th style={{ fontWeight:'bold',textAlign: "left" }}>name : </th>
                <th style={{ textAlign: "left" }}>{name.toString()}</th>
              </tr>
              <tr style={{ fontSize: 18 }}>
                <th style={{fontWeight:'bold', textAlign: "left" }}>time : </th>
                <th style={{ textAlign: "left" }}>{time.toString()}</th>
              </tr>
              <tr style={{ fontSize: 18 }}>
                <th style={{fontWeight:'bold', textAlign: "left" }}>numbers : </th>
                <th style={{ textAlign: "left" }}>{count.toString()}</th>
              </tr>
            </thead>
            <thead>
              <tr style={{ fontSize: 18 }}>
                <th style={{fontWeight:'bolder', textAlign: "left" }}>No</th>
                <th style={{ fontWeight:'bolder',textAlign: "left" }}>Amount</th>
              </tr>
            </thead>

            <tbody>
              {numbers.map((num) => (
                <tr style={{ fontWeight: "bold" }}>
                  <td style={{ textAlign: "center" }}>{num.number.toString()}</td>
                  <td style={{ textAlign: "center" }}>{num.amount.toString()}</td>
                </tr>
              ))}
              
            </tbody>
            <tfoot>
              <tr
                style={{
                  // textAlign: "center",
                  fontSize: 20,
                  // fontWeight: "bolder",
                }}
              >
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: "bolder",
                  }}
                >
                  Total 
                </td>
                <td style={{ fontWeight:'bold',textAlign: "left" }}>{totalAmount.toString()}</td>
              </tr>

              <tr style={{ columnSpan: 2 }}>
                <td>
                  <h3 style={{ marginTop: "20px", fontWeight: "bolder" }}>
                    Thanks.
                  </h3>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default Print;
