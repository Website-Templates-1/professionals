import { createTheme } from "@mui/material/styles";
import { purple, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: red[900],
    },
  },
});