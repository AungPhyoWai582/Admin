import { Close } from "@mui/icons-material";
import { Dialog, IconButton, Modal, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const ExportPDFModal = ({ open, setOpen }) => {
  return (
    <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
      <Stack>
        <Stack direction={"row"} justifyContent={"end"}>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Stack>
        <Stack>
          <Typography variant="h6" textAlign={"center"} fontWeight={600}>
            Lager PDF
          </Typography>
          <Stack>
            <DataGrid />
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ExportPDFModal;
