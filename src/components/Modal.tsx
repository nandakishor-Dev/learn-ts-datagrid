import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { UserValues, Role } from "../types";
import TextFieldComponent from "./TextFieldComponent";

export type EditModalProps= {
  open: boolean;
  onClose: () => void;
  initialValues: UserValues;
  onSave: (newValue: UserValues) => void;
  children?: React.ReactNode;
  width: string | number;
}

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  width: 370,
  outline: "none",
};
const roles: Role[] = ["Admin", "Editor", "Viewer"];
const EditModal = ({
  open,
  onClose,
  initialValues,
  onSave,
  width,
}: EditModalProps) => {
  const [values, setValues] = useState<UserValues>(initialValues);
  useEffect(() => {
    if (open) setValues(initialValues);
  }, [open, initialValues]);
  const isValidEmail = (email: string) =>
    // simple email regex for basic validation
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleChange =
    (field: keyof UserValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleRoleChange = (e: SelectChangeEvent<Role>) => {
    setValues((prev) => ({ ...prev, role: e.target.value as Role }));
  };

  const handleSave = () => {
    // Trim name/email
    const cleaned = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
    };
    onSave(cleaned);
    onClose();
  };

  const nameEmpty = values.name.trim().length === 0;
  const emailInvalid = !isValidEmail(values.email.trim());

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...boxStyle, width: width ?? boxStyle.width }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography id="edit-modal-title" variant="h6">
            Edit user details
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Stack spacing={2}>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }} spacing={2}>
            <FormLabel>Name</FormLabel>
            <TextFieldComponent
              fullWidth={true}
              value={values.name}
              onChange={handleChange("name")}
              variant="outlined"
              size="small"
              autoFocus
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }} spacing={2}>
            <FormLabel>Email</FormLabel>
            <TextFieldComponent
              fullWidth={true}
              value={values.email}
              onChange={handleChange("email")}
              variant="outlined"
              size="small"
              autoFocus
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, lg: 6 }}
            sx={{ display: "flex", flexDirection: "column" }}
            spacing={2}
          >
            <FormLabel>Role</FormLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={values.role}
              label="Role"
              onChange={handleRoleChange}
              sx={{ width: "150px" }}
            >
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Stack>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
        >
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={nameEmpty || emailInvalid}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
