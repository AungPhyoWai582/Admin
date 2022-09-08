import { TextField, Stack, Chip } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";

const BetCom = ({
  style,
  label,
  onChange,
  onKeyDown,
  onFocus,
  autoFocus,
  inputRef,
  inputProps,
  name,
  value,
  required,
  type,
  sx,
  children,
}) => {
  return (
    <Stack sx={style}>
      <TextField
        display={sx}
        type={type}
        name={name}
        value={value}
        required={required}
        variant={"outlined"}
        onChange={onChange}
        onKeyDown={onKeyDown}
        label={label}
        inputRef={inputRef}
        inputProps={inputProps}
        autoFocus={autoFocus}
        size={"small"}
        onFocus={onFocus}
      ></TextField>
      {children}
    </Stack>
  );
};

export default BetCom;
