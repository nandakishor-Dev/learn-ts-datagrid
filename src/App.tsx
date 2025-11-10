import React from "react";
// import Home from "./pages/Home";
import { BrowserRouter, } from "react-router-dom";
// import LearnTs from "./pages/LearnTs";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
