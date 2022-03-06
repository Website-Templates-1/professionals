import { createTheme } from "@mui/material/styles";
import { purple, red } from "@mui/material/colors";
import { BoltRounded } from "@mui/icons-material";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: red[900],
    },
  },

  typography: {
    button: {
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "Titan One",
    },
  },
});
