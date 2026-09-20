import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// items: [{ name, path }] where the last item is the current page.
const Breadcrumbs = ({ items, sx }) => {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ mb: 3, ...sx }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography key={item.path} color="text.primary" variant="body2">
            {item.name}
          </Typography>
        ) : (
          <Link
            key={item.path}
            component={RouterLink}
            to={item.path}
            underline="hover"
            color="text.secondary"
            variant="body2"
          >
            {item.name}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
