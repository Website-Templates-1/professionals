export const WHATSAPP = {
  green: "#25D366",
  hover: "#1EBE57",
  dark: "#128C7E",
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
