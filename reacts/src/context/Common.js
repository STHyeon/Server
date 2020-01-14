import React, { useState, createContext, useEffect } from "react";
import { Header } from "../components";
import message from "../lib/img/envelope.png";

const Context = createContext(null);

const CommonContext = props => {
    const { username, postLogout, history, error_message, error } = props;

    const [formMode, setFormMode] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [writeToggle, setWriteToggle] = useState(false);
    const [detailToggle, setDetailToggle] = useState(false);
    const handleToggle = () => {
        setWriteToggle(!writeToggle);
        setIsOpen(!isOpen);
    };
    const [side_menu_toggle, setSideToggle] = useState(true);
    const [side_menu_icon_toggle, setSideIconToggle] = useState(true);
    const [errorToggle, setErrorToggle] = useState(true);

    //error 명칭: notify
    const ErrorBox = () => {
        return (
            <div className="error error-top-right">
                <span onClick={() => setErrorToggle(false)}>x</span>
                <div className="error-icon">
                    <div className="error-icon-inner">
                        <img src={message} alt="message" />
                    </div>
                </div>
                <div className="error-text">
                    <h3>Error</h3>
                    <p>{error_message}</p>
                </div>
            </div>
        );
    };

    useEffect(() => {
        isOpen ? (document.body.style.overflowY = "hidden") : (document.body.style.overflowY = "unset");
    }, [isOpen]);

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
                setSideIconToggle,
                formMode,
                setFormMode
            }}
        >
            {isOpen ? (
                <div
                    className="curtain"
                    onClick={() => {
                        setIsOpen(false);
                        setWriteToggle(false);
                        setDetailToggle(false);
                        setFormMode(true);
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
                history={history}
            />
            {error ? errorToggle ? <ErrorBox /> : null : null}
            {props.children}
        </Context.Provider>
    );
};

export { CommonContext, Context };
