import * as React from "react";
import { TextField, type TextFieldProps } from "@mui/material";


type TextFieldComponentProps = Omit<
  TextFieldProps,
  "value" | "onChange" | "error" | "helperText"
> & {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
};

const TextFieldComponent = ({
  label,
  value,
  onChange,
  error = false,
  helperText = "",
  fullWidth = true,
  size = "small",
  variant = "outlined",
  ...props
}: TextFieldComponentProps) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={error ? helperText : ""}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      {...props}
    />
  );
};

export default TextFieldComponent;
