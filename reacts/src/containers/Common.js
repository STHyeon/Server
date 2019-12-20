import React, { useState } from "react";
import { Header } from "../components";

const Common = props => {
    const [writeToggle, setWriteToggle] = useState(true);
    const handleToggle = () => {
        setWriteToggle(!writeToggle);
    };

    const children = props.children;
    return (
        <div>
            <Header onToggle={handleToggle} />
            {React.cloneElement(children, { writeToggle }, null)}
        </div>
    );
};

export default Common;
