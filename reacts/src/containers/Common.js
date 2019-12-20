import React, { useState } from "react";
import { Header } from "../components";

import { connect } from "react-redux";
// import auth from "../modules/auth";

const Common = ({ username, isLogin }) => {
    const [writeToggle, setWriteToggle] = useState(true);
    const handleToggle = () => {
        setWriteToggle(!writeToggle);
    };

    return (
        <div>
            <Header onToggle={handleToggle} username={username} isLogin={isLogin} />
            {/* {React.cloneElement(props.children, { writeToggle }, null)} */}
        </div>
    );
};

export default connect(
    ({ auth }) => ({
        username: auth.auth.username,
        isLogin: auth.auth.isLogin
    }),
    {}
)(Common);
