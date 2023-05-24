import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";

const MaxAdd = ({ cusval, maxAddhandle, setMaxAddhandle, sentMaxAdd }) => {
  return (
    <Dialog open={maxAddhandle}>
      <DialogContent>
        Do you want to sent {cusval && cusval.name.toString()}?
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color={"error"}
          onClick={() => setMaxAddhandle(false)}
        >
          Cancel
        </Button>
        <Button size="small" onClick={sentMaxAdd}>
          Sent
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaxAdd;
