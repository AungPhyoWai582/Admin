import { Typography } from "@mui/material";
import React from "react";

const Print = ({componentRef,ID,name,time,numbers,totalAmount}) => {
    return(
        <div ref={componentRef}>
            <div style={{borderBottom:'1px solid black'}}>
                <Typography variant="h6" fontWeight={'bold'}>Id : {ID}</Typography>
                <Typography variant="h6" fontWeight={'bold'}>Name : {name}</Typography>
                <Typography variant="h6" fontWeight={'bold'}>Time : {time}</Typography>
            </div>
            <div>
                <table>
                    {/* <thead>
                        <tr>
                            <th>No</th><th>Amount</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {numbers.map(num=> <tr>
                            <td>{num.number}</td><td>{num.amount}</td>
                        </tr>)}
                       
                    </tbody>
                    <tfoot style={{borderTop:'1px solid black',fontWeight:'bold'}}>
                        <tr>
                            <td>Total</td><td>{totalAmount}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Print;