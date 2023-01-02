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
      <div>
      
        <div style={{ marginTop: "5px", padding: "1px" }}>
          <table
            style={{
              border: "1px solid black",
              borderCollapse: "collapse",
              marginLeft: "auto",
              marginRight: "auto",
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
                  <td style={{ textAlign: "left" }}>{num.number.toString()}</td>
                  <td style={{ textAlign: "left" }}>{num.amount.toString()}</td>
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
      </div>
    </div>
  );
};

export default Print;
