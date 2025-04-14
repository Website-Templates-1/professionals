import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer-section/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PastWork from "./pages/PastWork";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/past-work" element={<PastWork />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
