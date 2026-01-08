import React from "react";
import Button from "@mui/material/Button";

const CommonButton = ({
  text,
  type = "button",
  onClick,
  variant = "contained",
  color = "primary",
  fullWidth = false,
  className = "w-32",
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      fullWidth={fullWidth}
      className={className}
      {...props}
    >
      {text}
    </Button>
  );
};

export default CommonButton;
