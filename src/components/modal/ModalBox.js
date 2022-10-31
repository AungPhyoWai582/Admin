import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ModalBox = ({ children, open, setOpen,setOnchange }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    // bottom: "30%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "90%", md: "50%", xl: "50%" },
    bgcolor: "white",
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={() => {setOpen(false);setOnchange({number:'',amount:''})}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalBox;
