import React from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

export type RowEntry = {
  id: number;
  seqNo: number;
  entryType: string;
  glOrSubLedgerAccount: string;
  amount: number;
  currency: string;
  fcAmount: string;
  narrative: string;
};
type PvListGridProps = {
  clickRow: (row: RowEntry) => void;
};

const PvListGrid = ({ clickRow }: PvListGridProps) => {
  const rows: RowEntry[] = [
    {
      id: 1,
      seqNo: 1,
      entryType: "D",
      glOrSubLedgerAccount: "13000099-123444",
      amount: 7000,
      currency: "KWD",
      fcAmount: "0.00",
      narrative: "Lorem ipsum",
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: RowEntry) => {
    clickRow(row);
  };

  const columns: GridColDef<RowEntry>[] = [
    {
      field: "seqNo",
      headerName: "Seq No",
      width: 130,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "entryType",
      headerName: "Entry Type",
      flex: 1,
      minWidth: 130,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "glOrSubLedgerAccount",
      headerName: "GL/Sub Ledger Account",
      flex: 1.4,
      minWidth: 180,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
      minWidth: 110,
      //   valueFormatter: (params) => params.toLocaleString(),
    },
    {
      field: "currency",
      headerName: "Currency",
      width: 110,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "fcAmount",
      headerName: "FC Amount",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
      //   valueFormatter: (params) => params.value?.toLocaleString(),
    },
    {
      field: "narrative",
      headerName: "Narrative",
      flex: 1,
      minWidth: 130,
      align: "left",
      headerAlign: "left",
    },
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        onRowClick={(params, event) => {
          handleClick(event, params.row);
        }}
        sx={{
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f3f2f2ff",
          },

          // ✅ Remove focus outlines (your existing styles)
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.cell}`]: {
            display: "flex",
            alignItems: "center",
          },
        }}
      />
    </>
  );
};

export default PvListGrid;
