import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

export function AppBreadcrumbs() {
  const location = useLocation();

  // Split URL into path segments
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs separator="•" aria-label="breadcrumb">
      {/* Dashboard root */}
      {pathnames.length === 0 ? (
        <Typography color="text.primary">Dashboard</Typography>
      ) : (
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </Link>
      )}

      {/* All other path segments */}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        // Clean label: remove hyphens + capitalize each word
        const label = value
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        return isLast ? (
          <Typography key={to} color="text.primary">
            {label}
          </Typography>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            to={to}
            underline="hover"
            color="inherit"
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
