// CenteredLoader.jsx
import React from "react";
import { CircularProgress } from "@mui/material";

const CenteredLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" size={50} />
    </div>
  );
};

export default CenteredLoader;
