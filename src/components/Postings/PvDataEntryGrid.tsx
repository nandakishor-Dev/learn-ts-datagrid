import React from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type z from "zod";
import type { entrySchema } from "./schemas/schema.entry";
import type { ModalModeType } from "../../types/global";
import { MODAL_MODE } from "../../constants";

type FormValues = z.infer<typeof entrySchema>;
type RowEntryType = FormValues & { id: string };
type PvDataEntryGridProps = {
  rows: RowEntryType[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalMode: React.Dispatch<React.SetStateAction<ModalModeType>>;
  onRowClick: (row: RowEntryType) => void;

};
const PvDataEntryGrid = ({ rows,setModalOpen,setModalMode,onRowClick }: PvDataEntryGridProps) => {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [selectedRow, setSelectedRow] = useState<RowEntryType | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    row: RowEntryType
  ) => {
    // setAnchorEl(event.currentTarget);
    // setSelectedRow(row);
    onRowClick(row)
    setModalMode(MODAL_MODE.EDIT)
    setModalOpen(true)
    // eslint-disable-next-line no-debugger
    // debugger;
  };

  const columns: GridColDef<RowEntryType>[] = [
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
      field: "glAccount",
      headerName: "GL/Sub Ledger Account",
      flex: 1.4,
      minWidth: 180,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "txnAmount",
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
      field: "foreignAmount",
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

export default PvDataEntryGrid;
