import "../App.css";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const { ID, count, name, time, numbers, totalAmount } = location.state;
  // const printReceipt = () => {
  //   window.print();
  // };

  const componentRef = useRef();

  const printReceipt = useReactToPrint({
    content: () => componentRef.current,
    // documentTitle: "2d slip",
    // onAfterPrint: () => alert("Print Success"),
  });

  console.log(name, ID, time,numbers,totalAmount);
  const r = () => {};
  return (
    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-1idn90j-MuiGrid-root">
      <div className="App" ref={componentRef} style={{ width: "219px" }}>
        <div style={{ padding: "20px", width: "100%", justifyItems: "center" }}>
          <table>
            <thead>
              <tr>
                <td style={{ fontWeight: "bold" }}>id : </td>
                {/* <td>{data.id}</td> */}
                <td>{ID}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>name : </td>
                {/* <td>{data.name}</td> */}
                <td>{name}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>numbers : </td>
                <td>{count.toString()}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>time : </td>
                {/* <td>{data.time}</td> */}
                <td>{time}</td>
              </tr>
            </thead>

            <tbody>
              {numbers.map((num,key) => (
                <tr key={key}>
                  <td
                    style={{
                      width: "50%",
                      border: "1px solid black",
                      textAlign: "left",
                      paddingLeft: "20px",
                      border: "1px solid black",
                    }}
                  >
                    {num.number}
                  </td>
                  <td
                   style={{
                    width: "50%",
                    border: "1px solid black",
                    textAlign: "right",
                    paddingLeft: "20px",
                    border: "1px solid black",
                    // style={{
                    //   textAlign: "right",
                    //   paddingRight: "20px",
                    //   border: "1px solid black",
                    }}
                  >
                    {num.amount}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* <tfoot>
              <tr>
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    paddingLeft: "20px",
                    border: "1px solid black",
                  }}
                >
                  Total
                </td>
                <td
                  style={{
                    textAlign: "left",
                    paddingRight: "20px",
                    border: "1px solid black",
                  }}
                >
                  {totalAmount}
                </td>
              </tr>
            </tfoot> */}
          </table>
          <div style={{display: "flex",justifyContent: "space-between"}}>
            <h3>Total :</h3><h3>{totalAmount}</h3>
          </div>
          <h3>Thank for your support</h3>
          {/* </div> */}

          {/* </div> */}
          <button className="hide-on-print" onClick={printReceipt}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
