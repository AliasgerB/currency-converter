import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Currency Converter
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/converter"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
            >
              Converter
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
