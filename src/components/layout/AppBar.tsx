import React from "react";
import { Settings } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import ukflag from "../../assets/images/ukflag.jpg";
import avatarImg from "../../assets/images/7309681.jpg";

const TopBar = () => {
  return (
    <Box sx={{ height: "60px", bgcolor: "Background" }}>
      <Grid
        container
        justifyContent={"space-between"}
        p={2}
        alignItems={"center"}
      >
        <Grid container size={{ xs: 6 }} spacing={2} alignItems={"center"}>
          <Typography variant="body1" fontWeight={500}>
            Team 1
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 6 }}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Box display={"flex"} justifyContent={"flex-end"} pr={2}>
            <Box
              component="img"
              src={ukflag}
              alt="Logo"
              sx={{ width: 30, height: "auto" }}
            />
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} pr={2}>
            <IconButton color="primary">
              <Badge badgeContent={2} color="error">
                <Icon color="#c1c1c1ff" width={24} icon="solar:bell-bing-bold-duotone" />
              </Badge>
            </IconButton>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} pr={2}>
            <IconButton>
              <Settings sx={{ color: "#c1c1c1ff" }} />
            </IconButton>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} pr={2}>
            <Avatar
              src={avatarImg}
              sx={{
                width: 40,
                height: 40,
                border: "2px solid #1976d2",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopBar;
