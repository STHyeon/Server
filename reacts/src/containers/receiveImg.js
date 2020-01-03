import React, { useState } from "react";

const axios = require("axios");

const Test1 = () => {
    const [file, setFile] = useState("");
    const onFormSubmit = e => {
        e.preventDefault();
        axios
            .get("http://localhost:8080/post/img?ere")
            .then(response => {
                setFile(response.data.showImg);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <h1>File Upload</h1>
            <img src={file} alt="aa" />
            <button onClick={onFormSubmit}>aa</button>
        </div>
    );
};

export default Test1;
