import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, Edit } from "@mui/icons-material";
import EditModal from "../components/Modal";
import type { UserValues } from "../types";
import ConfirmationModal from "../components/ConfirmationModal";

interface Row extends UserValues {
  id: number;
}
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Home() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<User | null>(null);
  const [rows, setRows] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Viewer",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Editor",
    },
    { id: 5, name: "Emily Davis", email: "emily@example.com", role: "Viewer" },
    { id: 6, name: "David Wilson", email: "david@example.com", role: "Admin" },
    {
      id: 7,
      name: "Sophia Martinez",
      email: "sophia@example.com",
      role: "Editor",
    },
    {
      id: 8,
      name: "James Anderson",
      email: "james@example.com",
      role: "Viewer",
    },
    {
      id: 9,
      name: "Olivia Thomas",
      email: "olivia@example.com",
      role: "Admin",
    },
    {
      id: 10,
      name: "Daniel Taylor",
      email: "daniel@example.com",
      role: "Viewer",
    },
    { id: 11, name: "Ava Moore", email: "ava@example.com", role: "Editor" },
    {
      id: 12,
      name: "William Jackson",
      email: "william@example.com",
      role: "Admin",
    },
    {
      id: 13,
      name: "Isabella White",
      email: "isabella@example.com",
      role: "Viewer",
    },
    {
      id: 14,
      name: "Benjamin Harris",
      email: "benjamin@example.com",
      role: "Editor",
    },
    { id: 15, name: "Mia Lewis", email: "mia@example.com", role: "Viewer" },
    { id: 16, name: "Lucas Clark", email: "lucas@example.com", role: "Admin" },
    {
      id: 17,
      name: "Charlotte Young",
      email: "charlotte@example.com",
      role: "Editor",
    },
    {
      id: 18,
      name: "Henry Walker",
      email: "henry@example.com",
      role: "Viewer",
    },
  ]);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const openEdit = (row: Row) => {
    setEditingRow(row);
    setIsEditModalOpen(true);
    handleClose();
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingRow(null);
  };

  const handleSave = (newValues: UserValues) => {
    if (!editingRow) return;
    setRows((prev) =>
      prev.map((r) => (r.id === editingRow.id ? { ...r, ...newValues } : r))
    );
    handleClose();
  };

  const handleDelete = () => {
    setRows((prev) => prev.filter((user) => user.id !== selectedRow?.id));
    handleClose();
  };
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "role", headerName: "Role", flex: 1.2 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (params: GridRenderCellParams<User>) => (
        <IconButton onClick={(e) => handleClick(e, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />

      <Menu
        sx={{
          p: 0.5,
          gap: 0.5,
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => openEdit(selectedRow as Row)}
          sx={{ display: "flex", gap: 3, pl: 2, pr: 5 }}
        >
          <Edit />
          <Typography variant="body1">Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={openDeleteModal}
          sx={{ display: "flex", gap: 3, pl: 2, pr: 5 }}
        >
          <Delete color="warning" />
          <Typography color="red" variant="body1">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
      <EditModal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        initialValues={
          editingRow
            ? {
                name: editingRow.name,
                email: editingRow.email,
                role: editingRow.role,
              }
            : { name: "", email: "", role: "Viewer" }
        }
        onSave={handleSave}
        width={480}
      />
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirmation"
        message={`Are you sure you want to delete this row`}
      />
    </Box>
  );
}
