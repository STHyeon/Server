import React from "react";
import { Header } from "../components";

const Common = props => {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    );
};

export default Common;
