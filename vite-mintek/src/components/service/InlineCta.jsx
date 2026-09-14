import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ButtonLink = ({ to, ...props }) => {
  if (!to) return null;
  if (to.startsWith("http")) {
    return (
      <Button
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  }
  return <Button component={RouterLink} to={to} {...props} />;
};

const InlineCta = ({
  title,
  body,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  onPrimaryClick,
  onSecondaryClick,
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
          <ButtonLink to={primaryTo} onClick={onPrimaryClick} variant="contained" color="primary">
            {primaryLabel}
          </ButtonLink>
        )}
        {secondaryLabel && (
          <ButtonLink to={secondaryTo} onClick={onSecondaryClick} variant="outlined" color="primary">
            {secondaryLabel}
          </ButtonLink>
        )}
      </Stack>
    </Box>
  );
};

export default InlineCta;
