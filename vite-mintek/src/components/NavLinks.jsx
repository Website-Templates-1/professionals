import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link as RouterLink } from "react-router-dom";

// `groups` is an array of { heading, links: [{ name, path }] }.
const NavLinks = ({ groups, handleNavLinkClick }) => {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <nav aria-label="main navigation">
        {groups.map((group, index) => (
          <List
            key={group.heading || `group-${index}`}
            subheader={
              group.heading ? (
                <ListSubheader
                  disableSticky
                  sx={{
                    bgcolor: "transparent",
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    px: 0,
                  }}
                >
                  {group.heading}
                </ListSubheader>
              ) : undefined
            }
          >
            {group.links.map((link) => (
              <Box key={link.path}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={link.path}
                    onClick={() => handleNavLinkClick(link.path)}
                    sx={{ px: 0 }}
                  >
                    <ListItemText primary={link.name} />
                    <ListItemIcon sx={{ minWidth: "unset" }}>
                      <ChevronRightIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        ))}
      </nav>
    </Box>
  );
};

export default NavLinks;
