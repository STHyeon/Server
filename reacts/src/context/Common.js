import React, { useState, createContext } from "react";
import { Header } from "../components";

const Context = createContext(null);

const CommonContext = props => {
    // const state = {
    //     username: props.username,
    //     isLogin: props.isLogin
    // };

    const { username, isLogin } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [writeToggle, setWriteToggle] = useState(false);
    const [detailToggle, setDetailToggle] = useState(false);
    const handleToggle = () => {
        setWriteToggle(!writeToggle);
        setIsOpen(!isOpen);
    };

    return (
        <Context.Provider
            value={{ writeToggle, setIsOpen, detailToggle, setDetailToggle, username }}
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
            <Header onToggle={handleToggle} username={username} />
            {props.children}
        </Context.Provider>
    );
};

export { CommonContext, Context };
