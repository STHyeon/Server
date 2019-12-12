import React, { useState } from "react";
import Common from "./Common";
import { Auth } from "../components";

const Register = () => {
    const [mode, setMode] = useState(false);
    return (
        <Common>
            <Auth mode={mode} />
        </Common>
    );
};

export default Register;
