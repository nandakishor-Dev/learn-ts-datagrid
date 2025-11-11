import React, { useEffect, useMemo, useState } from "react";
import { Download, Link, LinkOff, Search } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AppBreadcrumbs } from "../../../components/common/AppBreadcrumbs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
// Types
type Item = {
  id: string;
  label: string;
};

type Category = {
  id: string;
  label: string;
  items: Item[];
};
// Schema

const FormSchema = z.object({
  selectedAvailable: z.record(z.string(), z.boolean()),
  selectedCategorized: z.record(z.string(), z.boolean()),
  selectedCategoryId: z.string().nullable(),
});

type FormValues = z.infer<typeof FormSchema>;

// data
const initialAvailable: Item[] = [
  { id: "1p", label: "Depaul" },
  { id: "2p", label: "Martinez" },
  { id: "3p", label: "Marquinhos" },
  { id: "4p", label: "Messi" },
  { id: "5p", label: "Neymar" },
  { id: "6p", label: "Ronaldo" },
  { id: "7p", label: "Silva" },
];

const initialCategories: Category[] = [
  { id: "t1", label: "Argentina", items: [] },
  { id: "t2", label: "Brazil", items: [] },
  { id: "t3", label: "Portugal", items: [] },
];
const CategoryAccountLink = () => {
  const [available, setAvailable] = useState<Item[]>(initialAvailable);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [expanded, setExpanded] = useState<string | false>(false);

  const { control, watch, setValue, resetField, getValues } =
    useForm<FormValues>({
      resolver: zodResolver(FormSchema, undefined, { raw: false }),
      defaultValues: {
        selectedAvailable: {},
        selectedCategorized: {},
        selectedCategoryId: null,
      },
      mode: "onChange",
    });
  const selectedCategoryId = watch("selectedCategoryId");
  const selectedAvailableMap = watch("selectedAvailable");
  const selectedCategorizedMap = watch("selectedCategorized");

  const toggleAvailable = (id: string) => {
    const curr = getValues("selectedAvailable");
    setValue("selectedAvailable", { ...curr, [id]: !curr[id] });
  };
  const toggleCategorized = (id: string) => {
    const curr = getValues("selectedCategorized");
    setValue("selectedCategorized", { ...curr, [id]: !curr[id] });
  };
  const handleSelectCategory = (catId: string) => {
    if (catId === selectedCategoryId) {
      //   console.log("aaaa", catId === selectedCategoryId);
      setValue("selectedCategoryId", null);
    } else {
      setValue("selectedCategoryId", catId);
    }
  };
  const selectedAvailableIds = useMemo(() => {
    const ids: string[] = [];

    for (const id in selectedAvailableMap) {
      const isSelected = selectedAvailableMap[id];
      if (isSelected) {
        ids.push(id);
      }
    }

    return ids;
  }, [selectedAvailableMap]);
  const selectedCategorizedIds = useMemo(() => {
    const ids: string[] = [];

    for (const id in selectedCategorizedMap) {
      const isSelected = selectedCategorizedMap[id];
      if (isSelected) {
        ids.push(id);
      }
    }

    return ids;
  }, [selectedCategorizedMap]);
  const canLink = selectedAvailableIds.length > 0 && !!selectedCategoryId;
  const canUnlink = selectedCategorizedIds.length > 0;
  const handleLink = () => {
    if (!canLink) return;

    setCategories((prev) =>
      prev.map((c) =>
        c.id === selectedCategoryId
          ? {
              ...c,
              items: [
                ...c.items,
                ...available.filter((i) => selectedAvailableIds.includes(i.id)),
              ],
            }
          : c
      )
    );

    // Remove from available
    setAvailable((prev) =>
      prev.filter((i) => !selectedAvailableIds.includes(i.id))
    );

    // // Clear selections
    resetField("selectedAvailable");
  };
  const handleUnlink = () => {
    if (!canUnlink) return;

    const itemsToMove: Item[] = [];

    const nextCategories = categories.map((category) => {
      const keep: Item[] = [];
      const move: Item[] = [];

      for (const item of category.items) {
        (selectedCategorizedIds.includes(item.id) ? move : keep).push(item);
      }

      itemsToMove.push(...move);

      return { ...category, items: keep };
    });

    // debugger

    setCategories(nextCategories);
    setAvailable((prev) =>
      [...prev, ...itemsToMove].sort((a, b) => a.label.localeCompare(b.label))
    );

    // Clear selections
    resetField("selectedCategorized");
  };
  const onAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      //   if (isExpanded) handleSelectCategory(panel);
    };
  useEffect(() => {
    if (selectedCategoryId) {
      setExpanded(selectedCategoryId);
    }
  }, [selectedCategoryId]);
  return (
    <Box>
      <Stack spacing={2}>
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
                Cancel
              </Button>
              <Button
                variant="outlined"
                sx={{ bgcolor: "green", color: "white" }}
                // onClick={handleClick}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Stack sx={{ bgcolor: "Background" }}>
          <Grid container spacing={1} pl={2}>
            <Grid container size={{ xs: 11 }}>
              <Grid size={{ xs: 4 }}>
                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  defaultValue=""
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span style={{ color: "#9e9e9e" }}>
                          Select Category Type
                        </span>
                      );
                    }
                    return selected as string;
                  }}
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                </Select>
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
        </Stack>
        {/* Form Section */}
        <Box sx={{ pl: 2 }} component={"form"}>
          <Stack spacing={2}>
            <Box
              sx={{
                height: "40px",
                bgcolor: "grey.200",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                pl: 1,
              }}
            >
              <Grid container>
                <Grid size={{ xs: 4 }}>
                  <Typography fontWeight={600}>GL Accounts</Typography>
                </Grid>
                <Grid size={{ xs: 4 }}></Grid>
                <Grid size={{ xs: 4 }}>
                  <Typography fontWeight={600}>Categories</Typography>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}>
                <TextField
                  size="small"
                  placeholder="Search GL Account"
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
              <Grid size={{ xs: 4 }}></Grid>
              <Grid size={{ xs: 4 }} pl={2}>
                <TextField
                  size="small"
                  placeholder="Search Categories"
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
            </Grid>
            {/* Table data section */}
            <Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 4 }}>
                  <List>
                    {available.map((item, index) => (
                      <Box key={item.id}>
                        {index !== 0 && <Divider />}

                        <ListItem sx={{ height: "40px" }}>
                          <Controller
                            name={`selectedAvailable.${item.id}` as const}
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <Checkbox
                                size="small"
                                disableRipple
                                sx={{
                                  // Checked color
                                  "&.Mui-checked": {
                                    color: "success.main",
                                  },
                                }}
                                checked={!!field.value}
                                onChange={() => toggleAvailable(item.id)}
                                tabIndex={-1}
                              />
                            )}
                          />
                          <ListItemText primary={item.label} sx={{ ml: 2 }} />
                        </ListItem>
                      </Box>
                    ))}
                  </List>
                </Grid>
                {/* link/unlink column */}
                <Grid size={{ xs: 4 }}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    gap={2}
                    sx={{ height: "270px" }}
                    p={5}
                  >
                    <Button
                      sx={{ bgcolor: "success.dark" }}
                      variant="contained"
                      startIcon={<Link />}
                      disabled={!canLink}
                      onClick={handleLink}
                    >
                      Link
                    </Button>
                    <Button
                      color="warning"
                      variant="contained"
                      startIcon={<LinkOff />}
                      disabled={!canUnlink}
                      onClick={handleUnlink}
                    >
                      Unlink
                    </Button>
                  </Box>
                </Grid>
                {/* category column */}
                <Grid size={{ xs: 4 }}>
                  {categories.map((cat) => {
                    const isSelected = selectedCategoryId === cat.id;
                    const count = cat.items.length;
                    return (
                      <Accordion
                        key={cat.id}
                        expanded={expanded === cat.id}
                        onChange={onAccordionChange(cat.id)}
                      >
                        <AccordionSummary
                          expandIcon={<GridExpandMoreIcon />}
                          sx={{ bgcolor: "success.light", height: "40px" }}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            <FormControlLabel
                              onClick={(e) => e.stopPropagation()}
                              onFocus={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                              control={
                                <Checkbox
                                  size="small"
                                  disableRipple
                                  sx={{
                                    // Checked color
                                    "&.Mui-checked": {
                                      color: "success.main",
                                    },
                                    ml: 2,
                                  }}
                                  checked={isSelected}
                                  onChange={() => handleSelectCategory(cat.id)}
                                />
                              }
                              label={cat.label}
                              sx={{ "& .MuiFormControlLabel-label": { ml: 2 } }}
                            />
                            {/* <Chip size="small" label={count} /> */}
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          {count === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                              No items linked.
                            </Typography>
                          ) : (
                            <List
                              dense
                              sx={{ maxHeight: 260, overflow: "auto",ml: 2  }}
                            >
                              {cat.items.map((item) => (
                                <ListItem key={item.id} disablePadding>
                                  <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Controller
                                      name={
                                        `selectedCategorized.${item.id}` as const
                                      }
                                      control={control}
                                      render={({ field }) => (
                                        <Checkbox
                                          size="small"
                                          disableRipple
                                          checked={!!field.value}
                                          onChange={() =>
                                            toggleCategorized(item.id)
                                          }
                                          tabIndex={-1}
                                          sx={{
                                            // Checked color
                                            "&.Mui-checked": {
                                              color: "success.main",
                                            },
                                          }}
                                        />
                                      )}
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    color="success.main"
                                    primary={item.label}
                                    sx={{ml:2}}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CategoryAccountLink;
