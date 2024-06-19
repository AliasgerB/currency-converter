import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CurrencyConverter from "./CurrencyConverter/Converter";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Nav Bar/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/converter" element={<CurrencyConverter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
