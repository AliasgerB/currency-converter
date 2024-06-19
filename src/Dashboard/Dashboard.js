import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="container">
      <h1>Welcome to the Currency Converter</h1>
      <Link to="/converter">Go to Converter</Link>
    </div>
  );
};

export default Dashboard;
