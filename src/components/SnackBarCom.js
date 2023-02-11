import { Snackbar } from "@mui/material";

import React from "react";

const SnackBarCom = () => {
  return (
    <Snackbar
      // open={alertCtl.status}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={4000}
      // onClose={() => setAlertCtl({ status: false, msg: "" })}
      // action={true}
      // vertical={"top"}
    ></Snackbar>
  );
};

export default SnackBarCom;
