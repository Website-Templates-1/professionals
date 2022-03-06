import { createTheme } from "@mui/material/styles";
import { purple, red } from "@mui/material/colors";
import { createBreakpoints } from "@mui/system";

const breakpoints = createBreakpoints({})

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
    },
    body1: {
      fontFamily: "Roboto",
    },
    h1: {
      fontFamily: "Roboto",
      fontWeight: 1200,
      [breakpoints.down("md")]: {
        fontSize: '4.0rem',
      },
    },
    h2: {
      fontFamily: "Alfa Slab One",
    },
    h6: {
      fontFamily: "Audiowide",
    },
  },
});
