import React from "react";
import { Link } from "react-router-dom";

const Header = ({user}) => {



  return (
    <header className="header">
      <img src="ALU.png" alt="Alumni Connect Logo" className="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/event">EVENTS</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          {user?.role === "admin" &&
          <li>
            <Link to="/about">ALUMNI</Link>
          </li>}
          <li>
            <Link to="/signup">SIGNUP</Link>
          </li>
          <li>
            <Link to="/admin">ADMIN</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
