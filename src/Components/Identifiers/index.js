import React from "react";
import Grid from "@mui/material/Grid";

import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import WifiIcon from "@mui/icons-material/Wifi";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { IconButton } from "@mui/material";

const Identifiers = ({ selectedIdentifier, changeHandler }) => {
  const isThisIconSelected = (name) => {
    return selectedIdentifier === name;
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="space-between"
      marginBottom="1rem"
    >
      <IconButton
        sx={{
          border: isThisIconSelected("mug")
            ? "1px solid #673ab7"
            : "1px solid transparent",
        }}
      >
        <FreeBreakfastIcon
          fontSize="large"
          sx={{ color: isThisIconSelected("mug") && "#673ab7" }}
          onClick={() => {
            changeHandler("mug");
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          border: isThisIconSelected("basketball")
            ? "1px solid #673ab7"
            : "1px solid transparent",
        }}
      >
        <SportsBasketballIcon
          fontSize="large"
          sx={{ color: isThisIconSelected("basketball") && "#673ab7" }}
          onClick={() => {
            changeHandler("basketball");
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          border: isThisIconSelected("helmet")
            ? "1px solid #673ab7"
            : "1px solid transparent",
        }}
      >
        <SportsMotorsportsIcon
          fontSize="large"
          sx={{ color: isThisIconSelected("helmet") && "#673ab7" }}
          onClick={() => {
            changeHandler("helmet");
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          border: isThisIconSelected("wifi")
            ? "1px solid #673ab7"
            : "1px solid transparent",
        }}
      >
        <WifiIcon
          fontSize="large"
          sx={{ color: isThisIconSelected("wifi") && "#673ab7" }}
          onClick={() => {
            changeHandler("wifi");
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          border: isThisIconSelected("plane")
            ? "1px solid #673ab7"
            : "1px solid transparent",
        }}
      >
        <AirplanemodeActiveIcon
          fontSize="large"
          sx={{ color: isThisIconSelected("plane") && "#673ab7" }}
          onClick={() => {
            changeHandler("plane");
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          border: isThisIconSelected("umbrella")
            ? "1px solid #673ab7"
            : "1px solid transparent",
        }}
      >
        <BeachAccessIcon
          fontSize="large"
          sx={{ color: isThisIconSelected("umbrella") && "#673ab7" }}
          onClick={() => {
            changeHandler("umbrella");
          }}
        />
      </IconButton>
    </Grid>
  );
};

export default Identifiers;
