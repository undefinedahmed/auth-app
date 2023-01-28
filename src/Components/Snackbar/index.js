import { Alert, Snackbar } from "@mui/material";
import React from "react";

const CustomSnackbar = ({
  open,
  close,
  type,
  message = "Something Went Wrong",
}) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={close}>
      <Alert onClose={close} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
