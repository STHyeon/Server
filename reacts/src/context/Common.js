import React, { useState, createContext } from "react";
import { Header } from "../components";

const Context = createContext(null);

const CommonContext = props => {
    // const state = {
    //     username: props.username,
    //     isLogin: props.isLogin
    // };

    const { username, isLogin, postLogout } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [writeToggle, setWriteToggle] = useState(false);
    const [detailToggle, setDetailToggle] = useState(false);
    const handleToggle = () => {
        setWriteToggle(!writeToggle);
        setIsOpen(!isOpen);
    };
    const [side_menu_toggle, setSideToggle] = useState(true);
    const [side_menu_icon_toggle, setSideIconToggle] = useState(true);

    return (
        <Context.Provider
            value={{
                writeToggle,
                setWriteToggle,
                setIsOpen,
                detailToggle,
                setDetailToggle,
                username,
                setSideToggle,
                side_menu_toggle,
                side_menu_icon_toggle,
                setSideIconToggle
            }}
        >
            {isOpen ? (
                <div
                    className="curtain"
                    onClick={() => {
                        setIsOpen(false);
                        setWriteToggle(false);
                        setDetailToggle(false);
                    }}
                ></div>
            ) : null}
            <Header
                onToggle={handleToggle}
                username={username}
                side_menu_toggle={side_menu_toggle}
                setSideToggle={setSideToggle}
                side_menu_icon_toggle={side_menu_icon_toggle}
                setSideIconToggle={setSideIconToggle}
                postLogout={postLogout}
            />
            {props.children}
        </Context.Provider>
    );
};

export { CommonContext, Context };
