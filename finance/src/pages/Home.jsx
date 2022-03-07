import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { Grid } from "@mui/material";
import Header from "../components/Header";

const Home = () => {
    return (
        <div>
          <ThemeProvider theme={theme}>
            <Grid container>
              <Grid item xs={12}>
                <Header />
              </Grid>
            </Grid>
          </ThemeProvider>
        </div>
      );
    };

export default Home;