import "../App.css";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const { ID, count, name, time, numbers, totalAmount } = location.state;
  const data = {
    id: 1234556,
    name: "yya",
    numbers: 25,
    time: "18:00pm 12/12/2022",
    betList: [
      { number: "56", amount: "1500" },
      { number: "65", amount: "1500" },
      { number: "66", amount: "2000" },
      { number: "56", amount: "1500" },
      { number: "65", amount: "1500" },
      { number: "66", amount: "2000" },
      { number: "56", amount: "1500" },
      { number: "65", amount: "1500" },
      { number: "66", amount: "2000" },
      { number: "56", amount: "1500" },
      { number: "65", amount: "1500" },
      { number: "66", amount: "2000" },
      { number: "56", amount: "1500" },
      { number: "65", amount: "1500" },
      { number: "66", amount: "2000" },
      { number: "56", amount: "1500" },
      { number: "65", amount: "1500" },
      { number: "66", amount: "2000" },
      { number: "56", amount: "1500" },
      { number: "65", amount: "1500" },
      { number: "66", amount: "2000" },
      { number: "56", amount: "1500" },
      { number: "65", amount: "1500" },
      { number: "66", amount: "2000" },
    ],
  };

  const calls = [
    { number: "65", amount: "1500" },
    { number: "56", amount: "1500" },
    { number: "68", amount: "3000" },
    { number: "86", amount: "3000" },
    { number: "65", amount: "2000" },
    { number: "90", amount: "1500" },
    { number: "80", amount: "1500" },
  ];
  const remark = [
    { number: "65", amount: "1500" },
    { number: "56", amount: "1500" },
    { number: "68", amount: "3000" },
    { number: "86", amount: "3000" },
  ];
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
                <td>{count}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>time : </td>
                {/* <td>{data.time}</td> */}
                <td>{time}</td>
              </tr>
            </thead>

            <tbody>
              {numbers.map((num) => (
                <tr>
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
                      textAlign: "left",
                      paddingRight: "20px",
                      border: "1px solid black",
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
            <h3>Total: {totalAmount}</h3>
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
