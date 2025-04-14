import { Box, Drawer, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RightFullPageDrawer = ({
  open,
  drawerClose,
  drawerTitle,
  children,
  footer,
  allowOverflow = false,
  ...otherprops
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={drawerClose}
      {...otherprops}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", md: "25vw" },
          height: "100vh",
          p: 2,
          overflow: allowOverflow ? "auto" : "visible",
          maxHeight: "100dvh",
        },
      }}
      transitionDuration={300}
    >
      <>
        {/* Drawer header start */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            my: 4,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" component="div">
            {drawerTitle}
          </Typography>
          <CloseIcon
            onClick={drawerClose}
            sx={{
              cursor: "pointer",
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
            }}
          />
        </Stack>
        {/* Drawer header end */}
        {children}
        {/* Drawer footer start */}
        {footer && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              p: 2,
              zIndex: 1000,
              bgcolor: "background.paper",
            }}
          >
            {footer}
          </Box>
        )}
        {/* Drawer footer end */}
      </>
    </Drawer>
  );
};

export default RightFullPageDrawer; 