import React from "react";
import { Main } from "../components";
import Common from "./Common";

function App() {
    return (
        <div className="wrap">
            <Common>
                <Main />
            </Common>
        </div>
    );
}

export default App;
