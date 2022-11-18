import { TextField, Stack, Chip } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";

const BetCom = ({
  textColor,
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
  bgcolor,
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
        sx={{
          "& .MuiInputBase-root": {
            color: textColor,
            bgcolor: bgcolor,
          },
        }}
        // style={{color:'red'}}
        // color='red'
      ></TextField>
      {children}
    </Stack>
  );
};

export default BetCom;
