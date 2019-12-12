import React from "react";
import logo from "../lib/img/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <nav className="nav">
                <div className="inner">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="navbar">
                        <ul>
                            <li>
                                <Link to="/register">REGISTER</Link>
                            </li>
                            <li>
                                <Link to="/login">LOGIN</Link>
                            </li>
                            <li>
                                <Link to="/">HOME</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="hidden_header"></div>
        </div>
    );
};

export default Header;