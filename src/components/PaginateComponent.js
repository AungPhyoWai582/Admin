import { Stack,Typography,Pagination } from "@mui/material";
import React from "react";
import MuiPagination from '@mui/material'
// import { Select } from "antd";

const PaginateComponent = ({page,count,color,handleChangePage,handleChangeRowsPerPage,rowsPerPage}) => {
  return (
    <Stack
      direction="row"
      justifyContent={"end"}
      spacing={1}
      alignItems="center"
      marginTop={2}
    >
      <Pagination
        // component="div"
        page={page}
        color={color}
        count={count}
        onChange={handleChangePage}
      />
      <Typography>Page</Typography>
      {/* <Select
        defaultValue={rowsPerPage}
        style={{ width: 70, textAlign: "center" }}
        onChange={handleChangeRowsPerPage}
        options={[
          // { value: "All", label: "All" },
          { value: "5", label: "5" },
          { value: "10", label: "10" },
          { value: "20", label: "20" },
        ]}
      /> */}
    </Stack>
  );
};
export default PaginateComponent;
