import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

const NavLinks = ({ linksToRender, handleNavLinkClick }) => {
  const navigate = useNavigate();

  const onLinkClick = (path) => {
    handleNavLinkClick(path);
    navigate(path);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <nav aria-label="main navigation">
        <List>
          {linksToRender.map((navbarLink, index) => (
            <Box key={index}>
              <ListItem
                disablePadding
                onClick={() => {
                  onLinkClick(navbarLink.path);
                }}
              >
                <ListItemButton
                  sx={{
                    px: 0,
                  }}
                >
                  <ListItemText primary={navbarLink.name} />
                  <ListItemIcon
                    sx={{
                      minWidth: "unset",
                    }}
                  >
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