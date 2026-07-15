import { Box, Drawer, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RightFullPageDrawer = ({
  open,
  drawerClose,
  drawerTitle,
  children,
  footer,
  // Kept for API compatibility; the scrollable content region now always
  // handles overflow so the pinned footer stays reliably at the bottom.
  allowOverflow = false, // eslint-disable-line no-unused-vars
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
          width: { xs: "100%", sm: "360px" },
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
      }}
      transitionDuration={300}
    >
      {/* Header (fixed) */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 2, pt: 3, pb: 2, flexShrink: 0 }}
      >
        <Typography variant="h4" component="div">
          {drawerTitle}
        </Typography>
        <CloseIcon
          onClick={drawerClose}
          sx={{
            cursor: "pointer",
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        />
      </Stack>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>{children}</Box>

      {/* Footer (pinned to bottom) */}
      {footer && (
        <Box
          sx={{
            flexShrink: 0,
            p: 2,
            bgcolor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {footer}
        </Box>
      )}
    </Drawer>
  );
};

export default RightFullPageDrawer;
