import React from "react";

const SelectBox = ({ select, setSelect,options }) => {
  return (
    <select
      style={{ padding: "1px",margin:'1px',minWidth:'30px', maxWidth: "150px", height: "25px",textAlign:'center' }}
      name="choice"
      value={select}
      onChange={(e) => setSelect(e.target.value)}
    >
        {
            options.map(opt=>{
                return <option value={opt} selected={opt==="AM"?true:false}>{opt}</option>
            })
        }
    </select>
  );
};

export default SelectBox;
