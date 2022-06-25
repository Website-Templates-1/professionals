import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { Grid } from "@mui/material";
import Header from "../components/Header";

const Services = () => {
    return (
        <div>
          <ThemeProvider theme={theme}>
            <Grid container>
              <Grid item xs={12}>
                Services
              </Grid>
            </Grid>
          </ThemeProvider>
        </div>
      );
    };

export default Services;