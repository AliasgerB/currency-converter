import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Currency Converter</h1>
      <Link to="/converter">Go to Converter</Link>
    </div>
  );
};

export default Home;
