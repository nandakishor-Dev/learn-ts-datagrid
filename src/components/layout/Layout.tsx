import React from "react";
import { Box, Toolbar } from "@mui/material";
import TopBar from "./AppBar";
import { Outlet } from "react-router-dom";
import SideNav from "./Sidenav";


const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, pt: 0, pl: 0, pr: 0 }}>
        <TopBar />
        <Toolbar /> {/* spacing under AppBar */}
        <Box p={5} pl={3} pt={0}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
