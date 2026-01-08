import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const MuiDataTable = ({
  columns,
  rows,
  loading,
  rowCount,
  paginationModel,
  onPaginationModelChange,
}) => {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        rowCount={rowCount}
        paginationMode="server"   // 🔥 VERY IMPORTANT
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
        }}
      />
    </div>
  );
};

export default MuiDataTable;
