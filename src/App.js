import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CurrencyConverter from "./Converter";
import Home from "./Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<CurrencyConverter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
