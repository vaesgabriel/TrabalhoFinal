import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ hideMenuItems }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Deliveries</div>
        {}
        {!hideMenuItems && (
          <ul className="navbar-menu">
            <li>
              <Link to="/deliveries">Lista de Entregas</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
            <li>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
