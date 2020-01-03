import React, { useState } from "react";
import { Auth } from "../components";
import { CommonContext } from "../context/Common";

import { connect } from "react-redux";
import { postLogin } from "../modules/auth";

const Login = ({ history, postLogin, authError }) => {
    const [mode] = useState(true);

    const onLogin = ({ username, password }) => {
        postLogin({ username, password, history });
    };

    return (
        <CommonContext>
            <Auth mode={mode} onLogin={onLogin} authError={authError} />
        </CommonContext>
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
