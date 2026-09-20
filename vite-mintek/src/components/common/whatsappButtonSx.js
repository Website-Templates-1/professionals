// Leaf teal-emerald sampled from the Mintek mark — deeper than WhatsApp neon
// so the channel still reads as green without competing with the logo.
export const WHATSAPP = {
  green: "#0D8166",
  hover: "#0A6B55",
  dark: "#085445",
};

export const whatsappContainedSx = {
  bgcolor: WHATSAPP.green,
  color: "#fff",
  "&:hover": { bgcolor: WHATSAPP.hover },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: WHATSAPP.dark,
    outlineOffset: 2,
  },
};
