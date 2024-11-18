import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Your header styles
import logo from './logo.jpg'; // Your logo image

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo-image" />
                <h1 className="logo-text">MySpark</h1>
            </div>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Register</Link>
            </nav>
        </header>
    );
}

export default Header;
