import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const InputRenderer = ({ field, value, onChange, onBlur, error }) => {
  const { name, label, type, required, options, placeholder, autoComplete } = field;

  if (type === "select") {
    return (
      <TextField
        select
        fullWidth
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        error={!!error}
        helperText={error}
        autoComplete={autoComplete}
        margin="normal"
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  return (
    <TextField
      type={type}
      fullWidth
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      error={!!error}
      helperText={error}
      margin="normal"
      autoComplete={field.autoComplete || "on"}
    />
  );
};

export default InputRenderer;
