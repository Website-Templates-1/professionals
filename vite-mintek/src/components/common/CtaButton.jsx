import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  inferCtaType,
  isExternalTo,
  resolveCta,
} from "../../config/cta";
import { trackCta } from "../../utils/analytics";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappContainedSx } from "./whatsappButtonSx";

const CtaButton = ({
  type,
  placement,
  service,
  helpWith,
  business,
  discuss,
  to,
  label,
  onClick,
  children,
  variant,
  color,
  startIcon,
  sx,
  ...props
}) => {
  const resolved = type
    ? resolveCta(type, { service, placement, helpWith, business, discuss })
    : { type: inferCtaType(to, label || children), to, label };
  const dest = to || resolved.to;
  const text = children || label || resolved.label;
  const ctaType = type || resolved.type;

  if (!dest && !onClick) return null;

  const handleClick = (event) => {
    trackCta({
      type: ctaType,
      placement,
      to: dest,
      label: typeof text === "string" ? text : resolved.label,
      service: service?.slug || service,
    });
    onClick?.(event);
  };

  const isWhatsApp = ctaType === "whatsapp";
  const look = isWhatsApp
    ? {
        variant: "contained",
        startIcon: startIcon ?? <WhatsAppIcon />,
        sx: [whatsappContainedSx, sx],
      }
    : { variant, color, startIcon, sx };

  if (!dest || dest.startsWith("#") || isExternalTo(dest)) {
    const external = dest && /^https?:/.test(dest);
    return (
      <Button
        href={dest || undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        {...props}
        {...look}
      >
        {text}
      </Button>
    );
  }

  return (
    <Button component={RouterLink} to={dest} onClick={handleClick} {...props} {...look}>
      {text}
    </Button>
  );
};

export default CtaButton;
