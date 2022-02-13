import * as React from "react";
import { Grid } from "@mui/material";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar/>
      <Grid container>
        <Grid item sm={12}></Grid>
      </Grid>
    </div>
  );
};

export default App;