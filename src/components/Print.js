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
    <div ref={componentRef} style={{ width: "100%" }}>
      <div style={{ width: "70%", margin: "0 auto" }}>
        <div style={{ padding: "1px" }}>
          <span style={{ fontWeight: "bold", display: "block" }}>
            Id : {ID}
          </span>
          <span style={{ fontWeight: "bold", display: "block" }}>
            Name : {name}
          </span>
          <span style={{ fontWeight: "bold", display: "block" }}>
            Time : {time}
          </span>
          <span style={{ fontWeight: "bold", display: "block" }}>
            Numbers : {count}
          </span>
        </div>
        <div style={{ marginTop:'5px',padding: "1px" }}>
          <table style={{ border: "none", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ fontWeight: "bold", fontSize: 18 }}>
                <th style={{ textAlign: "center" }}>No</th>
                <th style={{ textAlign: "center" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {numbers.map((num) => (
                <tr style={{ textAlign: "center", fontWeight: "bold" }}>
                  <td style={{ textAlign: "center" }}>{num.number}</td>
                  <td style={{ textAlign: "center" }}>{num.amount}</td>
                </tr>
              ))}
              {/* <tr>
                <td style={{ textAlign: "center" }}>
                  57
                </td>
                <td style={{ textAlign: "center" }}>
                  5000
                </td>
              </tr> */}
            </tbody>
            <tfoot>
              <tr
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Total -
                </td>
                <td style={{ textAlign: "center" }}>{totalAmount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <h3 style={{ width: "60%", margin: "0 auto" ,fontWeight:'bold'}}>
          အားပေးမှုအတွက် Thanks.
        </h3>
      </div>
    </div>
  );
};

export default Print;
