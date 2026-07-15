import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router-dom";

const linkSx = {
  borderRadius: 1.5,
  px: 1.5,
  py: 1,
  color: "text.primary",
  fontSize: "0.95rem",
  "&:hover": {
    bgcolor: "action.hover",
    color: "primary.main",
  },
};

// `groups` is an array of { heading, links: [{ name, path }], layout? }.
// layout: "grid" renders short link clusters in two columns.
const NavLinks = ({ groups, handleNavLinkClick }) => {
  return (
    <Box component="nav" aria-label="main navigation" sx={{ pb: 2 }}>
      {groups.map((group, index) => (
        <Box key={group.heading || `group-${index}`} sx={{ mb: 2 }}>
          {index > 0 && <Divider sx={{ mb: 2 }} />}
          {group.heading && (
            <Typography
              variant="overline"
              sx={{
                display: "block",
                px: 1.5,
                mb: 0.5,
                color: "text.secondary",
                fontWeight: 700,
                letterSpacing: 1.2,
              }}
            >
              {group.heading}
            </Typography>
          )}
          <Box
            sx={
              group.layout === "grid"
                ? {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 0.5,
                  }
                : { display: "flex", flexDirection: "column", gap: 0.25 }
            }
          >
            {group.links.map((link) => (
              <ListItemButton
                key={link.path}
                component={RouterLink}
                to={link.path}
                onClick={() => handleNavLinkClick(link.path)}
                sx={linkSx}
              >
                {link.name}
              </ListItemButton>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default NavLinks;
