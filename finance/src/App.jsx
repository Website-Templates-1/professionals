import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { theme } from "./theme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/services" element={<Services />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
