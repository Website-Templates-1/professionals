import React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Call } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const NavbarLargeHeading = styled(Typography)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const NavbarSmallHeading = styled(Typography)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const CallButtonDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  marginLeft: 10,
  color: theme.palette.primary.main,
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="transparent">
      <StyledToolBar>
        <NavbarLargeHeading variant="h6">MintTech Software</NavbarLargeHeading>
        <NavbarSmallHeading variant="h6">MintTech</NavbarSmallHeading>

        <StyledList>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="button">Home</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="button">Services</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="button">About</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="button">Testimonials</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="button">Clients</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="button">Contact</Typography>
            </ListItemButton>
          </ListItem>
        </StyledList>

        <CallButtonDiv>
          <Button size="small" variant="contained" sx={{ borderRadius: 8, maxHeight: '40px' }}>
            <Typography variant="button">Call now</Typography>
          </Button>

          <MenuButton
            size="medium"
            variant="contained"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </MenuButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Typography variant="button">Home</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="button">Services</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="button">About</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="button">Testimonials</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="button">Clients</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="button">Contact</Typography>
            </MenuItem>
          </Menu>
        </CallButtonDiv>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
