import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { theme } from "./theme";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
