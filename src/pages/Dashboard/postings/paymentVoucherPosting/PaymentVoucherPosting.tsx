import React from "react";
import { Download, Search, StarBorder } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PvListGrid, {
  type RowEntry,
} from "../../../../components/Postings/PvListGrid";
import { useNavigate } from "react-router-dom";
import { AppBreadcrumbs } from "../../../../components/common/AppBreadcrumbs";

const PaymentVoucherPosting = () => {
  const navigate = useNavigate();
  const handleRowClick = (row: RowEntry) => {
    console.log("row", row);
    navigate("pv-entry");
  };
  const handleClick = () => {
    navigate("pv-entry");
  };
  return (
    <Box>
      <Stack spacing={4}>
        {/* Header Section */}
        <Grid container pl={2}>
          <Grid size={{ xs: 5 }}>
            <Stack spacing={2}>
              <Typography fontWeight={600}>PV Data Entry</Typography>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <AppBreadcrumbs />
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 3 }} />
          <Grid size={{ xs: 4 }}>
            <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
              <Button variant="outlined" color="success">
                <StarBorder />
              </Button>
              <Button
                variant="outlined"
                sx={{ bgcolor: "green", color: "white" }}
                onClick={handleClick}
              >
                Create New
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* DataGrid section */}
        <Stack sx={{ bgcolor: "Background" }} spacing={2}>
          <Grid container spacing={2} pl={2}>
            <Grid container size={{ xs: 11 }}>
              <Grid size={{ xs: 4 }}>
                <TextField
                  size="small"
                  placeholder="Search"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    },
                  }}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Select fullWidth size="small" />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Select fullWidth size="small" />
              </Grid>
            </Grid>

            <Grid size={{ xs: 1 }} alignItems={"center"} display={"flex"}>
              {" "}
              <Box
                display={"flex"}
                gap={1}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Button
                  variant="text"
                  startIcon={<Download />}
                  sx={{
                    textTransform: "none",
                    bgcolor: "white",
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "grey.100",
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
                  Export
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box>
            <PvListGrid clickRow={handleRowClick} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PaymentVoucherPosting;
