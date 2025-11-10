import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    background: { default: "#ffffff" },
    success: {
      main: "#7ADAA5",
      light: "#D3FCD2",
      dark: "#118D57",
      contrastText: "#67AE6E",
    },
    grey: {
      "50": "#FCFDFD",
      "100": "#F9FAFB",
      "200": "#F4F6F8",
      "300": "#DFE3E8",
      "400": "#C4CDD5",
      "500": "#919EAB",
      "600": "#637381",
      "700": "#454F5B",
      "800": "#1C252E",
      "900": "#141A21",
    },
  
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          "&.Mui-selected": {
            backgroundColor: "rgba(25, 118, 210, 0.1)", // primary color, light tone
            color: "#5aa47bff",
            "& .MuiListItemIcon-root": {
              color: "#5aa47bff",
            },
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.2)",
          },
        },
      },
    },
  },
});

export default theme;
