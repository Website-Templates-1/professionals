import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link as RouterLink } from "react-router-dom";

const NavLinks = ({ linksToRender, handleNavLinkClick }) => {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <nav aria-label="main navigation">
        <List>
          {linksToRender.map((navbarLink) => (
            <Box key={navbarLink.path}>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={navbarLink.path}
                  onClick={() => handleNavLinkClick(navbarLink.path)}
                  sx={{ px: 0 }}
                >
                  <ListItemText primary={navbarLink.name} />
                  <ListItemIcon sx={{ minWidth: "unset" }}>
                    <ChevronRightIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default NavLinks;
