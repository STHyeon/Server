import React from "react";

// const axios = require("axios");

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("img", this.state.file);
        this.props.onPost(formData);
        // axios
        //     .post("http://localhost:8080/post/post", formData)
        //     // .post(api.apiTest, formData)
        //     .then(response => {
        //         console.log(formData);
        //     })
        //     .catch(error => {});
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="img" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        );
    }
}

export default Test;
