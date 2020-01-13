import React from "react";
import { Auth } from "../components";
import { CommonContext } from "../context/Common";

import { connect } from "react-redux";
import { postRegister } from "../modules/auth";

const Register = ({ history, authError, postRegister }) => {
    const onRegister = ({ username, password, password2 }) => {
        postRegister({ username, password, password2, history });
    };

    return (
        <CommonContext>
            <Auth mode={false} onRegister={onRegister} authError={authError} />
        </CommonContext>
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
