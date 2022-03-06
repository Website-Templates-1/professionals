import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { Grid } from "@mui/material";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Grid container>
          <Grid item sm={12}>
            <Header />
          </Grid>
          <Grid item sm={12}>
            second section
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default App;
