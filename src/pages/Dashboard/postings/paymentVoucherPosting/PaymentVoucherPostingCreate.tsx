import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PvDataEntryGrid from "../../../../components/Postings/PvDataEntryGrid";
import { AddCircleOutline, CalendarMonth } from "@mui/icons-material";
import CreateTransactionModal from "../../../../components/Postings/CreateTransactionModal";
import type z from "zod";
import type { entrySchema } from "../../../../components/Postings/schemas/schema.entry";
import type { ModalModeType } from "../../../../types/global";
import { MODAL_MODE } from "../../../../constants";
import { AppBreadcrumbs } from "../../../../components/common/AppBreadcrumbs";
const ENTRY_TYPES = [{ value: "pvDataEntry", label: "PV Data Entry" }] as const;
type FormValues = z.infer<typeof entrySchema>;
type RowValues = FormValues & { id: string };

type BatchTotalsType = {
  totalDebits: number;
  totalDebitAmount: number;
  totalCredits: number;
  totalCreditAmount: number;
  difference: number;
};
const PaymentVoucherPostingCreate = () => {
  const [rows, setRows] = useState<RowValues[]>([]); //data which pass to grid
  const [batchTotals, setBatchTotals] = useState<BatchTotalsType>(); //data which pass to grid
  const [isTransactionModalOpen, setIsTransactionModalOpen] =
    useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalModeType>(MODAL_MODE.ADD);
  const [selectedRow, setSelectedRow] = useState<RowValues | null>(null);
  // Entry From The Modal Add To Rows
  const handleModalSave = (newEntry: FormValues) => {
    const id = crypto.randomUUID();
    setRows((prev) => [...prev, { seqNo: 1, id, ...newEntry }]);
  };
  const handleModalUpdate = (row: RowValues) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const updatedRows = rows.map((item) =>
      item.id === selectedRow?.id ? { ...item, ...row } : item
    );
    setRows(updatedRows);
  };

  const handleModalClose = () => {
    setIsTransactionModalOpen(false);
  };
  const handleClickRow = (row: RowValues) => {
    setSelectedRow(row);
  };
  const handleAddTransactionClick = () => {
    setIsTransactionModalOpen(true);
    setModalMode(MODAL_MODE.ADD);
  };

  useEffect(() => {
    if (rows.length) {
      const debitsFiltered = rows.filter((ele) => {
        return ele.entryType === "debit";
      });
      let totalDebitAmount = 0;
      if (debitsFiltered.length) {
        totalDebitAmount = debitsFiltered.reduce((total, item) => {
          return total + Number(item.txnAmount);
        }, 0);
      }

      const creditsFiltered = rows.filter((ele) => {
        return ele.entryType === "credit";
      });
      let totalCreditAmount = 0;
      if (creditsFiltered.length) {
        totalCreditAmount = creditsFiltered.reduce((total, item) => {
          return total + Number(item.txnAmount);
        }, 0);
      }
      // // eslint-disable-next-line no-debugger
      // debugger

      const totalDebits = debitsFiltered.length || 0;
      const totalCredits = creditsFiltered.length || 0;
      const difference = Math.abs(totalDebitAmount - totalCreditAmount);

      const batchObject: BatchTotalsType = {
        totalDebits,
        totalDebitAmount,
        totalCredits,
        totalCreditAmount,
        difference,
      };
      setBatchTotals(batchObject);
      // eslint-disable-next-line no-debugger
      // debugger;
    }
  }, [rows]);

  return (
    <Stack spacing={2}>
      {/* Header Section */}
      <Grid container pl={2}>
        <Grid size={{ xs: 5 }}>
          <Stack spacing={2}>
            <Typography fontWeight={600}>
              Payment Voucher (PV) Postings
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <AppBreadcrumbs />
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 3 }} />
        <Grid size={{ xs: 4 }}>
          <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
            <Button variant="outlined" color="success">
              Clear
            </Button>
            <Button
              variant="outlined"
              sx={{ bgcolor: "green", color: "white" }}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box
        p={3}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={2}>
          {/* Form Section */}
          <Box>
            <Stack spacing={2}>
              <Box>
                <Select
                  label="Data Entry type"
                  size="small"
                  fullWidth
                  value={"pvDataEntry"}
                >
                  {ENTRY_TYPES.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>Basic Details</Typography>

                <Button
                  variant="outlined"
                  sx={{ bgcolor: "green", color: "white" }}
                >
                  Copy Journal Entry
                </Button>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={6}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Document Number"
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Date"
                    size="small"
                    fullWidth
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <CalendarMonth />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <TextField variant="outlined" size="small" fullWidth />
                </Grid>
              </Grid>
            </Stack>
          </Box>
          {/* Transaction Entry */}
          <Box>
            <Stack spacing={1}>
              <Box
                bgcolor={"success.light"}
                sx={{ height: "40px" }}
                display={"flex"}
                alignItems={"center"}
                gap={2}
                pl={2}
                pr={2}
              >
                {/* Transaction Entry Add Section */}
                <Typography>Transaction Entry</Typography>
                <Button
                  onClick={handleAddTransactionClick}
                  variant="text"
                  startIcon={<AddCircleOutline color="success" />}
                  sx={{
                    textTransform: "none",
                    bgcolor: "inherit",
                    color: "success",
                    "&:hover": {
                      bgcolor: "green.100",
                    },
                    borderRadius: "8px",
                    px: 1.5,
                    py: 0.5,
                    minWidth: "auto",
                    "& .MuiDataGrid-cell:focus": {
                      outline: "none",
                    },
                    "& .MuiDataGrid-cell:focus-within": {
                      outline: "none",
                    },
                  }}
                >
                  Add
                </Button>
              </Box>
              <Box>
                <PvDataEntryGrid
                  rows={rows}
                  setModalOpen={setIsTransactionModalOpen}
                  setModalMode={setModalMode}
                  onRowClick={handleClickRow}
                />
              </Box>
            </Stack>
          </Box>
          {/* Batch Totals */}
          <Box display={"flex"} gap={2} flexDirection={"column"}>
            <Box
              sx={{ height: "40px", bgcolor: "grey.300", pl: 2 }}
              display="flex"
              alignItems={"center"}
            >
              Batch Totals
            </Box>
            <Grid container gap={1}>
              <Grid size="auto">
                <TextField
                  size="small"
                  variant="outlined"
                  label="Total Debits"
                  value={batchTotals?.totalDebits}
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size="auto">
                <TextField
                  size="small"
                  variant="outlined"
                  label="Total Debits Amount"
                  value={batchTotals?.totalDebitAmount}
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size="auto">
                <TextField
                  size="small"
                  variant="outlined"
                  label="Total Credits"
                  value={batchTotals?.totalCredits}
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size="auto">
                <TextField
                  size="small"
                  variant="outlined"
                  label="Total Credit Amount"
                  value={batchTotals?.totalCreditAmount}
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size="auto">
                <TextField
                  size="small"
                  variant="outlined"
                  label="Difference"
                  value={batchTotals?.difference}
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
      <CreateTransactionModal
        open={isTransactionModalOpen}
        mode={modalMode}
        onClose={handleModalClose}
        onSave={
          modalMode === MODAL_MODE.ADD ? handleModalSave : handleModalUpdate
        }
        selectedRow={selectedRow}
        width={600}
      />
    </Stack>
  );
};

export default PaymentVoucherPostingCreate;
