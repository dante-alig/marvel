import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./pages/home";
import Header from "./components/header";
import Character from "./pages/character";
import Comics from "./pages/comics";

function App() {
  const [display, setDisplay] = useState(true);
  return (
    <Router>
      <Header display={display} setDisplay={setDisplay} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:characterId" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
      </Routes>
    </Router>
  );
}

export default App;
