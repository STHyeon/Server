import React, { useState } from "react";
import { Auth } from "../components";

import { connect } from "react-redux";
import { postLogin } from "../modules/auth";

const Login = ({ history, postLogin, authError }) => {
    const [mode, setMode] = useState(true);

    const onLogin = ({ username, password }) => {
        postLogin({ username, password, history });
    };

    return (
        // <Common>
        <Auth mode={mode} onLogin={onLogin} authError={authError} />
        // </Common>
    );
};

export default connect(
    ({ auth }) => ({
        authError: auth.auth.message
    }),
    {
        postLogin
    }
)(Login);
