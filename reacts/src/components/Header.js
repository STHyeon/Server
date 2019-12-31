import React, { useState, useContext } from "react";
import logo from "../lib/img/logo.png";
import menu from "../lib/img/menu.png";
import cancel from "../lib/img/cancel.png";
import { Link } from "react-router-dom";
import { Context } from "../context/Common";

const Header = props => {
    const { username } = useContext(Context);
    const [side_menu_toggle, setSideToggle] = useState(true);
    const [side_menu_icon_toggle, setSideIconToggle] = useState(true);

    const sideToggle = () => {
        setSideToggle(!side_menu_toggle);
        setSideIconToggle(!side_menu_icon_toggle);
    };
    const side_menu_class = side_menu_toggle ? "navbar" : "side_navbar";
    const side_menu_icon = side_menu_toggle ? "open_menu" : "display_none";
    const side_menu_icon2 = side_menu_icon_toggle ? "display_none" : "open_menu";
    return (
        <div>
            <nav className="nav">
                <div className="inner">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                        <div className="side_menu" onClick={sideToggle}>
                            <img src={menu} alt="menu" className={side_menu_icon} />
                            <img src={cancel} alt="cancel" className={side_menu_icon2} />
                        </div>
                    </div>
                    <div className={side_menu_class}>
                        <div></div>
                        <ul>
                            <li>
                                <span onClick={props.onToggle}>WRITE</span>
                            </li>
                            {username ? (
                                <div>
                                    <li>
                                        <span>Logout</span>
                                    </li>
                                    <li>
                                        <span>{props.username}</span>
                                        <span className="nim">님</span>
                                    </li>
                                </div>
                            ) : (
                                <div>
                                    <li>
                                        <Link to="/login">LOGIN / REGISTER</Link>
                                    </li>
                                    <li>
                                        <Link to="/">HOME</Link>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="hidden_header"></div>
        </div>
    );
};

export default Header;
