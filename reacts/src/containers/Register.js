import React, { useState } from "react";
import { Auth } from "../components";

import { connect } from "react-redux";
import { postRegister } from "../modules/auth";

const Register = ({ authError, postRegister }) => {
    const [mode, setMode] = useState(false);

    const onRegister = ({ username, password, password2 }) => {
        postRegister({ username, password, password2 });
    };

    return (
        // <Common>
        <Auth mode={mode} onRegister={onRegister} authError={authError} />
        // </Common>
    );
};

export default connect(
    ({ auth }) => ({
        authError: auth.auth.message
    }),
    {
        postRegister
    }
)(Register);
