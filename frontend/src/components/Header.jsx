import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Your header styles

function Header() {
    return (
        <header className="header">
            <h1 className="logo">MySpark</h1> {/* Optional: Add a class for styling the logo */}
            <nav className="nav-links"> {/* Added class for styling */}
                <Link to=" ">Home</Link>
                <Link to="/login">Sign In</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
}

export default Header;