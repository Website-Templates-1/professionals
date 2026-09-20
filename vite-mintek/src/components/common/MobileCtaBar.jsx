import { Box, Button, Stack } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappContainedSx } from "./whatsappButtonSx";
import { LABELS, MOBILE_CTA_BAR_HEIGHT, resolveCta } from "../../config/cta";
import { trackCta } from "../../utils/analytics";

const itemSx = {
  flex: 1,
  minWidth: 0,
  minHeight: 48,
  py: 1,
  px: 0.5,
  fontSize: "0.8125rem",
  fontWeight: 600,
  borderRadius: 2,
};

const MobileCtaBar = () => {
  const call = resolveCta("call", { placement: "mobile_bar" });
  const whatsapp = resolveCta("whatsapp", { placement: "mobile_bar" });
  const book = resolveCta("book", { placement: "mobile_bar" });

  const onClick = (cta) => () =>
    trackCta({
      type: cta.type,
      placement: "mobile_bar",
      to: cta.to,
      label: cta.label,
    });

  return (
    <Box
      component="nav"
      aria-label="Quick contact"
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1099,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        pb: "env(safe-area-inset-bottom)",
        "@media print": { display: "none" },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ px: 1.5, py: 1, minHeight: MOBILE_CTA_BAR_HEIGHT }}
      >
        <Button
          href={call.to}
          onClick={onClick(call)}
          variant="outlined"
          color="primary"
          startIcon={<PhoneIcon />}
          aria-label={`${LABELS.call} at the studio`}
          sx={itemSx}
        >
          Call
        </Button>
        <Button
          href={whatsapp.to}
          onClick={onClick(whatsapp)}
          variant="contained"
          startIcon={<WhatsAppIcon />}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={LABELS.whatsapp}
          sx={[itemSx, whatsappContainedSx]}
        >
          WhatsApp
        </Button>
        <Button
          href={book.to}
          onClick={onClick(book)}
          variant="contained"
          color="primary"
          startIcon={<EventAvailableIcon />}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={LABELS.book}
          sx={itemSx}
        >
          Book
        </Button>
      </Stack>
    </Box>
  );
};

export default MobileCtaBar;
