import React, { useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { entrySchema } from "./schemas/schema.entry";
import { MODAL_MODE } from "../../constants";
import type { ModalModeType } from "../../types/global";

const ENTRY_TYPES = [
  { value: "debit", label: "Debit" },
  { value: "credit", label: "Credit" },
] as const;

const SUB_LEDGER_ACCOUNTS = [
  { value: "customer", label: "Customer" },
  { value: "vendor", label: "Vendor" },
  { value: "employee", label: "Employee" },
] as const;

const DIVISIONS = [
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "hq", label: "Head Office" },
] as const;

const CURRENCIES = [{ value: "KWD", label: "KWD" }] as const;

type FormValues = z.infer<typeof entrySchema>;
type RowValues = FormValues & { id: string };
export type ModalProps = {
  open: boolean;
  mode: ModalModeType;
  onClose: () => void;
  onSave: (payload: RowValues) => void;
  selectedRow: RowValues | null;
  width: string | number;
};

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
const createEmptyValues = (): FormValues => ({
  entryType: "",
  glAccount: "",
  txnSequence: 0,
  subLedgerAccount: "",
  narrative: "",
  division: "",
  txnAmount: 0,
  currency: "",
  foreignAmount: 0,
});
const CreateTransactionModal = ({
  open,
  mode,
  onClose,
  width,
  onSave,
  selectedRow,
}: ModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: createEmptyValues(),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (mode === MODAL_MODE.ADD) {
      const id = crypto?.randomUUID?.() ?? `${Date.now()}`;
      onSave({ id, ...data });
    } else {
      const id = crypto?.randomUUID?.() ?? `${Date.now()}`;
      onSave({ id, ...data });
    }
    handleClose();
  };
  // close and reset the form
  const handleClose = () => {
    reset();
    onClose();
  };

  const parseNumber = (v: string) => (v === "" ? NaN : Number(v));
  useEffect(() => {
    if (mode === MODAL_MODE.ADD) {
      reset(createEmptyValues());
    } else {
      reset(selectedRow ?? createEmptyValues(), { keepDirty: false });
    }
  }, [open, selectedRow, reset,mode]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <Box sx={{ ...boxStyle, width: width ?? boxStyle.width }}> */}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          ...boxStyle,
          width: width ?? boxStyle.width,
        }}
      >
        <Typography variant="h6" gutterBottom pb={2}>
          Create Transaction
        </Typography>

        <Grid container rowSpacing={3} columnSpacing={3}>
          {/* Entry Type (select) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="entryType"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Entry Type"
                  size="small"
                  fullWidth
                  error={!!errors.entryType}
                  helperText={errors.entryType?.message}
                >
                  {ENTRY_TYPES.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* GL Account */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="glAccount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="GL Account"
                  size="small"
                  fullWidth
                  placeholder="e.g. 500010 - Cash"
                  error={!!errors.glAccount}
                  helperText={errors.glAccount?.message}
                />
              )}
            />
          </Grid>

          {/* Transaction Sequence (number) */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Controller
              name="txnSequence"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Transaction Sequence"
                  size="small"
                  fullWidth
                  type="number"
                  //   inputProps={{ step: 1, min: 0 }}
                  onChange={(e) => field.onChange(parseNumber(e.target.value))}
                  error={!!errors.txnSequence}
                  helperText={errors.txnSequence?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControlLabel
              label="Auto Compute"
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "#2e7d32",
                    "&.Mui-checked": { color: "#2e7d32" },
                  }}
                />
              }
              sx={{ "& .MuiFormControlLabel-label": { color: "#2e7d32" } }}
            />
          </Grid>

          {/* Sub Ledger Account (select) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="subLedgerAccount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Sub Ledger Account"
                  size="small"
                  fullWidth
                  error={!!errors.subLedgerAccount}
                  helperText={errors.subLedgerAccount?.message}
                >
                  {SUB_LEDGER_ACCOUNTS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Narrative (multiline) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="narrative"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Narrative"
                  size="small"
                  fullWidth
                  placeholder="Optional notes"
                  error={!!errors.narrative}
                  helperText={errors.narrative?.message}
                />
              )}
            />
          </Grid>

          {/* Division (select) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="division"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Division"
                  size="small"
                  fullWidth
                  error={!!errors.division}
                  helperText={errors.division?.message}
                >
                  {DIVISIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Transaction Amount (number) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="txnAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Transaction Amount"
                  size="small"
                  fullWidth
                  type="number"
                  //   inputProps={{ min: 0, step: "0.01" }}
                  onChange={(e) => field.onChange(parseNumber(e.target.value))}
                  error={!!errors.txnAmount}
                  helperText={errors.txnAmount?.message}
                />
              )}
            />
          </Grid>

          {/* Currency (select) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Currency"
                  size="small"
                  fullWidth
                  error={!!errors.currency}
                  helperText={errors.currency?.message}
                >
                  {CURRENCIES.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Foreign Currency Amount (optional number) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="foreignAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Foreign Currency Amount"
                  size="small"
                  fullWidth
                  type="number"
                  //   inputProps={{ min: 0, step: "0.01" }}
                  onChange={(e) => field.onChange(parseNumber(e.target.value))}
                  error={!!errors.foreignAmount}
                  helperText={errors.foreignAmount?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          {mode === MODAL_MODE.EDIT ? (
            <Button
              type="submit"
              variant="outlined"
              sx={{ bgcolor: "green", color: "white" }}
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Update
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outlined"
              sx={{ bgcolor: "green", color: "white" }}
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          )}
        </Stack>
      </Box>
      {/* </Box> */}
    </Modal>
  );
};

export default CreateTransactionModal;
