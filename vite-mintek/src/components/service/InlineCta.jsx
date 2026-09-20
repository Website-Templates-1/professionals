import { Box, Stack, Typography } from "@mui/material";
import CtaButton from "../common/CtaButton";

const InlineCta = ({
  title,
  body,
  primaryLabel,
  primaryTo,
  primaryType,
  secondaryLabel,
  secondaryTo,
  secondaryType,
  onPrimaryClick,
  onSecondaryClick,
  placement = "inline_cta",
  service,
}) => {
  if (!primaryLabel && !secondaryLabel) return null;

  return (
    <Box
      sx={{
        mb: 6,
        p: { xs: 3, md: 3.5 },
        borderRadius: 3,
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {title && (
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: body ? 1 : 2 }}>
          {title}
        </Typography>
      )}
      {body && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
          {body}
        </Typography>
      )}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        {primaryLabel && (
          <CtaButton
            type={primaryType}
            to={primaryTo}
            label={primaryLabel}
            placement={placement}
            service={service}
            onClick={onPrimaryClick}
            variant="contained"
            color="primary"
          />
        )}
        {secondaryLabel && (
          <CtaButton
            type={secondaryType}
            to={secondaryTo}
            label={secondaryLabel}
            placement={placement}
            service={service}
            onClick={onSecondaryClick}
            variant="outlined"
            color="primary"
          />
        )}
      </Stack>
    </Box>
  );
};

export default InlineCta;
