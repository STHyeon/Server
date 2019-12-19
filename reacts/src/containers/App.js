import React, { useState } from "react";
import { Main } from "../components";
import Common from "./Common";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="wrap">
                <Common>
                    <Main />
                </Common>
            </div>
        </div>
    );
}

export default App;
